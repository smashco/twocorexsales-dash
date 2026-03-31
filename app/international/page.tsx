"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { INTL_LEADS } from "@/data/international-leads";
import { getIntlPricingRecommendation } from "@/lib/intl-pricing";
import { SERVICE_CATEGORY_LABELS } from "@/lib/pricing";
import { getCRMStore } from "@/lib/crm-storage";
import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowUpDown, Globe, SlidersHorizontal, X, CheckCircle, Clock } from "lucide-react";
import type { Qualification, IntentLevel } from "@/types";

// ── Time zone offsets from IST (UTC+5:30) ────────────────────────────────────
const COUNTRY_TZ: Record<string, { offset: number; label: string; bestCall: string; workHoursIST: string }> = {
  "UAE":          { offset: +0.5,  label: "UAE (GST)",  bestCall: "11 AM–1 PM IST / 3–5 PM IST",    workHoursIST: "10:30 AM – 7:30 PM IST" },
  "UK":           { offset: -5.5,  label: "UK (BST)",   bestCall: "1:30–4:30 PM IST",               workHoursIST: "1:30 PM – 10:30 PM IST" },
  "USA":          { offset: -10.5, label: "USA (ET)",   bestCall: "6:30–9 PM IST",                  workHoursIST: "6:30 PM – 3:30 AM IST" },
  "Canada":       { offset: -10.5, label: "Canada (ET)", bestCall: "6:30–9 PM IST",                 workHoursIST: "6:30 PM – 3:30 AM IST" },
  "Australia":    { offset: +4.5,  label: "AUS (AEST)", bestCall: "5–8 AM IST",                     workHoursIST: "4:30 AM – 1:30 PM IST" },
  "Singapore":    { offset: +2.5,  label: "SGT",        bestCall: "7–11 AM IST",                    workHoursIST: "6:30 AM – 3:30 PM IST" },
  "Malaysia":     { offset: +2.5,  label: "MYT",        bestCall: "7–11 AM IST",                    workHoursIST: "6:30 AM – 3:30 PM IST" },
  "South Africa": { offset: -3.5,  label: "SAST",       bestCall: "11:30 AM–2:30 PM IST",           workHoursIST: "12:30 PM – 9:30 PM IST" },
  "Nigeria":      { offset: -4.5,  label: "WAT",        bestCall: "12:30–3:30 PM IST",              workHoursIST: "1:30 PM – 10:30 PM IST" },
};

const FLAG: Record<string, string> = {
  "UAE": "🇦🇪", "UK": "🇬🇧", "USA": "🇺🇸", "Canada": "🇨🇦",
  "Australia": "🇦🇺", "Singapore": "🇸🇬", "Malaysia": "🇲🇾",
  "South Africa": "🇿🇦", "Nigeria": "🇳🇬",
};

const COUNTRIES = [...new Set(INTL_LEADS.map(l => l.country!))].sort();
const INDUSTRIES = [...new Set(INTL_LEADS.map(l => l.industry))].sort();

export default function InternationalLeadsPage() {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [qual, setQual] = useState<"all" | Qualification>("all");
  const [intent, setIntent] = useState<"all" | IntentLevel>("all");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [contactedIds, setContactedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const store = getCRMStore();
    const ids = new Set(
      Object.values(store.leads).filter(l => l.lastContactedAt).map(l => l.leadId)
    );
    setContactedIds(ids);
  }, []);

  const filtered = useMemo(() => {
    return INTL_LEADS
      .filter(l => {
        if (q && !l.companyName.toLowerCase().includes(q.toLowerCase()) &&
            !l.city.toLowerCase().includes(q.toLowerCase()) &&
            !l.industry.toLowerCase().includes(q.toLowerCase())) return false;
        if (country !== "all" && l.country !== country) return false;
        if (industry !== "all" && l.industry !== industry) return false;
        if (qual !== "all" && l.qualification !== qual) return false;
        if (intent !== "all" && l.intentLevel !== intent) return false;
        return true;
      })
      .sort((a, b) => sortDir === "desc" ? b.score - a.score : a.score - b.score);
  }, [q, country, industry, qual, intent, sortDir]);

  // Group counts by country for header stats
  const countryCounts = useMemo(() =>
    INTL_LEADS.reduce((acc, l) => {
      acc[l.country!] = (acc[l.country!] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>), []);

  return (
    <>
      <TopBar title="International Leads" />
      <div className="flex-1 p-3 md:p-4 lg:p-6">

        {/* Header */}
        <div className="rounded-xl p-4 mb-5" style={{ background: "var(--navy)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-yellow-400" />
            <h2 className="text-white font-bold">International SMB Leads</h2>
          </div>
          <p className="text-white/50 text-sm mb-3">
            {INTL_LEADS.length} leads · 9 countries · SMBs not using enterprise tools
          </p>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map(c => (
              <button key={c}
                onClick={() => setCountry(prev => prev === c ? "all" : c)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                style={country === c
                  ? { background: "#FCD34D", color: "#1A1A2E" }
                  : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                {FLAG[c]} {c} <span className="opacity-60">({countryCounts[c]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm mb-4">
          {/* Mobile */}
          <div className="flex items-center gap-2 p-3 md:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input className="pl-9 h-10 text-sm" placeholder="Search company, city..." value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <button onClick={() => setFiltersOpen(f => !f)}
              className="flex items-center gap-1.5 px-3 h-10 rounded-lg border text-xs font-medium text-gray-600 shrink-0">
              <SlidersHorizontal className="w-4 h-4" /> Filters {filtersOpen && <X className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
              className="h-10 w-10 flex items-center justify-center rounded-lg border text-gray-600 shrink-0">
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
          {filtersOpen && (
            <div className="md:hidden px-3 pb-3 grid grid-cols-2 gap-2 border-t pt-3">
              <Select value={industry} onValueChange={v => setIndustry(v ?? "all")}>
                <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Industry" /></SelectTrigger>
                <SelectContent>{[<SelectItem key="all" value="all">All Industries</SelectItem>, ...INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)]}</SelectContent>
              </Select>
              <Select value={qual} onValueChange={v => setQual((v ?? "all") as "all"|Qualification)}>
                <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Qual" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="HOT">HOT</SelectItem>
                  <SelectItem value="WARM">WARM</SelectItem>
                </SelectContent>
              </Select>
              <Select value={intent} onValueChange={v => setIntent((v ?? "all") as "all"|IntentLevel)}>
                <SelectTrigger className="h-10 text-xs col-span-2"><SelectValue placeholder="Intent" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Intent</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                </SelectContent>
              </Select>
              <div className="col-span-2 flex items-center justify-between pt-1">
                <span className="text-xs text-gray-400">{filtered.length} leads found</span>
                <button onClick={() => { setCountry("all"); setIndustry("all"); setQual("all"); setIntent("all"); setQ(""); }}
                  className="text-xs text-blue-600 hover:underline">Clear all</button>
              </div>
            </div>
          )}
          {/* Desktop */}
          <div className="hidden md:flex p-3 flex-wrap gap-2 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input className="pl-9 h-8 text-sm" placeholder="Search company, city, industry..." value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <Select value={country} onValueChange={v => setCountry(v ?? "all")}>
              <SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="Country" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {COUNTRIES.map(c => <SelectItem key={c} value={c}>{FLAG[c]} {c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={industry} onValueChange={v => setIndustry(v ?? "all")}>
              <SelectTrigger className="w-44 h-8 text-xs"><SelectValue placeholder="Industry" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={qual} onValueChange={v => setQual((v ?? "all") as "all"|Qualification)}>
              <SelectTrigger className="w-28 h-8 text-xs"><SelectValue placeholder="Qual" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="HOT">HOT</SelectItem>
                <SelectItem value="WARM">WARM</SelectItem>
              </SelectContent>
            </Select>
            <Select value={intent} onValueChange={v => setIntent((v ?? "all") as "all"|IntentLevel)}>
              <SelectTrigger className="w-28 h-8 text-xs"><SelectValue placeholder="Intent" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Intent</SelectItem>
                <SelectItem value="HIGH">HIGH</SelectItem>
                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
              </SelectContent>
            </Select>
            <button onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium text-gray-600 hover:bg-gray-50">
              <ArrowUpDown className="w-3.5 h-3.5" /> {sortDir === "desc" ? "High→Low" : "Low→High"}
            </button>
            <span className="text-xs text-gray-400 ml-auto">{filtered.length} leads</span>
          </div>
        </div>

        {/* Mobile result count */}
        <div className="md:hidden flex items-center justify-between mb-2 px-1">
          <span className="text-xs text-gray-500 font-medium">{filtered.length} leads</span>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filtered.map(lead => {
            const pricing = getIntlPricingRecommendation(lead);
            const tz = COUNTRY_TZ[lead.country!];
            return (
              <Link key={lead.id} href={`/international/${lead.id}`}
                className="block bg-white rounded-xl shadow-sm overflow-hidden active:scale-[0.99] transition-transform">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-800 text-sm leading-tight truncate">{lead.companyName}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{FLAG[lead.country!]} {lead.city}, {lead.country} · {lead.employees} emp</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="font-bold text-sm" style={{ color: lead.score >= 8 ? "#1E8449" : "#E67E22" }}>{lead.score}/10</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: lead.qualification === "HOT" ? "var(--hot-fill)" : "var(--warm-fill)", color: lead.qualification === "HOT" ? "var(--hot-red)" : "var(--warm-amber)" }}>
                        {lead.qualification}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs py-0 px-1.5">{lead.industry}</Badge>
                    <span className={`text-xs font-semibold ${lead.intentLevel === "HIGH" ? "text-red-600" : "text-amber-600"}`}>{lead.intentLevel} intent</span>
                    {tz && (
                      <div className="flex flex-col gap-0.5">
                        <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                          <Clock className="w-3 h-3" /> {tz.bestCall}
                        </span>
                        <span className="text-xs text-gray-400 pl-1">🕐 Works: {tz.workHoursIST}</span>
                      </div>
                    )}
                    {contactedIds.has(lead.id) && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                        <CheckCircle className="w-3 h-3" /> Contacted
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Globe className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No leads match your filters</p>
            </div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ background: "var(--navy)" }}>
                  {["ID", "Company", "Country / City", "Industry", "Service", "Score", "Qual", "Intent", "Best Call Time (IST)", "Status", "Action"].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-white/80 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => {
                  const pricing = getIntlPricingRecommendation(lead);
                  const sc = SERVICE_CATEGORY_LABELS[pricing.serviceCategory];
                  const tz = COUNTRY_TZ[lead.country!];
                  return (
                    <tr key={lead.id} className={`border-b last:border-0 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                      <td className="px-3 py-2.5 text-xs font-mono text-gray-400">{lead.id}</td>
                      <td className="px-3 py-2.5">
                        <div className="font-medium text-gray-800 hover:text-blue-600 whitespace-nowrap">
                          <Link href={`/international/${lead.id}`}>{lead.companyName}</Link>
                        </div>
                        <div className="text-xs text-gray-400">{lead.employees} emp</div>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="text-xs font-medium text-gray-700">{FLAG[lead.country!]} {lead.country}</div>
                        <div className="text-xs text-gray-400">{lead.city}</div>
                      </td>
                      <td className="px-3 py-2.5">
                        <Badge variant="outline" className="text-xs py-0 px-1.5 whitespace-nowrap">{lead.industry}</Badge>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                          style={{ background: sc.bg, color: sc.color }}>{pricing.serviceCategory}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="font-bold text-sm" style={{ color: lead.score >= 8 ? "#1E8449" : "#E67E22" }}>{lead.score}/10</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ background: lead.qualification === "HOT" ? "var(--hot-fill)" : "var(--warm-fill)", color: lead.qualification === "HOT" ? "var(--hot-red)" : "var(--warm-amber)" }}>
                          {lead.qualification}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`text-xs font-semibold ${lead.intentLevel === "HIGH" ? "text-red-600" : "text-amber-600"}`}>{lead.intentLevel}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        {tz ? (
                          <div>
                            <div className="text-xs font-medium text-blue-700 whitespace-nowrap">{tz.bestCall}</div>
                            <div className="text-xs text-gray-400 whitespace-nowrap">Works: {tz.workHoursIST}</div>
                            <div className="text-xs text-gray-300">{tz.label}</div>
                          </div>
                        ) : <span className="text-xs text-gray-300">—</span>}
                      </td>
                      <td className="px-3 py-2.5">
                        {contactedIds.has(lead.id) ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 whitespace-nowrap">
                            <CheckCircle className="w-3 h-3" /> Contacted
                          </span>
                        ) : <span className="text-xs text-gray-300">—</span>}
                      </td>
                      <td className="px-3 py-2.5">
                        <Link href={`/international/${lead.id}`} className="text-xs text-blue-600 hover:underline font-medium">View →</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Globe className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No leads match your filters</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
