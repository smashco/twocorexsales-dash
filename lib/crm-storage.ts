"use client";
import type { CRMStore, LeadCRMState, CallLog, CRMStatus, AIInsights } from "@/types";

const STORAGE_KEY = "b2b_crm_store";
const INSIGHTS_PREFIX = "ai_insights_";
const CURRENT_VERSION = 1;

function defaultLeadState(leadId: string): LeadCRMState {
  return {
    leadId,
    status: "not_started",
    callLogs: [],
    generalNotes: "",
    customOutreachMessage: null,
    lastContactedAt: null,
    nextFollowUpAt: null,
    isStarred: false,
  };
}

function initStore(): CRMStore {
  return { version: CURRENT_VERSION, leads: {}, lastUpdated: new Date().toISOString() };
}

export function getCRMStore(): CRMStore {
  if (typeof window === "undefined") return initStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initStore();
    const parsed = JSON.parse(raw) as CRMStore;
    return parsed;
  } catch {
    return initStore();
  }
}

function saveStore(store: CRMStore): void {
  if (typeof window === "undefined") return;
  store.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getLeadCRMState(leadId: string): LeadCRMState {
  const store = getCRMStore();
  return store.leads[leadId] ?? defaultLeadState(leadId);
}

export function updateLeadCRMState(
  leadId: string,
  updates: Partial<Omit<LeadCRMState, "leadId" | "callLogs">>
): LeadCRMState {
  const store = getCRMStore();
  const current = store.leads[leadId] ?? defaultLeadState(leadId);
  const updated = { ...current, ...updates };
  store.leads[leadId] = updated;
  saveStore(store);
  return updated;
}

export function updateStatus(leadId: string, status: CRMStatus): void {
  updateLeadCRMState(leadId, { status });
}

export function addCallLog(leadId: string, log: Omit<CallLog, "id">): void {
  const store = getCRMStore();
  const current = store.leads[leadId] ?? defaultLeadState(leadId);
  const newLog: CallLog = { ...log, id: crypto.randomUUID() };
  current.callLogs = [newLog, ...current.callLogs];
  current.lastContactedAt = new Date().toISOString();
  store.leads[leadId] = current;
  saveStore(store);
}

export function removeCallLog(leadId: string, logId: string): void {
  const store = getCRMStore();
  const current = store.leads[leadId];
  if (!current) return;
  current.callLogs = current.callLogs.filter((l) => l.id !== logId);
  store.leads[leadId] = current;
  saveStore(store);
}

export function toggleStar(leadId: string): boolean {
  const current = getLeadCRMState(leadId);
  const newVal = !current.isStarred;
  updateLeadCRMState(leadId, { isStarred: newVal });
  return newVal;
}

// ── AI Insights cache ─────────────────────────────────────────────────────────
export function getCachedInsights(leadId: string): AIInsights | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${INSIGHTS_PREFIX}${leadId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AIInsights;
    const age = Date.now() - new Date(parsed.generatedAt).getTime();
    if (age > 24 * 60 * 60 * 1000) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function cacheInsights(insights: AIInsights): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${INSIGHTS_PREFIX}${insights.leadId}`, JSON.stringify(insights));
}


export function getStatusCounts(): Record<string, number> {
  const store = getCRMStore();
  const counts: Record<string, number> = {};
  Object.values(store.leads).forEach((l) => {
    counts[l.status] = (counts[l.status] ?? 0) + 1;
  });
  return counts;
}
