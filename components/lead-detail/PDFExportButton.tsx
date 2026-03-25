"use client";

import { useState, useRef } from "react";
import { FileDown, Loader2 } from "lucide-react";
import type {
  Lead, PricingRecommendation,
  SocialIntelData, BizIntelData, CloseIntelData,
  CompetitorIntelData, ProposalIntelData,
} from "@/types";

interface Props { lead: Lead; pricing: PricingRecommendation }

const s = {
  page: { fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", color: "#1a1a1a", lineHeight: "1.5" },
  cover: { padding: "40px", background: "#0f172a", color: "#fff", minHeight: "200px" },
  section: { padding: "24px 32px", borderBottom: "1px solid #e2e8f0" },
  sectionTitle: { fontSize: "13px", fontWeight: "bold", color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "6px", marginBottom: "14px", display: "block" },
  label: { fontSize: "9px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em" },
  value: { fontSize: "11px", color: "#1e293b" },
  chip: { display: "inline-block", padding: "2px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: "bold" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "10px" },
  th: { background: "#f8fafc", padding: "6px 8px", textAlign: "left" as const, fontWeight: "bold", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "6px 8px", borderBottom: "1px solid #f1f5f9", verticalAlign: "top" as const },
  pageBreak: { pageBreakAfter: "always" as const },
  bullet: { display: "flex", gap: "8px", marginBottom: "4px", alignItems: "flex-start" as const },
};

export function PDFExportButton({ lead, pricing }: Props) {
  const [loading, setLoading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  async function handleExport() {
    setLoading(true);
    try {
      const [socialRes, bizRes, closeRes, compRes, propRes] = await Promise.all([
        fetch(`/api/social-intel/${lead.id}`).then(r => r.json()).catch(() => ({ data: null })),
        fetch(`/api/biz-intel/${lead.id}`).then(r => r.json()).catch(() => ({ data: null })),
        fetch(`/api/close-intel/${lead.id}`).then(r => r.json()).catch(() => ({ data: null })),
        fetch(`/api/competitor-intel/${lead.id}`).then(r => r.json()).catch(() => ({ data: null })),
        fetch(`/api/proposal-intel/${lead.id}`).then(r => r.json()).catch(() => ({ data: null })),
      ]);

      const social: SocialIntelData | null = socialRes.data;
      const biz: BizIntelData | null = bizRes.data;
      const close: CloseIntelData | null = closeRes.data;
      const competitor: CompetitorIntelData | null = compRes.data;
      const proposal: ProposalIntelData | null = propRes.data;

      if (!reportRef.current) return;

      // Build the report HTML
      reportRef.current.innerHTML = buildReportHTML(lead, pricing, social, biz, close, competitor, proposal);

      // Dynamic import to avoid SSR crash
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html2pdf = (await import("html2pdf.js")).default as any;

      const opts = {
        margin: [8, 8, 8, 8],
        filename: `${lead.companyName.replace(/\s+/g, "_")}_TwoCoreX_Report.pdf`,
        image: { type: "jpeg", quality: 0.97 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      await html2pdf().set(opts).from(reportRef.current).save();
    } catch (e) {
      console.error("PDF export error:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleExport}
        disabled={loading}
        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
      >
        {loading
          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
          : <FileDown className="w-3.5 h-3.5" />}
        {loading ? "Generating PDF..." : "Export PDF"}
      </button>
      {/* Hidden render target */}
      <div ref={reportRef} style={{ position: "fixed", left: "-9999px", top: 0, width: "794px", background: "#fff" }} />
    </>
  );
}

// ─── Report builder ───────────────────────────────────────────────────────────

function buildReportHTML(
  lead: Lead,
  pricing: PricingRecommendation,
  social: SocialIntelData | null,
  biz: BizIntelData | null,
  close: CloseIntelData | null,
  competitor: CompetitorIntelData | null,
  proposal: ProposalIntelData | null,
): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const none = (label: string) =>
    `<div style="padding:16px;background:#f8fafc;border-radius:8px;text-align:center;color:#94a3b8;font-size:10px;">${label} not yet generated — run from the corresponding tab first.</div>`;

  const pageBreak = `<div style="page-break-after:always;"></div>`;

  return `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1a1a1a;line-height:1.5;">

  <!-- COVER -->
  <div style="padding:48px 40px;background:#0f172a;color:#fff;">
    <div style="font-size:11px;font-weight:bold;color:#94a3b8;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:32px;">TwoCoreX · Sales Intelligence Report</div>
    <div style="font-size:28px;font-weight:900;color:#fff;margin-bottom:8px;">${esc(lead.companyName)}</div>
    <div style="font-size:14px;color:#94a3b8;margin-bottom:24px;">${esc(lead.city)} · ${esc(lead.industry)} · ${esc(lead.employees)} employees</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <span style="background:${lead.qualification === "HOT" ? "#ef4444" : "#f59e0b"};color:#fff;padding:3px 12px;border-radius:999px;font-size:11px;font-weight:bold;">${lead.qualification}</span>
      <span style="background:#1e293b;color:#94a3b8;padding:3px 12px;border-radius:999px;font-size:11px;">Score: ${lead.score}/10</span>
      <span style="background:#1e293b;color:#94a3b8;padding:3px 12px;border-radius:999px;font-size:11px;">${lead.category}</span>
    </div>
    <div style="margin-top:32px;font-size:10px;color:#475569;">Prepared for internal use · ${today}</div>
  </div>

  <!-- LEAD SUMMARY -->
  <div style="padding:24px 32px;border-bottom:1px solid #e2e8f0;">
    <span style="font-size:13px;font-weight:bold;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:14px;display:block;">Lead Summary</span>
    <table style="width:100%;border-collapse:collapse;font-size:10px;">
      <tr>
        <td style="padding:4px 8px 4px 0;color:#64748b;width:140px;">Company</td>
        <td style="padding:4px 0;font-weight:bold;">${esc(lead.companyName)}</td>
        <td style="padding:4px 8px 4px 16px;color:#64748b;width:140px;">Website</td>
        <td style="padding:4px 0;">${esc(lead.website)}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px 4px 0;color:#64748b;">City</td>
        <td style="padding:4px 0;">${esc(lead.city)}</td>
        <td style="padding:4px 8px 4px 16px;color:#64748b;">Employees</td>
        <td style="padding:4px 0;">${esc(lead.employees)}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px 4px 0;color:#64748b;">Industry</td>
        <td style="padding:4px 0;">${esc(lead.industry)}</td>
        <td style="padding:4px 8px 4px 16px;color:#64748b;">Service Fit</td>
        <td style="padding:4px 0;">${esc(lead.serviceFit)}</td>
      </tr>
      <tr>
        <td style="padding:4px 8px 4px 0;color:#64748b;">Contact</td>
        <td colspan="3" style="padding:4px 0;">${esc(lead.contact)}</td>
      </tr>
    </table>
    <div style="margin-top:16px;">
      <div style="font-size:9px;font-weight:bold;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Pain Points</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${[lead.painPoint1, lead.painPoint2, lead.painPoint3].map((p, i) => `
          <div style="display:flex;gap:8px;align-items:flex-start;">
            <span style="background:#ef4444;color:#fff;border-radius:999px;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:bold;flex-shrink:0;">${i + 1}</span>
            <span style="font-size:10px;color:#374151;">${esc(p)}</span>
          </div>`).join("")}
      </div>
    </div>
    <div style="margin-top:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 12px;">
      <span style="font-size:9px;font-weight:bold;color:#92400e;text-transform:uppercase;letter-spacing:0.08em;">Buying Trigger</span>
      <p style="margin:4px 0 0;font-size:11px;color:#1e293b;">${esc(lead.buyingTrigger)}</p>
    </div>
  </div>

  <!-- PRICING -->
  <div style="padding:24px 32px;border-bottom:1px solid #e2e8f0;">
    <span style="font-size:13px;font-weight:bold;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:14px;display:block;">Pricing Recommendation</span>
    <div style="display:flex;gap:16px;flex-wrap:wrap;">
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;min-width:160px;">
        <div style="font-size:9px;color:#16a34a;font-weight:bold;text-transform:uppercase;">Opening Offer</div>
        <div style="font-size:13px;font-weight:bold;color:#0f172a;margin-top:4px;">${esc(pricing.openingOffer)}</div>
      </div>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px 16px;min-width:160px;">
        <div style="font-size:9px;color:#1d4ed8;font-weight:bold;text-transform:uppercase;">Monthly (after free period)</div>
        <div style="font-size:13px;font-weight:bold;color:#0f172a;margin-top:4px;">₹${pricing.monthlyPrice.toLocaleString("en-IN")}/month</div>
      </div>
      <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;padding:12px 16px;min-width:160px;">
        <div style="font-size:9px;color:#7c3aed;font-weight:bold;text-transform:uppercase;">Annual Deal</div>
        <div style="font-size:13px;font-weight:bold;color:#0f172a;margin-top:4px;">₹${pricing.annualPrice.toLocaleString("en-IN")}/year</div>
      </div>
    </div>
    <p style="font-size:10px;color:#64748b;margin-top:10px;">${esc(pricing.rationale)}</p>
  </div>

  ${pageBreak}

  ${competitor ? `
  <!-- COMPETITOR INTEL -->
  <div style="padding:24px 32px;border-bottom:1px solid #e2e8f0;">
    <span style="font-size:13px;font-weight:bold;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:14px;display:block;">⚔️ Competitor Intelligence</span>
    <div style="background:#0f172a;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
      <div style="font-size:9px;font-weight:bold;color:#34d399;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">
        Evaluation Status: ${esc(competitor.evaluationStatus)} · ${esc(competitor.urgencyIndicator)}
      </div>
      <p style="font-size:11px;color:#e2e8f0;margin:0;">${esc(competitor.evaluationSummary)}</p>
    </div>
    <div style="margin-bottom:16px;">
      <div style="font-size:9px;font-weight:bold;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Vendor Shopping Signals</div>
      ${competitor.vendorShoppingSignals.map(sig => `
        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:8px 10px;margin-bottom:6px;">
          <div style="font-weight:bold;font-size:10px;margin-bottom:3px;">${esc(sig.signal)} <span style="background:${sig.confidence === "HIGH" ? "#fee2e2" : sig.confidence === "MEDIUM" ? "#fef3c7" : "#f1f5f9"};color:${sig.confidence === "HIGH" ? "#dc2626" : sig.confidence === "MEDIUM" ? "#d97706" : "#64748b"};padding:1px 8px;border-radius:999px;font-size:9px;">${sig.confidence}</span></div>
          <div style="font-size:10px;color:#374151;">${esc(sig.evidence)}</div>
          <div style="font-size:10px;color:#0369a1;margin-top:3px;font-style:italic;">Rep action: ${esc(sig.actionableAdvice)}</div>
        </div>`).join("")}
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:10px;">
      <thead>
        <tr>
          <th style="background:#f8fafc;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;">Competitor</th>
          <th style="background:#f8fafc;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;">Weaknesses</th>
          <th style="background:#f8fafc;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;">Our Win Angle</th>
        </tr>
      </thead>
      <tbody>
        ${competitor.competitors.map(c => `
          <tr>
            <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;">
              <div style="font-weight:bold;">${esc(c.companyName)}</div>
              <div style="color:#64748b;font-size:9px;">${esc(c.pricingEstimate)}</div>
            </td>
            <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#dc2626;">
              ${c.weaknesses.map(w => `• ${esc(w)}<br>`).join("")}
            </td>
            <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#059669;font-style:italic;">
              ${esc(c.winAngle)}
            </td>
          </tr>`).join("")}
      </tbody>
    </table>
    <div style="background:#dcfce7;border:1px solid #86efac;border-radius:8px;padding:12px 14px;margin-top:14px;">
      <div style="font-size:9px;font-weight:bold;color:#15803d;text-transform:uppercase;margin-bottom:4px;">Recommended Competitive Pitch</div>
      <p style="margin:0;font-size:11px;color:#14532d;">${esc(competitor.recommendedPitch)}</p>
    </div>
  </div>` : none("Competitor intelligence")}

  ${pageBreak}

  ${proposal ? `
  <!-- OUR PROPOSAL -->
  <div style="padding:24px 32px;border-bottom:1px solid #e2e8f0;">
    <span style="font-size:13px;font-weight:bold;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:14px;display:block;">📋 Our Proposal</span>
    <div style="background:#0f172a;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
      <div style="font-size:9px;font-weight:bold;color:#7dd3fc;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Proposed Solution</div>
      <div style="font-size:15px;font-weight:bold;color:#fff;margin-bottom:6px;">${esc(proposal.solutionName)}</div>
      <p style="font-size:11px;color:#e2e8f0;margin:0;">${esc(proposal.elevatorPitch)}</p>
    </div>
    <div style="margin-bottom:14px;">
      <div style="font-size:9px;font-weight:bold;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Key Features</div>
      <table style="width:100%;border-collapse:collapse;font-size:10px;">
        <thead><tr>
          <th style="background:#f8fafc;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;width:25%;">Feature</th>
          <th style="background:#f8fafc;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;width:30%;">What It Does</th>
          <th style="background:#f8fafc;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;width:25%;">Pain Solved</th>
          <th style="background:#f8fafc;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;width:20%;">Impact</th>
        </tr></thead>
        <tbody>
          ${proposal.features.map(f => `
            <tr>
              <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;font-weight:bold;">${esc(f.name)}</td>
              <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;">${esc(f.description)}</td>
              <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#64748b;">${esc(f.painItSolves)}</td>
              <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#059669;">${esc(f.impact)}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <div style="margin-bottom:14px;">
      <div style="font-size:9px;font-weight:bold;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Before vs After</div>
      <table style="width:100%;border-collapse:collapse;font-size:10px;">
        <thead><tr>
          <th style="background:#f8fafc;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;width:25%;">Area</th>
          <th style="background:#fef2f2;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;color:#dc2626;">Before</th>
          <th style="background:#f0fdf4;padding:6px 8px;text-align:left;font-weight:bold;border-bottom:1px solid #e2e8f0;color:#16a34a;">After TwoCoreX</th>
        </tr></thead>
        <tbody>
          ${proposal.beforeAfter.map((b, i) => `
            <tr style="background:${i % 2 === 0 ? "#fff" : "#f8fafc"};">
              <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;font-weight:bold;">${esc(b.area)}</td>
              <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#9f1239;">${esc(b.before)}</td>
              <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;color:#14532d;">${esc(b.after)}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:14px;">
      <div style="flex:1;min-width:200px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 14px;">
        <div style="font-size:9px;font-weight:bold;color:#15803d;text-transform:uppercase;margin-bottom:8px;">Expected ROI</div>
        ${[
    ["Time to ROI", proposal.expectedROI.timeToROI],
    ["Time Saved/Month", proposal.expectedROI.monthlyTimeSaved],
    ["Revenue Impact", proposal.expectedROI.revenueImpact],
    ["Annual Savings", proposal.expectedROI.costSavings],
  ].map(([l, v]) => `<div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="color:#16a34a;font-size:10px;">${esc(l)}</span><span style="font-weight:bold;font-size:10px;">${esc(v)}</span></div>`).join("")}
      </div>
      <div style="flex:1;min-width:200px;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;">
        <div style="font-size:9px;font-weight:bold;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;">Why TwoCoreX</div>
        ${proposal.whyTwoCoreX.map((w, i) => `<div style="font-size:10px;margin-bottom:4px;display:flex;gap:6px;"><span style="font-weight:bold;color:#0284c7;">${i + 1}.</span><span>${esc(w)}</span></div>`).join("")}
      </div>
    </div>
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 14px;">
      <div style="font-size:9px;font-weight:bold;color:#92400e;text-transform:uppercase;margin-bottom:4px;">Primary Close Script</div>
      <p style="margin:0;font-size:11px;color:#1e293b;">${esc(proposal.callToActionScripts.primary)}</p>
    </div>
  </div>` : none("Proposal intelligence")}

  ${pageBreak}

  ${biz ? `
  <!-- BIZ INTEL HIGHLIGHTS -->
  <div style="padding:24px 32px;border-bottom:1px solid #e2e8f0;">
    <span style="font-size:13px;font-weight:bold;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:14px;display:block;">Business Intelligence Highlights</span>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px;">
      ${[
    { label: "Health Score", val: `${biz.healthScore.score}/10 · ${biz.healthScore.label}`, bg: "#f0fdf4", border: "#bbf7d0", c: "#15803d" },
    { label: "Budget Likelihood", val: `${biz.budgetLikelihood.percentage}%`, bg: "#eff6ff", border: "#bfdbfe", c: "#1d4ed8" },
    { label: "Deal Size", val: biz.dealSize.mostLikely, bg: "#faf5ff", border: "#e9d5ff", c: "#7c3aed" },
    { label: "Time to Close", val: `${biz.timeToClose.minWeeks}–${biz.timeToClose.maxWeeks} weeks`, bg: "#fffbeb", border: "#fde68a", c: "#d97706" },
  ].map(({ label, val, bg, border, c }) => `
      <div style="flex:1;min-width:130px;background:${bg};border:1px solid ${border};border-radius:8px;padding:10px 12px;">
        <div style="font-size:9px;font-weight:bold;color:${c};text-transform:uppercase;">${label}</div>
        <div style="font-size:13px;font-weight:bold;color:#0f172a;margin-top:4px;">${esc(val)}</div>
      </div>`).join("")}
    </div>
    <div style="background:#312e81;color:#fff;border-radius:8px;padding:14px 16px;">
      <div style="font-size:9px;font-weight:bold;color:#a5b4fc;text-transform:uppercase;margin-bottom:6px;">Next Best Action</div>
      <div style="font-size:12px;font-weight:bold;margin-bottom:4px;">${esc(biz.nextBestAction.action)}</div>
      <div style="font-size:10px;color:#c7d2fe;">${esc(biz.nextBestAction.script)}</div>
    </div>
  </div>` : none("Business intelligence")}

  ${close ? `
  <!-- CLOSE STRATEGY -->
  <div style="padding:24px 32px;border-bottom:1px solid #e2e8f0;">
    <span style="font-size:13px;font-weight:bold;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:14px;display:block;">🔥 One-Call Close Strategy</span>
    <div style="background:#1a0a00;border-radius:8px;padding:14px 16px;margin-bottom:16px;">
      <div style="font-size:9px;font-weight:bold;color:#fb923c;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Master Close Angle</div>
      <div style="font-size:13px;font-weight:bold;color:#fff;margin-bottom:6px;">${esc(close.masterCloseAngle.headline)}</div>
      <p style="font-size:10px;color:#fed7aa;margin:0;">${esc(close.masterCloseAngle.explanation)}</p>
    </div>
    <div style="margin-bottom:14px;">
      <div style="font-size:9px;font-weight:bold;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Call Script</div>
      ${[
    { label: "Opener", text: close.oneCallScript.opener },
    { label: "Solution Bridge", text: close.oneCallScript.solutionBridge },
    { label: "The Close", text: close.oneCallScript.closingAsk },
  ].map(({ label, text }) => `
        <div style="border:1px solid #e2e8f0;border-radius:6px;padding:8px 10px;margin-bottom:6px;">
          <div style="font-size:9px;font-weight:bold;color:#0369a1;text-transform:uppercase;margin-bottom:3px;">${label}</div>
          <div style="font-size:11px;">${esc(text)}</div>
        </div>`).join("")}
    </div>
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 12px;">
      <div style="font-size:9px;font-weight:bold;color:#dc2626;text-transform:uppercase;margin-bottom:3px;">Nuclear Option</div>
      <p style="margin:0;font-size:11px;">${esc(close.nuclearOption)}</p>
    </div>
  </div>` : none("Close intel")}

  ${social ? `
  <!-- SOCIAL PRESENCE -->
  <div style="padding:24px 32px;border-bottom:1px solid #e2e8f0;">
    <span style="font-size:13px;font-weight:bold;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:14px;display:block;">Social & Digital Presence</span>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
      ${Object.entries(social.socialProfiles).filter(([, v]) => v).map(([k, v]) => `
        <div style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:6px;padding:4px 10px;font-size:10px;font-weight:bold;">${k}: ${esc(v ?? "")}</div>`).join("")}
    </div>
    <p style="font-size:11px;color:#374151;margin-bottom:12px;">${esc(social.digitalPresenceSummary)}</p>
    <div style="font-size:9px;font-weight:bold;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Top Conversation Starters</div>
    ${social.outreachConversationStarters.slice(0, 3).map((s, i) => `
      <div style="display:flex;gap:8px;margin-bottom:6px;align-items:flex-start;">
        <span style="background:#7c3aed;color:#fff;border-radius:999px;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:bold;flex-shrink:0;">${i + 1}</span>
        <span style="font-size:11px;">${esc(s)}</span>
      </div>`).join("")}
  </div>` : none("Social intelligence")}

  <!-- FOOTER -->
  <div style="padding:20px 32px;background:#f8fafc;text-align:center;">
    <p style="font-size:9px;color:#94a3b8;margin:0;">Confidential · TwoCoreX Sales Intelligence · Generated ${today} · Cached data may be up to 7 days old</p>
  </div>

</div>`;
}

function esc(str: string | null | undefined): string {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
