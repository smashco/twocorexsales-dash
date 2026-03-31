"use client";

import { useState } from "react";
import Image from "next/image";
import type { Lead, ServiceCategory } from "@/types";
import { fmtIntlPrice, getCountryCurrency, getIntlPricingRecommendation } from "@/lib/intl-pricing";
import { Copy, Check, FileDown, Eye, Mail, MessageCircle, Linkedin, MessageSquareReply, Loader2 } from "lucide-react";

// ── Intl market intel (no India refs) ─────────────────────────────────────────
const INTL_INTEL: Partial<Record<string, {
  marketContext: string; painStat: string; digitalBenefit: string; urgencyTrend: string;
}>> = {
  "Construction": {
    marketContext: "The global construction sector is digitising rapidly — firms without project management, compliance tracking, and real-time reporting are losing major contracts to tech-enabled competitors.",
    painStat: "Construction companies operating with spreadsheets and paper-based documentation face 15–20% cost overruns and significant client escalation risks.",
    digitalBenefit: "Construction firms that digitise project tracking, subcontractor management, and compliance reporting reduce delays by 25–35% and improve profit margins by 15%.",
    urgencyTrend: "Government and corporate clients now mandate digital project documentation, safety compliance records, and real-time progress dashboards as contract requirements.",
  },
  "Logistics": {
    marketContext: "The global logistics sector is consolidating — companies without real-time tracking, digital POD, and client portals are losing contracts to tech-enabled competitors.",
    painStat: "Logistics companies relying on manual coordination face 3–5% revenue loss from billing errors, missed deliveries, and client disputes.",
    digitalBenefit: "Logistics firms with integrated fleet, warehouse, and client management systems reduce SLA violations by 35% and improve client retention by 40%.",
    urgencyTrend: "Enterprise clients now mandate real-time shipment tracking, digital proof-of-delivery, and automated invoicing as baseline contract conditions.",
  },
  "Events & Marketing": {
    marketContext: "The events and experiential marketing industry is growing rapidly — agencies with professional CRM, project management, and client portals are winning larger corporate contracts.",
    painStat: "Events companies managing operations manually face 20–25% cost overruns and miss significant upsell opportunities with repeat clients.",
    digitalBenefit: "Events firms with integrated CRM and project management increase repeat bookings by 40%, reduce vendor disputes, and improve team coordination.",
    urgencyTrend: "Corporate clients demand detailed event reports, real-time budget tracking, and vendor invoicing summaries — agencies without digital systems lose tenders.",
  },
  "Food & Beverage": {
    marketContext: "The F&B sector faces intense margin pressure — restaurants and catering companies with integrated ordering, inventory, and CRM are protecting margins better.",
    painStat: "F&B businesses without integrated systems face 15–20% higher food costs and lose 25–30% of repeat customers due to poor retention tools.",
    digitalBenefit: "F&B companies with order management, inventory control, and loyalty platforms improve margins by 15–20% and significantly increase customer frequency.",
    urgencyTrend: "Food safety compliance, customer expectations, and competitive pressure make digital operations a business necessity across all F&B segments.",
  },
  "Real Estate": {
    marketContext: "The global real estate market is increasingly competitive — agencies with digital CRM, property portals, and automated follow-ups are closing deals faster.",
    painStat: "Real estate companies without CRM lose 30–35% of warm leads to competitors with faster, more systematic follow-up processes.",
    digitalBenefit: "Real estate firms with integrated CRM and client portals improve lead conversion by 30–40% and dramatically reduce client escalations.",
    urgencyTrend: "Buyers and tenants expect digital property tours, instant communication, and transparent transaction tracking as standard service.",
  },
  "Facility Management": {
    marketContext: "FM companies are scaling rapidly but manual operations create compliance gaps — digital workforce and service management is now a competitive requirement.",
    painStat: "Facility management companies using manual rostering and paper-based compliance lose 15–20% efficiency and face audit risks.",
    digitalBenefit: "FM firms with digital workforce management, SLA tracking, and compliance reporting improve client retention by 30% and reduce operational costs by 20%.",
    urgencyTrend: "Corporate and government FM contracts now require digital compliance records, staff attendance tracking, and real-time service reporting.",
  },
  "Interior Design": {
    marketContext: "The interior design market is growing — premium clients expect digital project tracking, material approval workflows, and professional billing systems.",
    painStat: "Design firms managing projects via email and WhatsApp face 20–25% budget overruns and frequent client escalations from poor visibility.",
    digitalBenefit: "Interior firms with project management and client portals reduce revision cycles by 35% and win more referrals through professional execution.",
    urgencyTrend: "Corporate clients require digital project dashboards, milestone photo documentation, and formal progress reports from their design partners.",
  },
  "HR & Recruitment": {
    marketContext: "The recruitment market is growing rapidly — firms with ATS, CRM, and analytics are winning larger mandates over those using spreadsheets.",
    painStat: "Recruitment firms on email and spreadsheets face 25–30% higher time-to-fill and lose placements to faster-responding competitors.",
    digitalBenefit: "HR firms with integrated ATS and CRM improve time-to-fill by 35%, increase placement rates, and build stronger client relationships.",
    urgencyTrend: "Enterprise clients demand digital ATS portals, compliance documentation, and real-time placement dashboards from their recruitment partners.",
  },
  "Education": {
    marketContext: "Education institutions with strong digital systems for enrollment, scheduling, and student tracking are outgrowing those without.",
    painStat: "Institutions managing enrollment manually lose 20–25% of leads due to slow follow-ups and inconsistent communication.",
    digitalBenefit: "Education companies that digitize enrollment, attendance, and fee management improve conversion rates by 30% and reduce defaults by 40%.",
    urgencyTrend: "Students compare institutions on digital experience — online booking, progress portals, and instant communication are now expected.",
  },
  "Hospitality": {
    marketContext: "Hotels and hospitality companies with professional booking portals and client management are winning long-term corporate contracts.",
    painStat: "Hospitality businesses managing clients manually miss 20–30% of repeat booking opportunities due to inconsistent follow-up.",
    digitalBenefit: "Hotels with CRM and client portals increase corporate retention by 35%, reduce booking errors, and command premium pricing.",
    urgencyTrend: "Corporate travel policies mandate digital booking portals, formal invoicing, and reporting — properties without these systems lose contracts.",
  },
  "Manufacturing": {
    marketContext: "The global manufacturing sector demands digital production tracking, quality management, and supply chain visibility as standard.",
    painStat: "Manufacturers with manual processes lose 15–20% operational efficiency and face avoidable compliance and quality risks.",
    digitalBenefit: "Manufacturers with ERP reduce production delays by 30–40%, cut material wastage by 20–25%, and close billing 60% faster.",
    urgencyTrend: "OEM clients and export buyers now expect digital documentation, real-time order tracking, and compliant invoicing as baseline requirements.",
  },
  "Travel & Tourism": {
    marketContext: "Travel companies that digitise booking management, CRM, and itinerary automation are growing 2–3x faster than manual operators.",
    painStat: "Travel companies managing bookings manually lose 25–30% of leads to slow response times and poor follow-up systems.",
    digitalBenefit: "Travel firms with integrated booking and CRM improve lead conversion by 35%, reduce errors, and build strong repeat business.",
    urgencyTrend: "Travellers expect instant digital itineraries, real-time updates, and transparent pricing — companies without these lose to OTAs.",
  },
};

const DEFAULT_INTEL = {
  marketContext: "Businesses with integrated digital systems are outgrowing manual operators by 2–3x annually across every sector.",
  painStat: "Companies without proper CRM and operations management lose 20–30% of revenue to manual errors and coordination gaps.",
  digitalBenefit: "Businesses that implement custom digital systems see 30–40% efficiency gains within the first quarter.",
  urgencyTrend: "Rising customer expectations and competitive pressure make digital operations a necessity — not a luxury.",
};

const CAT_TIMELINE: Record<ServiceCategory, string> = {
  "Basic CRM": "4–6 weeks", "Custom App": "6–10 weeks", "CRM + Portal": "8–12 weeks",
  "ERP Standard": "12–18 weeks", "Enterprise ERP": "16–24 weeks",
};

function getPainImpact(pain: string): string {
  const p = pain.toLowerCase();
  if (p.includes("manual") || p.includes("excel") || p.includes("paper")) return "directly adding to overhead and human error risk";
  if (p.includes("track") || p.includes("visibility")) return "causing blind spots in operations and delayed decisions";
  if (p.includes("follow") || p.includes("lead") || p.includes("pipeline")) return "resulting in lost revenue from prospects going cold";
  if (p.includes("invoice") || p.includes("billing") || p.includes("payment")) return "creating cash flow delays and reconciliation disputes";
  if (p.includes("whatsapp") || p.includes("client") || p.includes("email")) return "creating inconsistent client experiences that damage retention";
  if (p.includes("inventory") || p.includes("stock")) return "leading to stockouts, overstocking, and revenue leakage";
  return "reducing operational efficiency and team productivity";
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all"
      style={copied ? { background: "#D1FAE5", color: "#065F46", borderColor: "#6EE7B7" } : { background: "#F9FAFB", color: "#374151", borderColor: "#E5E7EB" }}>
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

// ── PDF Generator ─────────────────────────────────────────────────────────────
function buildIntlPrintHTML(lead: Lead): string {
  const pricing = getIntlPricingRecommendation(lead);
  const country = lead.country ?? "USA";
  const c = pricing.currency;
  const fmt = (v: number) => `${c.symbol}${v.toLocaleString(c.locale)}`;
  const intel = INTL_INTEL[lead.industry] ?? DEFAULT_INTEL;
  const timeline = CAT_TIMELINE[pricing.serviceCategory];
  const today = new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  const catColor: Record<ServiceCategory, string> = {
    "Basic CRM": "#374151", "Custom App": "#7C3AED", "CRM + Portal": "#1D4ED8",
    "ERP Standard": "#065F46", "Enterprise ERP": "#B45309"
  };
  const accent = catColor[pricing.serviceCategory];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Proposal — ${lead.companyName}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a2e; font-size: 11pt; line-height: 1.6; }
  @page { margin: 18mm 20mm; size: A4; }
  .page-break { page-break-after: always; }
  .cover { min-height: 250mm; display: flex; flex-direction: column; justify-content: space-between; padding: 30mm 0 20mm; }
  .cover-logo { font-size: 28pt; font-weight: 900; letter-spacing: -1px; color: #1a1a2e; }
  .cover-logo span { color: ${accent}; }
  .cover-tagline { font-size: 9pt; color: #6B7280; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
  .cover-divider { height: 3px; background: ${accent}; width: 60px; margin: 24px 0; }
  .cover-title { font-size: 24pt; font-weight: 800; color: #1a1a2e; line-height: 1.2; }
  .cover-subtitle { font-size: 13pt; color: #6B7280; margin-top: 10px; }
  .cover-meta { margin-top: 40px; padding: 20px; background: #F9FAFB; border-left: 4px solid ${accent}; border-radius: 0 8px 8px 0; }
  .cover-meta p { font-size: 10pt; color: #374151; margin-bottom: 6px; }
  .cover-meta p strong { color: #1a1a2e; }
  .cover-footer { font-size: 8pt; color: #9CA3AF; border-top: 1px solid #E5E7EB; padding-top: 12px; }
  .section { margin-bottom: 22px; }
  .section-label { font-size: 8pt; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: ${accent}; margin-bottom: 8px; }
  .section-title { font-size: 16pt; font-weight: 800; color: #1a1a2e; margin-bottom: 12px; }
  .section-body { font-size: 10.5pt; color: #374151; line-height: 1.75; }
  .highlight { background: #F9FAFB; border-left: 3px solid ${accent}; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 14px 0; font-size: 10pt; color: #374151; line-height: 1.7; }
  .highlight strong { color: #1a1a2e; }
  .pain-grid { display: flex; flex-direction: column; gap: 10px; margin: 14px 0; }
  .pain-card { border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px 16px; }
  .pain-num { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; font-size: 9pt; font-weight: 700; color: white; background: ${accent}; margin-right: 8px; }
  .pain-text { font-size: 10.5pt; font-weight: 600; color: #1a1a2e; display: inline; }
  .pain-impact { font-size: 9.5pt; color: #6B7280; margin-top: 5px; padding-left: 30px; font-style: italic; }
  .price-table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 10pt; }
  .price-table th { background: ${accent}; color: white; padding: 10px 14px; text-align: left; font-size: 9pt; font-weight: 700; }
  .price-table td { padding: 10px 14px; border-bottom: 1px solid #F3F4F6; }
  .price-table .price-val { font-weight: 700; font-size: 12pt; color: ${accent}; }
  .price-table .price-sub { font-size: 8.5pt; color: #9CA3AF; }
  .process { display: flex; flex-direction: column; gap: 8px; margin: 14px 0; }
  .process-step { display: flex; gap: 12px; align-items: flex-start; }
  .process-num { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; background: ${accent}; color: white; font-size: 9pt; font-weight: 700; display: flex; align-items: center; justify-content: center; }
  .process-content h4 { font-size: 10pt; font-weight: 700; color: #1a1a2e; }
  .process-content p { font-size: 9.5pt; color: #6B7280; }
  .guarantee-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0; }
  .guarantee-item { display: flex; gap: 8px; font-size: 9.5pt; color: #374151; }
  .guarantee-check { color: #10B981; font-weight: 700; flex-shrink: 0; }
  .cta-box { background: #1a1a2e; color: white; padding: 24px; border-radius: 12px; margin-top: 16px; text-align: center; }
  .cta-box h3 { font-size: 14pt; font-weight: 800; margin-bottom: 8px; }
  .cta-box p { font-size: 10pt; color: rgba(255,255,255,0.7); margin-bottom: 16px; }
  .cta-contact { font-size: 10pt; color: rgba(255,255,255,0.9); }
  .doc-footer { position: fixed; bottom: 0; left: 0; right: 0; border-top: 1px solid #E5E7EB; padding: 6px 20mm; display: flex; justify-content: space-between; font-size: 8pt; color: #9CA3AF; }
</style>
</head>
<body>

<!-- PAGE 1: COVER -->
<div class="cover">
  <div>
    <div class="cover-logo">Two<span>CoreX</span></div>
    <div class="cover-tagline">Custom Software for Global Businesses</div>
    <div class="cover-divider"></div>
    <div class="cover-title">Business Analysis &amp;<br>Custom Solution Proposal</div>
    <div class="cover-subtitle">Prepared exclusively for ${lead.companyName} · ${country}</div>
  </div>
  <div class="cover-meta">
    <p><strong>Prepared for:</strong> ${lead.contact}, ${lead.companyName}</p>
    <p><strong>Market:</strong> ${lead.industry} · ${lead.city}, ${country}</p>
    <p><strong>Company Size:</strong> ${lead.employees} employees</p>
    <p><strong>Proposed Solution:</strong> ${pricing.serviceCategory}</p>
    <p><strong>Investment:</strong> ${fmt(pricing.localProjectPrice)} (${c.code})</p>
    <p><strong>Date:</strong> ${today}</p>
    <p><strong>Prepared by:</strong> TwoCoreX · smith@twocorex.com</p>
  </div>
  <div class="cover-footer">
    Confidential business analysis prepared exclusively for ${lead.companyName}. TwoCoreX · Custom ERP, CRM &amp; Mobile Systems for Growing Businesses Worldwide.
  </div>
</div>
<div class="page-break"></div>

<!-- PAGE 2: RESEARCH + CHALLENGES -->
<div class="section">
  <div class="section-label">About Your Business</div>
  <div class="section-title">What We Observed About ${lead.companyName}</div>
  <div class="section-body">
    ${lead.companyName} is a ${lead.employees}-employee ${lead.industry} company based in ${lead.city}, ${country}.
  </div>
  <div class="highlight"><strong>Market Context:</strong> ${intel.marketContext}</div>
  <div class="section-body">${intel.painStat}</div>
</div>

<div class="section">
  <div class="section-label">Operational Analysis</div>
  <div class="section-title">The 3 Gaps We Identified</div>
  <div class="pain-grid">
    ${[lead.painPoint1, lead.painPoint2, lead.painPoint3].map((p, i) => `
    <div class="pain-card">
      <div><span class="pain-num">${i + 1}</span><span class="pain-text">${p.charAt(0).toUpperCase() + p.slice(1)}</span></div>
      <div class="pain-impact">→ This is ${getPainImpact(p)}</div>
    </div>`).join("")}
  </div>
</div>

<div class="section">
  <div class="section-label">Why Now</div>
  <div class="section-title">The Right Time for ${lead.companyName} to Act</div>
  <div class="highlight"><strong>Business Signal:</strong> ${lead.buyingTrigger}</div>
  <div class="section-body">${intel.urgencyTrend}</div>
</div>
<div class="page-break"></div>

<!-- PAGE 3: SOLUTION -->
<div class="section">
  <div class="section-label">Proposed Solution</div>
  <div class="section-title">Custom ${pricing.serviceCategory} — Built for ${lead.companyName}</div>
  <div class="section-body">
    We design and build a custom ${pricing.serviceCategory} from the ground up — not off-the-shelf software, but a system architected specifically for ${lead.companyName}'s workflow and industry requirements.
  </div>
  <div class="highlight"><strong>Service Fit:</strong> ${lead.serviceFit}</div>
</div>

<div class="section">
  <div class="section-label">Expected Business Impact</div>
  <div class="section-title">What ${lead.companyName} Gains</div>
  <div class="highlight">${intel.digitalBenefit}</div>
  <div class="guarantee-grid">
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Eliminate manual tracking errors</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Real-time visibility across operations</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Faster client communication</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Compliant invoicing and reports</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Team accountability and task tracking</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Data-driven management decisions</div>
  </div>
</div>
<div class="page-break"></div>

<!-- PAGE 4: INVESTMENT -->
<div class="section">
  <div class="section-label">Investment (${c.code})</div>
  <div class="section-title">Fixed-Price Proposal for ${lead.companyName}</div>
  <table class="price-table">
    <thead><tr><th>Description</th><th>Amount (${c.code})</th><th>Notes</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>Custom System Build</strong><br><span class="price-sub">${pricing.serviceCategory} — one-time project fee</span></td>
        <td><span class="price-val">${fmt(pricing.localProjectPrice)}</span></td>
        <td><span class="price-sub">Fixed price, no hidden costs</span></td>
      </tr>
      <tr>
        <td><strong>Monthly Support</strong><br><span class="price-sub">Hosting + bug fixes + updates + priority support</span></td>
        <td><span class="price-val">${fmt(pricing.localMonthlyPrice)}/mo</span></td>
        <td><span class="price-sub">Cancel anytime</span></td>
      </tr>
      <tr>
        <td><strong>Annual Support Plan</strong><br><span class="price-sub">All upgrades + priority support + 2 months free</span></td>
        <td><span class="price-val">${fmt(pricing.localAnnualPrice)}/yr</span></td>
        <td><span class="price-sub">Save ${fmt(pricing.localMonthlyPrice * 2)} vs monthly</span></td>
      </tr>
    </tbody>
  </table>
  <div class="highlight">
    <strong>What's Included:</strong><br><br>
    Source code ownership (100% yours) · 3 months free warranty · Staff training · NDA + fixed-price contract · SSL certificate · Cloud hosting setup · Weekly progress demos
  </div>
</div>

<div class="section">
  <div class="section-label">Timeline</div>
  <div class="section-title">Delivery in ${timeline}</div>
  <div class="process">
    <div class="process-step"><div class="process-num">1</div><div class="process-content"><h4>Discovery &amp; Design</h4><p>Requirements workshop, UI/UX wireframes, database architecture — with your sign-off before coding begins</p></div></div>
    <div class="process-step"><div class="process-num">2</div><div class="process-content"><h4>Development (Agile Sprints)</h4><p>Weekly demo updates — you see progress every week</p></div></div>
    <div class="process-step"><div class="process-num">3</div><div class="process-content"><h4>Testing &amp; QA</h4><p>Full testing on real devices and scenarios — zero known bugs at launch</p></div></div>
    <div class="process-step"><div class="process-num">4</div><div class="process-content"><h4>Launch, Training &amp; Handover</h4><p>Deploy, onboard your team, train staff, and hand over source code</p></div></div>
  </div>
</div>
<div class="page-break"></div>

<!-- PAGE 5: ABOUT + CTA -->
<div class="section">
  <div class="section-label">About TwoCoreX</div>
  <div class="section-title">Why Global Businesses Work With Us</div>
  <div class="section-body">
    TwoCoreX is a custom software development company with dedicated teams in India building world-class ERP, CRM, and mobile systems for businesses worldwide. We deliver top-tier quality at competitive rates — not resold SaaS, not modified templates.
  </div>
  <div class="guarantee-grid" style="margin-top: 14px;">
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Fixed-price contracts — no scope creep</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Source code delivered — 100% ownership</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Built for your local compliance needs</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> NDA signed before project begins</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Mobile-responsive + iOS/Android apps</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> API integrations with your existing tools</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Cloud hosted — 99.9% uptime SLA</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> 3 months free warranty post-launch</div>
  </div>
  <div class="section-label" style="margin-top: 20px;">Technology Stack</div>
  <div class="highlight">
    <strong>Frontend:</strong> React.js / Next.js · <strong>Mobile:</strong> React Native (iOS + Android) ·
    <strong>Backend:</strong> Node.js + Express · <strong>Database:</strong> PostgreSQL / MongoDB ·
    <strong>Cloud:</strong> AWS / GCP · <strong>Payments:</strong> Stripe / PayPal ·
    <strong>Messaging:</strong> WhatsApp / Twilio · <strong>Auth:</strong> JWT + OAuth
  </div>
</div>

<div class="cta-box">
  <h3>Ready to See What We'd Build for ${lead.companyName}?</h3>
  <p>We'd welcome a 20-minute call to walk you through a live demo of a similar ${pricing.serviceCategory} we've deployed for a ${lead.industry} company — and show you exactly what we'd build for you.</p>
  <div class="cta-contact">✉ smith@twocorex.com · 🌐 www.twocorex.com</div>
</div>

<div class="doc-footer">
  <span>Confidential — Prepared for ${lead.companyName}</span>
  <span>TwoCoreX · ${today}</span>
</div>

</body>
</html>`;
}

// ── Main Component ────────────────────────────────────────────────────────────
export function IntlFirstOutreachPanel({ lead }: { lead: Lead }) {
  const [activeTab, setActiveTab] = useState<"preview" | "email" | "reply">("preview");
  const [replyText, setReplyText] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyError, setReplyError] = useState("");

  const pricing = getIntlPricingRecommendation(lead);
  const country = lead.country ?? "USA";
  const c = pricing.currency;
  const fmt = (v: number) => `${c.symbol}${v.toLocaleString(c.locale)}`;
  const intel = INTL_INTEL[lead.industry] ?? DEFAULT_INTEL;
  const timeline = CAT_TIMELINE[pricing.serviceCategory];

  // Email text builder
  const emailText = `Subject: ${lead.companyName} — Custom ${lead.industry} System + Business Analysis

Dear ${lead.contact},

My name is Smith from TwoCoreX — we build custom ERP, CRM, and mobile platforms for growing businesses worldwide, with dedicated development teams in India offering top-tier quality at competitive rates.

I reviewed ${lead.companyName}'s operations and your position in the ${lead.industry} market in ${lead.city}, ${country}. We've prepared this analysis because we believe there's a significant opportunity to help your team.

WHAT WE OBSERVED
${lead.companyName} is a ${lead.employees}-employee ${lead.industry} business. ${intel.marketContext}
${intel.painStat}

3 OPERATIONAL GAPS WE IDENTIFIED
1. ${lead.painPoint1} → ${getPainImpact(lead.painPoint1)}.
2. ${lead.painPoint2} → ${getPainImpact(lead.painPoint2)}.
3. ${lead.painPoint3} → ${getPainImpact(lead.painPoint3)}.

WHY NOW: ${lead.buyingTrigger}

PROPOSED SOLUTION: Custom ${pricing.serviceCategory}
Delivery: ${timeline} | ${intel.digitalBenefit}

INVESTMENT (${c.code})
Project build:   ${fmt(pricing.localProjectPrice)} (fixed price)
Monthly support: ${fmt(pricing.localMonthlyPrice)}/month
Annual plan:     ${fmt(pricing.localAnnualPrice)}/year (2 months free)

Source code ownership · 3 months free warranty · NDA signed before start

I'd welcome a 20-minute call to walk you through what we'd build. No commitment required.

Best regards,
Smith
TwoCoreX
smith@twocorex.com | www.twocorex.com`;

  const subject = encodeURIComponent(`${lead.companyName} — Custom ${lead.industry} System Proposal`);

  function downloadPDF() {
    const html = buildIntlPrintHTML(lead);
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 600);
  }

  function sendGmail() {
    navigator.clipboard.writeText(emailText);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}`, "_blank");
  }

  async function generateReply() {
    setReplyLoading(true);
    setReplyError("");
    try {
      const res = await fetch("/api/gen-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, pricing: { ...pricing, currency: c.code, symbol: c.symbol }, replyText }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setGeneratedReply(json.reply);
    } catch (e) {
      setReplyError(String(e));
    } finally {
      setReplyLoading(false);
    }
  }

  const catColors: Record<ServiceCategory, { color: string; bg: string; border: string }> = {
    "Basic CRM": { color: "#374151", bg: "#F9FAFB", border: "#D1D5DB" },
    "Custom App": { color: "#7C3AED", bg: "#FAF5FF", border: "#C4B5FD" },
    "CRM + Portal": { color: "#1D4ED8", bg: "#EFF6FF", border: "#93C5FD" },
    "ERP Standard": { color: "#065F46", bg: "#ECFDF5", border: "#6EE7B7" },
    "Enterprise ERP": { color: "#B45309", bg: "#FFFBEB", border: "#FCD34D" },
  };
  const theme = catColors[pricing.serviceCategory];

  return (
    <div className="space-y-4">
      {/* Hero header */}
      <div className="rounded-xl p-5" style={{ background: "var(--navy)" }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" alt="TwoCoreX" width={24} height={24} className="object-contain" />
          </div>
          <span className="text-sm font-bold text-white">First Outreach — {lead.companyName}</span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full text-white/60 bg-white/10">{country} · {c.code}</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button onClick={downloadPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold" style={{ background: "#FCD34D", color: "#1A1A2E" }}>
            <FileDown className="w-3.5 h-3.5" /> Download PDF
          </button>
          <button onClick={sendGmail}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all">
            <Mail className="w-3.5 h-3.5" /> Gmail (body copied)
          </button>
          <a href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${lead.contact} ${lead.companyName}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ background: "#0077B5" }}>
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
          </a>
        </div>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
        {([
          ["preview", <><Eye className="w-3.5 h-3.5" /> Proposal Preview</>],
          ["email", <><Mail className="w-3.5 h-3.5" /> Email Text</>],
          ["reply", <><MessageSquareReply className="w-3.5 h-3.5" /> Handle Reply</>],
        ] as const).map(([t, label]) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg font-semibold transition-all"
            style={activeTab === t ? { background: "#fff", color: "#1a1a2e", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" } : { color: "#6B7280" }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── PROPOSAL PREVIEW ─── */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          {/* Cover */}
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <div className="p-6" style={{ background: "var(--navy)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                  <Image src="/logo.png" alt="TwoCoreX" width={32} height={32} className="object-contain" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">Two<span style={{ color: theme.border }}>CoreX</span></div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Custom Software for Global SMBs</div>
                </div>
              </div>
              <div className="text-lg font-bold text-white leading-snug mb-2">Business Analysis &amp;<br />Custom Solution Proposal</div>
              <div className="text-sm text-white/60">Prepared exclusively for {lead.companyName} · {country}</div>
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                {[
                  ["Prepared for", `${lead.contact}, ${lead.companyName}`],
                  ["Market", `${lead.industry} · ${lead.city}, ${country}`],
                  ["Company Size", `${lead.employees} employees`],
                  ["Investment", `${fmt(pricing.localProjectPrice)} (${c.code})`],
                ].map(([k, v]) => (
                  <div key={k}><span className="text-white/40">{k}: </span><span className="text-white font-semibold">{v}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Research */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.color }}>Business Research</div>
            <h3 className="text-base font-bold text-gray-900">What We Observed About {lead.companyName}</h3>
            <p className="text-sm text-gray-600">{lead.companyName} is a {lead.employees}-employee {lead.industry} business based in {lead.city}, {country}.</p>
            <div className="p-3 rounded-lg text-sm text-gray-700" style={{ background: theme.bg, borderLeft: `3px solid ${theme.color}` }}>
              <strong>Market Context:</strong> {intel.marketContext}
            </div>
            <p className="text-sm text-gray-600">{intel.painStat}</p>
          </div>

          {/* Gaps */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.color }}>Operational Analysis</div>
            <h3 className="text-base font-bold text-gray-900">3 Gaps We Identified</h3>
            {[lead.painPoint1, lead.painPoint2, lead.painPoint3].map((pain, i) => (
              <div key={i} className="rounded-lg border border-gray-100 p-3 flex items-start gap-2">
                <div className="w-5 h-5 rounded-full shrink-0 text-xs font-bold text-white flex items-center justify-center mt-0.5" style={{ background: theme.color }}>{i + 1}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{pain.charAt(0).toUpperCase() + pain.slice(1)}</p>
                  <p className="text-xs text-gray-500 mt-0.5 italic">→ {getPainImpact(pain)}</p>
                </div>
              </div>
            ))}
            <div className="p-3 rounded-lg text-sm text-gray-700" style={{ background: theme.bg, borderLeft: `3px solid ${theme.color}` }}>
              <strong>Why Act Now:</strong> {lead.buyingTrigger}
            </div>
          </div>

          {/* Proposed Solution */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.color }}>Proposed Solution</div>
            <h3 className="text-base font-bold text-gray-900">Custom {pricing.serviceCategory} for {lead.companyName}</h3>
            <p className="text-sm text-gray-600">Built from scratch for your workflow. Delivery in <strong>{timeline}</strong>.</p>
            <div className="p-3 rounded-lg text-sm text-gray-700 italic" style={{ background: theme.bg, borderLeft: `3px solid ${theme.color}` }}>
              {intel.digitalBenefit}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 font-bold text-sm text-white flex items-center gap-2" style={{ background: theme.color }}>
              Investment Summary · {c.code}
            </div>
            <div className="p-5 space-y-2">
              {[
                ["One-time Build", fmt(pricing.localProjectPrice), "Fixed price · no hidden costs"],
                ["Monthly Support", `${fmt(pricing.localMonthlyPrice)}/mo`, "Hosting + updates + bugs"],
                ["Annual Plan", `${fmt(pricing.localAnnualPrice)}/yr`, "2 months free"],
              ].map(([label, price, note]) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm font-bold text-gray-800">{label}</div>
                    <div className="text-xs text-gray-400">{note}</div>
                  </div>
                  <div className="text-base font-extrabold" style={{ color: theme.color }}>{price}</div>
                </div>
              ))}
              <div className="text-xs text-gray-400 pt-1">Source code ownership · 3 months free warranty · NDA before start · Staff training included</div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-xl p-5 text-center" style={{ background: "var(--navy)" }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Image src="/logo.png" alt="TwoCoreX" width={24} height={24} className="object-contain" />
              <p className="text-white font-bold">Send this proposal to {lead.companyName}</p>
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={downloadPDF}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold" style={{ background: "#FCD34D", color: "#1A1A2E" }}>
                <FileDown className="w-4 h-4" /> Download PDF
              </button>
              <button onClick={sendGmail}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition-all">
                <Mail className="w-4 h-4" /> Gmail (body copied)
              </button>
              <a href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${lead.contact} ${lead.companyName}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: "#0077B5" }}>
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── EMAIL TEXT ─── */}
      {activeTab === "email" && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-700">Full Email — Ready to Send</h3>
            <CopyButton text={emailText} label="Copy Full Email" />
          </div>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-100 max-h-[600px] overflow-y-auto">
            {emailText}
          </pre>
        </div>
      )}

      {/* ── HANDLE REPLY ─── */}
      {activeTab === "reply" && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          <h3 className="text-sm font-bold text-gray-700">Handle Their Reply</h3>
          <p className="text-xs text-gray-500">Paste the reply you received and we&apos;ll generate a smart follow-up.</p>
          {!generatedReply ? (
            <>
              <textarea
                rows={5}
                placeholder="Paste their reply here..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-200 resize-none"
              />
              {replyError && <p className="text-xs text-red-500">{replyError}</p>}
              <button onClick={generateReply} disabled={!replyText.trim() || replyLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 transition-all">
                {replyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquareReply className="w-4 h-4" />}
                {replyLoading ? "Generating..." : "Generate Reply"}
              </button>
            </>
          ) : (
            <>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{generatedReply}</pre>
              </div>
              <div className="flex gap-2 flex-wrap">
                <CopyButton text={generatedReply} label="Copy Reply" />
                <button onClick={() => { setGeneratedReply(""); setReplyText(""); }}
                  className="text-xs text-gray-500 hover:text-sky-600 px-3 py-1.5">
                  ← Generate another reply
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
