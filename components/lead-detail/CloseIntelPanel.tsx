"use client";

import { useState, useEffect } from "react";
import {
  Target, Zap, RefreshCw, Loader2, ChevronRight,
  AlertTriangle, Shield, Clock, DollarSign, Flame,
  MessageSquare, Phone, Trophy, Eye, Siren
} from "lucide-react";
import type { Lead, CloseIntelData } from "@/types";

interface Props { lead: Lead; }

const TRIGGER_COLORS: Record<string, string> = {
  "FOMO": "bg-purple-600",
  "Fear of Falling Behind": "bg-red-600",
  "Revenue Leak Pain": "bg-orange-600",
  "Competitor Threat": "bg-red-700",
  "Pride & Ambition": "bg-blue-600",
  "Operational Frustration": "bg-amber-600",
  "Growth Hunger": "bg-green-600",
};

export function CloseIntelPanel({ lead }: Props) {
  const [data, setData] = useState<CloseIntelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/close-intel/${lead.id}`)
      .then(r => r.json())
      .then(j => { if (j.success && j.data) setData(j.data); })
      .catch(() => {});
  }, [lead.id]);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/close-intel", {
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

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  if (!data && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
          <Flame className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-800 text-lg">One-Call Close Intel</p>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">AI crafts a hyper-personalized closing playbook — exact script, objection killers, and the one secret weapon to close this deal today</p>
        </div>
        {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        <button
          onClick={generate}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold hover:from-red-600 hover:to-orange-600 transition-all shadow-md"
        >
          <Flame className="w-4 h-4" /> Generate Close Playbook
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        <p className="text-sm font-medium text-gray-600">Building your one-call close strategy...</p>
        <p className="text-xs text-gray-400">Analyzing pain points, triggers, and closing angles</p>
      </div>
    );
  }

  if (!data) return null;

  const triggerColor = TRIGGER_COLORS[data.masterCloseAngle.emotionalTrigger] ?? "bg-gray-600";

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-sm">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">One-Call Close Playbook</h3>
            <p className="text-xs text-gray-400">{lead.companyName} · Hyper-personalized</p>
          </div>
        </div>
        <button onClick={generate} disabled={loading} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Regenerate">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* MASTER CLOSE ANGLE — Hero card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white shadow-xl">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" />
            <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">Master Close Angle</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold text-white ${triggerColor}`}>
            {data.masterCloseAngle.emotionalTrigger}
          </span>
        </div>
        <p className="text-lg font-bold text-white leading-snug mb-3">{data.masterCloseAngle.headline}</p>
        <p className="text-sm text-gray-300 leading-relaxed">{data.masterCloseAngle.explanation}</p>
      </div>

      {/* Secret Weapon */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-amber-600" />
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Secret Weapon — Drop This</p>
        </div>
        <p className="text-sm text-gray-800 font-medium leading-relaxed">{data.secretWeapon}</p>
        <button
          onClick={() => copyText(data.secretWeapon, "weapon")}
          className="mt-2 text-xs text-amber-600 hover:text-amber-800 font-medium"
        >
          {copiedKey === "weapon" ? "✓ Copied!" : "Copy"}
        </button>
      </div>

      {/* One-Call Script */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white">
          <Phone className="w-4 h-4" />
          <p className="text-xs font-bold uppercase tracking-wide">Word-for-Word Call Script</p>
        </div>
        <div className="divide-y">

          {/* Opener */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">1</span>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Opener</p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed font-medium italic">"{data.oneCallScript.opener}"</p>
            <button onClick={() => copyText(data.oneCallScript.opener, "opener")} className="mt-1.5 text-xs text-blue-500 hover:text-blue-700">
              {copiedKey === "opener" ? "✓ Copied!" : "Copy"}
            </button>
          </div>

          {/* Pain Diagnosis */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">2</span>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pain Diagnosis Questions</p>
            </div>
            <div className="space-y-2">
              {data.oneCallScript.painDiagnosis.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 italic">"{q}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Bridge */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center">3</span>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Solution Bridge</p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed italic">"{data.oneCallScript.solutionBridge}"</p>
            <button onClick={() => copyText(data.oneCallScript.solutionBridge, "bridge")} className="mt-1.5 text-xs text-green-500 hover:text-green-700">
              {copiedKey === "bridge" ? "✓ Copied!" : "Copy"}
            </button>
          </div>

          {/* Proof Point */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">4</span>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Proof Point to Drop</p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed italic">"{data.oneCallScript.proofPoint}"</p>
            <button onClick={() => copyText(data.oneCallScript.proofPoint, "proof")} className="mt-1.5 text-xs text-purple-500 hover:text-purple-700">
              {copiedKey === "proof" ? "✓ Copied!" : "Copy"}
            </button>
          </div>

          {/* Close */}
          <div className="p-4 bg-green-50">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">5</span>
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide">The Close — Say Exactly This</p>
            </div>
            <p className="text-base text-green-800 font-bold leading-relaxed italic">"{data.oneCallScript.closingAsk}"</p>
            <button onClick={() => copyText(data.oneCallScript.closingAsk, "close")} className="mt-1.5 text-xs text-green-600 hover:text-green-800 font-semibold">
              {copiedKey === "close" ? "✓ Copied!" : "Copy"}
            </button>
            <div className="mt-3 p-2.5 bg-white rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium">After asking: {data.oneCallScript.silenceInstruction}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Objection Killers */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-red-600" />
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Objection Killers</p>
        </div>
        {data.objectionKillers.map((ok, i) => (
          <div key={i} className="bg-white border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border-b">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <p className="text-xs font-bold text-red-700">"{ok.objection}"</p>
            </div>
            <div className="p-3 space-y-2">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Your Response:</p>
                <p className="text-sm text-gray-800 italic">"{ok.rebuttalScript}"</p>
                <button onClick={() => copyText(ok.rebuttalScript, `rebuttal-${i}`)} className="mt-1 text-xs text-red-500 hover:text-red-700">
                  {copiedKey === `rebuttal-${i}` ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className="pt-2 border-t">
                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">If That Doesn't Work:</p>
                <p className="text-xs text-gray-600">{ok.recoveryMove}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Urgency Ammo + Price Anchor side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Urgency */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-orange-600" />
            <p className="text-xs font-bold text-orange-700 uppercase tracking-wide">Urgency Ammo</p>
          </div>
          <div className="space-y-2">
            {data.urgencyAmmo.map((point, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* Price Anchor */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">Price Anchoring</p>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Cost of Inaction:</p>
              <p className="text-xs text-gray-700 font-medium mt-0.5">{data.priceAnchor.costOfInaction}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Value Frame:</p>
              <p className="text-xs text-gray-700 mt-0.5">{data.priceAnchor.valueFrame}</p>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-blue-200">
              <p className="text-[10px] text-blue-600 uppercase font-semibold mb-1">Trial Offer Script:</p>
              <p className="text-xs text-gray-800 italic">"{data.priceAnchor.trialOffer}"</p>
              <button onClick={() => copyText(data.priceAnchor.trialOffer, "trial")} className="mt-1 text-xs text-blue-500 hover:text-blue-700">
                {copiedKey === "trial" ? "✓ Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nuclear Option */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Siren className="w-4 h-4 text-red-200" />
          <p className="text-xs font-bold text-red-200 uppercase tracking-wide">Nuclear Option — Last Resort Only</p>
        </div>
        <p className="text-sm font-semibold text-white leading-relaxed">{data.nuclearOption}</p>
        <button onClick={() => copyText(data.nuclearOption, "nuclear")} className="mt-2 text-xs text-red-200 hover:text-white font-medium">
          {copiedKey === "nuclear" ? "✓ Copied!" : "Copy"}
        </button>
      </div>

      {/* Buying Signal + Follow-up */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-green-600" />
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide">Buying Signal to Watch</p>
          </div>
          <p className="text-sm text-gray-700">{data.buyingSignalToWatch}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Follow-Up (if not closed)</p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{data.followUpPlan}</p>
          <button onClick={() => copyText(data.followUpPlan, "followup")} className="mt-2 text-xs text-blue-500 hover:text-blue-700">
            {copiedKey === "followup" ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Trophy footer */}
      <div className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
        <Trophy className="w-4 h-4 text-amber-500" />
        <p className="text-xs font-semibold text-amber-700">You have everything you need to close {lead.companyName} today.</p>
      </div>

      {/* Footer timestamp */}
      <p className="text-xs text-gray-300 text-right">
        Generated {new Date(data.generatedAt).toLocaleString("en-IN")} · Cached 7 days
      </p>
    </div>
  );
}
