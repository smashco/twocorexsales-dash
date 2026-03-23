"use client";
import { useEffect } from "react";
import { useRecentlyViewed } from "@/components/RecentlyViewed";

/**
 * Drop this into any lead detail page (client or server component via this client wrapper).
 * It silently tracks the visit in localStorage for the "Recently Viewed" sidebar section.
 *
 * Usage in /app/leads/[id]/page.tsx:
 *   import { TrackRecentView } from "@/components/lead-detail/TrackRecentView";
 *   // In the JSX: <TrackRecentView leadId={lead.id} />
 */
export function TrackRecentView({ leadId }: { leadId: string }) {
  const { pushRecentLead } = useRecentlyViewed();

  useEffect(() => {
    pushRecentLead(leadId);
  }, [leadId, pushRecentLead]);

  return null;
}
