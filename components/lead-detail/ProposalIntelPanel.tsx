"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FileText, Loader2, RefreshCw, Copy, Check, CheckCircle2, ArrowRight, Clock, TrendingUp, Zap, Star, BarChart3, PieChart, Target, Rocket, Shield, DollarSign } from "lucide-react";
import type { Lead, PricingRecommendation, ProposalIntelData } from "@/types";

interface Props { lead: Lead; pricing: PricingRecommendation }

// ── Mini SVG Charts ───────────────────────────────────────────────────────────

function DonutChart({ value, max, color, label, size = 80 }: { value: number; max: number; color: string; label: string; size?: number }) {
  const pct = Math.min(value / max, 1);
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={6} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-lg font-black" style={{ color }}>{Math.round(pct * 100)}%</span>
      </div>
      <span className="text-[10px] text-gray-500 font-medium text-center">{label}</span>
    </div>
  );
}

function HorizontalBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function ImpactMeter({ label, level }: { label: string; level: "High" | "Medium" | "Critical" }) {
  const config = { Critical: { bars: 5, color: "#EF4444" }, High: { bars: 4, color: "#F59E0B" }, Medium: { bars: 3, color: "#3B82F6" } };
  const c = config[level] ?? config.Medium;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600 min-w-20">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="w-3 rounded-sm transition-all duration-500"
            style={{ height: 8 + i * 3, background: i <= c.bars ? c.color : "#E5E7EB" }} />
        ))}
      </div>
      <span className="text-[10px] font-bold" style={{ color: c.color }}>{level}</span>
    </div>
  );
}

function MiniAreaChart({ data, color, height = 50 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data);
  const w = 200;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - (v / max) * (height - 5)}`).join(" ");
  const areaPoints = `0,${height} ${points} ${w},${height}`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace("#", "")})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PHASE_COLORS = [
  { bg: "bg-sky-50", border: "border-sky-200", num: "bg-sky-600", text: "text-sky-700", hex: "#0284C7" },
  { bg: "bg-indigo-50", border: "border-indigo-200", num: "bg-indigo-600", text: "text-indigo-700", hex: "#4F46E5" },
  { bg: "bg-emerald-50", border: "border-emerald-200", num: "bg-emerald-600", text: "text-emerald-700", hex: "#059669" },
  { bg: "bg-amber-50", border: "border-amber-200", num: "bg-amber-600", text: "text-amber-700", hex: "#D97706" },
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
            Generate a tailored solution proposal with business impact analysis, ROI charts, and closing scripts for {lead.companyName}.
          </p>
        </div>
        {error && <p className="text-xs text-red-500 max-w-sm text-center">{error}</p>}
        <button onClick={generate}
          className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-200">
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
        <p className="text-xs text-gray-400">Analyzing business impact for {lead.companyName}</p>
      </div>
    );
  }

  if (!data) return null;

  // Derive visual data from the proposal
  const featureCount = data.features.length;
  const phaseCount = data.implementationTimeline.length;

  return (
    <div className="space-y-6">
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

      {/* ═══ HERO — Solution name + elevator pitch ═══ */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="TwoCoreX" width={24} height={24} className="object-contain" />
            </div>
            <Rocket className="w-4 h-4 text-sky-400" />
            <p className="text-xs font-bold text-sky-400 uppercase tracking-wider">Proposed Solution</p>
          </div>
          <h2 className="text-xl font-bold text-white mb-3">{data.solutionName}</h2>
          <p className="text-sm text-gray-300 leading-relaxed">{data.elevatorPitch}</p>
          <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-black text-sky-400">{featureCount}</div>
              <div className="text-[10px] text-gray-400">Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400">{phaseCount}</div>
              <div className="text-[10px] text-gray-400">Phases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-amber-400">{data.expectedROI.timeToROI}</div>
              <div className="text-[10px] text-gray-400">Time to ROI</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BUSINESS IMPACT DASHBOARD ═══ */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <div className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-sky-600 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-white" />
          <span className="text-sm font-bold text-white">Business Impact Dashboard</span>
        </div>
        <div className="p-5 space-y-5">
          {/* Impact donut charts row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Efficiency Gain", value: 75, color: "#059669" },
              { label: "Error Reduction", value: 85, color: "#3B82F6" },
              { label: "Time Savings", value: 60, color: "#8B5CF6" },
              { label: "Revenue Impact", value: 40, color: "#F59E0B" },
            ].map((item) => (
              <div key={item.label} className="relative flex flex-col items-center">
                <DonutChart value={item.value} max={100} color={item.color} label={item.label} />
              </div>
            ))}
          </div>

          {/* Operations improvement bars */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-500" />
              Projected Operations Improvement
            </p>
            <HorizontalBar label="Manual Process Elimination" value={80} max={100} color="#059669" />
            <HorizontalBar label="Data Accuracy" value={92} max={100} color="#3B82F6" />
            <HorizontalBar label="Response Time" value={70} max={100} color="#8B5CF6" />
            <HorizontalBar label="Customer Satisfaction" value={65} max={100} color="#F59E0B" />
            <HorizontalBar label="Team Productivity" value={55} max={100} color="#EF4444" />
          </div>

          {/* Growth projection area chart */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              Projected Growth After Implementation
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-400 mb-1">Revenue Growth Trajectory</p>
                <MiniAreaChart data={[20, 25, 30, 42, 55, 68, 80, 90, 95, 100]} color="#059669" />
                <div className="flex justify-between text-[9px] text-gray-400 mt-1 px-1">
                  <span>Month 1</span><span>Month 6</span><span>Month 12</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-1">Operational Cost Savings</p>
                <MiniAreaChart data={[5, 12, 22, 35, 48, 55, 62, 70, 78, 85]} color="#3B82F6" />
                <div className="flex justify-between text-[9px] text-gray-400 mt-1 px-1">
                  <span>Month 1</span><span>Month 6</span><span>Month 12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Impact meters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pain Point Resolution</p>
              <ImpactMeter label="Pain Point 1" level="Critical" />
              <ImpactMeter label="Pain Point 2" level="High" />
              <ImpactMeter label="Pain Point 3" level="High" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Business Risk Reduction</p>
              <ImpactMeter label="Compliance" level="Critical" />
              <ImpactMeter label="Data Loss" level="High" />
              <ImpactMeter label="Revenue Leak" level="Critical" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ ROI BREAKDOWN ═══ */}
      <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
        <div className="px-5 py-3 bg-emerald-600 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-white" />
          <span className="text-sm font-bold text-white">ROI & Financial Impact</span>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              { label: "Time to ROI", val: data.expectedROI.timeToROI, icon: Clock, color: "#059669" },
              { label: "Monthly Time Saved", val: data.expectedROI.monthlyTimeSaved, icon: TrendingUp, color: "#3B82F6" },
              { label: "Revenue Impact", val: data.expectedROI.revenueImpact, icon: BarChart3, color: "#8B5CF6" },
              { label: "Annual Savings", val: data.expectedROI.costSavings, icon: DollarSign, color: "#F59E0B" },
            ].map(({ label, val, icon: Icon, color }) => (
              <div key={label} className="rounded-xl bg-white border border-emerald-100 p-3 text-center">
                <Icon className="w-4 h-4 mx-auto mb-1" style={{ color }} />
                <p className="text-sm font-black text-gray-900">{val}</p>
                <p className="text-[10px] text-gray-500">{label}</p>
              </div>
            ))}
          </div>

          {/* ROI waterfall */}
          <div className="rounded-xl border border-emerald-100 bg-white p-4">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">ROI Waterfall</p>
            <div className="flex items-end gap-2 h-24">
              {[
                { label: "Labour\nSaved", pct: 85, color: "#059669" },
                { label: "Error\nReduction", pct: 70, color: "#10B981" },
                { label: "Speed\nGain", pct: 60, color: "#34D399" },
                { label: "Revenue\nGrowth", pct: 45, color: "#6EE7B7" },
                { label: "Client\nRetention", pct: 55, color: "#A7F3D0" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] font-bold text-gray-600">{pct}%</span>
                  <div className="w-full rounded-t-md transition-all duration-1000" style={{ height: `${pct}%`, background: color }} />
                  <span className="text-[8px] text-gray-400 text-center whitespace-pre-line leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success metrics */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.successMetrics.map((m, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-700 bg-white rounded-lg border border-emerald-100 px-3 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FEATURES ═══ */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-sky-500" />
          What We&apos;re Building For You
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.features.map((feat, i) => (
            <div key={i} className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm font-bold text-gray-900">{feat.name}</p>
              </div>
              <p className="text-xs text-gray-600 mb-2 ml-8">{feat.description}</p>
              <div className="ml-8 space-y-1">
                <span className="inline-block text-[10px] bg-white border border-sky-200 text-sky-700 px-2 py-0.5 rounded-full">
                  Solves: {feat.painItSolves}
                </span>
                <p className="text-[10px] font-semibold text-emerald-700">→ {feat.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ BEFORE vs AFTER ═══ */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
          Before vs After TwoCoreX
        </h4>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-900">
            <div className="px-4 py-2.5 text-[10px] font-bold text-gray-300 uppercase tracking-wider">Area</div>
            <div className="px-4 py-2.5 text-[10px] font-bold text-red-400 uppercase tracking-wider border-l border-gray-700">Before</div>
            <div className="px-4 py-2.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider border-l border-gray-700">After TwoCoreX</div>
          </div>
          {data.beforeAfter.map((item, i) => (
            <div key={i} className={`grid grid-cols-3 border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
              <div className="px-4 py-3 text-xs font-semibold text-gray-700">{item.area}</div>
              <div className="px-4 py-3 text-xs text-red-600 border-l border-gray-100 flex items-start gap-1">
                <span className="text-red-400 mt-0.5">✕</span> {item.before}
              </div>
              <div className="px-4 py-3 text-xs text-emerald-700 font-medium border-l border-gray-100 flex items-start gap-1">
                <span className="text-emerald-500 mt-0.5">✓</span> {item.after}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ IMPLEMENTATION TIMELINE ═══ */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-sky-500" />
          Implementation Timeline
        </h4>
        {/* Visual timeline bar */}
        <div className="flex gap-1 mb-4 h-3 rounded-full overflow-hidden">
          {data.implementationTimeline.map((phase, i) => {
            const c = PHASE_COLORS[i] ?? PHASE_COLORS[0];
            return <div key={i} className="flex-1 relative group" style={{ background: c.hex }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white/80">Phase {phase.phase}</span>
              </div>
            </div>;
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {data.implementationTimeline.map((phase, i) => {
            const c = PHASE_COLORS[i] ?? PHASE_COLORS[0];
            return (
              <div key={i} className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-lg ${c.num} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
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

      {/* ═══ WHY TWOCOREX ═══ */}
      <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-indigo-50 p-5">
        <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          Why TwoCoreX
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.whyTwoCoreX.map((reason, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white/70 rounded-lg px-3 py-2">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
              {reason}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ PRICING JUSTIFICATION ═══ */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pricing Justification</h4>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl font-black text-gray-900">{pricing.tier} Plan</span>
          <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700 font-semibold">{pricing.serviceCategory}</span>
        </div>
        <p className="text-sm text-gray-700">{data.pricingJustification}</p>
      </div>

      {/* ═══ CALL TO ACTION SCRIPTS ═══ */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Call to Action Scripts
        </h4>
        <div className="space-y-3">
          {[
            { key: "primary", label: "Primary Close", text: data.callToActionScripts.primary, color: "bg-gradient-to-r from-indigo-50 to-white border-indigo-200", textColor: "text-indigo-700" },
            { key: "followUp", label: "WhatsApp Follow-Up (within 2hrs)", text: data.callToActionScripts.followUp, color: "bg-gradient-to-r from-emerald-50 to-white border-emerald-200", textColor: "text-emerald-700" },
            { key: "objectionBridge", label: "If They Say \"Let me think...\"", text: data.callToActionScripts.objectionBridge, color: "bg-gradient-to-r from-amber-50 to-white border-amber-200", textColor: "text-amber-700" },
          ].map(({ key, label, text, color, textColor }) => (
            <div key={key} className={`rounded-xl border ${color} p-4`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className={`text-[10px] font-bold ${textColor} uppercase tracking-wider mb-1.5`}>{label}</p>
                  <p className="text-sm text-gray-800 leading-relaxed">{text}</p>
                </div>
                <button onClick={() => copy(text, key)} className="shrink-0 p-1.5 text-gray-400 hover:text-gray-600">
                  {copiedKey === key ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timestamp */}
      <p className="text-[10px] text-gray-400 text-center">
        Generated {new Date(data.generatedAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })} · Cached 7 days
      </p>
    </div>
  );
}
