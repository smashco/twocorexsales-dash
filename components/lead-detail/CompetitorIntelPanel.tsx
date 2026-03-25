"use client";

import { useState, useEffect } from "react";
import { Swords, Loader2, RefreshCw, Copy, Check, ShieldCheck, ShieldX, Zap, AlertTriangle, TrendingUp, Target } from "lucide-react";
import type { Lead, CompetitorIntelData } from "@/types";

interface Props { lead: Lead }

const URGENCY_COLORS: Record<string, string> = {
  "Strike Now": "bg-red-100 text-red-700 border border-red-200",
  "High Alert — Competitor Active": "bg-orange-100 text-orange-700 border border-orange-200",
  "Warm Up First": "bg-amber-100 text-amber-700 border border-amber-200",
  "Nurture": "bg-gray-100 text-gray-600 border border-gray-200",
};

const STATUS_COLORS: Record<string, string> = {
  "Actively Evaluating": "bg-red-100 text-red-700",
  "Dissatisfied with Current": "bg-orange-100 text-orange-700",
  "Recently Switched": "bg-blue-100 text-blue-700",
  "No Clear Vendor": "bg-emerald-100 text-emerald-700",
  "Loyal to Current": "bg-gray-100 text-gray-600",
};

const CONFIDENCE_COLORS: Record<string, string> = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW: "bg-gray-100 text-gray-500",
};

export function CompetitorIntelPanel({ lead }: Props) {
  const [data, setData] = useState<CompetitorIntelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/competitor-intel/${lead.id}`)
      .then(r => r.json())
      .then(j => { if (j.success && j.data) setData(j.data); })
      .catch(() => {});
  }, [lead.id]);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/competitor-intel", {
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
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
          <Swords className="w-8 h-8 text-white" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-gray-900 text-lg mb-1">Competitor Intelligence</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Find out who is competing for this deal, what tech they use, and how to beat them.
          </p>
        </div>
        {error && <p className="text-xs text-red-500 max-w-sm text-center">{error}</p>}
        <button
          onClick={generate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Generate Competitor Intel
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <p className="text-sm font-medium text-gray-700">Mapping competitors + hunting vendor signals...</p>
        <p className="text-xs text-gray-400">Analyzing {lead.industry} landscape in {lead.city}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-gray-900">Competitor Intelligence</h3>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[data.evaluationStatus] ?? "bg-gray-100 text-gray-600"}`}>
            {data.evaluationStatus}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${URGENCY_COLORS[data.urgencyIndicator] ?? "bg-gray-100 text-gray-600"}`}>
            {data.urgencyIndicator}
          </span>
          <button onClick={generate} className="p-1.5 text-gray-400 hover:text-emerald-600 transition-colors" title="Regenerate">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Evaluation Summary hero */}
      <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-emerald-400 mb-1">Vendor Evaluation Status</p>
            <p className="text-sm text-gray-200 leading-relaxed">{data.evaluationSummary}</p>
          </div>
        </div>
      </div>

      {/* Vendor Shopping Signals */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          Vendor Shopping Signals
        </h4>
        <div className="space-y-3">
          {data.vendorShoppingSignals.map((sig, i) => (
            <div key={i} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <p className="text-sm font-semibold text-gray-800">{sig.signal}</p>
                <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${CONFIDENCE_COLORS[sig.confidence] ?? "bg-gray-100 text-gray-600"}`}>
                  {sig.confidence}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{sig.evidence}</p>
              <div className="bg-white rounded-lg p-2.5 border border-amber-200">
                <p className="text-xs font-semibold text-amber-700 mb-0.5">Rep Action:</p>
                <p className="text-xs text-gray-700">{sig.actionableAdvice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Cards */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Swords className="w-3.5 h-3.5 text-emerald-600" />
          Competitors They&apos;re Likely Evaluating
        </h4>
        <div className="space-y-4">
          {data.competitors.map((comp, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              {/* Competitor header */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-start justify-between">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{comp.companyName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{comp.relevance}</p>
                </div>
                <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full shrink-0 ml-2">
                  {comp.pricingEstimate}
                </span>
              </div>

              <div className="p-4 space-y-3">
                {/* Tech stack */}
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.techStack.map((t, j) => (
                      <span key={j} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Strengths vs Weaknesses */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Strengths
                    </p>
                    <ul className="space-y-1">
                      {comp.strengths.map((s, j) => (
                        <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="text-green-500 mt-0.5 shrink-0">✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <ShieldX className="w-3 h-3" /> Weaknesses
                    </p>
                    <ul className="space-y-1">
                      {comp.weaknesses.map((w, j) => (
                        <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="text-red-400 mt-0.5 shrink-0">✗</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Win Angle */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1">Win Angle</p>
                      <p className="text-xs text-emerald-900">{comp.winAngle}</p>
                    </div>
                    <button
                      onClick={() => copy(comp.winAngle, `win-${i}`)}
                      className="shrink-0 p-1 text-emerald-500 hover:text-emerald-700"
                    >
                      {copiedKey === `win-${i}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Gap Analysis */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            Market Gap Analysis
          </h4>
        </div>
        <div className="p-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">The Gap</p>
            <p className="text-xs text-gray-700">{data.marketGapAnalysis.gapDescription}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Opportunity</p>
            <p className="text-xs text-gray-700">{data.marketGapAnalysis.opportunity}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">TwoCoreX Angle</p>
            <p className="text-xs text-emerald-800 font-medium">{data.marketGapAnalysis.twoCoreXAngle}</p>
          </div>
        </div>
      </div>

      {/* Recommended Pitch */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 p-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-emerald-200" />
              <p className="text-xs font-bold text-emerald-200 uppercase tracking-wider">Recommended Competitive Pitch</p>
            </div>
            <p className="text-sm text-white leading-relaxed">{data.recommendedPitch}</p>
          </div>
          <button
            onClick={() => copy(data.recommendedPitch, "pitch")}
            className="shrink-0 p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            {copiedKey === "pitch" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Timestamp */}
      <p className="text-[10px] text-gray-400 text-center">
        Generated {new Date(data.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · Cached 7 days
      </p>
    </div>
  );
}
