"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCRMStore } from "@/lib/crm-storage";
import { LEADS } from "@/data/leads";
import { CRM_STATUS_LABELS } from "@/lib/pricing";
import type { CRMStatus } from "@/types";

const STATUSES: CRMStatus[] = [
  "not_started", "researched", "message_sent", "in_conversation",
  "demo_scheduled", "proposal_sent", "won", "lost",
];

const STATUS_COLORS: Record<CRMStatus, string> = {
  not_started:    "#9CA3AF",
  researched:     "#6366F1",
  message_sent:   "#2471A3",
  in_conversation:"#E67E22",
  demo_scheduled: "#8B5CF6",
  proposal_sent:  "#0D4F5C",
  won:            "#1E8449",
  lost:           "#C0392B",
  nurturing:      "#D97706",
};

export function PipelineKanban() {
  const [counts, setCounts] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const store = getCRMStore();
    const grouped: Record<string, string[]> = {};
    // Start with all not_started
    LEADS.forEach((l) => {
      const status = store.leads[l.id]?.status ?? "not_started";
      if (!grouped[status]) grouped[status] = [];
      grouped[status].push(l.id);
    });
    setCounts(grouped);
  }, []);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-700">CRM Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {STATUSES.map((status) => {
            const ids = counts[status] ?? [];
            const color = STATUS_COLORS[status];
            const leads = LEADS.filter((l) => ids.includes(l.id)).slice(0, 4);
            return (
              <div key={status} className="shrink-0 w-36 rounded-lg p-2 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold truncate" style={{ color }}>
                    {CRM_STATUS_LABELS[status]}
                  </span>
                  <span className="text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                        style={{ background: color + "20", color }}>
                    {ids.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {leads.map((l) => (
                    <Link key={l.id} href={`/leads/${l.id}`}
                          className="block text-xs text-gray-600 bg-white rounded px-2 py-1 hover:bg-blue-50 truncate transition-colors">
                      {l.companyName}
                    </Link>
                  ))}
                  {ids.length > 4 && (
                    <p className="text-xs text-gray-400 px-1">+{ids.length - 4} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
