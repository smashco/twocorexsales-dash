import type { Lead, Qualification, IntentLevel, Category } from "@/types";

export interface LeadFilters {
  q?: string;
  industry?: string;
  qualification?: Qualification;
  intentLevel?: IntentLevel;
  category?: Category;
  city?: string;
  minScore?: number;
  starred?: boolean;
}

export type SortField = "score" | "confidencePct" | "companyName" | "industry";
export type SortDir = "asc" | "desc";

export function filterLeads(leads: Lead[], filters: LeadFilters): Lead[] {
  return leads.filter((l) => {
    if (filters.q) {
      const q = filters.q.toLowerCase();
      if (
        !l.companyName.toLowerCase().includes(q) &&
        !l.id.toLowerCase().includes(q) &&
        !l.city.toLowerCase().includes(q) &&
        !l.industry.toLowerCase().includes(q)
      ) return false;
    }
    if (filters.industry && l.industry !== filters.industry) return false;
    if (filters.qualification && l.qualification !== filters.qualification) return false;
    if (filters.intentLevel && l.intentLevel !== filters.intentLevel) return false;
    if (filters.category && l.category !== filters.category) return false;
    if (filters.city && !l.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.minScore && l.score < filters.minScore) return false;
    return true;
  });
}

export function sortLeads(leads: Lead[], field: SortField, dir: SortDir): Lead[] {
  return [...leads].sort((a, b) => {
    let cmp = 0;
    if (field === "score") cmp = a.score - b.score;
    else if (field === "confidencePct") cmp = a.confidencePct - b.confidencePct;
    else if (field === "companyName") cmp = a.companyName.localeCompare(b.companyName);
    else if (field === "industry") cmp = a.industry.localeCompare(b.industry);
    return dir === "asc" ? cmp : -cmp;
  });
}

export function getIndustries(leads: Lead[]): string[] {
  return [...new Set(leads.map((l) => l.industry))].sort();
}

export function getCities(leads: Lead[]): string[] {
  const raw = leads.map((l) => l.city.split(",")[0].trim());
  return [...new Set(raw)].sort();
}

export function getLeadById(leads: Lead[], id: string): Lead | undefined {
  return leads.find((l) => l.id === id);
}

export function getDashboardStats(leads: Lead[]) {
  const industries = [...new Set(leads.map((l) => l.industry))].sort();
  const byIndustry = industries.map((ind) => {
    const group = leads.filter((l) => l.industry === ind);
    return {
      industry: ind,
      count: group.length,
      hot: group.filter((l) => l.qualification === "HOT").length,
      avgScore: Math.round((group.reduce((s, l) => s + l.score, 0) / group.length) * 10) / 10,
    };
  });

  const scores = [7, 8, 9, 10];
  const scoreDistribution = scores.map((s) => ({
    score: s,
    count: leads.filter((l) => l.score === s).length,
  }));

  return {
    totalLeads: leads.length,
    hotCount: leads.filter((l) => l.qualification === "HOT").length,
    warmCount: leads.filter((l) => l.qualification === "WARM").length,
    highValueCount: leads.filter((l) => l.category === "HIGH VALUE").length,
    avgScore: Math.round((leads.reduce((s, l) => s + l.score, 0) / leads.length) * 10) / 10,
    byIndustry,
    scoreDistribution,
  };
}
