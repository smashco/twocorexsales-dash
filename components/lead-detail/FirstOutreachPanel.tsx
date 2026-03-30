"use client";

import { useState } from "react";
import type { Lead, PricingRecommendation, ServiceCategory, Industry } from "@/types";
import contactsRaw from "@/data/lead_contacts.json";
import { Copy, Check, FileDown, Eye, Mail, MessageCircle, Linkedin, MessageSquareReply, Loader2 } from "lucide-react";

// ─── Scraped contacts ──────────────────────────────────────────────────────────
const CONTACTS: Record<string, { phones: string[]; emails: string[] }> = Object.fromEntries(
  (contactsRaw as { id: string; phones: string[]; emails: string[] }[]).map(c => [c.id, c])
);

// ─── Industry market intelligence ──────────────────────────────────────────────
const INDUSTRY_INTEL: Partial<Record<string, {
  marketContext: string;
  painStat: string;
  digitalBenefit: string;
  urgencyTrend: string;
}>> = {
  "Manufacturing": {
    marketContext: "India's manufacturing sector is digitizing rapidly under the PLI scheme. 68% of SMB manufacturers cite disconnected systems as their #1 growth blocker.",
    painStat: "Companies operating with Excel-based production and paper-based quality records lose 15–20% operational efficiency and face avoidable compliance risks.",
    digitalBenefit: "Manufacturers who implement integrated ERP systems reduce production delays by 30–40%, cut material wastage by 20–25%, and close billing cycles 60% faster.",
    urgencyTrend: "OEM clients and export buyers now expect digital documentation, real-time order tracking, and GST-compliant invoicing as baseline requirements."
  },
  "Logistics": {
    marketContext: "The Indian logistics sector is consolidating fast — companies without real-time visibility, digital POD, and client portals are losing contracts to tech-enabled competitors.",
    painStat: "Manual coordination and paper-based operations at logistics companies cost an estimated 3–5% of annual revenue in billing errors and disputes alone.",
    digitalBenefit: "Logistics companies with integrated fleet, warehouse, and client tracking systems reduce SLA violations by 35% and improve client retention by 40%.",
    urgencyTrend: "Enterprise clients (FMCG, e-commerce, pharma) now mandate real-time shipment tracking and digital proof-of-delivery as contract conditions."
  },
  "Financial Services": {
    marketContext: "India's financial advisory and insurance sector is highly competitive — clients now expect digital portfolio access, automated renewal alerts, and personalised service.",
    painStat: "Advisors managing client portfolios without a CRM lose an estimated 25–30% of renewal revenue annually due to missed follow-ups and lapses.",
    digitalBenefit: "Financial advisors using CRM platforms increase renewal rates by 30–40%, reduce client attrition by 35%, and close 2× more referrals through systematic follow-up.",
    urgencyTrend: "SEBI and IRDAI are pushing digital compliance reporting — advisory firms without proper record-keeping systems face increasing audit risk."
  },
  "Healthcare": {
    marketContext: "India's diagnostics and healthcare sector is growing at 12% CAGR — patients increasingly expect digital appointment booking, online reports, and WhatsApp communication.",
    painStat: "Clinics operating on paper OPD and manual billing miss 20–30% of follow-up visits and lose significant revenue to scheduling gaps.",
    digitalBenefit: "Healthcare facilities that digitize patient management increase OPD throughput by 25–35%, reduce billing errors by 80%, and significantly improve patient retention.",
    urgencyTrend: "The National Health Stack (ABDM) mandates digital patient records — clinics without electronic systems will face compliance requirements by 2025–26."
  },
  "Education": {
    marketContext: "India's EdTech and training market is maturing post-COVID — companies with strong digital systems for enrollment, attendance, and student tracking are outgrowing those without.",
    painStat: "Training institutes managing enrollment and fee collection manually lose 20–25% of leads due to slow follow-ups and inconsistent communication.",
    digitalBenefit: "Education companies that digitize enrollment, attendance, and fee management improve admission conversion rates by 30% and reduce fee default rates by 40%.",
    urgencyTrend: "Students increasingly compare institutes on digital experience quality — WhatsApp updates, online fee payments, and parent portals are becoming table stakes."
  },
  "E-Commerce": {
    marketContext: "D2C brands in India are scaling rapidly but facing intense pressure on margins, returns, and customer retention as the market matures.",
    painStat: "D2C brands without integrated order management and customer analytics lose 30–35% of repeat purchase revenue due to poor retention systems.",
    digitalBenefit: "E-commerce brands with unified OMS, CRM, and analytics platforms increase repeat purchase rates by 40%, reduce return rates by 20%, and improve margin visibility.",
    urgencyTrend: "Quick commerce and same-day delivery expectations are now standard — brands without integrated fulfilment tracking are losing customers to more agile competitors."
  },
  "Construction": {
    marketContext: "India's construction and interior industry is seeing a boom — but 70% of mid-size firms still manage projects via WhatsApp, Excel, and manual site reports.",
    painStat: "Construction companies without proper project management and client communication tools face 15–20% cost overruns and significant client escalation risks.",
    digitalBenefit: "Construction firms that digitize project tracking, client updates, and procurement reduce project delays by 25%, improve margin visibility, and win more repeat business.",
    urgencyTrend: "Large developers and corporates now require digital project dashboards, real-time progress photos, and formal billing workflows from their contractors."
  },
  "Hospitality": {
    marketContext: "India's hospitality sector has bounced back strongly post-COVID — hotels and event companies that provide professional booking portals and client management are winning long-term corporate contracts.",
    painStat: "Hospitality businesses managing corporate clients on WhatsApp and Excel miss 20–30% of repeat booking opportunities due to inconsistent follow-up.",
    digitalBenefit: "Hotels and event companies with CRM and client portals increase corporate client retention by 35%, reduce booking errors, and command premium pricing.",
    urgencyTrend: "Corporate travel policies now mandate digital booking portals, GST invoicing, and formal reporting — properties without these systems are excluded from empanelment."
  },
  "Travel & Tourism": {
    marketContext: "India's travel industry is at a strong recovery phase — companies that digitize booking management, client CRM, and itinerary automation are growing 2–3× faster.",
    painStat: "Travel companies managing bookings manually through WhatsApp and Excel lose 25–30% of leads due to slow response times and poor follow-up systems.",
    digitalBenefit: "Travel companies with integrated booking management and client CRM improve lead conversion by 35%, reduce operational errors, and build strong repeat business.",
    urgencyTrend: "Post-COVID travellers expect instant digital itineraries, real-time WhatsApp updates, and transparent pricing — companies without these tools are losing to OTAs."
  },
  "Events / Marketing": {
    marketContext: "India's events and experiential marketing sector is growing rapidly — but most mid-size agencies operate with fragmented tools, causing coordination gaps and billing disputes.",
    painStat: "Events agencies without proper project management and vendor coordination tools face 20–25% cost overruns and miss upsell opportunities with repeat clients.",
    digitalBenefit: "Events companies that digitize CRM, project management, and client portals increase repeat bookings by 40%, reduce vendor payment disputes, and improve team efficiency.",
    urgencyTrend: "Corporate clients are demanding detailed event reports, vendor invoicing summaries, and real-time budget tracking — agencies without digital systems are losing tenders."
  },
  "Pharmaceutical": {
    marketContext: "India's pharma and specialty chemical sector faces increasing regulatory scrutiny — companies without digital batch tracking, compliance docs, and distribution management face audit risk.",
    painStat: "Pharma companies managing distribution and compliance manually face 20–25% inefficiency in field force productivity and recurring reconciliation issues.",
    digitalBenefit: "Pharma companies with integrated distribution, MR tracking, and compliance systems improve field force productivity by 30% and significantly reduce audit compliance risk.",
    urgencyTrend: "CDSCO and GST authorities are increasing scrutiny on batch documentation and distribution records — digital systems are no longer optional for mid-size pharma companies."
  },
  "Consulting": {
    marketContext: "India's consulting and advisory market is professionalisng rapidly — clients now expect digital project dashboards, milestone tracking, and compliance calendars as standard.",
    painStat: "Consulting firms without project management and CRM tools lose 20–30% of client revenue to competitor firms that offer more transparent, digital-first engagement.",
    digitalBenefit: "Consulting firms with integrated project management and client portals improve client retention by 40%, increase utilisation rates, and successfully expand wallet share.",
    urgencyTrend: "GST, MCA, and other regulators are tightening compliance timelines — CA firms and consultancies without deadline management systems face growing client escalation risk."
  },
  "Interior Design": {
    marketContext: "India's interior design market is growing strongly — premium clients now expect digital project tracking, material approval portals, and professional billing workflows.",
    painStat: "Interior firms managing projects via WhatsApp and Excel face 20–25% budget overruns and frequent client escalations due to lack of visibility and communication gaps.",
    digitalBenefit: "Interior companies with project management and client portals reduce revision cycles by 35%, improve client satisfaction scores, and win more referrals through professional execution.",
    urgencyTrend: "Corporate clients — offices, retail chains, hospitality brands — now require digital project dashboards, photo proof of milestones, and formal progress reports."
  },
  "HR & Recruitment": {
    marketContext: "India's recruitment and HR services market is growing at 18% CAGR — firms with strong digital ATS, CRM, and analytics platforms are winning larger mandates.",
    painStat: "Recruitment firms operating on email and spreadsheets face 25–30% higher time-to-fill and lose 30–35% of placements to faster-responding competitors.",
    digitalBenefit: "HR and recruitment firms with integrated ATS and CRM improve time-to-fill by 35%, increase placement rates, and build stronger client relationships through data-driven reporting.",
    urgencyTrend: "Enterprise clients now demand digital ATS portals, compliance documentation, and real-time placement dashboards from their recruitment partners."
  },
  "Automotive": {
    marketContext: "India's automotive services and components sector is being digitised rapidly — dealerships and service centres without CRM and service management systems are losing customer loyalty.",
    painStat: "Automotive businesses managing service workflows and customer follow-up manually lose 25–30% of repeat service revenue due to poor reminder systems.",
    digitalBenefit: "Automotive companies with integrated service management and customer CRM increase repeat service visits by 35%, improve workshop efficiency, and reduce parts inventory costs.",
    urgencyTrend: "OEM dealer standards and insurance company partnerships now require digital service tracking, GST invoicing, and customer satisfaction reporting."
  },
  "Real Estate": {
    marketContext: "India's real estate market is at a multi-year high — developers and brokers with digital channel partner portals, buyer communication systems, and collection tracking are closing deals faster.",
    painStat: "Real estate companies without CRM and project tracking lose 30–35% of hot leads to faster follow-ups and face significant client complaints over delayed communication.",
    digitalBenefit: "Real estate developers with integrated CRM, channel partner portals, and buyer communication systems improve conversion rates by 30–40% and dramatically reduce client escalations.",
    urgencyTrend: "RERA compliance requires detailed buyer communication records, milestone documentation, and payment tracking — digital systems are now a legal necessity."
  },
  "Food & Beverage": {
    marketContext: "India's F&B sector faces intense margin pressure — restaurants and cloud kitchens with integrated POS, inventory, and customer loyalty systems are protecting margins better.",
    painStat: "F&B businesses without integrated inventory and ordering systems face 15–20% higher food costs and lose 25–30% of customer loyalty due to poor retention tools.",
    digitalBenefit: "F&B companies with integrated POS, inventory management, and customer loyalty platforms improve margins by 15–20% and significantly increase repeat customer frequency.",
    urgencyTrend: "Zomato and Swiggy now provide analytics dashboards to their partners — F&B businesses without their own systems are flying blind on margins and customer trends."
  },
};

const DEFAULT_INTEL = {
  marketContext: "India's SMB market is digitising rapidly — businesses with integrated digital systems are outgrowing those relying on Excel and WhatsApp by 2–3× annually.",
  painStat: "Companies without proper CRM and operations management systems lose 20–30% of potential revenue to manual errors, slow follow-ups, and coordination gaps.",
  digitalBenefit: "Businesses that implement custom digital systems tailored to their operations typically see 30–40% efficiency gains within the first quarter.",
  urgencyTrend: "GST compliance, rising customer expectations, and competitive pressure are making digital operations a business necessity — not a luxury."
};

// ─── Category timeline summary ─────────────────────────────────────────────────
const CAT_TIMELINE: Record<ServiceCategory, string> = {
  "Basic CRM": "4–6 weeks",
  "Custom App": "6–10 weeks",
  "CRM + Portal": "8–12 weeks",
  "ERP Standard": "12–18 weeks",
  "Enterprise ERP": "16–24 weeks",
};

// ─── Industry modules (top 5 for the email) ────────────────────────────────────
const TOP_MODULES: Partial<Record<string, string[]>> = {
  "Manufacturing": ["Production Order Management", "Inventory & Stock Control", "GST Billing & Invoicing", "Quality Control Module", "Management Dashboard & MIS"],
  "Logistics": ["Live Shipment Tracking", "Fleet & Driver Management", "Customer Self-Service Portal", "Proof of Delivery (POD)", "Business Analytics Dashboard"],
  "Financial Services": ["Client Portfolio CRM", "Lead Pipeline & Follow-ups", "Renewal & Alert Automation", "Document Collection & KYC", "Revenue & Commission Reports"],
  "Healthcare": ["Patient Registration & Records", "Appointment Scheduling", "Billing & Insurance Claims", "Patient Follow-up Reminders", "Revenue & OPD Analytics"],
  "Education": ["Student Enrollment & Profiles", "Attendance Tracking", "Fee Collection & Receipts", "WhatsApp Parent Updates", "Lead Inquiry Pipeline"],
  "E-Commerce": ["Order Management System", "Inventory & Stock Management", "Customer CRM & History", "Returns & Refunds Management", "Revenue & Sales Analytics"],
  "Construction": ["Project Management Dashboard", "Site Progress Tracking", "Budget vs Actual Tracker", "Client Portal (Live Updates)", "Invoice & Billing Module"],
  "Hospitality": ["Room Booking & Reservation", "Guest Profile & History", "Revenue & Occupancy Reports", "Guest WhatsApp Communication", "Staff Attendance & Payroll"],
  "Travel & Tourism": ["Booking & Itinerary Builder", "Customer CRM & Follow-ups", "Payment & Commission Tracker", "WhatsApp Booking Updates", "Revenue Analytics Reports"],
  "Events / Marketing": ["Event CRM & Lead Pipeline", "Budget & P&L Tracker", "Vendor & Venue Management", "Client Portal (Event Status)", "Revenue & Booking Analytics"],
  "Pharmaceutical": ["Product & Batch Management", "MR Field Force Tracking", "Doctor & Chemist CRM", "GST Invoicing & Reports", "Territory & Area Dashboard"],
  "Consulting": ["Client Project Management", "Compliance Calendar & Alerts", "Lead Pipeline & Proposals", "Invoice & Payment Management", "Revenue & Utilisation Reports"],
  "Interior Design": ["Project & Client Management", "Budget vs Actual Tracker", "Client Approval Portal", "Site Progress Photo Tracker", "Invoice & Payment Management"],
  "HR & Recruitment": ["Job Posting & ATS", "Candidate Pipeline", "Client (Employer) CRM", "Placement & Revenue Tracking", "Recruitment Analytics"],
  "Automotive": ["Service & Repair Orders", "Customer History & CRM", "Service Reminder Automation", "Parts Inventory & Procurement", "Workshop Analytics"],
  "Real Estate": ["Lead Pipeline & Follow-ups", "Property Listings Management", "Buyer Portal (Progress Updates)", "Payment & Collection Tracking", "Broker/Channel Partner Portal"],
  "Food & Beverage": ["POS & Order Management", "Inventory & Recipe Management", "Customer Loyalty Program", "Delivery Integration", "Cost & Margin Analytics"],
};

const DEFAULT_MODULES = ["Lead & Client CRM", "Workflow Automation", "Analytics Dashboard", "WhatsApp Integration", "Role-Based Access Control"];

// ─── Pain point → business impact ─────────────────────────────────────────────
function getPainImpact(pain: string): string {
  const p = pain.toLowerCase();
  if (p.includes("manual") || p.includes("excel") || p.includes("paper")) return "directly adding to administrative overhead and human error risk";
  if (p.includes("track") || p.includes("visibility")) return "causing blind spots in operations and delayed decision-making";
  if (p.includes("follow") || p.includes("lead") || p.includes("pipeline")) return "resulting in lost revenue from prospects who go cold";
  if (p.includes("invoice") || p.includes("billing") || p.includes("payment")) return "creating cash flow delays and reconciliation disputes";
  if (p.includes("report") || p.includes("data") || p.includes("analytics")) return "leaving management without the insight needed to act quickly";
  if (p.includes("communication") || p.includes("whatsapp") || p.includes("client")) return "creating inconsistent client experiences that damage retention";
  if (p.includes("inventory") || p.includes("stock")) return "leading to stockouts, overstocking, and revenue leakage";
  if (p.includes("coordin") || p.includes("team") || p.includes("field")) return "slowing execution and increasing miscommunication between teams";
  return "reducing overall operational efficiency and team productivity";
}

// ─── Copy button ───────────────────────────────────────────────────────────────
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

// ─── Generate the plain-text email body ───────────────────────────────────────
function buildEmailText(lead: Lead, pricing: PricingRecommendation): string {
  const intel = INDUSTRY_INTEL[lead.industry] ?? DEFAULT_INTEL;
  const modules = TOP_MODULES[lead.industry] ?? DEFAULT_MODULES;
  const timeline = CAT_TIMELINE[pricing.serviceCategory];
  const contacts = CONTACTS[lead.id];
  const toEmail = contacts?.emails?.[0] ?? "";

  return `Subject: ${lead.companyName} — Custom ${lead.industry} System + Business Analysis

${toEmail ? `To: ${toEmail}` : ""}
---

Dear ${lead.contact},

I hope this message finds you well. My name is Smith at TwoCoreX (OPC) Pvt Ltd — we build custom ERP, CRM, and mobile systems exclusively for Indian SMBs.

I recently reviewed ${lead.companyName}'s operations, your website (${lead.website.replace(/^https?:\/\//, "")}), and your position in the ${lead.industry} market in ${lead.city}. We've prepared this personalised analysis because we believe there's a significant opportunity to help your team operate more efficiently and grow faster.

──────────────────────────────────────────
WHAT WE OBSERVED ABOUT ${lead.companyName.toUpperCase()}
──────────────────────────────────────────

${lead.companyName} is a ${lead.employees}-employee ${lead.industry} business based in ${lead.city} — operating in one of India's most competitive and rapidly digitising sectors.

${intel.marketContext}

${intel.painStat}

──────────────────────────────────────────
THE 3 OPERATIONAL GAPS WE IDENTIFIED
──────────────────────────────────────────

After reviewing your operations, we identified three areas where a custom digital system would have immediate and measurable impact:

1. ${lead.painPoint1}
   → This is ${getPainImpact(lead.painPoint1)}.

2. ${lead.painPoint2}
   → This is ${getPainImpact(lead.painPoint2)}.

3. ${lead.painPoint3}
   → This is ${getPainImpact(lead.painPoint3)}.

──────────────────────────────────────────
WHY NOW IS THE RIGHT TIME
──────────────────────────────────────────

${lead.buyingTrigger}

${intel.urgencyTrend}

──────────────────────────────────────────
OUR PROPOSED SOLUTION FOR ${lead.companyName.toUpperCase()}
──────────────────────────────────────────

We would build a custom ${pricing.serviceCategory} — designed ground-up for ${lead.companyName}'s specific workflow.

Key modules included:
${modules.map((m, i) => `${i + 1}. ${m}`).join("\n")}

${intel.digitalBenefit}

Delivery timeline: ${timeline}

──────────────────────────────────────────
INVESTMENT SUMMARY
──────────────────────────────────────────

One-time build:    ₹${pricing.projectPrice.toLocaleString("en-IN")} (fixed price, no scope creep)
Monthly support:   ₹${pricing.monthlyPrice.toLocaleString("en-IN")}/month (hosting + updates + bugs)
Annual plan:       ₹${pricing.annualPrice.toLocaleString("en-IN")}/year (2 months free)

What's included in every project:
✓ Source code ownership — yours forever
✓ 3 months free bug-fix warranty post-launch
✓ Staff training and onboarding
✓ NDA and fixed-price contract before we begin
✓ Weekly progress updates throughout development

──────────────────────────────────────────
ABOUT TWOCOREX
──────────────────────────────────────────

TwoCoreX (OPC) Pvt Ltd builds custom ERP, CRM, and mobile systems for Indian SMBs — with a track record across manufacturing, logistics, healthcare, financial services, and more.

We don't sell off-the-shelf software. Every system we build is coded from scratch for the client's specific operations, industry requirements, and team structure.

Our tech stack: React.js, Node.js, PostgreSQL, React Native (iOS + Android), AWS/GCP cloud, WhatsApp Business API.

──────────────────────────────────────────
NEXT STEP
──────────────────────────────────────────

I'd welcome a 20-minute call to walk you through exactly what we'd build for ${lead.companyName} — with live demos of similar systems we've deployed for ${lead.industry} companies.

No commitment required. Just a focused conversation about what's possible.

Please reply to this email or reach us at:
→ Email: smith@twocorex.com
→ WhatsApp: +91 8828945019

Looking forward to connecting.

Best regards,
Smith
TwoCoreX (OPC) Pvt Ltd
www.twocorex.com`;
}

// ─── Generate the print-ready HTML for PDF ────────────────────────────────────
function buildPrintHTML(lead: Lead, pricing: PricingRecommendation): string {
  const intel = INDUSTRY_INTEL[lead.industry] ?? DEFAULT_INTEL;
  const modules = TOP_MODULES[lead.industry] ?? DEFAULT_MODULES;
  const timeline = CAT_TIMELINE[pricing.serviceCategory];
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

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

  /* Cover */
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

  /* Section headers */
  .section { margin-bottom: 22px; }
  .section-label { font-size: 8pt; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: ${accent}; margin-bottom: 8px; }
  .section-title { font-size: 16pt; font-weight: 800; color: #1a1a2e; margin-bottom: 12px; }
  .section-body { font-size: 10.5pt; color: #374151; line-height: 1.75; }

  /* Highlight box */
  .highlight { background: #F9FAFB; border-left: 3px solid ${accent}; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 14px 0; font-size: 10pt; color: #374151; line-height: 1.7; }
  .highlight strong { color: #1a1a2e; }

  /* Pain point cards */
  .pain-grid { display: flex; flex-direction: column; gap: 10px; margin: 14px 0; }
  .pain-card { border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px 16px; }
  .pain-num { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; font-size: 9pt; font-weight: 700; color: white; background: ${accent}; margin-right: 8px; }
  .pain-text { font-size: 10.5pt; font-weight: 600; color: #1a1a2e; display: inline; }
  .pain-impact { font-size: 9.5pt; color: #6B7280; margin-top: 5px; padding-left: 30px; font-style: italic; }

  /* Modules grid */
  .modules-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 14px 0; }
  .module-item { border: 1px solid #E5E7EB; border-radius: 6px; padding: 10px 12px; background: #FAFAFA; }
  .module-name { font-size: 9.5pt; font-weight: 700; color: #1a1a2e; }
  .module-check { color: ${accent}; font-weight: 700; margin-right: 4px; }

  /* Pricing table */
  .price-table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 10pt; }
  .price-table th { background: ${accent}; color: white; padding: 10px 14px; text-align: left; font-size: 9pt; font-weight: 700; letter-spacing: 0.5px; }
  .price-table td { padding: 10px 14px; border-bottom: 1px solid #F3F4F6; }
  .price-table tr:last-child td { border-bottom: none; }
  .price-table .price-val { font-weight: 700; font-size: 12pt; color: ${accent}; }
  .price-table .price-sub { font-size: 8.5pt; color: #9CA3AF; }

  /* Deliverables */
  .deliverables { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0; }
  .del-pill { border: 1px solid #E5E7EB; border-radius: 20px; padding: 4px 10px; font-size: 9pt; color: #374151; }

  /* Process steps */
  .process { display: flex; flex-direction: column; gap: 8px; margin: 14px 0; }
  .process-step { display: flex; gap: 12px; align-items: flex-start; }
  .process-num { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; background: ${accent}; color: white; font-size: 9pt; font-weight: 700; display: flex; align-items: center; justify-content: center; }
  .process-content h4 { font-size: 10pt; font-weight: 700; color: #1a1a2e; }
  .process-content p { font-size: 9.5pt; color: #6B7280; }

  /* About / guarantee */
  .guarantee-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0; }
  .guarantee-item { display: flex; gap: 8px; font-size: 9.5pt; color: #374151; }
  .guarantee-check { color: #10B981; font-weight: 700; flex-shrink: 0; }

  /* CTA footer */
  .cta-box { background: #1a1a2e; color: white; padding: 24px; border-radius: 12px; margin-top: 16px; text-align: center; }
  .cta-box h3 { font-size: 14pt; font-weight: 800; margin-bottom: 8px; }
  .cta-box p { font-size: 10pt; color: rgba(255,255,255,0.7); margin-bottom: 16px; }
  .cta-contact { font-size: 10pt; color: rgba(255,255,255,0.9); }

  /* Footer on every page */
  .doc-footer { position: fixed; bottom: 0; left: 0; right: 0; border-top: 1px solid #E5E7EB; padding: 6px 20mm; display: flex; justify-content: space-between; font-size: 8pt; color: #9CA3AF; }
</style>
</head>
<body>

<!-- ── PAGE 1: COVER ──────────────────────────────────────────────────────── -->
<div class="cover">
  <div>
    <div class="cover-logo">Two<span>CoreX</span></div>
    <div class="cover-tagline">Custom Software for Indian SMBs</div>
    <div class="cover-divider"></div>
    <div class="cover-title">Business Analysis &<br>Custom Solution Proposal</div>
    <div class="cover-subtitle">Prepared exclusively for ${lead.companyName}</div>
  </div>

  <div class="cover-meta">
    <p><strong>Prepared for:</strong> ${lead.contact}, ${lead.companyName}</p>
    <p><strong>Industry:</strong> ${lead.industry} &nbsp;·&nbsp; ${lead.city}</p>
    <p><strong>Company Size:</strong> ${lead.employees} employees</p>
    <p><strong>Proposed Solution:</strong> ${pricing.serviceCategory}</p>
    <p><strong>Date:</strong> ${today}</p>
    <p><strong>Prepared by:</strong> TwoCoreX (OPC) Pvt Ltd &nbsp;·&nbsp; smith@twocorex.com</p>
  </div>

  <div class="cover-footer">
    This document contains a confidential business analysis and personalised proposal prepared exclusively for ${lead.companyName}.
    TwoCoreX (OPC) Pvt Ltd · Custom ERP, CRM &amp; Mobile Systems for Indian SMBs
  </div>
</div>
<div class="page-break"></div>

<!-- ── PAGE 2: RESEARCH + CHALLENGES ─────────────────────────────────────── -->
<div class="section">
  <div class="section-label">About Your Business</div>
  <div class="section-title">What We Observed About ${lead.companyName}</div>
  <div class="section-body">
    ${lead.companyName} is a ${lead.employees}-employee ${lead.industry} company based in ${lead.city}, operating in one of India's fastest-evolving business sectors.
  </div>
  <div class="highlight">
    <strong>Market Context:</strong> ${intel.marketContext}
  </div>
  <div class="section-body">
    ${intel.painStat}
  </div>
</div>

<div class="section">
  <div class="section-label">Operational Analysis</div>
  <div class="section-title">The 3 Gaps We Identified at ${lead.companyName}</div>
  <div class="section-body">
    After reviewing your operations and digital presence, we identified three specific areas where a custom system would have an immediate and measurable impact on your team's efficiency and revenue:
  </div>
  <div class="pain-grid">
    <div class="pain-card">
      <div><span class="pain-num">1</span><span class="pain-text">${lead.painPoint1.charAt(0).toUpperCase() + lead.painPoint1.slice(1)}</span></div>
      <div class="pain-impact">→ This is ${getPainImpact(lead.painPoint1)}</div>
    </div>
    <div class="pain-card">
      <div><span class="pain-num">2</span><span class="pain-text">${lead.painPoint2.charAt(0).toUpperCase() + lead.painPoint2.slice(1)}</span></div>
      <div class="pain-impact">→ This is ${getPainImpact(lead.painPoint2)}</div>
    </div>
    <div class="pain-card">
      <div><span class="pain-num">3</span><span class="pain-text">${lead.painPoint3.charAt(0).toUpperCase() + lead.painPoint3.slice(1)}</span></div>
      <div class="pain-impact">→ This is ${getPainImpact(lead.painPoint3)}</div>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-label">Why Now</div>
  <div class="section-title">The Right Time for ${lead.companyName} to Act</div>
  <div class="highlight">
    <strong>Business Signal:</strong> ${lead.buyingTrigger}
  </div>
  <div class="section-body">
    ${intel.urgencyTrend}
  </div>
</div>
<div class="page-break"></div>

<!-- ── PAGE 3: SOLUTION ───────────────────────────────────────────────────── -->
<div class="section">
  <div class="section-label">Proposed Solution</div>
  <div class="section-title">Custom ${pricing.serviceCategory} — Built for ${lead.companyName}</div>
  <div class="section-body">
    We would design and build a custom ${pricing.serviceCategory} from the ground up — not an off-the-shelf product, but a system architected specifically for ${lead.companyName}'s workflow, team structure, and industry requirements.
  </div>
  <div class="highlight">
    <strong>Service Fit:</strong> ${lead.serviceFit}
  </div>
</div>

<div class="section">
  <div class="section-label">What We Build</div>
  <div class="section-title">Modules Included for ${lead.industry}</div>
  <div class="modules-grid">
    ${modules.map(m => `<div class="module-item"><span class="module-check">✓</span><span class="module-name">${m}</span></div>`).join("")}
    <div class="module-item"><span class="module-check">✓</span><span class="module-name">WhatsApp Business API Integration</span></div>
    <div class="module-item"><span class="module-check">✓</span><span class="module-name">Role-Based Access Control</span></div>
    <div class="module-item"><span class="module-check">✓</span><span class="module-name">Admin Dashboard & Analytics</span></div>
    <div class="module-item"><span class="module-check">✓</span><span class="module-name">Cloud Hosting (AWS/GCP)</span></div>
  </div>
</div>

<div class="section">
  <div class="section-label">Expected Business Impact</div>
  <div class="section-title">What ${lead.companyName} Gains</div>
  <div class="highlight">
    ${intel.digitalBenefit}
  </div>
  <div class="guarantee-grid">
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Eliminate manual tracking errors</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Real-time visibility across operations</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Faster client/customer communication</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> GST-compliant invoicing and reports</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Team accountability and task tracking</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Data-driven management decisions</div>
  </div>
</div>
<div class="page-break"></div>

<!-- ── PAGE 4: INVESTMENT + DELIVERY ─────────────────────────────────────── -->
<div class="section">
  <div class="section-label">Investment</div>
  <div class="section-title">Fixed-Price Proposal for ${lead.companyName}</div>
  <table class="price-table">
    <thead><tr><th>Description</th><th>Amount</th><th>Notes</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>Custom System Build</strong><br><span class="price-sub">${pricing.serviceCategory} — one-time project fee</span></td>
        <td><span class="price-val">₹${pricing.projectPrice.toLocaleString("en-IN")}</span></td>
        <td><span class="price-sub">Fixed price, no hidden costs</span></td>
      </tr>
      <tr>
        <td><strong>Monthly Support & Maintenance</strong><br><span class="price-sub">Hosting + bug fixes + updates + priority support</span></td>
        <td><span class="price-val">₹${pricing.monthlyPrice.toLocaleString("en-IN")}/mo</span></td>
        <td><span class="price-sub">Cancel anytime, no lock-in</span></td>
      </tr>
      <tr>
        <td><strong>Annual Support Plan</strong><br><span class="price-sub">All feature upgrades + priority support + 2 months free</span></td>
        <td><span class="price-val">₹${pricing.annualPrice.toLocaleString("en-IN")}/yr</span></td>
        <td><span class="price-sub">Save ₹${(pricing.monthlyPrice * 2).toLocaleString("en-IN")} vs monthly</span></td>
      </tr>
    </tbody>
  </table>
  <div class="highlight">
    <strong>What's Included — No Additional Charges:</strong><br><br>
    Source code ownership (100% yours) &nbsp;·&nbsp; 3 months free bug-fix warranty &nbsp;·&nbsp; Staff training &amp; onboarding &nbsp;·&nbsp;
    NDA + fixed-price contract &nbsp;·&nbsp; SSL certificate &nbsp;·&nbsp; Cloud hosting setup &nbsp;·&nbsp; Weekly progress demos &nbsp;·&nbsp; Admin panel for data management
  </div>
</div>

<div class="section">
  <div class="section-label">Timeline</div>
  <div class="section-title">Delivery in ${timeline}</div>
  <div class="process">
    <div class="process-step">
      <div class="process-num">1</div>
      <div class="process-content"><h4>Discovery &amp; Design</h4><p>Requirements workshop, UI/UX wireframes, database architecture — with your sign-off before coding begins</p></div>
    </div>
    <div class="process-step">
      <div class="process-num">2</div>
      <div class="process-content"><h4>Development (Agile Sprints)</h4><p>Weekly demo updates — you see progress every week. No black box development</p></div>
    </div>
    <div class="process-step">
      <div class="process-num">3</div>
      <div class="process-content"><h4>Testing &amp; Quality Assurance</h4><p>Full testing on real devices and scenarios before handover — zero known bugs at launch</p></div>
    </div>
    <div class="process-step">
      <div class="process-num">4</div>
      <div class="process-content"><h4>Launch, Training &amp; Handover</h4><p>We deploy, onboard your team, train staff, and hand over source code and documentation</p></div>
    </div>
  </div>
</div>
<div class="page-break"></div>

<!-- ── PAGE 5: ABOUT + CTA ────────────────────────────────────────────────── -->
<div class="section">
  <div class="section-label">About TwoCoreX</div>
  <div class="section-title">Why Indian SMBs Work with Us</div>
  <div class="section-body">
    TwoCoreX (OPC) Pvt Ltd is a custom software development company focused exclusively on Indian SMBs. We build ERP, CRM, and mobile systems from scratch — not resold SaaS, not modified templates. Every system is engineered for your specific operations.
  </div>
  <div class="guarantee-grid" style="margin-top: 14px;">
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Fixed-price contracts — no scope creep surprises</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Source code delivered on completion — 100% ownership</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Built for Indian compliance — GST, TDS, RERA, MSME</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> NDA signed before project begins</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Mobile-responsive + Android/iOS apps included</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> WhatsApp Business API integration ready</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> Cloud hosted on AWS/GCP — 99.9% uptime SLA</div>
    <div class="guarantee-item"><span class="guarantee-check">✓</span> 3 months free bug-fix warranty post-launch</div>
  </div>

  <div class="section-label" style="margin-top: 20px;">Technology Stack</div>
  <div class="highlight">
    <strong>Frontend:</strong> React.js / Next.js &nbsp;·&nbsp; <strong>Mobile:</strong> React Native (iOS + Android) &nbsp;·&nbsp;
    <strong>Backend:</strong> Node.js + Express &nbsp;·&nbsp; <strong>Database:</strong> PostgreSQL / MongoDB &nbsp;·&nbsp;
    <strong>Cloud:</strong> AWS / GCP &nbsp;·&nbsp; <strong>Payments:</strong> Razorpay / PayU &nbsp;·&nbsp;
    <strong>Messaging:</strong> WhatsApp Business API &nbsp;·&nbsp; <strong>Auth:</strong> JWT + OAuth
  </div>
</div>

<div class="cta-box">
  <h3>Ready to See What We'd Build for ${lead.companyName}?</h3>
  <p>
    We'd welcome a 20-minute call to walk you through a live demo of a similar ${pricing.serviceCategory} we've deployed for a ${lead.industry} company — and show you exactly what we'd build for you.
    No commitment. No sales pressure. Just a focused conversation about what's possible.
  </p>
  <div class="cta-contact">
    ✉ smith@twocorex.com &nbsp;&nbsp;·&nbsp;&nbsp; 💬 WhatsApp: +91 8828945019 &nbsp;&nbsp;·&nbsp;&nbsp; 🌐 www.twocorex.com
  </div>
</div>

<div class="doc-footer">
  <span>Confidential — Prepared exclusively for ${lead.companyName}</span>
  <span>TwoCoreX (OPC) Pvt Ltd · ${today}</span>
</div>

</body>
</html>`;
}

// ─── Main component ────────────────────────────────────────────────────────────
interface Props { lead: Lead; pricing: PricingRecommendation; }

export function FirstOutreachPanel({ lead, pricing }: Props) {
  const [activeTab, setActiveTab] = useState<"preview" | "email" | "reply">("preview");
  const [replyText, setReplyText] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyError, setReplyError] = useState("");

  async function generateReply() {
    if (!replyText.trim()) return;
    setReplyLoading(true);
    setReplyError("");
    setGeneratedReply("");
    try {
      const res = await fetch("/api/gen-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, pricing, replyText }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedReply(data.reply);
      } else {
        setReplyError(data.error ?? "Failed to generate reply");
      }
    } catch (e) {
      setReplyError(String(e));
    } finally {
      setReplyLoading(false);
    }
  }

  const emailText = buildEmailText(lead, pricing);
  const contacts = CONTACTS[lead.id];
  const hasPhone = contacts?.phones?.length > 0;
  const hasEmail = contacts?.emails?.length > 0;

  function downloadPDF() {
    const html = buildPrintHTML(lead, pricing);
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 600);
  }

  function sendGmail() {
    // Only pre-fill To + Subject — body is too long for a URL parameter (Gmail 400 error)
    // User copies full body from the Email Text tab
    const sub = encodeURIComponent(`${lead.companyName} — Custom ${lead.industry} System + Business Analysis`);
    const to = contacts?.emails?.[0] ? encodeURIComponent(contacts.emails[0]) : "";
    navigator.clipboard.writeText(emailText).catch(() => {});
    window.open(`https://mail.google.com/mail/?view=cm&to=${to}&su=${sub}`, "_blank");
  }

  return (
    <div className="space-y-4">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="rounded-xl p-5 text-white" style={{ background: "var(--navy)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#FCD34D" }}>
              First Outreach · Personalised for {lead.companyName}
            </div>
            <h2 className="text-lg font-bold leading-tight">
              Professional Email + PDF Proposal
            </h2>
            <p className="text-white/60 text-xs mt-1">
              Shows deep research · Industry intelligence · Custom solution · Full pricing
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "#FCD34D", color: "#1A1A2E" }}>
              <FileDown className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={sendGmail}
              title="Opens Gmail with To + Subject pre-filled. Full email body is copied to clipboard — just paste it."
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition-all">
              <Mail className="w-4 h-4" /> Gmail (body copied)
            </button>
          </div>
        </div>

        {/* Scraped contact quick-info */}
        {(hasPhone || hasEmail) && (
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4">
            {hasEmail && (
              <div className="text-xs text-white/60">
                📧 <span className="text-white font-medium">{contacts.emails[0]}</span>
                {contacts.emails.length > 1 && ` +${contacts.emails.length - 1} more`}
              </div>
            )}
            {hasPhone && (
              <div className="text-xs text-white/60">
                📞 <span className="text-white font-medium">{contacts.phones[0]}</span>
                {contacts.phones.length > 1 && ` +${contacts.phones.length - 1} more`}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Tab toggle ─────────────────────────────────────────────────────── */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
        {([
          ["preview", <><Eye className="w-3.5 h-3.5" /> PDF Preview</>],
          ["email",   <><Mail className="w-3.5 h-3.5" /> Email Text</>],
          ["reply",   <><MessageSquareReply className="w-3.5 h-3.5" /> Handle Reply</>],
        ] as const).map(([t, label]) => (
          <button key={t}
            onClick={() => setActiveTab(t)}
            className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg font-semibold transition-all"
            style={activeTab === t
              ? { background: "#fff", color: "#1a1a2e", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }
              : { color: "#6B7280" }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── PDF Preview ────────────────────────────────────────────────────── */}
      {activeTab === "preview" && (() => {
        const intel = INDUSTRY_INTEL[lead.industry] ?? DEFAULT_INTEL;
        const modules = TOP_MODULES[lead.industry] ?? DEFAULT_MODULES;
        const timeline = CAT_TIMELINE[pricing.serviceCategory];
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
            {/* Cover */}
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <div className="p-6" style={{ background: "var(--navy)" }}>
                <div className="text-2xl font-black text-white mb-1">
                  Two<span style={{ color: theme.border }}>CoreX</span>
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest mb-5">Custom Software for Indian SMBs</div>
                <div className="text-xl font-bold text-white leading-snug mb-2">Business Analysis &<br />Custom Solution Proposal</div>
                <div className="text-sm text-white/60">Prepared exclusively for {lead.companyName}</div>
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                  {[
                    ["Prepared for", `${lead.contact}, ${lead.companyName}`],
                    ["Industry", `${lead.industry} · ${lead.city}`],
                    ["Company Size", `${lead.employees} employees`],
                    ["Proposed Solution", pricing.serviceCategory],
                  ].map(([k, v]) => (
                    <div key={k}><span className="text-white/40">{k}: </span><span className="text-white font-semibold">{v}</span></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: theme.color }}>Business Research</div>
              <h3 className="text-base font-bold text-gray-900">What We Observed About {lead.companyName}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {lead.companyName} is a {lead.employees}-employee {lead.industry} business based in {lead.city}.
              </p>
              <div className="p-3 rounded-lg text-sm text-gray-700 leading-relaxed" style={{ background: theme.bg, borderLeft: `3px solid ${theme.color}` }}>
                <strong>Market Context:</strong> {intel.marketContext}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{intel.painStat}</p>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.color }}>Operational Analysis</div>
              <h3 className="text-base font-bold text-gray-900">The 3 Gaps We Identified</h3>
              <div className="space-y-2">
                {[lead.painPoint1, lead.painPoint2, lead.painPoint3].map((pain, i) => (
                  <div key={i} className="rounded-lg border border-gray-100 p-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white mt-0.5"
                        style={{ background: theme.color }}>{i + 1}</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{pain.charAt(0).toUpperCase() + pain.slice(1)}</p>
                        <p className="text-xs text-gray-500 mt-1 italic">→ {getPainImpact(pain)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg text-sm text-gray-700" style={{ background: theme.bg, borderLeft: `3px solid ${theme.color}` }}>
                <strong>Why Act Now:</strong> {lead.buyingTrigger}
              </div>
            </div>

            {/* Section 3 — Solution */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.color }}>Proposed Solution</div>
              <h3 className="text-base font-bold text-gray-900">Custom {pricing.serviceCategory} for {lead.companyName}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Built ground-up for {lead.companyName}'s workflow — not a template, not SaaS. Delivery in <strong>{timeline}</strong>.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[...modules, "WhatsApp Business API", "Role-Based Access Control", "Admin Dashboard & Analytics", "Cloud Hosting (AWS/GCP)"].map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs rounded-lg border border-gray-100 p-2.5 bg-gray-50">
                    <span className="font-bold" style={{ color: theme.color }}>✓</span>
                    <span className="text-gray-700 font-medium">{m}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg text-sm text-gray-700 italic" style={{ background: theme.bg, borderLeft: `3px solid ${theme.color}` }}>
                {intel.digitalBenefit}
              </div>
            </div>

            {/* Section 4 — Pricing */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 font-bold text-sm text-white" style={{ background: theme.color }}>
                Investment Summary — Fixed Price
              </div>
              <div className="p-5 space-y-2">
                {[
                  ["One-time Build", `₹${pricing.projectPrice.toLocaleString("en-IN")}`, "Fixed price · no hidden costs"],
                  ["Monthly Support", `₹${pricing.monthlyPrice.toLocaleString("en-IN")}/mo`, "Hosting + updates + bugs"],
                  ["Annual Plan", `₹${pricing.annualPrice.toLocaleString("en-IN")}/yr`, "2 months free"],
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

            {/* Download CTA */}
            <div className="rounded-xl p-5 text-center" style={{ background: "var(--navy)" }}>
              <p className="text-white font-bold mb-3">Download the full 5-page PDF proposal to send to {lead.companyName}</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button onClick={downloadPDF}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold"
                  style={{ background: "#FCD34D", color: "#1A1A2E" }}>
                  <FileDown className="w-4 h-4" /> Download PDF
                </button>
                <button onClick={sendGmail}
                  title="Opens Gmail with To + Subject pre-filled. Full email copied to clipboard — just paste."
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition-all">
                  <Mail className="w-4 h-4" /> Gmail (body copied)
                </button>
                {hasPhone && (
                  <a href={`https://wa.me/${contacts.phones[0].replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, I'm sharing a personalised business proposal for ${lead.companyName}. Please let me know a good time for a quick call.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-green-500 text-white hover:bg-green-600 transition-all">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
                <a href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${lead.contact} ${lead.companyName}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white hover:bg-white/20 transition-all"
                  style={{ background: "#0077B5" }}>
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Email Text View ────────────────────────────────────────────────── */}
      {activeTab === "email" && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-700">Full Email — Ready to Send</h3>
            <CopyButton text={emailText} label="Copy Full Email" />
          </div>
          <div className="mb-3 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
            💡 <strong>Gmail tip:</strong> Click &quot;Gmail (body copied)&quot; above — it opens Gmail with To + Subject pre-filled and copies the full email body to your clipboard. Just press <kbd className="px-1 py-0.5 bg-white border border-blue-200 rounded text-xs">Ctrl+V</kbd> to paste.
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono border border-gray-100 max-h-[600px] overflow-y-auto">
            {emailText}
          </div>
        </div>
      )}

      {/* ── Handle Reply ────────────────────────────────────────────────────── */}
      {activeTab === "reply" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Paste Their Reply</h3>
              <p className="text-xs text-gray-500">Paste the email or message you received from {lead.companyName}. Claude will generate a tailored follow-up reply handling their specific objection or response.</p>
            </div>
            <textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder={`Paste ${lead.companyName}'s reply here…\n\nExample: "We already use SAP ByDesign for our operations." or "Not the right time, maybe next quarter." or "Looks interesting, can you send more details?"`}
              rows={7}
              className="w-full text-sm text-gray-700 border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-gray-50 placeholder:text-gray-400"
            />
            <button
              onClick={generateReply}
              disabled={replyLoading || !replyText.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "var(--navy)" }}>
              {replyLoading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</>
                : <><MessageSquareReply className="w-4 h-4" /> Generate Follow-up Reply</>}
            </button>

            {replyError && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                Error: {replyError}
              </div>
            )}
          </div>

          {generatedReply && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">Generated Follow-up Reply</h3>
                <div className="flex gap-2">
                  <CopyButton text={generatedReply} label="Copy Reply" />
                  <button
                    onClick={() => {
                      const sub = encodeURIComponent(`Re: ${lead.companyName} — Custom ${lead.industry} System`);
                      const to = contacts?.emails?.[0] ? encodeURIComponent(contacts.emails[0]) : "";
                      navigator.clipboard.writeText(generatedReply).catch(() => {});
                      window.open(`https://mail.google.com/mail/?view=cm&to=${to}&su=${sub}`, "_blank");
                    }}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all"
                    style={{ background: "#EFF6FF", color: "#1D4ED8", borderColor: "#BFDBFE" }}>
                    <Mail className="w-3.5 h-3.5" /> Gmail (body copied)
                  </button>
                  {hasPhone && (
                    <a href={`https://wa.me/${contacts.phones[0].replace(/\D/g, "")}?text=${encodeURIComponent(generatedReply)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all"
                      style={{ background: "#DCFCE7", color: "#166534", borderColor: "#BBF7D0" }}>
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100">
                {generatedReply}
              </div>
              <button
                onClick={() => { setGeneratedReply(""); setReplyText(""); }}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                ← Generate another reply
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
