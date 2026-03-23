"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { LEADS } from "@/data/leads";
import { rankLeads } from "@/lib/battle-card-ranker";
import { getCRMStore, updateLeadCRMState } from "@/lib/crm-storage";
import { getPricingRecommendation } from "@/lib/pricing";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Shuffle, CheckCircle, Zap, ArrowRight, Phone } from "lucide-react";
import type { BattleCard } from "@/types";

export default function BattleCardsPage() {
  const [cards, setCards] = useState<BattleCard[]>([]);
  const [contacted, setContacted] = useState<Set<string>>(new Set());

  const load = () => {
    const store = getCRMStore();
    const ranked = rankLeads(LEADS, store.leads).slice(0, 12);
    setCards(ranked);
  };

  useEffect(() => { load(); }, []);

  const markContacted = (leadId: string) => {
    updateLeadCRMState(leadId, { lastContactedAt: new Date().toISOString() });
    setContacted(prev => new Set([...prev, leadId]));
    toast.success("Marked as contacted today");
  };

  const visible = cards.filter(c => !contacted.has(c.lead.id));

  return (
    <>
      <TopBar title="Battle Cards" />
      <div className="flex-1 p-3 md:p-4 lg:p-6">

        {/* Header */}
        <div className="rounded-xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3"
             style={{ background: "var(--navy)" }}>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-yellow-400 shrink-0" />
              <h2 className="text-white font-bold">Today's Battle Queue</h2>
            </div>
            <p className="text-white/50 text-sm">
              {visible.length} leads to contact · Ranked by score, intent, and time since last contact
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white min-h-[44px]"
            onClick={load}
          >
            <Shuffle className="w-4 h-4" /> Re-rank
          </Button>
        </div>

        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 text-gray-400">
            <CheckCircle className="w-12 h-12 mb-3 text-green-400" />
            <p className="font-semibold text-gray-600">All done for today!</p>
            <p className="text-sm mt-1 text-center px-4">You've contacted all ranked leads. Great work!</p>
            <Button
              variant="outline"
              className="mt-4 gap-2 min-h-[44px]"
              onClick={() => { setContacted(new Set()); load(); }}
            >
              <Shuffle className="w-4 h-4" /> Start fresh
            </Button>
          </div>
        )}

        {/* Cards grid — 1 col on mobile, 2 on lg, 3 on xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((card, rank) => {
            const { lead, rankReason, rankScore } = card;
            const pricing = getPricingRecommendation(lead);
            const firstLine = lead.outreachMessage.split(".")[0] + ".";

            return (
              <div key={lead.id}
                   className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow w-full">
                {/* Rank strip */}
                <div className="flex items-center justify-between px-4 py-2.5"
                     style={{ background: rank === 0 ? "var(--hot-fill)" : rank <= 2 ? "var(--warm-fill)" : "#F8F9FA" }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-sm shrink-0" style={{
                      color: rank === 0 ? "var(--hot-red)" : rank <= 2 ? "var(--warm-amber)" : "#6B7280"
                    }}>
                      #{rank + 1}
                    </span>
                    <span className="text-xs text-gray-500 truncate">{rankReason}</span>
                  </div>
                  <span className="text-xs font-mono text-gray-400 shrink-0 ml-2">rank: {Math.round(rankScore)}</span>
                </div>

                {/* Body */}
                <div className="px-4 pt-3 pb-2">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-800 text-sm leading-tight">{lead.companyName}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{lead.city} · {lead.employees} emp</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{
                              background: lead.qualification === "HOT" ? "var(--hot-fill)" : "var(--warm-fill)",
                              color: lead.qualification === "HOT" ? "var(--hot-red)" : "var(--warm-amber)"
                            }}>
                        {lead.qualification}
                      </span>
                      <span className="text-xs font-bold text-green-700">{lead.score}/10</span>
                    </div>
                  </div>

                  {/* Trigger */}
                  <div className="rounded-lg px-3 py-2 mb-2 text-xs text-gray-600"
                       style={{ background: "var(--nurture-fill)" }}>
                    <span className="font-semibold" style={{ color: "var(--nurture-blue)" }}>Trigger: </span>
                    {lead.buyingTrigger}
                  </div>

                  {/* Channel */}
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-xs font-semibold text-gray-600 flex-1 truncate">{lead.action}</span>
                    <span className="text-xs text-green-700 font-bold shrink-0">₹{pricing.monthlyPrice.toLocaleString("en-IN")}/mo</span>
                  </div>

                  {/* Message preview */}
                  <p className="text-xs text-gray-500 italic border-l-2 border-gray-200 pl-2 mb-3 line-clamp-2">
                    "{firstLine}"
                  </p>
                </div>

                {/* Actions — tall touch targets */}
                <div className="flex items-stretch gap-2 px-4 pb-4">
                  <button
                    onClick={() => markContacted(lead.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg text-xs font-semibold transition-colors min-h-[44px]"
                    style={{ background: "var(--green-fill)", color: "var(--green-hv)" }}
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Mark Contacted
                  </button>
                  <Link
                    href={`/leads/${lead.id}`}
                    className="flex items-center justify-center gap-1 px-4 py-3 rounded-lg text-xs font-semibold border hover:bg-gray-50 transition-colors text-gray-600 min-h-[44px]"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}
