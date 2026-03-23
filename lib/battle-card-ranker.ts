import type { Lead, LeadCRMState, BattleCard } from "@/types";

function daysSince(isoDate: string | null): number {
  if (!isoDate) return 9999;
  return Math.floor((Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24));
}

export function rankLeads(leads: Lead[], crmStates: Record<string, LeadCRMState>): BattleCard[] {
  const cards: BattleCard[] = leads.map((lead) => {
    const crmState = crmStates[lead.id] ?? {
      leadId: lead.id,
      status: "not_started",
      callLogs: [],
      generalNotes: "",
      customOutreachMessage: null,
      lastContactedAt: null,
      nextFollowUpAt: null,
      isStarred: false,
    };

    // Exclude won/lost
    if (crmState.status === "won" || crmState.status === "lost") {
      return { lead, crmState, rankScore: -999, rankReason: "Closed" };
    }

    let score = lead.score * 10;
    const reasons: string[] = [];

    if (lead.qualification === "HOT") { score += 15; reasons.push("HOT lead"); }
    else { score += 5; reasons.push("WARM lead"); }

    if (lead.intentLevel === "HIGH") { score += 10; reasons.push("HIGH intent"); }

    if (crmState.isStarred) { score += 8; reasons.push("Starred"); }

    const days = daysSince(crmState.lastContactedAt);
    if (days === 9999) { score += 5; reasons.push("Never contacted"); }
    else if (days >= 7) { score += 3; reasons.push(`${days}d since contact`); }
    else { score -= days * 2; }

    if (crmState.status === "not_started") { score += 5; }
    if (crmState.status === "in_conversation") { score += 8; reasons.push("Active convo"); }
    if (crmState.status === "demo_scheduled") { score += 12; reasons.push("Demo upcoming"); }

    // Follow-up due?
    if (crmState.nextFollowUpAt) {
      const dueIn = Math.floor(
        (new Date(crmState.nextFollowUpAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (dueIn <= 0) { score += 20; reasons.push("Follow-up OVERDUE"); }
      else if (dueIn <= 2) { score += 15; reasons.push(`Follow-up in ${dueIn}d`); }
    }

    return { lead, crmState, rankScore: score, rankReason: reasons.join(" · ") };
  });

  return cards
    .filter((c) => c.rankScore > -999)
    .sort((a, b) => b.rankScore - a.rankScore);
}
