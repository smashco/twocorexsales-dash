"use client";

import { useState, useEffect } from "react";
import { FileText, Loader2, RefreshCw, Copy, Check, CheckCircle2, ArrowRight, Clock, TrendingUp, Zap, Star } from "lucide-react";
import type { Lead, PricingRecommendation, ProposalIntelData } from "@/types";

interface Props { lead: Lead; pricing: PricingRecommendation }

const PHASE_COLORS = [
  { bg: "bg-sky-50", border: "border-sky-200", num: "bg-sky-600", text: "text-sky-700" },
  { bg: "bg-indigo-50", border: "border-indigo-200", num: "bg-indigo-600", text: "text-indigo-700" },
  { bg: "bg-emerald-50", border: "border-emerald-200", num: "bg-emerald-600", text: "text-emerald-700" },
];

export function ProposalIntelPanel({ lead, pricing }: Props) {
  const [data, setData] = useState<ProposalIntelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/proposal-intel/${lead.id}`)
      .then(r => r.json())
      .then(j => { if (j.success && j.data) setData(j.data); })
      .catch(() => {});
  }, [lead.id]);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/proposal-intel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setData(json.data);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  }

  if (!data && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-gray-900 text-lg mb-1">Our Proposal</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Generate a tailored solution proposal — features, ROI, timeline, and closing scripts specific to {lead.companyName}.
          </p>
        </div>
        {error && <p className="text-xs text-red-500 max-w-sm text-center">{error}</p>}
        <button
          onClick={generate}
          className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Generate Our Proposal
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
        <p className="text-sm font-medium text-gray-700">Building your custom proposal...</p>
        <p className="text-xs text-gray-400">Tailoring solution for {lead.industry} in {lead.city}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-sky-600" />
          <h3 className="font-bold text-gray-900">Our Proposal</h3>
        </div>
        <button onClick={generate} className="p-1.5 text-gray-400 hover:text-sky-600 transition-colors" title="Regenerate">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Hero — Solution name + elevator pitch */}
      <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white">
        <p className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Proposed Solution</p>
        <h2 className="text-lg font-bold text-white mb-3">{data.solutionName}</h2>
        <p className="text-sm text-gray-300 leading-relaxed">{data.elevatorPitch}</p>
      </div>

      {/* Features */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-sky-500" />
          What We&apos;re Building For You
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.features.map((feat, i) => (
            <div key={i} className="rounded-xl border border-sky-200 bg-sky-50 p-4">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm font-bold text-gray-900">{feat.name}</p>
              </div>
              <p className="text-xs text-gray-600 mb-2 ml-7">{feat.description}</p>
              <div className="ml-7 space-y-1">
                <span className="inline-block text-[10px] bg-white border border-sky-200 text-sky-700 px-2 py-0.5 rounded-full">
                  Solves: {feat.painItSolves}
                </span>
                <p className="text-[10px] font-semibold text-emerald-700">→ {feat.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before vs After */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
          Before vs After TwoCoreX
        </h4>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
            <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Area</div>
            <div className="px-3 py-2 text-[10px] font-bold text-red-500 uppercase tracking-wider border-l border-gray-200">Before</div>
            <div className="px-3 py-2 text-[10px] font-bold text-emerald-600 uppercase tracking-wider border-l border-gray-200">After TwoCoreX</div>
          </div>
          {data.beforeAfter.map((item, i) => (
            <div key={i} className={`grid grid-cols-3 border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
              <div className="px-3 py-3 text-xs font-semibold text-gray-700">{item.area}</div>
              <div className="px-3 py-3 text-xs text-gray-500 border-l border-gray-100">{item.before}</div>
              <div className="px-3 py-3 text-xs text-emerald-700 font-medium border-l border-gray-100">{item.after}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Timeline */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-sky-500" />
          Implementation Timeline
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {data.implementationTimeline.map((phase, i) => {
            const c = PHASE_COLORS[i] ?? PHASE_COLORS[0];
            return (
              <div key={i} className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full ${c.num} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                    {phase.phase}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${c.text}`}>{phase.title}</p>
                    <p className="text-[10px] text-gray-500">{phase.duration}</p>
                  </div>
                </div>
                <ul className="space-y-1 mb-3">
                  {phase.deliverables.map((d, j) => (
                    <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <CheckCircle2 className={`w-3 h-3 ${c.text} mt-0.5 shrink-0`} />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className={`rounded-lg border ${c.border} bg-white px-2.5 py-1.5`}>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Milestone</p>
                  <p className={`text-[10px] ${c.text} font-medium`}>{phase.milestone}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROI + Success Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
          <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Expected ROI
          </h4>
          <div className="space-y-2">
            {[
              { label: "Time to ROI", val: data.expectedROI.timeToROI },
              { label: "Time Saved/Month", val: data.expectedROI.monthlyTimeSaved },
              { label: "Revenue Impact", val: data.expectedROI.revenueImpact },
              { label: "Annual Savings", val: data.expectedROI.costSavings },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between items-start gap-2">
                <span className="text-xs text-emerald-600">{label}</span>
                <span className="text-xs font-semibold text-gray-800 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Success Metrics</h4>
          <ul className="space-y-1.5">
            {data.successMetrics.map((m, i) => (
              <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Why TwoCoreX */}
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
        <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-3">Why TwoCoreX</h4>
        <ul className="space-y-2">
          {data.whyTwoCoreX.map((reason, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-sky-500 font-bold shrink-0">{i + 1}.</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing Justification */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pricing Justification</h4>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl font-black text-gray-900">₹{pricing.monthlyPrice.toLocaleString("en-IN")}</span>
          <span className="text-sm text-gray-500">/month after 3 free months · {pricing.tier} Plan</span>
        </div>
        <p className="text-sm text-gray-700">{data.pricingJustification}</p>
      </div>

      {/* Call to Action Scripts */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Call to Action Scripts
        </h4>
        <div className="space-y-3">
          {[
            { key: "primary", label: "Primary Close", text: data.callToActionScripts.primary, color: "bg-indigo-50 border-indigo-200", textColor: "text-indigo-700" },
            { key: "followUp", label: "WhatsApp Follow-Up (within 2hrs)", text: data.callToActionScripts.followUp, color: "bg-emerald-50 border-emerald-200", textColor: "text-emerald-700" },
            { key: "objectionBridge", label: "If They Say \"Let me think...\"", text: data.callToActionScripts.objectionBridge, color: "bg-amber-50 border-amber-200", textColor: "text-amber-700" },
          ].map(({ key, label, text, color, textColor }) => (
            <div key={key} className={`rounded-xl border ${color} p-4`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className={`text-[10px] font-bold ${textColor} uppercase tracking-wider mb-1.5`}>{label}</p>
                  <p className="text-sm text-gray-800 leading-relaxed">{text}</p>
                </div>
                <button
                  onClick={() => copy(text, key)}
                  className="shrink-0 p-1.5 text-gray-400 hover:text-gray-600"
                >
                  {copiedKey === key ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timestamp */}
      <p className="text-[10px] text-gray-400 text-center">
        Generated {new Date(data.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · Cached 7 days
      </p>
    </div>
  );
}
