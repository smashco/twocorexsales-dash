import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { Lead, SocialIntelData } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function scrapeWebsite(domain: string): Promise<{ html: string; socialLinks: Record<string, string> }> {
  const socialLinks: Record<string, string> = {};
  let html = "";
  try {
    const res = await fetch(`https://${domain}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36" },
      signal: AbortSignal.timeout(7000),
    });
    if (res.ok) {
      html = await res.text();
      // Extract social media links
      const patterns: Record<string, RegExp> = {
        linkedin: /https?:\/\/(?:www\.)?linkedin\.com\/(?:company|in)\/[a-zA-Z0-9_\-\.]+/i,
        instagram: /https?:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9_\.]+/i,
        facebook: /https?:\/\/(?:www\.)?facebook\.com\/[a-zA-Z0-9_\-\.]+/i,
        twitter: /https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[a-zA-Z0-9_]+/i,
        youtube: /https?:\/\/(?:www\.)?youtube\.com\/(?:channel|c|@|user)\/[a-zA-Z0-9_\-]+/i,
      };
      for (const [platform, pattern] of Object.entries(patterns)) {
        const match = html.match(pattern);
        if (match) socialLinks[platform] = match[0];
      }
    }
  } catch {
    // Fetch failed — continue with AI generation only
  }
  // Strip HTML tags and truncate for Claude
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2500);
  return { html: text, socialLinks };
}

export async function POST(req: NextRequest) {
  try {
    const { lead }: { lead: Lead } = await req.json();

    const { html: websiteText, socialLinks } = await scrapeWebsite(lead.website);

    const knownSocials = Object.entries(socialLinks)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n") || "No social links found on website";

    const websiteContext = websiteText
      ? `WEBSITE CONTENT EXTRACTED:\n${websiteText}`
      : "Website could not be scraped.";

    const prompt = `You are a B2B sales intelligence analyst. Research this Indian SMB business for a sales team at TwoCoreX (software development company in Maharashtra).

LEAD DATA:
- Company: ${lead.companyName}
- City: ${lead.city}
- Industry: ${lead.industry}
- Website: ${lead.website}
- Employees: ${lead.employees}
- Service Needed: ${lead.serviceFit}
- Contact: ${lead.contact}
- Pain Points: ${lead.painPoint1} | ${lead.painPoint2} | ${lead.painPoint3}
- Buying Trigger: ${lead.buyingTrigger}

SOCIAL LINKS FOUND ON WEBSITE:
${knownSocials}

${websiteContext}

Based on all available data, generate comprehensive social and online intelligence. Use your knowledge of similar ${lead.industry} businesses in ${lead.city} to make educated inferences where data is unavailable.

Return ONLY valid JSON (no markdown) with this exact structure:
{
  "socialProfiles": {
    "linkedin": "full URL or null",
    "instagram": "full URL or null",
    "facebook": "full URL or null",
    "twitter": "full URL or null",
    "youtube": "full URL or null"
  },
  "onlinePresenceScore": 7,
  "onlinePresenceLabel": "Good",
  "companySnapshot": {
    "estimatedFounded": "Year or range e.g. 2018-2020",
    "founderOrLeader": "Name and title if known, else educated guess",
    "businessType": "e.g. Single-location clinic / Multi-branch chain",
    "primaryMarket": "B2C / B2B / Mixed",
    "estimatedMonthlyRevenue": "e.g. ₹3L-₹8L / month",
    "staffExpansion": "e.g. Likely hiring based on growth signals"
  },
  "recentOnlineActivity": [
    "5 specific inferred recent activities — e.g. Posted Diwali offer on Instagram 2 weeks ago",
    "Activity 2",
    "Activity 3",
    "Activity 4",
    "Activity 5"
  ],
  "digitalPresenceSummary": "2 sentence summary of their overall digital presence quality",
  "outreachConversationStarters": [
    "Specific opener based on their online activity — mention something real",
    "Opener referencing their Instagram/LinkedIn content",
    "Opener about a business milestone or campaign you noticed",
    "Opener about a recent review or complaint you spotted"
  ],
  "socialEngagementLevel": "Medium",
  "googleBusinessInsights": {
    "estimatedRating": "e.g. 4.2 stars (estimated) or Known: 4.5",
    "reviewActivity": "e.g. 120+ reviews, mostly positive",
    "businessHours": "e.g. Mon-Sat 10am-8pm (from Google)"
  },
  "contentStrategy": "1-2 sentence analysis of what type of content they post and how frequently",
  "brandVoice": "e.g. Professional + aspirational / Casual + community-driven",
  "keyPersonnelOnline": [
    "Person 1 — title, LinkedIn/Instagram handle if known",
    "Person 2"
  ],
  "websiteAnalysis": "2-3 sentence analysis of their website quality, technology, and UX",
  "redFlags": [
    "Any red flag about their online presence or business that could affect the deal",
    "Red flag 2 if applicable"
  ]
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8096,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "{}";
    const firstBrace = raw.indexOf("{");
    const lastBrace = raw.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1) throw new Error("No JSON in response");
    const jsonStr = raw.slice(firstBrace, lastBrace + 1);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsed: any;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      try {
        parsed = JSON.parse(jsonStr.replace(/[\r\n]+/g, " "));
      } catch {
        const cleaned = jsonStr.replace(/[\x00-\x1F\x7F]/g, " ").replace(/,\s*([}\]])/g, "$1");
        parsed = JSON.parse(cleaned);
      }
    }

    // Override socialProfiles with any real scraped links
    if (parsed.socialProfiles && typeof parsed.socialProfiles === "object") {
      const profiles = parsed.socialProfiles as Record<string, unknown>;
      for (const [platform, url] of Object.entries(socialLinks)) {
        profiles[platform] = url;
      }
    }

    const generatedAt = new Date();

    // Ensure table exists then save
    try {
      await prisma.socialIntelCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    } catch {
      await prisma.$executeRawUnsafe(
        `CREATE TABLE IF NOT EXISTS social_intel_cache (lead_id TEXT PRIMARY KEY, data JSONB NOT NULL, generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`
      );
      await prisma.socialIntelCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    }

    const result: SocialIntelData = {
      leadId: lead.id,
      generatedAt: generatedAt.toISOString(),
      ...(parsed as Omit<SocialIntelData, "leadId" | "generatedAt">),
    };

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("Social intel error:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
