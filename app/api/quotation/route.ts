import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface QuotationRequest {
  clientName: string;
  companyName: string;
  city: string;
  country: "India" | "International";
  projectType: "App Development" | "Web Development" | "CRM Basic" | "CRM + Portal" | "CRM + App" | "Full Platform";
  features: string;        // free-text: what features they need
  timeline: string;        // e.g. "3 months", "ASAP", "6 weeks"
  teamSize: string;        // e.g. "5–15 employees"
  industry: string;
  additionalNotes: string;
}

export interface QuotationResponse {
  quoteId: string;
  clientName: string;
  companyName: string;
  projectType: string;
  executiveSummary: string;
  scopeOfWork: string[];
  pricingBreakdown: {
    item: string;
    cost: string;
    note: string;
  }[];
  totalMinimum: string;
  totalMaximum: string;
  recommendedPackage: string;
  openingOffer: string;          // "First-call close" offer
  timeline: string;
  paymentTerms: string;
  whyTwoCoreX: string[];         // 3 bullet points
  nextStep: string;
  generatedAt: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: QuotationRequest = await req.json();

    const isIndia = body.country === "India";

    // Pricing context for Claude
    const pricingContext = isIndia
      ? `
PRICING RULES (India — price-conscious market, TwoCoreX is new company with 3 delivered apps):
- App Development (iOS + Android): ₹1,00,000 minimum. Range ₹1L–₹5L depending on complexity.
- Web Development: ₹50,000 minimum. Range ₹50K–₹2L depending on complexity.
- CRM Basic (contact management, pipeline, reports): ₹80,000 one-time build. OR ₹999/month subscription.
- CRM + Portal/Web App: ₹1,20,000–₹2,50,000 one-time.
- CRM + Mobile App: ₹1,50,000–₹3,50,000 one-time.
- Full Platform (mobile + web + CRM + integrations): ₹3,00,000–₹8,00,000.
- Monthly maintenance/support: 15% of project cost per year.
- Opening offer: "3 months free subscription" or "20% launch discount as our reference client."
- Payment terms: 40% advance, 30% at mid-milestone, 30% on delivery.
- Note: We are new — position price as VALUE not as cheap. "You get startup hustle + enterprise skill."
`
      : `
PRICING RULES (International — USD/GBP/AUD etc.):
- App Development (iOS + Android): $5,000 USD minimum. Range $5K–$25K depending on complexity.
- Web Development: $2,500 USD minimum. Range $2.5K–$10K.
- CRM Basic: $3,000 USD one-time. OR $150/month.
- CRM + Portal: $5,000–$12,000 USD.
- CRM + Mobile App: $7,000–$18,000 USD.
- Full Platform: $15,000–$40,000 USD.
- Monthly support: 15% of project cost annually.
- Opening offer: "First international reference client discount: 20% off standard rate."
- Payment terms: 50% advance, 50% on delivery (milestone-based for large projects).
- Quote in the local currency of the client's country if possible (USD default otherwise).
`;

    const prompt = `You are a senior sales consultant for TwoCoreX (OPC) Pvt Ltd, a boutique software development company based in Maharashtra, India. You have delivered 3 apps successfully. You are generating a professional sales quotation.

${pricingContext}

CLIENT DETAILS:
- Client Name: ${body.clientName}
- Company: ${body.companyName}
- City: ${body.city}
- Country: ${body.country}
- Project Type: ${body.projectType}
- Features Needed: ${body.features}
- Timeline: ${body.timeline}
- Team Size: ${body.teamSize}
- Industry: ${body.industry}
- Additional Notes: ${body.additionalNotes}

Generate a detailed, professional quotation. Return ONLY valid JSON (no markdown) with this exact structure:
{
  "executiveSummary": "2-3 sentence summary of what we will build and why it solves their problem",
  "scopeOfWork": ["Feature 1 — description", "Feature 2 — description", "Feature 3 — description", "Feature 4", "Feature 5"],
  "pricingBreakdown": [
    {"item": "Component name", "cost": "₹X,XX,000 or $X,XXX", "note": "what this includes"},
    {"item": "Component 2", "cost": "₹X,XX,000 or $X,XXX", "note": "what this includes"},
    {"item": "Annual Support & Maintenance", "cost": "₹X,XXX/year or $XXX/year", "note": "bug fixes, hosting support, minor updates"}
  ],
  "totalMinimum": "₹X,XX,000 or $X,XXX (total minimum project cost)",
  "totalMaximum": "₹X,XX,000 or $X,XXX (total maximum if all features included)",
  "recommendedPackage": "1-2 sentences: recommended scope and price point for a first engagement",
  "openingOffer": "The specific first-call close offer — e.g. 3 months free, 20% discount, free extra module",
  "timeline": "Realistic delivery timeline broken into phases",
  "paymentTerms": "Specific payment schedule",
  "whyTwoCoreX": ["Reason 1 why TwoCoreX is the right choice", "Reason 2", "Reason 3"],
  "nextStep": "Specific call to action — what should happen in next 24 hours"
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "{}";
    const clean = raw.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();
    const parsed = JSON.parse(clean);

    const response: QuotationResponse = {
      quoteId: `TCX-${Date.now().toString(36).toUpperCase()}`,
      clientName: body.clientName,
      companyName: body.companyName,
      projectType: body.projectType,
      generatedAt: new Date().toISOString(),
      ...parsed,
    };

    return Response.json({ success: true, quotation: response });
  } catch (error) {
    console.error("Quotation error:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
