import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { Lead, CompetitorIntelData } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { lead }: { lead: Lead } = await req.json();

    const prompt = `You are a B2B competitive intelligence analyst specializing in Indian SMB software markets. Give a TwoCoreX sales rep a hyper-specific competitive brief on this prospect.

TwoCoreX builds custom CRM, mobile apps, and SaaS platforms for Indian SMBs. They win on: hyper-customization, local Maharashtra support, Hindi/English mixed communication, 3 months FREE then ₹799–₹1,999/month.

LEAD PROFILE:
- Company: ${lead.companyName} | City: ${lead.city} | Industry: ${lead.industry}
- Employees: ${lead.employees} | Website: ${lead.website}
- Service Needed: ${lead.serviceFit}
- Pain Point 1: ${lead.painPoint1}
- Pain Point 2: ${lead.painPoint2}
- Pain Point 3: ${lead.painPoint3}
- Buying Trigger: ${lead.buyingTrigger}
- Intent Level: ${lead.intentLevel}
- Contact: ${lead.contact}

Return ONLY valid JSON (no markdown):
{
  "competitors": [
    {
      "companyName": "Specific software vendor — e.g. 'Zoho CRM' not just 'Zoho'",
      "relevance": "Why this vendor is relevant to this specific company in ${lead.industry} in ${lead.city}",
      "techStack": ["3-5 tools/features this vendor offers relevant to ${lead.companyName}"],
      "strengths": ["2-3 actual strengths"],
      "weaknesses": ["2-3 weaknesses TwoCoreX can exploit in Indian SMB context"],
      "winAngle": "Exact sentence: 'Unlike [Vendor], TwoCoreX [specific advantage for this company]...'",
      "pricingEstimate": "e.g. '₹2,500–₹5,000/user/month or ₹15,000 one-time'"
    }
  ],
  "vendorShoppingSignals": [
    {
      "signal": "Specific signal this company is evaluating/switching software",
      "evidence": "What in their profile supports this inference",
      "confidence": "HIGH",
      "actionableAdvice": "What the sales rep should do with this signal"
    }
  ],
  "evaluationStatus": "Actively Evaluating",
  "evaluationSummary": "2-3 sentence assessment of where this company is in vendor evaluation, why NOW is right, what emotional state the owner is in",
  "marketGapAnalysis": {
    "gapDescription": "The specific gap no current vendor solves well for their situation",
    "opportunity": "The revenue/efficiency opportunity this gap represents",
    "twoCoreXAngle": "How TwoCoreX fills this gap — one focused sentence"
  },
  "recommendedPitch": "Single most powerful competitive differentiator to lead with — hyper-specific to their pain points and city context",
  "urgencyIndicator": "Strike Now"
}

evaluationStatus must be one of: "Actively Evaluating" | "Recently Switched" | "Loyal to Current" | "No Clear Vendor" | "Dissatisfied with Current"
urgencyIndicator must be one of: "Strike Now" | "Warm Up First" | "Nurture" | "High Alert — Competitor Active"
Include 3-5 competitors and 3-5 vendor shopping signals.`;

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

    const generatedAt = new Date();

    try {
      await prisma.competitorIntelCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    } catch {
      await prisma.$executeRawUnsafe(
        `CREATE TABLE IF NOT EXISTS competitor_intel_cache (lead_id TEXT PRIMARY KEY, data JSONB NOT NULL, generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`
      );
      await prisma.competitorIntelCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    }

    const result: CompetitorIntelData = {
      leadId: lead.id,
      generatedAt: generatedAt.toISOString(),
      ...(parsed as Omit<CompetitorIntelData, "leadId" | "generatedAt">),
    };

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("Competitor intel error:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
