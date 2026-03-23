"use client";
import { useState, useMemo } from "react";
import { LEADS } from "@/data/leads";
import { getPricingRecommendation } from "@/lib/pricing";

// Pre-compute lead counts and avg prices per qualification
function getLeadStats() {
  const hot = LEADS.filter((l) => l.qualification === "HOT");
  const warm = LEADS.filter((l) => l.qualification === "WARM");

  const avgHotPrice =
    hot.length > 0
      ? Math.round(hot.reduce((s, l) => s + getPricingRecommendation(l).monthlyPrice, 0) / hot.length)
      : 1500;
  const avgWarmPrice =
    warm.length > 0
      ? Math.round(warm.reduce((s, l) => s + getPricingRecommendation(l).monthlyPrice, 0) / warm.length)
      : 1000;

  return { hotCount: hot.length, warmCount: warm.length, avgHotPrice, avgWarmPrice };
}

const stats = getLeadStats();

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function RevenueCalculator() {
  const [hotPct, setHotPct] = useState(30);
  const [warmPct, setWarmPct] = useState(15);
  const [expanded, setExpanded] = useState(true);

  const { monthlyRevenue, yearlyRevenue, closedHot, closedWarm } = useMemo(() => {
    const closedHot = Math.round((hotPct / 100) * stats.hotCount);
    const closedWarm = Math.round((warmPct / 100) * stats.warmCount);
    const monthlyRevenue = closedHot * stats.avgHotPrice + closedWarm * stats.avgWarmPrice;
    const yearlyRevenue = monthlyRevenue * 12;
    return { monthlyRevenue, yearlyRevenue, closedHot, closedWarm };
  }, [hotPct, warmPct]);

  const motivation =
    yearlyRevenue >= 1_000_000
      ? "That's over ₹10L/year. Keep pushing! 🔥"
      : yearlyRevenue >= 500_000
      ? "Strong pipeline! You're on track for ₹5L+/year."
      : yearlyRevenue >= 200_000
      ? "Solid start! Close a few more HOT leads to level up."
      : "Every closed deal counts. You've got this!";

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">💰</span>
          <span className="text-sm font-semibold text-gray-800">Revenue Calculator</span>
        </div>
        <span className="text-gray-400 text-lg">{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t">
          <p className="text-xs text-gray-500 pt-3">
            Estimate your monthly recurring revenue if you close a percentage of your leads.
          </p>

          {/* HOT leads slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                🔥 Close{" "}
                <span className="text-red-600 font-bold">{hotPct}%</span> of{" "}
                <span className="font-bold">{stats.hotCount} HOT</span> leads
              </label>
              <span className="text-xs text-gray-500">
                = {closedHot} deals · {formatINR(closedHot * stats.avgHotPrice)}/mo
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={hotPct}
              onChange={(e) => setHotPct(Number(e.target.value))}
              className="w-full accent-red-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>

          {/* WARM leads slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                ♨️ Close{" "}
                <span className="text-amber-600 font-bold">{warmPct}%</span> of{" "}
                <span className="font-bold">{stats.warmCount} WARM</span> leads
              </label>
              <span className="text-xs text-gray-500">
                = {closedWarm} deals · {formatINR(closedWarm * stats.avgWarmPrice)}/mo
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={warmPct}
              onChange={(e) => setWarmPct(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>

          {/* Result */}
          <div
            className="rounded-xl p-4 text-center"
            style={{ background: "var(--navy, #1A2744)" }}
          >
            <div className="text-xs text-white/60 mb-1">Estimated Monthly Revenue</div>
            <div className="text-3xl font-extrabold text-white">
              {formatINR(monthlyRevenue)}
              <span className="text-sm font-normal text-white/60">/mo</span>
            </div>
            <div className="mt-1 text-sm font-medium text-green-300">
              That&apos;s {formatINR(yearlyRevenue)} per year 🔥
            </div>
            <div className="mt-2 text-xs text-white/50">{motivation}</div>
          </div>

          <p className="text-xs text-gray-400">
            Based on avg HOT price {formatINR(stats.avgHotPrice)}/mo and WARM price {formatINR(stats.avgWarmPrice)}/mo
            across {LEADS.length} leads.
          </p>
        </div>
      )}
    </div>
  );
}
