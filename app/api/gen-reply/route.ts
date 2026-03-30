import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import type { Lead, PricingRecommendation } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { lead, pricing, replyText }: { lead: Lead; pricing: PricingRecommendation; replyText: string } = await req.json();

    const prompt = `You are Smith, a senior sales professional at TwoCoreX (OPC) Pvt Ltd — a custom software development company that builds ERP, CRM, and mobile systems exclusively for Indian SMBs.

ABOUT TWOCOREX:
- Builds custom ERP, CRM, mobile apps from scratch (not SaaS, not templates)
- Tech stack: React.js, Node.js, PostgreSQL, React Native, AWS/GCP, WhatsApp Business API
- Fixed-price contracts, source code ownership, 3-month warranty
- Email: smith@twocorex.com | WhatsApp: +91 8828945019

LEAD CONTEXT:
- Company: ${lead.companyName} (${lead.city})
- Industry: ${lead.industry}
- Employees: ${lead.employees}
- Pain Point 1: ${lead.painPoint1}
- Pain Point 2: ${lead.painPoint2}
- Pain Point 3: ${lead.painPoint3}
- Buying Trigger: ${lead.buyingTrigger}
- Service Fit: ${lead.serviceFit}
- Proposed Investment: ₹${pricing.projectPrice.toLocaleString("en-IN")} build + ₹${pricing.monthlyPrice.toLocaleString("en-IN")}/month

THEIR REPLY TO OUR FIRST OUTREACH EMAIL:
---
${replyText}
---

Write a professional, warm follow-up reply email from Smith to this lead. The reply should:

1. Open naturally — acknowledge their reply without being sycophantic
2. Handle whatever objection or question they raised (e.g. "we already use X software", "not the right time", "send more info", "interested", "too expensive", etc.)
3. If they mention existing software (SAP, Tally, Zoho, etc.): do NOT attack that software. Instead, pivot to gaps it doesn't cover for their specific pain points — position TwoCoreX as complementary, not a replacement
4. If they say not interested / wrong time: gracefully keep the door open, offer something low-commitment (a 10-min demo, a PDF case study)
5. If they are interested: suggest a specific next step (15-min call, propose 2 time slots)
6. End with ONE clear call-to-action
7. Keep it under 200 words — concise and human, not a sales pitch wall of text
8. Tone: confident, warm, respectful. Not pushy. Not desperate.

Output ONLY the email body (no subject line, no markdown, no explanation). Start with "Dear [Name]," or similar.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });

    const reply = message.content[0].type === "text" ? message.content[0].text.trim() : "";

    return Response.json({ success: true, reply });
  } catch (error) {
    console.error("gen-reply error:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
