"use client";

import { useState } from "react";
import { FileText, Loader2, Copy, Check, Download, RefreshCw, IndianRupee, Globe } from "lucide-react";
import type { QuotationRequest, QuotationResponse } from "@/app/api/quotation/route";

const PROJECT_TYPES: QuotationRequest["projectType"][] = [
  "App Development",
  "CRM Basic",
  "CRM + Portal",
  "CRM + App",
  "Full Platform",
  "SaaS Platform",
];

const INDUSTRIES = [
  "Food & Beverage / Restaurant",
  "Healthcare / Clinic",
  "Fitness / Gym",
  "Education / Coaching",
  "Retail / Fashion",
  "Logistics / Courier",
  "Events / Wedding",
  "HR & Recruitment",
  "Financial Services / CA",
  "Interior Design",
  "Media / Digital Marketing",
  "Consulting / Professional Services",
  "E-Commerce",
  "Other",
];

const EMPTY_FORM: QuotationRequest = {
  clientName: "",
  companyName: "",
  city: "",
  country: "India",
  projectType: "App Development",
  features: "",
  timeline: "",
  teamSize: "",
  industry: "Food & Beverage / Restaurant",
  additionalNotes: "",
};

export default function QuotationPage() {
  const [form, setForm] = useState<QuotationRequest>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<QuotationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function update(field: keyof QuotationRequest, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function generateQuote() {
    if (!form.clientName || !form.companyName || !form.features) {
      setError("Please fill in Client Name, Company, and Features needed.");
      return;
    }
    setLoading(true);
    setError(null);
    setQuote(null);
    try {
      const res = await fetch("/api/quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setQuote(data.quotation);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  function copyQuote() {
    if (!quote) return;
    const text = formatQuoteText(quote);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadQuote() {
    if (!quote) return;
    const text = formatQuoteText(quote);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TwoCoreX-Quote-${quote.quoteId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[var(--navy)] flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Instant Quotation Maker</h1>
          <p className="text-xs text-gray-500">AI-powered quotes in 10 seconds — India & International</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Client Details</h2>

          {/* Country toggle */}
          <div className="flex gap-2">
            {(["India", "International"] as const).map((c) => (
              <button
                key={c}
                onClick={() => update("country", c)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  form.country === c
                    ? "bg-[var(--navy)] text-white border-[var(--navy)]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {c === "India" ? <IndianRupee className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Client Name *</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                placeholder="Rahul Sharma / John Smith"
                value={form.clientName}
                onChange={(e) => update("clientName", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Company Name *</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                placeholder="ABC Restaurant"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">City</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                placeholder="Pune / London / Dubai"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Team Size</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                placeholder="10–20 employees"
                value={form.teamSize}
                onChange={(e) => update("teamSize", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Project Type *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                value={form.projectType}
                onChange={(e) => update("projectType", e.target.value as QuotationRequest["projectType"])}
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Industry</label>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
              >
                {INDUSTRIES.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Features Needed *</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20 resize-none"
              rows={3}
              placeholder="e.g. Online ordering, delivery tracking, loyalty points, admin dashboard, WhatsApp notifications..."
              value={form.features}
              onChange={(e) => update("features", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Timeline</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                placeholder="3 months / ASAP / 6 weeks"
                value={form.timeline}
                onChange={(e) => update("timeline", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Additional Notes</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                placeholder="Budget mentioned, competitor, special requirement..."
                value={form.additionalNotes}
                onChange={(e) => update("additionalNotes", e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={generateQuote}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--navy)] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating Quote...</>
            ) : (
              <><FileText className="w-4 h-4" /> Generate Quote with AI</>
            )}
          </button>

          {quote && (
            <button
              onClick={() => { setQuote(null); setForm(EMPTY_FORM); }}
              className="w-full py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> New Quote
            </button>
          )}
        </div>

        {/* Quote output */}
        <div className="space-y-4">
          {!quote && !loading && (
            <div className="bg-white rounded-xl border shadow-sm p-10 flex flex-col items-center justify-center text-center text-gray-400 min-h-[300px]">
              <FileText className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm">Fill in the details and click &ldquo;Generate Quote&rdquo;</p>
              <p className="text-xs mt-1 opacity-70">Claude AI generates a professional quote in ~10 seconds</p>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-xl border shadow-sm p-10 flex flex-col items-center justify-center min-h-[300px]">
              <Loader2 className="w-10 h-10 animate-spin text-[var(--navy)] mb-3" />
              <p className="text-sm text-gray-500">Claude is crafting your quote...</p>
            </div>
          )}

          {quote && (
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              {/* Quote header */}
              <div className="bg-[var(--navy)] text-white px-6 py-4 flex items-start justify-between">
                <div>
                  <div className="text-xs opacity-60 mb-0.5">Quote #{quote.quoteId}</div>
                  <div className="font-bold text-lg">{quote.companyName}</div>
                  <div className="text-sm opacity-80">{quote.projectType} · {form.country}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyQuote}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                    title="Copy quote"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={downloadQuote}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                    title="Download as .txt"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-5 text-sm max-h-[70vh] overflow-y-auto">
                {/* Executive Summary */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1.5">Executive Summary</h3>
                  <p className="text-gray-600 leading-relaxed">{quote.executiveSummary}</p>
                </div>

                {/* Scope */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1.5">Scope of Work</h3>
                  <ul className="space-y-1">
                    {quote.scopeOfWork.map((item, i) => (
                      <li key={i} className="flex gap-2 text-gray-600">
                        <span className="text-[var(--navy)] font-bold shrink-0">{i + 1}.</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1.5">Pricing Breakdown</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-3 py-2 text-gray-500 font-medium">Item</th>
                          <th className="text-right px-3 py-2 text-gray-500 font-medium">Cost</th>
                          <th className="text-left px-3 py-2 text-gray-500 font-medium hidden sm:table-cell">Includes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quote.pricingBreakdown.map((row, i) => (
                          <tr key={i} className="border-t">
                            <td className="px-3 py-2 text-gray-700 font-medium">{row.item}</td>
                            <td className="px-3 py-2 text-right text-[var(--navy)] font-bold whitespace-nowrap">{row.cost}</td>
                            <td className="px-3 py-2 text-gray-500 hidden sm:table-cell">{row.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>Range: <strong className="text-gray-700">{quote.totalMinimum} – {quote.totalMaximum}</strong></span>
                  </div>
                </div>

                {/* Opening Offer — highlighted */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                  <div className="text-xs font-semibold text-emerald-700 mb-1 uppercase tracking-wide">First-Call Offer</div>
                  <p className="text-emerald-800 font-medium">{quote.openingOffer}</p>
                </div>

                {/* Recommended */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Recommended Package</h3>
                  <p className="text-gray-600">{quote.recommendedPackage}</p>
                </div>

                {/* Timeline + Payment */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Timeline</h3>
                    <p className="text-gray-600">{quote.timeline}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Payment Terms</h3>
                    <p className="text-gray-600">{quote.paymentTerms}</p>
                  </div>
                </div>

                {/* Why TwoCoreX */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1.5">Why TwoCoreX?</h3>
                  <ul className="space-y-1">
                    {quote.whyTwoCoreX.map((r, i) => (
                      <li key={i} className="flex gap-2 text-gray-600">
                        <span className="text-emerald-500">✓</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Step */}
                <div className="bg-[var(--navy)]/5 rounded-lg px-4 py-3">
                  <div className="text-xs font-semibold text-[var(--navy)] mb-1 uppercase tracking-wide">Next Step</div>
                  <p className="text-gray-700">{quote.nextStep}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatQuoteText(q: QuotationResponse): string {
  return `
TWOCOREX (OPC) PVT LTD — PROJECT QUOTATION
Quote ID: ${q.quoteId}
Generated: ${new Date(q.generatedAt).toLocaleDateString("en-IN")}

CLIENT: ${q.clientName}, ${q.companyName}
PROJECT TYPE: ${q.projectType}

─────────────────────────────────────────
EXECUTIVE SUMMARY
─────────────────────────────────────────
${q.executiveSummary}

─────────────────────────────────────────
SCOPE OF WORK
─────────────────────────────────────────
${q.scopeOfWork.map((s, i) => `${i + 1}. ${s}`).join("\n")}

─────────────────────────────────────────
PRICING BREAKDOWN
─────────────────────────────────────────
${q.pricingBreakdown.map((r) => `${r.item}: ${r.cost}\n   → ${r.note}`).join("\n")}

Total Range: ${q.totalMinimum} – ${q.totalMaximum}

─────────────────────────────────────────
RECOMMENDED PACKAGE
─────────────────────────────────────────
${q.recommendedPackage}

FIRST-CALL OFFER: ${q.openingOffer}

─────────────────────────────────────────
TIMELINE & PAYMENT
─────────────────────────────────────────
Timeline: ${q.timeline}
Payment: ${q.paymentTerms}

─────────────────────────────────────────
WHY TWOCOREX?
─────────────────────────────────────────
${q.whyTwoCoreX.map((r) => `✓ ${r}`).join("\n")}

─────────────────────────────────────────
NEXT STEP
─────────────────────────────────────────
${q.nextStep}

─────────────────────────────────────────
TwoCoreX (OPC) Pvt Ltd | Maharashtra, India
sales@twocorex.com
`.trim();
}
