"use client";
import { useMemo } from "react";
import type { Lead, LeadCRMState } from "@/types";

interface WinProbabilityProps {
  lead: Lead;
  crmState: LeadCRMState;
}

export function calcWinProbability(lead: Lead, crmState: LeadCRMState): number {
  if (crmState.status === "lost") return 0;
  if (crmState.status === "won") return 100;

  let score = 0;

  // Base: score * 8, capped at 80
  score += Math.min(lead.score * 8, 80);

  // Qualification
  if (lead.qualification === "HOT") score += 10;
  else if (lead.qualification === "WARM") score += 5;

  // Intent
  if (lead.intentLevel === "HIGH") score += 8;
  else if (lead.intentLevel === "MEDIUM") score += 3;

  // CRM status bonuses
  const statusBonus: Partial<Record<string, number>> = {
    in_conversation: 5,
    demo_scheduled: 10,
    proposal_sent: 15,
  };
  score += statusBonus[crmState.status] ?? 0;

  // Has call logs
  if (crmState.callLogs.length > 0) score += 5;

  // Cap at 99 (only "won" = 100)
  return Math.min(Math.round(score), 99);
}

function getProbabilityColor(pct: number): { text: string; bg: string; border: string } {
  if (pct >= 70) return { text: "#166534", bg: "#DCFCE7", border: "#86EFAC" };
  if (pct >= 40) return { text: "#92400E", bg: "#FEF3C7", border: "#FCD34D" };
  return { text: "#991B1B", bg: "#FEE2E2", border: "#FCA5A5" };
}

function getProbabilityLabel(pct: number): string {
  if (pct >= 85) return "Very likely to close";
  if (pct >= 70) return "Good chance";
  if (pct >= 55) return "Moderate";
  if (pct >= 40) return "Needs nurturing";
  if (pct >= 20) return "Long shot";
  return "Low probability";
}

export function WinProbability({ lead, crmState }: WinProbabilityProps) {
  const pct = useMemo(() => calcWinProbability(lead, crmState), [lead, crmState]);
  const { text, bg, border } = getProbabilityColor(pct);
  const label = getProbabilityLabel(pct);

  const circumference = 2 * Math.PI * 18; // r=18
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div
      className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border"
      style={{ background: bg, borderColor: border }}
      title={`Win Probability: ${pct}%`}
    >
      {/* Mini circular progress */}
      <svg width="36" height="36" viewBox="0 0 40 40" className="shrink-0 -rotate-90">
        <circle cx="20" cy="20" r="18" fill="none" stroke={border} strokeWidth="4" />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke={text}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text
          x="20"
          y="20"
          textAnchor="middle"
          dominantBaseline="central"
          fill={text}
          fontSize="10"
          fontWeight="bold"
          className="rotate-90"
          transform="rotate(90, 20, 20)"
        >
          {pct}%
        </text>
      </svg>

      <div>
        <div className="text-xs font-bold" style={{ color: text }}>
          Win Probability: {pct}%
        </div>
        <div className="text-xs" style={{ color: text, opacity: 0.75 }}>
          {label}
        </div>
      </div>
    </div>
  );
}
