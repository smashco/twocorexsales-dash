import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getPricingRecommendation } from "@/lib/pricing";
import type { Lead, ProposalIntelData } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { lead }: { lead: Lead } = await req.json();
    const pricing = getPricingRecommendation(lead);

    const prompt = `You are a senior solution consultant at TwoCoreX — a custom software company in Maharashtra that builds CRM, mobile apps, and SaaS platforms for Indian SMBs. Write a detailed, personalized proposal for this specific prospect. Think like a consultant who has done 50+ deployments in this industry.

TwoCoreX pricing: 3 months FREE → ₹${pricing.monthlyPrice.toLocaleString("en-IN")}/month (${pricing.tier} plan). Annual: ₹${pricing.annualPrice.toLocaleString("en-IN")}/year.

LEAD PROFILE:
- Company: ${lead.companyName} | City: ${lead.city} | Industry: ${lead.industry}
- Employees: ${lead.employees} | Website: ${lead.website}
- Recommended Service: ${lead.serviceFit}
- Pain Point 1: ${lead.painPoint1}
- Pain Point 2: ${lead.painPoint2}
- Pain Point 3: ${lead.painPoint3}
- Buying Trigger: ${lead.buyingTrigger}
- Contact: ${lead.contact}

Return ONLY valid JSON (no markdown):
{
  "solutionName": "A product name that feels built FOR them — e.g. 'TwoCoreX ${lead.industry} Suite for ${lead.companyName}'",
  "elevatorPitch": "Two sentences: sentence 1 names their exact problem, sentence 2 delivers the TwoCoreX solution with a specific outcome. No fluff.",
  "features": [
    {
      "name": "Feature name — specific and functional, e.g. 'Automated WhatsApp Follow-Up Engine'",
      "description": "What it does in plain language — 1-2 sentences",
      "painItSolves": "Which of their 3 pain points this directly addresses",
      "impact": "Measurable outcome: e.g. 'Reduces manual follow-up from 3 hours/day to 20 minutes'"
    }
  ],
  "beforeAfter": [
    {
      "area": "Specific business area",
      "before": "Painful current state — vivid and specific to their industry",
      "after": "After TwoCoreX — quantified improvement where possible"
    }
  ],
  "implementationTimeline": [
    {
      "phase": 1,
      "title": "Foundation Setup",
      "duration": "Weeks 1–2",
      "deliverables": ["4 specific deliverables for their service type"],
      "milestone": "What they approve before Phase 2 begins"
    },
    {
      "phase": 2,
      "title": "Core Build & Integration",
      "duration": "Weeks 3–6",
      "deliverables": ["4-5 deliverables"],
      "milestone": "UAT sign-off milestone"
    },
    {
      "phase": 3,
      "title": "Launch & Handover",
      "duration": "Weeks 7–8",
      "deliverables": ["3-4 deliverables"],
      "milestone": "Go-live + 30-day free support handover"
    }
  ],
  "expectedROI": {
    "timeToROI": "How quickly they recover the subscription cost — e.g. '6–8 weeks'",
    "monthlyTimeSaved": "Hours saved for their team — specific to ${lead.employees} staff",
    "revenueImpact": "Direct revenue impact — e.g. '20–30% improvement in lead conversion'",
    "costSavings": "Annual operational savings in rupees — specific to their size"
  },
  "successMetrics": [
    "4-5 measurable KPIs tied to their pain points — e.g. 'Lead response time drops from 6 hours to 15 minutes'"
  ],
  "whyTwoCoreX": [
    "3-4 reasons TwoCoreX specifically — reference their city, industry, team size. E.g. 'Maharashtra-based team means same-day support calls, no ticket queues'"
  ],
  "pricingJustification": "Why the ${pricing.tier} plan at ₹${pricing.monthlyPrice}/month is exactly right for ${lead.companyName} — frame it against their revenue, employee count, and ROI. Make ₹${pricing.monthlyPrice} feel like a no-brainer.",
  "callToActionScripts": {
    "primary": "Word-for-word closing sentence to say after presenting — assumptive, specific, includes the free 3-month offer",
    "followUp": "WhatsApp message to send within 2 hours of call if no commitment — personalized, has a next step",
    "objectionBridge": "Word-for-word response if they say 'let me think about it' — pivots to a micro-commitment like a free demo"
  }
}

Include 5-7 features, 4-5 before/after items. All content must be specific to ${lead.industry} in ${lead.city}.`;

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
      await prisma.proposalIntelCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    } catch {
      await prisma.$executeRawUnsafe(
        `CREATE TABLE IF NOT EXISTS proposal_intel_cache (lead_id TEXT PRIMARY KEY, data JSONB NOT NULL, generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`
      );
      await prisma.proposalIntelCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    }

    const result: ProposalIntelData = {
      leadId: lead.id,
      generatedAt: generatedAt.toISOString(),
      ...(parsed as Omit<ProposalIntelData, "leadId" | "generatedAt">),
    };

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("Proposal intel error:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
