import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { Lead, LeadCRMState, AIInsights } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Cache TTL: 24 hours
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const { lead, crmState }: { lead: Lead; crmState: LeadCRMState } = await req.json();

    // Check DB cache first
    const cached = await prisma.aIInsightsCache.findUnique({
      where: { leadId: lead.id },
    });

    if (cached) {
      const age = Date.now() - cached.generatedAt.getTime();
      if (age < CACHE_TTL_MS) {
        const data = cached.data as Record<string, unknown>;
        return Response.json({
          success: true,
          insights: {
            leadId: lead.id,
            generatedAt: cached.generatedAt.toISOString(),
            ...data,
          },
          fromCache: true,
        });
      }
    }

    const recentLog = crmState.callLogs[0]?.notes ?? "none";

    const prompt = `You are a senior B2B sales coach helping a new software company in Maharashtra, India close their first customers.

The product is a custom CRM and business automation platform for small businesses (under 25 employees).
Pricing is ₹799–₹1,999/month with 3 months free for first customers.

LEAD:
- Company: ${lead.companyName} (${lead.city})
- Industry: ${lead.industry}
- Employees: ${lead.employees}
- Service Needed: ${lead.serviceFit}
- Lead Score: ${lead.score}/10 | Qualification: ${lead.qualification} | Intent: ${lead.intentLevel}
- Pain Point 1: ${lead.painPoint1}
- Pain Point 2: ${lead.painPoint2}
- Pain Point 3: ${lead.painPoint3}
- Buying Trigger: ${lead.buyingTrigger}
- Outreach Channel: ${lead.action}
- CRM Status: ${crmState.status}
- Most Recent Interaction: ${recentLog}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "priorityReasons": ["3 specific reasons why now is the right time to approach this company"],
  "strongestTalkingPoints": ["3 specific talking points tailored to their pain points and industry"],
  "objectionHandling": [
    {"objection": "realistic objection from Indian SMB owner", "response": "specific, confident rebuttal"},
    {"objection": "second realistic objection", "response": "specific rebuttal"},
    {"objection": "third realistic objection", "response": "specific rebuttal"}
  ],
  "riskFactors": ["2 genuine risks that could block this deal"],
  "suggestedFollowUpTiming": "1 sentence on best time and frequency to follow up",
  "openingLineVariants": ["opener for ${lead.action}", "alternative opener", "third variant"]
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "{}";
    const clean = raw.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();
    const parsed = JSON.parse(clean);

    const generatedAt = new Date();

    // Save to DB cache (upsert in case a stale entry exists)
    await prisma.aIInsightsCache.upsert({
      where: { leadId: lead.id },
      update: {
        data: parsed,
        generatedAt,
      },
      create: {
        leadId: lead.id,
        data: parsed,
        generatedAt,
      },
    });

    const insights: AIInsights = {
      leadId: lead.id,
      generatedAt: generatedAt.toISOString(),
      ...parsed,
    };

    return Response.json({
      success: true,
      insights,
      fromCache: false,
    });
  } catch (error) {
    console.error("AI insights error:", error);
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
