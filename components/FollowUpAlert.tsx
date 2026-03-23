"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, X, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { getCRMStore } from "@/lib/crm-storage";
import { LEADS } from "@/data/leads";
import type { Lead } from "@/types";
import { format, isToday, isBefore, startOfDay } from "date-fns";

interface FollowUpItem {
  lead: Lead;
  nextFollowUpAt: string;
  overdue: boolean;
}

function getFollowUps(): FollowUpItem[] {
  if (typeof window === "undefined") return [];
  const store = getCRMStore();
  const today = startOfDay(new Date());
  const items: FollowUpItem[] = [];

  Object.values(store.leads).forEach((crmState) => {
    if (!crmState.nextFollowUpAt) return;
    if (crmState.status === "won" || crmState.status === "lost") return;

    const followUpDate = new Date(crmState.nextFollowUpAt);
    const isDue = isToday(followUpDate) || isBefore(followUpDate, today);
    if (!isDue) return;

    const lead = LEADS.find((l) => l.id === crmState.leadId);
    if (!lead) return;

    items.push({
      lead,
      nextFollowUpAt: crmState.nextFollowUpAt,
      overdue: isBefore(startOfDay(followUpDate), today),
    });
  });

  // Sort: overdue first, then by date ascending
  return items.sort((a, b) => {
    if (a.overdue && !b.overdue) return -1;
    if (!a.overdue && b.overdue) return 1;
    return new Date(a.nextFollowUpAt).getTime() - new Date(b.nextFollowUpAt).getTime();
  });
}

export function FollowUpAlert() {
  const [items, setItems] = useState<FollowUpItem[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getFollowUps());
  }, []);

  if (!mounted || items.length === 0 || dismissed) return null;

  const overdueCount = items.filter((i) => i.overdue).length;
  const todayCount = items.length - overdueCount;

  const bannerColor = overdueCount > 0
    ? { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B", accent: "#EF4444" }
    : { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E", accent: "#F59E0B" };

  return (
    <div
      className="rounded-xl border mb-4 overflow-hidden"
      style={{ background: bannerColor.bg, borderColor: bannerColor.border }}
    >
      {/* Banner row */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          {overdueCount > 0 ? (
            <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: bannerColor.accent }} />
          ) : (
            <Bell className="w-4 h-4 shrink-0" style={{ color: bannerColor.accent }} />
          )}
          <div>
            <span className="text-sm font-semibold" style={{ color: bannerColor.text }}>
              {overdueCount > 0
                ? `${overdueCount} overdue follow-up${overdueCount !== 1 ? "s" : ""}`
                : ""}
              {overdueCount > 0 && todayCount > 0 ? " · " : ""}
              {todayCount > 0
                ? `${todayCount} due today`
                : ""}
            </span>
            <span className="text-xs ml-2" style={{ color: bannerColor.text, opacity: 0.7 }}>
              {items.length} total
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-lg hover:bg-black/5 transition-colors"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" style={{ color: bannerColor.text }} />
            ) : (
              <ChevronDown className="w-4 h-4" style={{ color: bannerColor.text }} />
            )}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" style={{ color: bannerColor.text }} />
          </button>
        </div>
      </div>

      {/* Expanded lead list */}
      {expanded && (
        <div className="border-t" style={{ borderColor: bannerColor.border }}>
          {items.map((item) => (
            <Link
              key={item.lead.id}
              href={`/leads/${item.lead.id}`}
              className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-black/5 transition-colors border-b last:border-0"
              style={{ borderColor: bannerColor.border }}
            >
              <div className="flex items-center gap-2 min-w-0">
                {item.overdue ? (
                  <span className="shrink-0 w-2 h-2 rounded-full bg-red-500" />
                ) : (
                  <span className="shrink-0 w-2 h-2 rounded-full bg-amber-400" />
                )}
                <span className="text-sm font-medium truncate" style={{ color: bannerColor.text }}>
                  {item.lead.companyName}
                </span>
                <span
                  className="shrink-0 px-1.5 py-0.5 rounded text-xs font-bold"
                  style={{
                    background: item.lead.qualification === "HOT" ? "#FEE2E2" : "#FEF3C7",
                    color: item.lead.qualification === "HOT" ? "#DC2626" : "#D97706",
                  }}
                >
                  {item.lead.qualification}
                </span>
              </div>
              <div className="shrink-0 text-xs" style={{ color: bannerColor.text, opacity: 0.7 }}>
                {item.overdue
                  ? `Overdue · ${format(new Date(item.nextFollowUpAt), "dd MMM")}`
                  : `Today · ${format(new Date(item.nextFollowUpAt), "h:mm a")}`}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
