import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import type { Lead, BizIntelData } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { lead }: { lead: Lead } = await req.json();

    const prompt = `You are a senior B2B sales data analyst and business intelligence expert. Analyze this lead for TwoCoreX, a software development company in Maharashtra that builds CRM, mobile apps, and SaaS platforms for SMBs.

LEAD PROFILE:
- Company: ${lead.companyName} | City: ${lead.city} | Industry: ${lead.industry}
- Employees: ${lead.employees} | Website: ${lead.website}
- Lead Score: ${lead.score}/10 | Qualification: ${lead.qualification} | Intent: ${lead.intentLevel}
- Service Fit: ${lead.serviceFit}
- Pain Point 1: ${lead.painPoint1}
- Pain Point 2: ${lead.painPoint2}
- Pain Point 3: ${lead.painPoint3}
- Buying Trigger: ${lead.buyingTrigger}
- Contact: ${lead.contact}
- Outreach Method: ${lead.action}

Generate a comprehensive 20-point business intelligence analysis. Be specific to Indian SMB context (Maharashtra market). Return ONLY valid JSON (no markdown):
{
  "healthScore": {
    "score": 78,
    "label": "Healthy & Growing",
    "factors": ["3 specific factors supporting this score"]
  },
  "budgetLikelihood": {
    "percentage": 72,
    "reasoning": "1-2 sentences explaining budget probability",
    "signals": ["3 signals that indicate budget availability"]
  },
  "dealSize": {
    "min": "₹80,000",
    "max": "₹3,50,000",
    "mostLikely": "₹1,20,000",
    "reasoning": "Explanation of deal size estimate based on company size and service fit"
  },
  "timeToClose": {
    "minWeeks": 3,
    "maxWeeks": 10,
    "reasoning": "Explanation based on Indian SMB decision-making patterns and their buying trigger"
  },
  "decisionMaker": {
    "title": "Owner/Founder or specific title",
    "decisionStyle": "e.g. Price-sensitive but ROI-focused / Fast decision-maker / Committee decision",
    "priorities": ["3 things they care most about in a purchase decision"],
    "howToApproach": "Specific tactical advice for approaching this decision maker"
  },
  "swot": {
    "strengths": ["3 business strengths visible from the lead data"],
    "weaknesses": ["3 operational weaknesses that create the software need"],
    "opportunities": ["3 opportunities our software unlocks for them"],
    "threats": ["3 threats to their business if they don't digitize"]
  },
  "competitive": {
    "mainCompetitors": ["3-4 likely competitor software vendors they might consider e.g. Zoho, Salesforce, Vyapar, custom Excel"],
    "ourAdvantage": ["3 specific advantages TwoCoreX has vs these competitors for this client"],
    "switchingBarriers": "What makes it easy or hard to switch to our solution"
  },
  "industryTrends": [
    "4 current industry trends in their sector relevant to software adoption in India 2024-2025"
  ],
  "growthSignals": [
    "4 specific growth signals visible in their lead data"
  ],
  "currentTechStack": [
    "5 inferred tools they likely use now e.g. WhatsApp Business, Tally, Google Sheets, etc."
  ],
  "digitalMaturity": {
    "score": 3,
    "label": "Early adopter — basic digital tools only",
    "gaps": ["4 specific digital gaps we can fill"]
  },
  "salesCycleRecommendation": {
    "stage": "Awareness → Interest",
    "nextAction": "Specific next step for the sales rep",
    "urgency": "HIGH"
  },
  "revenueEstimate": {
    "annual": "₹60L-₹1.2Cr",
    "monthly": "₹5L-₹10L",
    "reasoning": "Based on employees, industry, city-tier pricing in India"
  },
  "roiForClient": {
    "annualSavings": "₹2.4L-₹4.8L/year",
    "timeToROI": "4-6 months",
    "primaryBenefit": "The single biggest value our solution delivers to them"
  },
  "marketContext": {
    "localMarketSize": "e.g. 200+ similar businesses in Pune/Mumbai metro",
    "growthRate": "e.g. 15-20% annual growth in this segment",
    "opportunity": "1-2 sentence market context"
  },
  "riskMatrix": [
    {"risk": "Budget constraint — Indian SMB payment culture", "likelihood": "MEDIUM", "impact": "HIGH", "mitigation": "Offer 40-30-30 milestone payment"},
    {"risk": "Second risk", "likelihood": "LOW", "impact": "MEDIUM", "mitigation": "Mitigation approach"},
    {"risk": "Third risk", "likelihood": "HIGH", "impact": "LOW", "mitigation": "Mitigation approach"}
  ],
  "expansionSignals": [
    "4 signs this company is expanding/growing that increase urgency"
  ],
  "marketingMaturity": {
    "level": "Basic — WhatsApp + Google listing only",
    "currentChannels": ["3-4 channels they likely use for marketing"],
    "budget": "Estimated ₹5K-₹20K/month on marketing"
  },
  "buyingSignals": [
    "5 specific buying signals present in this lead's profile"
  ],
  "nextBestAction": {
    "action": "Specific action for the sales rep to take TODAY",
    "timing": "e.g. Call Tuesday 11am-12pm (post-Monday rush)",
    "reasoning": "Why this action and timing is optimal",
    "script": "A 2-3 sentence opening script tailored for this specific prospect"
  }
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "{}";
    const firstBrace = raw.indexOf("{");
    const lastBrace = raw.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1) throw new Error("No JSON in response");
    const jsonStr = raw.slice(firstBrace, lastBrace + 1);

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = JSON.parse(jsonStr.replace(/[\r\n]+/g, " "));
    }

    const result: BizIntelData = {
      leadId: lead.id,
      generatedAt: new Date().toISOString(),
      ...(parsed as Omit<BizIntelData, "leadId" | "generatedAt">),
    };

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("Biz intel error:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
