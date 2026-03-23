"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, IndianRupee, Lock, TrendingDown, Hammer, ChevronDown, ChevronUp } from "lucide-react";
import type { PricingRecommendation } from "@/types";

export function PricingCard({ pricing }: { pricing: PricingRecommendation }) {
  const [showFloor, setShowFloor] = useState(false);
  const [showDevFloor, setShowDevFloor] = useState(false);
  const [devExpanded, setDevExpanded] = useState(false);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const tierColors = {
    Starter:  { bg: "#EFF6FF", border: "#BFDBFE", text: "#1D4ED8" },
    Growth:   { bg: "#F0FDF4", border: "#BBF7D0", text: "#15803D" },
    Business: { bg: "#FAF5FF", border: "#E9D5FF", text: "#7C3AED" },
  };
  const tc = tierColors[pricing.tier];

  const devCostPitch = pricing.projectDev
    ? `The ${pricing.projectDev.label.toLowerCase()} is a one-time project starting from ₹${pricing.projectDev.minCost.toLocaleString("en-IN")} — this is fully custom-built for your business. Monthly platform subscription of ₹${pricing.monthlyPrice.toLocaleString("en-IN")}/month starts after delivery.`
    : null;

  return (
    <div className="space-y-3">
      {/* Monthly SaaS Subscription */}
      <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: tc.border }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ background: tc.bg }}>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4" style={{ color: tc.text }} />
            <span className="font-bold text-sm" style={{ color: tc.text }}>{pricing.tier} Plan</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: tc.border, color: tc.text }}>
              Monthly SaaS
            </span>
          </div>
          <span className="text-2xl font-extrabold" style={{ color: tc.text }}>
            ₹{pricing.monthlyPrice.toLocaleString("en-IN")}
            <span className="text-sm font-normal text-gray-400">/mo</span>
          </span>
        </div>

        {/* Opening offer */}
        <div className="px-4 py-3 bg-white border-b">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">🎯 Opening Offer (Say This First)</p>
          <p className="text-sm text-gray-700 leading-relaxed">{pricing.openingOffer}</p>
          <button onClick={() => copy(pricing.openingOffer, "Opening offer")}
                  className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
            <Copy className="w-3 h-3" /> Copy pitch
          </button>
        </div>

        {/* Annual deal */}
        <div className="px-4 py-3 bg-white border-b">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">📅 Annual Deal</p>
          <p className="text-sm text-gray-700">{pricing.annualPitch}</p>
          <button onClick={() => copy(pricing.annualPitch, "Annual pitch")}
                  className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
            <Copy className="w-3 h-3" /> Copy pitch
          </button>
        </div>

        {/* Rationale + Floor */}
        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
          <div className="text-xs text-gray-400">{pricing.rationale}</div>
          <button
            onClick={() => setShowFloor(!showFloor)}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors"
          >
            <Lock className="w-3 h-3" />
            {showFloor ? (
              <span className="text-red-600 font-bold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Floor: ₹{pricing.floorPrice.toLocaleString("en-IN")}/mo
              </span>
            ) : "Show floor price"}
          </button>
        </div>
      </div>

      {/* Project Development Cost — only for non-CRM-only leads */}
      {pricing.projectDev && (
        <div className="rounded-xl border-2 border-purple-200 overflow-hidden">
          {/* Dev cost header */}
          <button
            onClick={() => setDevExpanded(!devExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Hammer className="w-4 h-4 text-purple-600" />
              <span className="font-bold text-sm text-purple-700">{pricing.projectDev.label}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-200 text-purple-700">
                One-Time Project
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold text-purple-700">
                ₹{(pricing.projectDev.minCost / 1000).toFixed(0)}K–{(pricing.projectDev.maxCost / 1000).toFixed(0)}K
              </span>
              {devExpanded ? <ChevronUp className="w-4 h-4 text-purple-500" /> : <ChevronDown className="w-4 h-4 text-purple-500" />}
            </div>
          </button>

          {devExpanded && (
            <>
              {/* What's included */}
              <div className="px-4 py-3 bg-white border-b">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">What's Included</p>
                <p className="text-sm text-gray-700">{pricing.projectDev.note}</p>
              </div>

              {/* Dev pitch */}
              {devCostPitch && (
                <div className="px-4 py-3 bg-white border-b">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">💬 How to Pitch This</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{devCostPitch}</p>
                  <button onClick={() => copy(devCostPitch, "Dev cost pitch")}
                          className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
                    <Copy className="w-3 h-3" /> Copy pitch
                  </button>
                </div>
              )}

              {/* Payment note */}
              <div className="px-4 py-3 bg-white border-b">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">💳 Payment Structure (Suggest This)</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0">1</span>
                    <span><strong>50% upfront</strong> (₹{Math.round(pricing.projectDev.minCost * 0.5).toLocaleString("en-IN")}) to start development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0">2</span>
                    <span><strong>50% on delivery</strong> — after UAT sign-off</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center shrink-0">+</span>
                    <span>Monthly SaaS subscription of ₹{pricing.monthlyPrice.toLocaleString("en-IN")}/mo starts after go-live</span>
                  </div>
                </div>
              </div>

              {/* Floor price (hidden) */}
              <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                <div className="text-xs text-gray-400">Never quote below floor</div>
                <button
                  onClick={() => setShowDevFloor(!showDevFloor)}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  {showDevFloor ? (
                    <span className="text-red-600 font-bold flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      Floor: ₹{pricing.projectDev.floorCost.toLocaleString("en-IN")}
                    </span>
                  ) : "Show dev floor"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
