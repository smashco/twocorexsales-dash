"use client";

import { useState, useEffect } from "react";
import { Radar, Loader2, RefreshCw, Copy, Check, Zap, AlertTriangle, TrendingUp, Search, CheckCircle2, Clock } from "lucide-react";
import type { Lead, IntentSignalData } from "@/types";

interface Props { lead: Lead }

const SCORE_CONFIG = {
  "Very High": { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", bar: "bg-red-500", label: "🔥 Very High" },
  "High":      { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", bar: "bg-orange-500", label: "⚡ High" },
  "Medium":    { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", bar: "bg-amber-400", label: "🌡 Medium" },
  "Low":       { color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200", bar: "bg-gray-400", label: "💤 Low" },
};

const READINESS_COLORS: Record<string, string> = {
  "Ready to Switch":       "bg-red-100 text-red-700 border border-red-200",
  "Actively Evaluating":   "bg-orange-100 text-orange-700 border border-orange-200",
  "Considering":           "bg-amber-100 text-amber-700 border border-amber-200",
  "Satisfied with Current": "bg-gray-100 text-gray-600 border border-gray-200",
  "No Current Tool":       "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

const URGENCY_COLORS: Record<string, string> = {
  "Strike Now":            "bg-red-500 text-white",
  "Follow Up This Week":   "bg-orange-500 text-white",
  "Add to Nurture":        "bg-amber-400 text-white",
  "Monitor":               "bg-gray-300 text-gray-700",
};

const SIGNAL_ICONS: Record<string, string> = {
  "Vendor Dissatisfaction":  "😤",
  "Active Evaluation":       "🔍",
  "Price Shopping":          "💸",
  "Feature Gap":             "🧩",
  "No Current Solution":     "⚪",
  "Compliance Trigger":      "📋",
  "Growth Trigger":          "📈",
  "Competitor Threat":       "⚔️",
};

const CONFIDENCE_COLORS: Record<string, string> = {
  HIGH:   "bg-red-100 text-red-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW:    "bg-gray-100 text-gray-500",
};

const CATEGORY_COLORS: Record<string, string> = {
  "CRM":              "bg-blue-50 text-blue-700 border-blue-200",
  "ERP / Accounting": "bg-purple-50 text-purple-700 border-purple-200",
  "E-Commerce":       "bg-pink-50 text-pink-700 border-pink-200",
  "Payment":          "bg-green-50 text-green-700 border-green-200",
  "Marketing":        "bg-orange-50 text-orange-700 border-orange-200",
  "HR / Payroll":     "bg-teal-50 text-teal-700 border-teal-200",
  "Support":          "bg-sky-50 text-sky-700 border-sky-200",
  "Website Builder":  "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Logistics":        "bg-amber-50 text-amber-700 border-amber-200",
  "Analytics":        "bg-violet-50 text-violet-700 border-violet-200",
  "Other":            "bg-gray-50 text-gray-600 border-gray-200",
};

export function IntentSignalsPanel({ lead }: Props) {
  const [data, setData] = useState<IntentSignalData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/intent-signals/${lead.id}`)
      .then(r => r.json())
      .then(j => { if (j.success && j.data) setData(j.data); })
      .catch(() => {});
  }, [lead.id]);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/intent-signals", {
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
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg">
          <Radar className="w-8 h-8 text-white" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-gray-900 text-lg mb-1">Live Intent Signals</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Scan their website for software fingerprints, detect if they&apos;re shopping for alternatives, and score their buying intent.
          </p>
          <p className="text-xs text-violet-600 font-medium mt-2">Free scan — no APIs needed</p>
        </div>
        {error && <p className="text-xs text-red-500 max-w-sm text-center">{error}</p>}
        <button
          onClick={generate}
          className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Scan for Intent Signals
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
        <p className="text-sm font-medium text-gray-700">Scanning website + analyzing intent signals...</p>
        <p className="text-xs text-gray-400">Fingerprinting tech stack · Detecting vendor dissatisfaction · Scoring intent</p>
      </div>
    );
  }

  if (!data) return null;

  const scoreConf = SCORE_CONFIG[data.intentScoreLabel] ?? SCORE_CONFIG["Medium"];
  const scorePct = (data.intentScore / 10) * 100;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-violet-600" />
          <h3 className="font-bold text-gray-900">Live Intent Signals</h3>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${READINESS_COLORS[data.switchingReadiness] ?? "bg-gray-100 text-gray-600"}`}>
            {data.switchingReadiness}
          </span>
        </div>
        <button onClick={generate} className="p-1.5 text-gray-400 hover:text-violet-600 transition-colors" title="Re-scan">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Intent Score hero */}
      <div className={`rounded-xl border ${scoreConf.border} ${scoreConf.bg} p-5`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Buying Intent Score</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-black ${scoreConf.color}`}>{data.intentScore}</span>
              <span className="text-lg text-gray-400">/10</span>
              <span className={`text-sm font-bold ${scoreConf.color}`}>{scoreConf.label}</span>
            </div>
          </div>
          <div className={`text-xs font-bold px-3 py-1.5 rounded-full ${READINESS_COLORS[data.switchingReadiness] ?? "bg-gray-100 text-gray-600"}`}>
            {data.switchingReadiness}
          </div>
        </div>
        {/* Score bar */}
        <div className="w-full bg-white/70 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all ${scoreConf.bar}`}
            style={{ width: `${scorePct}%` }}
          />
        </div>
      </div>

      {/* Detected Tech Stack */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-violet-500" />
          Tech Stack Detected on Website
          <span className="text-[10px] font-normal text-gray-400 normal-case">(free scan)</span>
        </h4>

        {data.detectedTechStack && data.detectedTechStack.length > 0 ? (
          <div className="space-y-2">
            {data.detectedTechStack.map((tech, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 mt-0.5 ${CATEGORY_COLORS[tech.category] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                  {tech.category}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{tech.tool}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{tech.implication}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-500">No known software tools detected on their website.</p>
            <p className="text-xs text-violet-600 mt-1">This often means they&apos;re using desktop tools (Tally, Excel) or WhatsApp — high opportunity for TwoCoreX.</p>
          </div>
        )}

        {/* Tech gap */}
        <div className="mt-3 rounded-xl bg-violet-50 border border-violet-200 p-3">
          <p className="text-[10px] font-bold text-violet-700 uppercase tracking-wider mb-1">Tech Stack Gap Analysis</p>
          <p className="text-xs text-gray-700">{data.techStackGap}</p>
        </div>
      </div>

      {/* Intent Signals */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
          Buying Intent Signals
        </h4>
        <div className="space-y-3">
          {data.signals.map((sig, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">{SIGNAL_ICONS[sig.type] ?? "📌"}</span>
                  <span className="text-xs font-bold text-gray-800">{sig.type}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CONFIDENCE_COLORS[sig.confidence] ?? "bg-gray-100 text-gray-600"}`}>
                    {sig.confidence}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${URGENCY_COLORS[sig.urgency] ?? "bg-gray-100 text-gray-600"}`}>
                    {sig.urgency}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-800">{sig.signal}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="font-medium text-gray-500">Source:</span> {sig.source}
                </p>
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-2.5">
                  <p className="text-[10px] font-bold text-violet-700 uppercase tracking-wider mb-0.5">Rep Action</p>
                  <p className="text-xs text-gray-700">{sig.salesAdvice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor tools detected */}
      {data.competitorToolsDetected && data.competitorToolsDetected.length > 0 && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4">
          <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Competitor Tools In Use
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.competitorToolsDetected.map((tool, i) => (
              <span key={i} className="text-xs bg-white border border-red-200 text-red-700 px-2.5 py-1 rounded-full font-medium">{tool}</span>
            ))}
          </div>
          <p className="text-xs text-red-600 mt-2">These are tools TwoCoreX competes with. Lead with switching cost analysis.</p>
        </div>
      )}

      {/* Indian Market Context */}
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
        <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" />
          Indian Market Context
        </h4>
        <p className="text-sm text-gray-700">{data.indianMarketContext}</p>
      </div>

      {/* Recommended Approach + Next Best Action */}
      <div className="rounded-xl bg-gradient-to-br from-gray-900 to-violet-950 p-5 text-white space-y-4">
        <div>
          <p className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-2">Recommended Sales Approach</p>
          <p className="text-sm text-gray-200 leading-relaxed">{data.recommendedApproach}</p>
        </div>
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-bold text-violet-300 uppercase tracking-wider">Next Best Action</p>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />{data.nextBestAction.timing}
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-2">{data.nextBestAction.action}</p>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-[10px] font-bold text-violet-300 uppercase tracking-wider mb-1">Opening Line</p>
                <p className="text-xs text-gray-200 italic">&ldquo;{data.nextBestAction.openingLine}&rdquo;</p>
              </div>
            </div>
            <button
              onClick={() => copy(data.nextBestAction.openingLine, "opening")}
              className="shrink-0 p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              {copiedKey === "opening" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
        Scanned {new Date(data.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · Cached 3 days
      </p>
    </div>
  );
}
