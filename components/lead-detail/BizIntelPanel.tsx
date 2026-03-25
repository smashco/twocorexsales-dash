"use client";

import { useState, useEffect } from "react";
import {
  BarChart2, Loader2, RefreshCw, TrendingUp, TrendingDown,
  DollarSign, Clock, User, Target, Cpu, AlertTriangle,
  CheckCircle, Zap, Activity, Globe, ShoppingBag, Megaphone,
  Shield, Star, ArrowRight
} from "lucide-react";
import type { Lead, BizIntelData } from "@/types";

interface Props { lead: Lead; }

const URGENCY_STYLE: Record<string, string> = {
  HIGH: "bg-red-100 text-red-700 border-red-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  LOW: "bg-green-100 text-green-700 border-green-200",
};

const RISK_LIKELIHOOD: Record<string, string> = {
  HIGH: "text-red-600 bg-red-50",
  MEDIUM: "text-amber-600 bg-amber-50",
  LOW: "text-green-600 bg-green-50",
};

function ScoreBar({ score, max = 10, color = "bg-blue-500" }: { score: number; max?: number; color?: string }) {
  const pct = Math.min(100, (score / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-gray-600 w-8 text-right">{score}/{max}</span>
    </div>
  );
}

export function BizIntelPanel({ lead }: Props) {
  const [data, setData] = useState<BizIntelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/biz-intel/${lead.id}`)
      .then(r => r.json())
      .then(j => { if (j.success && j.data) setData(j.data); })
      .catch(() => {});
  }, [lead.id]);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/biz-intel", {
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

  if (!data && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
          <BarChart2 className="w-7 h-7 text-indigo-500" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Business Intelligence Report</p>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">20 analyst-level data points: health score, deal size, SWOT, risk matrix, ROI, next best action + more</p>
        </div>
        {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg max-w-sm">{error}</p>}
        <button
          onClick={generate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all"
        >
          <BarChart2 className="w-4 h-4" /> Generate Business Intelligence
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm text-gray-500">Claude is analyzing 20 business metrics...</p>
        <p className="text-xs text-gray-400">Takes 15–20 seconds</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Business Intelligence</h3>
            <p className="text-xs text-gray-400">{lead.companyName} · 20 analyst data points</p>
          </div>
        </div>
        <button onClick={generate} disabled={loading} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" title="Refresh">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* ── Row 1: Key metrics ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* 1. Health Score */}
        <div className="bg-white border rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Activity className="w-3.5 h-3.5 text-green-500" /> Health Score
          </div>
          <div className="text-2xl font-extrabold text-gray-800">{data.healthScore.score}<span className="text-sm font-normal text-gray-400">/100</span></div>
          <p className="text-xs text-green-600 font-medium">{data.healthScore.label}</p>
          <ScoreBar score={data.healthScore.score} max={100} color="bg-green-500" />
        </div>
        {/* 2. Budget Likelihood */}
        <div className="bg-white border rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <DollarSign className="w-3.5 h-3.5 text-blue-500" /> Budget Likelihood
          </div>
          <div className="text-2xl font-extrabold text-gray-800">{data.budgetLikelihood.percentage}<span className="text-sm font-normal text-gray-400">%</span></div>
          <p className="text-xs text-blue-600 font-medium">{data.budgetLikelihood.percentage >= 70 ? "High confidence" : data.budgetLikelihood.percentage >= 50 ? "Moderate" : "Low confidence"}</p>
          <ScoreBar score={data.budgetLikelihood.percentage} max={100} color="bg-blue-500" />
        </div>
        {/* 3. Digital Maturity */}
        <div className="bg-white border rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Cpu className="w-3.5 h-3.5 text-purple-500" /> Digital Maturity
          </div>
          <div className="text-2xl font-extrabold text-gray-800">{data.digitalMaturity.score}<span className="text-sm font-normal text-gray-400">/10</span></div>
          <p className="text-xs text-purple-600 font-medium">{data.digitalMaturity.label}</p>
          <ScoreBar score={data.digitalMaturity.score} max={10} color="bg-purple-500" />
        </div>
        {/* 4. Time to Close */}
        <div className="bg-white border rounded-xl p-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-500" /> Time to Close
          </div>
          <div className="text-2xl font-extrabold text-gray-800">{data.timeToClose.minWeeks}–{data.timeToClose.maxWeeks}<span className="text-sm font-normal text-gray-400"> wks</span></div>
          <p className="text-xs text-amber-600 font-medium">{data.timeToClose.minWeeks <= 4 ? "Fast close" : data.timeToClose.minWeeks <= 8 ? "Standard" : "Long cycle"}</p>
        </div>
      </div>

      {/* ── Row 2: Deal Size + Revenue Estimate ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 5. Deal Size */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="w-4 h-4 text-indigo-500" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Deal Size Estimate</p>
          </div>
          <div className="flex items-end gap-4 mb-2">
            <div>
              <p className="text-xs text-gray-400">Min</p>
              <p className="text-lg font-bold text-gray-700">{data.dealSize.min}</p>
            </div>
            <div className="flex-1 h-px bg-gray-200 mb-2" />
            <div className="text-center">
              <p className="text-xs text-indigo-600 font-semibold">Most Likely</p>
              <p className="text-xl font-extrabold text-indigo-700">{data.dealSize.mostLikely}</p>
            </div>
            <div className="flex-1 h-px bg-gray-200 mb-2" />
            <div className="text-right">
              <p className="text-xs text-gray-400">Max</p>
              <p className="text-lg font-bold text-gray-700">{data.dealSize.max}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{data.dealSize.reasoning}</p>
        </div>
        {/* 13. Revenue Estimate */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Client Revenue Estimate</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Annual</span>
              <span className="text-sm font-bold text-gray-800">{data.revenueEstimate.annual}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Monthly</span>
              <span className="text-sm font-bold text-gray-800">{data.revenueEstimate.monthly}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">{data.revenueEstimate.reasoning}</p>
        </div>
      </div>

      {/* ── Row 3: ROI + Market Context ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 14. ROI */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-green-600" />
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">ROI for Client</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-xs text-green-700">Annual Savings</span>
              <span className="text-sm font-bold text-green-800">{data.roiForClient.annualSavings}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-green-700">Time to ROI</span>
              <span className="text-sm font-bold text-green-800">{data.roiForClient.timeToROI}</span>
            </div>
          </div>
          <p className="text-xs text-green-700 mt-2 font-medium">{data.roiForClient.primaryBenefit}</p>
        </div>
        {/* 15. Market Context */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Market Context</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-xs text-blue-700">Local Market</span>
              <span className="text-xs font-semibold text-blue-800">{data.marketContext.localMarketSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-blue-700">Growth Rate</span>
              <span className="text-xs font-semibold text-blue-800">{data.marketContext.growthRate}</span>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-2">{data.marketContext.opportunity}</p>
        </div>
      </div>

      {/* ── Row 4: Decision Maker ── */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-indigo-500" />
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Decision Maker Profile</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Title</p>
            <p className="text-sm font-semibold text-gray-800">{data.decisionMaker.title}</p>
            <p className="text-xs text-gray-500 mt-1">{data.decisionMaker.decisionStyle}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Top Priorities</p>
            <ul className="space-y-0.5">
              {data.decisionMaker.priorities.map((p, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <CheckCircle className="w-3 h-3 text-indigo-400 mt-0.5 shrink-0" />{p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t bg-indigo-50 -mx-4 -mb-4 px-4 pb-4 rounded-b-xl">
          <p className="text-xs font-semibold text-indigo-700 mb-1">How to Approach</p>
          <p className="text-xs text-indigo-700">{data.decisionMaker.howToApproach}</p>
        </div>
      </div>

      {/* ── Row 5: SWOT ── */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-amber-500" />
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">SWOT Analysis</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs font-bold text-green-700 mb-1.5">Strengths</p>
            <ul className="space-y-0.5">{data.swot.strengths.map((s, i) => <li key={i} className="text-xs text-green-700">· {s}</li>)}</ul>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-xs font-bold text-red-700 mb-1.5">Weaknesses</p>
            <ul className="space-y-0.5">{data.swot.weaknesses.map((s, i) => <li key={i} className="text-xs text-red-700">· {s}</li>)}</ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs font-bold text-blue-700 mb-1.5">Opportunities</p>
            <ul className="space-y-0.5">{data.swot.opportunities.map((s, i) => <li key={i} className="text-xs text-blue-700">· {s}</li>)}</ul>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <p className="text-xs font-bold text-amber-700 mb-1.5">Threats</p>
            <ul className="space-y-0.5">{data.swot.threats.map((s, i) => <li key={i} className="text-xs text-amber-700">· {s}</li>)}</ul>
          </div>
        </div>
      </div>

      {/* ── Row 6: Competitive + Tech Stack ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Competitive */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-red-500" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Competitive Landscape</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-400 mb-1">Likely Competitors</p>
            <div className="flex flex-wrap gap-1.5">
              {data.competitive.mainCompetitors.map((c, i) => (
                <span key={i} className="px-2 py-0.5 text-xs bg-red-50 text-red-700 rounded-full border border-red-100">{c}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1 mt-2">Our Advantage</p>
            <ul className="space-y-0.5">{data.competitive.ourAdvantage.map((a, i) => <li key={i} className="text-xs text-green-700 flex items-start gap-1"><CheckCircle className="w-3 h-3 mt-0.5 shrink-0" />{a}</li>)}</ul>
          </div>
          <p className="text-xs text-gray-500 mt-2 border-t pt-2">{data.competitive.switchingBarriers}</p>
        </div>
        {/* 10. Tech Stack + 11. Digital Gaps */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-purple-500" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Current Tech Stack</p>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {data.currentTechStack.map((tool, i) => (
              <span key={i} className="px-2 py-0.5 text-xs bg-purple-50 text-purple-700 rounded-full border border-purple-100">{tool}</span>
            ))}
          </div>
          <p className="text-xs font-semibold text-gray-500 mb-1">Digital Gaps We Can Fill</p>
          <ul className="space-y-0.5">{data.digitalMaturity.gaps.map((g, i) => <li key={i} className="text-xs text-purple-700 flex items-start gap-1"><Zap className="w-3 h-3 mt-0.5 shrink-0" />{g}</li>)}</ul>
        </div>
      </div>

      {/* ── Row 7: Industry Trends + Growth Signals ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Industry Trends</p>
          </div>
          <ul className="space-y-1.5">{data.industryTrends.map((t, i) => (
            <li key={i} className="text-xs text-gray-600 flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
              <span className="text-blue-500 font-bold shrink-0">{i + 1}.</span>{t}
            </li>
          ))}</ul>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Growth Signals</p>
          </div>
          <ul className="space-y-1.5">{data.growthSignals.map((s, i) => (
            <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />{s}
            </li>
          ))}</ul>
          <div className="mt-3 border-t pt-2">
            <p className="text-xs font-semibold text-gray-500 mb-1">Expansion Signals</p>
            <ul className="space-y-0.5">{data.expansionSignals.map((s, i) => (
              <li key={i} className="text-xs text-indigo-600 flex items-start gap-1.5">
                <ArrowRight className="w-3 h-3 mt-0.5 shrink-0" />{s}
              </li>
            ))}</ul>
          </div>
        </div>
      </div>

      {/* ── Row 8: Buying Signals + Marketing ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-600" />
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Buying Signals</p>
          </div>
          <ul className="space-y-1.5">{data.buyingSignals.map((s, i) => (
            <li key={i} className="text-xs text-amber-800 flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />{s}
            </li>
          ))}</ul>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone className="w-4 h-4 text-pink-500" />
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Marketing Maturity</p>
          </div>
          <p className="text-xs font-medium text-gray-700 mb-1">{data.marketingMaturity.level}</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {data.marketingMaturity.currentChannels.map((c, i) => (
              <span key={i} className="px-2 py-0.5 text-xs bg-pink-50 text-pink-700 rounded-full border border-pink-100">{c}</span>
            ))}
          </div>
          <p className="text-xs text-gray-500">{data.marketingMaturity.budget}</p>
        </div>
      </div>

      {/* ── Row 9: Risk Matrix ── */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Risk Matrix</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-2 text-gray-400 font-medium">Risk</th>
                <th className="pb-2 text-gray-400 font-medium">Likelihood</th>
                <th className="pb-2 text-gray-400 font-medium">Impact</th>
                <th className="text-left pb-2 text-gray-400 font-medium pl-3">Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {data.riskMatrix.map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 text-gray-700 pr-3">{row.risk}</td>
                  <td className="py-2 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-semibold ${RISK_LIKELIHOOD[row.likelihood] ?? ""}`}>{row.likelihood}</span>
                  </td>
                  <td className="py-2 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-semibold ${RISK_LIKELIHOOD[row.impact] ?? ""}`}>{row.impact}</span>
                  </td>
                  <td className="py-2 text-gray-500 pl-3">{row.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Row 10: Sales Cycle + Next Best Action (Hero CTA) ── */}
      <div className="bg-indigo-600 rounded-xl p-5 text-white">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wide mb-0.5">Sales Cycle Recommendation</p>
            <p className="font-bold text-lg">{data.salesCycleRecommendation.stage}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${URGENCY_STYLE[data.salesCycleRecommendation.urgency]}`}>
            {data.salesCycleRecommendation.urgency} URGENCY
          </span>
        </div>
        <div className="bg-indigo-700 rounded-lg p-3 mb-4">
          <p className="text-xs text-indigo-200 font-semibold mb-1 uppercase tracking-wide">Next Best Action</p>
          <p className="font-bold text-white">{data.nextBestAction.action}</p>
          <p className="text-xs text-indigo-300 mt-0.5">{data.nextBestAction.timing}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3 mb-3">
          <p className="text-xs text-indigo-200 font-semibold mb-1.5 uppercase tracking-wide">Opening Script</p>
          <p className="text-sm text-white italic leading-relaxed">&ldquo;{data.nextBestAction.script}&rdquo;</p>
        </div>
        <p className="text-xs text-indigo-300">{data.nextBestAction.reasoning}</p>
      </div>

      {/* Budget signals */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-blue-500" />
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Budget Intelligence</p>
        </div>
        <p className="text-sm text-gray-600 mb-2">{data.budgetLikelihood.reasoning}</p>
        <div className="flex flex-wrap gap-1.5">
          {data.budgetLikelihood.signals.map((s, i) => (
            <span key={i} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-100 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />{s}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-300 text-right">
        Generated {new Date(data.generatedAt).toLocaleString("en-IN")} · Cached 7 days
      </p>
    </div>
  );
}
