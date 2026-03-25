import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { Lead, IntentSignalData, DetectedTech } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Free tech fingerprinting — no API key needed ─────────────────────────────

type TechCategory = DetectedTech["category"];

const TECH_FINGERPRINTS: Array<{
  tool: string;
  category: TechCategory;
  patterns: RegExp[];
  implication: string;
}> = [
  // CRM / Sales
  { tool: "Zoho CRM", category: "CRM", patterns: [/zoho\.com/i, /zohocrm\.com/i, /zohopublic\.com/i, /zohoforms\.com/i, /zoho_crm/i], implication: "Using Zoho — common pain: rigid customization, steep learning curve, expensive scaling" },
  { tool: "HubSpot", category: "CRM", patterns: [/hs-scripts\.com/i, /hubspot\.com/i, /hsforms\.com/i, /hbspt\./i], implication: "Using HubSpot — pain: pricing jumps aggressively after free tier" },
  { tool: "Freshworks CRM", category: "CRM", patterns: [/freshsales\.com/i, /freshworks\.com\/crm/i], implication: "Using Freshworks — pain: basic automation, limited Indian market features" },
  { tool: "Bigin by Zoho", category: "CRM", patterns: [/bigin\.com/i, /bigin\.zoho/i], implication: "Using Bigin (entry-level CRM) — actively looking to upgrade to full CRM soon" },
  { tool: "LeadSquared", category: "CRM", patterns: [/leadsquared\.com/i, /lsq-leads/i], implication: "Using LeadSquared — pain: expensive for small teams, complex setup" },
  { tool: "Salesforce", category: "CRM", patterns: [/salesforce\.com/i, /sfdcstatic\.com/i, /force\.com/i, /salesforceliveagent\.com/i], implication: "Using Salesforce — likely enterprise, pain: extreme cost, needs constant admin" },

  // ERP / Accounting
  { tool: "Tally", category: "ERP / Accounting", patterns: [/tallysolutions\.com/i, /tally\.net/i, /tallyprime/i], implication: "Using Tally for accounting — no CRM layer, strong upsell opportunity for workflow automation" },
  { tool: "Vyapar", category: "ERP / Accounting", patterns: [/vyaparapp\.in/i, /vyapar\.in/i], implication: "Using Vyapar (basic invoicing) — ready for a proper CRM + ops platform" },
  { tool: "QuickBooks", category: "ERP / Accounting", patterns: [/quickbooks\.com/i, /intuit\.com/i, /qbo\.intuit/i], implication: "Using QuickBooks — gap in CRM and operations management is wide open" },
  { tool: "Marg ERP", category: "ERP / Accounting", patterns: [/margcompusoft\.com/i, /margerp/i], implication: "Using Marg ERP (India-specific) — typically no client-facing app, custom dev opportunity" },
  { tool: "Busy Accounting", category: "ERP / Accounting", patterns: [/busywin\.com/i, /busy accounting/i], implication: "Using Busy (SMB accounting) — no CRM, ripe for digital upgrade pitch" },

  // E-Commerce
  { tool: "Shopify", category: "E-Commerce", patterns: [/cdn\.shopify\.com/i, /myshopify\.com/i, /shopify\.com/i, /shopifypreview\.com/i], implication: "Running Shopify store — need order management, vendor app, or delivery tracking layer" },
  { tool: "WooCommerce", category: "E-Commerce", patterns: [/woocommerce/i, /wc-ajax/i, /wc_add_to_cart/i], implication: "Running WooCommerce — custom app or CRM integration is a natural upgrade" },
  { tool: "Magento", category: "E-Commerce", patterns: [/mage\/cookies/i, /Magento/i, /magento\.com/i], implication: "Running Magento — complex stack, client portal or B2B app is a strong pitch" },

  // Payment
  { tool: "Razorpay", category: "Payment", patterns: [/razorpay\.com/i, /checkout\.razorpay/i, /api\.razorpay/i], implication: "Using Razorpay — tech-forward, open to digital tools, understands software value" },
  { tool: "PayU", category: "Payment", patterns: [/payu\.in/i, /payu\.com/i, /payumoney/i], implication: "Using PayU — indicates digital payment readiness, open to software investment" },
  { tool: "Instamojo", category: "Payment", patterns: [/instamojo\.com/i], implication: "Using Instamojo — small business payment tool, likely growing and needing more structure" },
  { tool: "CCAvenue", category: "Payment", patterns: [/ccavenue\.com/i, /ccavenuetest/i], implication: "Using CCAvenue (older gateway) — tech stack may be dated, upgrade pitch works well" },
  { tool: "PayTM for Business", category: "Payment", patterns: [/paytm\.com/i, /paytmbank\.com/i], implication: "Using Paytm — SMB-focused, price-sensitive, value messaging important" },

  // Marketing
  { tool: "Mailchimp", category: "Marketing", patterns: [/mailchimp\.com/i, /list-manage\.com/i, /chimpified/i], implication: "Using Mailchimp for email — has some digital sophistication, likely frustrated by lack of integration with ops" },
  { tool: "CleverTap", category: "Marketing", patterns: [/clevertap\.com/i, /wzrkt\.com/i], implication: "Using CleverTap — growth-stage company doing user retention, strong digital investment mindset" },
  { tool: "MoEngage", category: "Marketing", patterns: [/moengage\.com/i], implication: "Using MoEngage — digital-first company, will understand ROI of custom software" },
  { tool: "WebEngage", category: "Marketing", patterns: [/webengage\.com/i, /_weq/i], implication: "Using WebEngage — sophisticated marketing stack, needs sales + ops to match" },
  { tool: "Sendinblue / Brevo", category: "Marketing", patterns: [/sendinblue\.com/i, /brevo\.com/i, /sibautomation/i], implication: "Using Sendinblue/Brevo for email marketing — budget-conscious, value pitch works" },

  // Website Builders
  { tool: "WordPress", category: "Website Builder", patterns: [/wp-content\//i, /wp-includes\//i, /wp-json/i, /wordpress\.org/i], implication: "WordPress website — good for showing how a custom app would leapfrog their static web presence" },
  { tool: "Wix", category: "Website Builder", patterns: [/wix\.com/i, /wixstatic\.com/i, /X-Wix-/i], implication: "Using Wix — basic digital presence, significant upgrade opportunity with a proper web app" },
  { tool: "Squarespace", category: "Website Builder", patterns: [/squarespace\.com/i, /sqspcdn\.com/i, /static1\.squarespace/i], implication: "Using Squarespace — design-conscious brand, will respond to premium-positioned custom solution" },
  { tool: "Webflow", category: "Website Builder", patterns: [/webflow\.com/i, /webflow\.io/i], implication: "Using Webflow — tech-savvy team, can articulate the value of custom app development clearly" },

  // HR / Payroll
  { tool: "Keka HR", category: "HR / Payroll", patterns: [/keka\.com/i], implication: "Using Keka HR — invested in HR tech, good upsell for field staff management or custom ops app" },
  { tool: "GreytHR", category: "HR / Payroll", patterns: [/greythr\.com/i], implication: "Using GreytHR — payroll sorted, next need is CRM or field force management" },
  { tool: "Darwinbox", category: "HR / Payroll", patterns: [/darwinbox\.com/i], implication: "Using Darwinbox — enterprise HR, likely has gaps in frontline ops and client-facing tools" },
  { tool: "Zoho People", category: "HR / Payroll", patterns: [/zohopeople\.com/i, /people\.zoho/i], implication: "On Zoho HR — already invested in Zoho ecosystem, pitch seamless custom extension" },

  // Support
  { tool: "Freshdesk", category: "Support", patterns: [/freshdesk\.com/i, /freshchat\.com/i, /freshservice\.com/i], implication: "Using Freshdesk for support — customer service is digitized, sales/ops is likely still manual" },
  { tool: "Zendesk", category: "Support", patterns: [/zendesk\.com/i, /zdassets\.com/i, /zopim/i], implication: "Using Zendesk — customer-focused brand, good foundation for custom client portal pitch" },
  { tool: "Intercom", category: "Support", patterns: [/intercom\.com/i, /intercom\.io/i, /app\.intercom/i], implication: "Using Intercom — product-led mindset, responds well to data-driven sales approach" },

  // Logistics
  { tool: "Shiprocket", category: "Logistics", patterns: [/shiprocket\.in/i, /shiprocket\.com/i], implication: "Using Shiprocket — e-commerce logistics sorted, pitch a branded delivery tracking app for their customers" },
  { tool: "Delhivery", category: "Logistics", patterns: [/delhivery\.com/i], implication: "Using Delhivery API — tech-integrated logistics, opportunity for white-label tracking portal" },
  { tool: "Ecom Express", category: "Logistics", patterns: [/ecomexpress\.in/i], implication: "Using Ecom Express — mid-market logistics, opportunity for ops dashboard and client portal" },

  // Analytics
  { tool: "Google Analytics 4", category: "Analytics", patterns: [/gtag\/js.*G-/i, /google-analytics\.com\/g\/collect/i], implication: "Using GA4 — data-aware team, ROI and metrics messaging will resonate" },
  { tool: "Google Tag Manager", category: "Analytics", patterns: [/googletagmanager\.com/i, /gtm\.js/i], implication: "Using GTM — technically organized, will appreciate systematic software approach" },
  { tool: "Facebook Pixel", category: "Analytics", patterns: [/connect\.facebook\.net\/.*fbevents/i, /fbq\('/i], implication: "Running Facebook ads — performance-driven, understands cost-per-result, strong ROI pitch" },
  { tool: "Hotjar", category: "Analytics", patterns: [/hotjar\.com/i, /hjSiteSettings/i], implication: "Using Hotjar — cares about UX data, will value a well-designed custom solution" },
];

async function detectTechFromWebsite(domain: string): Promise<{ detected: DetectedTech[]; rawText: string }> {
  const detected: DetectedTech[] = [];
  let rawText = "";

  try {
    const res = await fetch(`https://${domain}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36" },
      signal: AbortSignal.timeout(7000),
    });
    if (res.ok) {
      const html = await res.text();
      rawText = html.slice(0, 5000); // pass first 5000 chars to Claude for extra context

      for (const fp of TECH_FINGERPRINTS) {
        if (fp.patterns.some(p => p.test(html))) {
          detected.push({ tool: fp.tool, category: fp.category, implication: fp.implication });
        }
      }
    }
  } catch {
    // Fetch failed — proceed with AI-only analysis
  }

  return { detected, rawText };
}

export async function POST(req: NextRequest) {
  try {
    const { lead }: { lead: Lead } = await req.json();

    // Step 1: Free website tech fingerprinting
    const { detected: techFound, rawText: websiteSnippet } = await detectTechFromWebsite(lead.website);

    const techSummary = techFound.length > 0
      ? techFound.map(t => `• ${t.tool} (${t.category}): ${t.implication}`).join("\n")
      : "No recognizable software tools detected on website";

    // Step 2: Claude synthesizes everything into structured intent signals
    const prompt = `You are a B2B sales intelligence specialist focused on Indian SMBs. Analyze this lead's buying intent and generate live intent signals.

LEAD:
- Company: ${lead.companyName} | City: ${lead.city} | Industry: ${lead.industry}
- Employees: ${lead.employees} | Website: ${lead.website}
- Service Needed: ${lead.serviceFit}
- Pain Point 1: ${lead.painPoint1}
- Pain Point 2: ${lead.painPoint2}
- Pain Point 3: ${lead.painPoint3}
- Buying Trigger: ${lead.buyingTrigger}
- Intent Level: ${lead.intentLevel}
- Contact: ${lead.contact}

TECH FINGERPRINTS FOUND ON THEIR WEBSITE (free scan, no API):
${techSummary}

WEBSITE SNIPPET (first 3000 chars of their homepage):
${websiteSnippet.slice(0, 3000) || "Could not fetch website"}

Using ALL of this data — tech stack detected, pain points, buying trigger, industry, city — generate structured buying intent signals. Infer whether they're:
- Currently unhappy with software they're using (from fingerprints + pain points)
- Actively shopping for alternatives (job postings they'd likely make, platforms they're on)
- Price shopping vs feature shopping
- Ready to switch immediately vs need nurturing

Return ONLY valid JSON (no markdown):
{
  "detectedTechStack": [
    {
      "tool": "Tool name",
      "category": "CRM",
      "implication": "What this means for the sale"
    }
  ],
  "techStackGap": "2-3 sentence analysis: what tech they currently have vs what they clearly need. Be specific about the gap.",
  "intentScore": 8,
  "intentScoreLabel": "Very High",
  "switchingReadiness": "Actively Evaluating",
  "signals": [
    {
      "type": "Vendor Dissatisfaction",
      "signal": "Specific description of the signal — reference their actual data",
      "source": "Where this signal comes from: 'Website tech scan', 'Pain point analysis', 'Buying trigger', 'Industry benchmark', 'Job pattern inference'",
      "confidence": "HIGH",
      "urgency": "Strike Now",
      "salesAdvice": "Exact advice for the sales rep — what to say or do because of this signal"
    }
  ],
  "indianMarketContext": "2-3 sentences on where this company sits in the Indian SMB tech adoption curve, what their peers in ${lead.industry} in ${lead.city} typically use, and whether they're ahead or behind",
  "competitorToolsDetected": ["List of competitor software tools found on their website or inferred"],
  "recommendedApproach": "Based on their tech maturity and intent signals, the single best sales approach — be specific. E.g. 'Lead with cost comparison against Zoho, show how 3 months free reduces their risk'",
  "nextBestAction": {
    "action": "Specific action for the rep",
    "timing": "When to do it — e.g. 'Call within 48 hours — trigger event is fresh'",
    "openingLine": "Word-for-word opening line for the call/message that references a specific signal or tech finding"
  }
}

Rules:
- intentScore: 1-10 (10 = buying in the next 2 weeks)
- intentScoreLabel: "Very High" (8-10) | "High" (6-7) | "Medium" (4-5) | "Low" (1-3)
- switchingReadiness: "Ready to Switch" | "Actively Evaluating" | "Considering" | "Satisfied with Current" | "No Current Tool"
- signal type must be one of: "Vendor Dissatisfaction" | "Active Evaluation" | "Price Shopping" | "Feature Gap" | "No Current Solution" | "Compliance Trigger" | "Growth Trigger" | "Competitor Threat"
- urgency must be one of: "Strike Now" | "Follow Up This Week" | "Add to Nurture" | "Monitor"
- Include 4-6 signals. Make them SPECIFIC to this company's data — not generic.
- If no tech was detected on website, infer from industry/employee count what they're likely using (most ${lead.industry} SMBs in India with ${lead.employees} employees use X)`;

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

    // Merge fingerprinted tech with Claude's additions (prefer real scan data)
    if (techFound.length > 0 && Array.isArray(parsed.detectedTechStack)) {
      const existingTools = new Set((parsed.detectedTechStack as DetectedTech[]).map(t => t.tool.toLowerCase()));
      for (const t of techFound) {
        if (!existingTools.has(t.tool.toLowerCase())) {
          parsed.detectedTechStack.unshift(t);
        }
      }
    }

    const generatedAt = new Date();

    try {
      await prisma.intentSignalCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    } catch {
      await prisma.$executeRawUnsafe(
        `CREATE TABLE IF NOT EXISTS intent_signal_cache (lead_id TEXT PRIMARY KEY, data JSONB NOT NULL, generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`
      );
      await prisma.intentSignalCache.upsert({
        where: { leadId: lead.id },
        update: { data: parsed, generatedAt },
        create: { leadId: lead.id, data: parsed, generatedAt },
      });
    }

    const result: IntentSignalData = {
      leadId: lead.id,
      generatedAt: generatedAt.toISOString(),
      ...(parsed as Omit<IntentSignalData, "leadId" | "generatedAt">),
    };

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("Intent signals error:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
