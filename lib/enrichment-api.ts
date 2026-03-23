/**
 * enrichment-api.ts
 * Client-side functions for fetching and saving lead enrichment data.
 */

import type { LeadEnrichment } from "@/types";

// ── Helpers ────────────────────────────────────────────────────────────────────

async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }

  return res.json() as Promise<T>;
}

// ── Enrichment ─────────────────────────────────────────────────────────────────

/**
 * Fetch enrichment data for a lead.
 * Returns null if no enrichment record exists yet.
 */
export async function getEnrichment(leadId: string): Promise<LeadEnrichment | null> {
  return apiFetch<LeadEnrichment | null>(
    `/api/enrichment/${encodeURIComponent(leadId)}`
  );
}

/**
 * Save (create or update) enrichment data for a lead.
 * Accepts any subset of LeadEnrichment fields.
 */
export async function saveEnrichment(
  leadId: string,
  data: Partial<Omit<LeadEnrichment, "leadId" | "enrichedAt">>
): Promise<void> {
  await apiFetch<LeadEnrichment>(
    `/api/enrichment/${encodeURIComponent(leadId)}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}
