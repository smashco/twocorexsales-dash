import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { Lead, CloseIntelData } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { lead }: { lead: Lead } = await req.json();

    const prompt = `You are a world-class sales closer — think Jordan Belfort meets Indian SMB expertise. Your job: give a TwoCoreX sales rep the EXACT intelligence to close this specific deal on ONE call.

TwoCoreX is a software dev company in Maharashtra that builds CRM, mobile apps, and SaaS platforms for SMBs. They offer 3 months FREE then ₹799–₹1,999/month.

LEAD PROFILE:
- Company: ${lead.companyName} | City: ${lead.city} | Industry: ${lead.industry}
- Employees: ${lead.employees} | Website: ${lead.website}
- Score: ${lead.score}/10 | Qualification: ${lead.qualification} | Intent: ${lead.intentLevel}
- Service Needed: ${lead.serviceFit}
- Pain Point 1: ${lead.painPoint1}
- Pain Point 2: ${lead.painPoint2}
- Pain Point 3: ${lead.painPoint3}
- Buying Trigger: ${lead.buyingTrigger}
- Contact/Role: ${lead.contact}
- Recommended Action: ${lead.action}

Generate the ULTIMATE one-call close playbook for this specific prospect. Be brutally specific — no generic advice. Use their exact pain points, trigger, and industry context. Return ONLY valid JSON (no markdown):
{
  "masterCloseAngle": {
    "headline": "The single most powerful closing angle for THIS prospect in one punchy sentence — e.g. 'They're losing ₹1.5L/month to manual errors while their competitors automate'",
    "explanation": "2-3 sentences explaining exactly WHY this angle will work on THIS specific owner/decision-maker given their industry, city, and pain",
    "emotionalTrigger": "The core emotion to activate — one of: FOMO | Fear of Falling Behind | Revenue Leak Pain | Competitor Threat | Pride & Ambition | Operational Frustration | Growth Hunger"
  },
  "secretWeapon": "One specific insight/fact the sales rep can drop that will make the owner think 'How did you know that?' — something hyper-specific to their industry, city, and stage. E.g. 'Most ${lead.industry} businesses in ${lead.city} that hit ₹1Cr revenue hit a wall without a CRM — you're at exactly that tipping point'",
  "oneCallScript": {
    "opener": "The EXACT first 2-3 sentences to say on the call — casual, confident, name-dropping something real about their business. No 'Hi I'm calling from...' crap.",
    "painDiagnosis": [
      "Question 1 to ask that makes them feel their own pain — open-ended, about their specific Problem 1",
      "Question 2 that reveals financial cost of their problem",
      "Question 3 that connects pain to their growth ambition"
    ],
    "solutionBridge": "The exact transition sentence from pain to solution — 'So what if I showed you how [Company Name] businesses like yours...' — make it feel inevitable",
    "proofPoint": "One specific case study or proof point to mention — even if hypothetical, make it feel real. E.g. 'We just built this for a ${lead.industry} company in [nearby city] — they recovered the subscription cost in 11 days'",
    "closingAsk": "The EXACT closing question to ask — not 'Do you want to buy?' but a soft assumptive close. E.g. 'Should we start your free 3 months this week or next?'",
    "silenceInstruction": "What to do after asking the close — exact instruction like 'Stop talking. Don't fill silence. Let them respond. If 5 seconds pass, say only: [exact words]'"
  },
  "objectionKillers": [
    {
      "objection": "The #1 most likely objection from this specific type of owner in ${lead.city}",
      "rebuttalScript": "Word-for-word rebuttal script — 2-3 sentences, conversational Hindi/English mix OK, specific to their pain",
      "recoveryMove": "If rebuttal doesn't land — the pivot move. E.g. 'What if we just do a 30-min live demo — no commitment at all?'"
    },
    {
      "objection": "The #2 likely objection based on their industry/size",
      "rebuttalScript": "Word-for-word rebuttal",
      "recoveryMove": "Recovery move"
    },
    {
      "objection": "The #3 likely objection — usually about trust/new company",
      "rebuttalScript": "Word-for-word rebuttal addressing the 'you're a new company' concern with confidence",
      "recoveryMove": "Recovery move"
    }
  ],
  "urgencyAmmo": [
    "Specific reason why waiting = money lost for THIS company — quantify if possible",
    "Competitor or market threat specific to ${lead.industry} in ${lead.city} that creates urgency",
    "Internal trigger from their buying trigger that makes NOW the right time",
    "The TwoCoreX offer angle — why the free 3 months window is time-sensitive"
  ],
  "priceAnchor": {
    "costOfInaction": "Exact calculation of what their current problems cost them monthly — be specific, use their pain points. E.g. 'If you have ${lead.employees} staff spending 2 hours/day on manual entry, that's ₹X/month in wasted labor'",
    "valueFrame": "How to present the ₹799-₹1,999/month price to make it feel trivially small — comparison to something they already spend on",
    "trialOffer": "The EXACT words to say when presenting the 3-month free trial — make it sound like a gift, not a pitch"
  },
  "nuclearOption": "The last-resort move if they say no to everything — the one thing that changes the game. E.g. 'What if I set up the first module for free this week — just for 30 days — and you only pay if you love it?'",
  "buyingSignalToWatch": "The specific verbal or tonal cue that means THIS type of owner is ready to say yes — what to listen for in their voice or words",
  "followUpPlan": "If not closed on call 1 — the exact follow-up message to send within 2 hours (WhatsApp/email), personalized to what was discussed, with a specific call-to-action"
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

    const generatedAt = new Date();

    // Ensure table exists then save
    try {
      await prisma.closeIntelCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    } catch {
      await prisma.$executeRawUnsafe(
        `CREATE TABLE IF NOT EXISTS close_intel_cache (lead_id TEXT PRIMARY KEY, data JSONB NOT NULL, generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`
      );
      await prisma.closeIntelCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    }

    const result: CloseIntelData = {
      leadId: lead.id,
      generatedAt: generatedAt.toISOString(),
      ...(parsed as Omit<CloseIntelData, "leadId" | "generatedAt">),
    };

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("Close intel error:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
