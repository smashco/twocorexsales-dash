"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock } from "lucide-react";
import { LEADS } from "@/data/leads";
import type { Lead } from "@/types";

const RECENT_KEY = "tc_recent";
const MAX_RECENT = 8;

export function useRecentlyViewed() {
  /**
   * Call this inside any lead detail page to push the current lead ID
   * to the recently-viewed list.
   */
  const pushRecentLead = useCallback((leadId: string) => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      const existing: string[] = raw ? JSON.parse(raw) : [];
      const updated = [leadId, ...existing.filter((id) => id !== leadId)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch {
      // Silently fail
    }
  }, []);

  return { pushRecentLead };
}

interface RecentlyViewedProps {
  /** Currently active lead ID to exclude from the list */
  currentLeadId?: string;
}

export function RecentlyViewed({ currentLeadId }: RecentlyViewedProps) {
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const loadRecent = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (!raw) return;
      const ids: string[] = JSON.parse(raw);
      const leads = ids
        .filter((id) => id !== currentLeadId)
        .map((id) => LEADS.find((l) => l.id === id))
        .filter((l): l is Lead => !!l)
        .slice(0, MAX_RECENT);
      setRecentLeads(leads);
    } catch {
      // Silently fail
    }
  }, [currentLeadId]);

  useEffect(() => {
    setMounted(true);
    loadRecent();
  }, [pathname, loadRecent]);

  if (!mounted || recentLeads.length === 0) return null;

  return (
    <div className="px-2 py-3 border-t border-white/10 mt-2">
      <div className="flex items-center gap-1.5 px-2 mb-2">
        <Clock className="w-3 h-3 text-white/40" />
        <span className="text-xs text-white/40 uppercase tracking-wide font-medium">Recently Viewed</span>
      </div>
      <div className="space-y-0.5">
        {recentLeads.map((lead) => (
          <Link
            key={lead.id}
            href={`/leads/${lead.id}`}
            className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all group"
          >
            <span className="text-xs truncate group-hover:text-white transition-colors">
              {lead.companyName}
            </span>
            <span
              className="shrink-0 px-1.5 py-0.5 rounded text-xs font-bold"
              style={{
                background: lead.qualification === "HOT" ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)",
                color: lead.qualification === "HOT" ? "#FCA5A5" : "#FCD34D",
              }}
            >
              {lead.qualification}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/*
═══════════════════════════════════════════════════════════════════════════════
ADD THIS TO /components/layout/AppSidebar.tsx
═══════════════════════════════════════════════════════════════════════════════

1. Import at top:
   import { RecentlyViewed } from "@/components/RecentlyViewed";

2. Inside SidebarContent(), add below the </nav> closing tag and before the footer stats:

   <RecentlyViewed />

3. The component reads from localStorage so it will automatically update as the
   user navigates between lead detail pages.

═══════════════════════════════════════════════════════════════════════════════
ALSO ADD THIS TO /app/leads/[id]/page.tsx
═══════════════════════════════════════════════════════════════════════════════

Since this is a Server Component, create a small client wrapper:

// components/lead-detail/TrackRecentView.tsx
"use client";
import { useEffect } from "react";
import { useRecentlyViewed } from "@/components/RecentlyViewed";

export function TrackRecentView({ leadId }: { leadId: string }) {
  const { pushRecentLead } = useRecentlyViewed();
  useEffect(() => { pushRecentLead(leadId); }, [leadId, pushRecentLead]);
  return null;
}

Then in /app/leads/[id]/page.tsx:
  import { TrackRecentView } from "@/components/lead-detail/TrackRecentView";
  // In the JSX, add: <TrackRecentView leadId={lead.id} />

═══════════════════════════════════════════════════════════════════════════════
*/
