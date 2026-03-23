/**
 * crm-api.ts
 * Client-side functions that call the CRM API routes.
 * These mirror the same function signatures as crm-storage.ts but persist to
 * PostgreSQL via the API layer instead of localStorage.
 */

import type { LeadCRMState, CallLog, CRMStatus } from "@/types";

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

// ── CRM State ──────────────────────────────────────────────────────────────────

/**
 * Fetch the full CRM state for a lead (including call logs).
 * Returns a default state object if the lead has no CRM record yet.
 */
export async function getLeadCRMState(leadId: string): Promise<LeadCRMState> {
  return apiFetch<LeadCRMState>(`/api/crm/${encodeURIComponent(leadId)}`);
}

/**
 * Partially update a lead's CRM state.
 * Accepts any subset of updatable fields (everything except leadId and callLogs).
 */
export async function updateLeadCRMState(
  leadId: string,
  updates: Partial<Omit<LeadCRMState, "leadId" | "callLogs">>
): Promise<LeadCRMState> {
  return apiFetch<LeadCRMState>(`/api/crm/${encodeURIComponent(leadId)}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

/**
 * Shortcut to update just the CRM pipeline status.
 */
export async function updateStatus(
  leadId: string,
  status: CRMStatus
): Promise<void> {
  await updateLeadCRMState(leadId, { status });
}

/**
 * Toggle the starred flag for a lead. Returns the new value.
 */
export async function toggleStar(leadId: string): Promise<boolean> {
  const current = await getLeadCRMState(leadId);
  const newVal = !current.isStarred;
  await updateLeadCRMState(leadId, { isStarred: newVal });
  return newVal;
}

// ── Call Logs ─────────────────────────────────────────────────────────────────

/**
 * Fetch all call logs for a lead, sorted newest-first.
 */
export async function getCallLogs(leadId: string): Promise<CallLog[]> {
  return apiFetch<CallLog[]>(
    `/api/crm/${encodeURIComponent(leadId)}/call-logs`
  );
}

/**
 * Add a new call log entry. Also updates lastContactedAt on the parent
 * CRM record server-side.
 */
export async function addCallLog(
  leadId: string,
  log: Omit<CallLog, "id">
): Promise<void> {
  await apiFetch<CallLog>(
    `/api/crm/${encodeURIComponent(leadId)}/call-logs`,
    {
      method: "POST",
      body: JSON.stringify(log),
    }
  );
}

/**
 * Delete a specific call log by id.
 */
export async function removeCallLog(
  leadId: string,
  logId: string
): Promise<void> {
  await apiFetch<{ success: boolean }>(
    `/api/crm/${encodeURIComponent(leadId)}/call-logs/${encodeURIComponent(logId)}`,
    { method: "DELETE" }
  );
}

// ── Status Counts ─────────────────────────────────────────────────────────────

/**
 * Returns the count of leads per CRM status.
 * Keys are CRMStatus values; missing statuses will have value 0.
 */
export async function getStatusCounts(): Promise<Record<string, number>> {
  return apiFetch<Record<string, number>>("/api/crm/status-counts");
}
