"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { LEADS } from "@/data/leads";
import { filterLeads, sortLeads, getIndustries } from "@/lib/leads";
import { getPricingRecommendation, getServiceCategory, SERVICE_CATEGORY_LABELS } from "@/lib/pricing";
import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowUpDown, Building2, Hammer, SlidersHorizontal, X } from "lucide-react";
import type { Qualification, IntentLevel, Category, ServiceCategory } from "@/types";

const industries = getIndustries(LEADS);

export default function LeadsPage() {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("all");
  const [qual, setQual] = useState<"all" | Qualification>("all");
  const [intent, setIntent] = useState<"all" | IntentLevel>("all");
  const [cat, setCat] = useState<"all" | Category>("all");
  const [serviceCat, setServiceCat] = useState<"all" | ServiceCategory>("all");
  const [sort, setSort] = useState<"score" | "companyName">("score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let leads = filterLeads(LEADS, {
      q: q || undefined,
      industry: industry !== "all" ? industry : undefined,
      qualification: qual !== "all" ? qual : undefined,
      intentLevel: intent !== "all" ? intent : undefined,
      category: cat !== "all" ? cat : undefined,
    });
    if (serviceCat !== "all") {
      leads = leads.filter(l => getServiceCategory(l.serviceFit) === serviceCat);
    }
    return sortLeads(leads, sort, sortDir);
  }, [q, industry, qual, intent, cat, serviceCat, sort, sortDir]);

  return (
    <>
      <TopBar title="All Leads" />
      <div className="flex-1 p-3 md:p-4 lg:p-6">

        {/* ── Filters ── */}
        <div className="bg-white rounded-xl shadow-sm mb-4">

          {/* Mobile: single-row search + toggle */}
          <div className="flex items-center gap-2 p-3 md:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                className="pl-9 h-10 text-sm"
                placeholder="Search company, city..."
                value={q}
                onChange={e => setQ(e.target.value)}
              />
            </div>
            <button
              onClick={() => setFiltersOpen(f => !f)}
              className="flex items-center justify-center gap-1.5 px-3 h-10 rounded-lg border text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {filtersOpen && <X className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <button
              onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
              className="flex items-center justify-center gap-1 h-10 w-10 rounded-lg border text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
              aria-label="Toggle sort direction"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile: collapsible filter panel */}
          {filtersOpen && (
            <div className="md:hidden px-3 pb-3 grid grid-cols-2 gap-2 border-t pt-3">
              <Select value={industry} onValueChange={(v) => setIndustry(v ?? "all")}>
                <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Industry" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={serviceCat} onValueChange={v => setServiceCat((v ?? "all") as "all" | ServiceCategory)}>
                <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Service Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="CRM Only">CRM Only</SelectItem>
                  <SelectItem value="CRM + Portal/Web">CRM + Portal/Web</SelectItem>
                  <SelectItem value="CRM + App">CRM + App</SelectItem>
                  <SelectItem value="SaaS Platform">SaaS Platform</SelectItem>
                </SelectContent>
              </Select>
              <Select value={qual} onValueChange={v => setQual((v ?? "all") as "all" | Qualification)}>
                <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Qualification" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="HOT">HOT</SelectItem>
                  <SelectItem value="WARM">WARM</SelectItem>
                </SelectContent>
              </Select>
              <Select value={intent} onValueChange={v => setIntent((v ?? "all") as "all" | IntentLevel)}>
                <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Intent" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Intent</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                </SelectContent>
              </Select>
              <Select value={cat} onValueChange={v => setCat((v ?? "all") as "all" | Category)}>
                <SelectTrigger className="h-10 text-xs col-span-2"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="HIGH VALUE">High Value</SelectItem>
                  <SelectItem value="NURTURE">Nurture</SelectItem>
                </SelectContent>
              </Select>
              <div className="col-span-2 flex items-center justify-between pt-1">
                <span className="text-xs text-gray-400">{filtered.length} leads found</span>
                <button
                  onClick={() => { setIndustry("all"); setServiceCat("all"); setQual("all"); setIntent("all"); setCat("all"); setQ(""); }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Desktop: full filter row */}
          <div className="hidden md:flex p-3 flex-wrap gap-2 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input className="pl-9 h-8 text-sm" placeholder="Search company, city, industry..." value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <Select value={industry} onValueChange={(v) => setIndustry(v ?? "all")}>
              <SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="Industry" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={serviceCat} onValueChange={v => setServiceCat((v ?? "all") as "all" | ServiceCategory)}>
              <SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="Service Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="CRM Only">CRM Only</SelectItem>
                <SelectItem value="CRM + Portal/Web">CRM + Portal/Web</SelectItem>
                <SelectItem value="CRM + App">CRM + App</SelectItem>
                <SelectItem value="SaaS Platform">SaaS Platform</SelectItem>
              </SelectContent>
            </Select>
            <Select value={qual} onValueChange={v => setQual((v ?? "all") as "all" | Qualification)}>
              <SelectTrigger className="w-28 h-8 text-xs"><SelectValue placeholder="Qual" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="HOT">HOT</SelectItem>
                <SelectItem value="WARM">WARM</SelectItem>
              </SelectContent>
            </Select>
            <Select value={intent} onValueChange={v => setIntent((v ?? "all") as "all" | IntentLevel)}>
              <SelectTrigger className="w-28 h-8 text-xs"><SelectValue placeholder="Intent" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Intent</SelectItem>
                <SelectItem value="HIGH">HIGH</SelectItem>
                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cat} onValueChange={v => setCat((v ?? "all") as "all" | Category)}>
              <SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="HIGH VALUE">High Value</SelectItem>
                <SelectItem value="NURTURE">Nurture</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortDir === "desc" ? "High→Low" : "Low→High"}
            </button>
            <span className="text-xs text-gray-400 ml-auto">{filtered.length} leads</span>
          </div>
        </div>

        {/* ── Mobile: result count strip ── */}
        <div className="md:hidden flex items-center justify-between mb-2 px-1">
          <span className="text-xs text-gray-500 font-medium">{filtered.length} leads</span>
          <span className="text-xs text-gray-400">{sortDir === "desc" ? "Highest score first" : "Lowest score first"}</span>
        </div>

        {/* ── Mobile Cards (hidden on md+) ── */}
        <div className="md:hidden space-y-3">
          {filtered.map((lead) => {
            const pricing = getPricingRecommendation(lead);
            const sc = SERVICE_CATEGORY_LABELS[pricing.serviceCategory];
            return (
              <Link
                key={lead.id}
                href={`/leads/${lead.id}`}
                className="block bg-white rounded-xl shadow-sm overflow-hidden active:scale-[0.99] transition-transform"
              >
                <div className="p-4">
                  {/* Top row: company name + score badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-800 text-sm leading-tight truncate">
                        {lead.companyName}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{lead.city} · {lead.employees} emp</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className="font-bold text-sm"
                        style={{ color: lead.score >= 8 ? "#1E8449" : "#E67E22" }}
                      >
                        {lead.score}/10
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          background: lead.qualification === "HOT" ? "var(--hot-fill)" : "var(--warm-fill)",
                          color: lead.qualification === "HOT" ? "var(--hot-red)" : "var(--warm-amber)"
                        }}
                      >
                        {lead.qualification}
                      </span>
                    </div>
                  </div>

                  {/* Middle row: service type + price */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: sc.bg, color: sc.color }}
                    >
                      {pricing.serviceCategory === "CRM + App" || pricing.serviceCategory === "SaaS Platform"
                        ? <Hammer className="w-3 h-3" /> : null}
                      {pricing.serviceCategory}
                    </span>
                    <span className="text-xs font-semibold text-green-700 ml-auto">
                      ₹{pricing.monthlyPrice.toLocaleString("en-IN")}/mo
                    </span>
                  </div>

                  {/* Bottom row: industry tag + intent */}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs py-0 px-1.5">{lead.industry}</Badge>
                    <span className={`text-xs font-semibold ${lead.intentLevel === "HIGH" ? "text-red-600" : "text-amber-600"}`}>
                      {lead.intentLevel} intent
                    </span>
                    {pricing.projectDev && (
                      <span className="text-xs text-purple-700 font-medium ml-auto">
                        +₹{(pricing.projectDev.minCost / 1000).toFixed(0)}K–{(pricing.projectDev.maxCost / 1000).toFixed(0)}K dev
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Building2 className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No leads match your filters</p>
            </div>
          )}
        </div>

        {/* ── Desktop Table (hidden on mobile) ── */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ background: "var(--navy)" }}>
                  {["ID", "Company", "City", "Industry", "Service Type", "Score", "Qual", "Intent", "Monthly", "Dev Cost", "Action"].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-white/80">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => {
                  const pricing = getPricingRecommendation(lead);
                  const sc = SERVICE_CATEGORY_LABELS[pricing.serviceCategory];
                  return (
                    <tr key={lead.id} className={`border-b last:border-0 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                      <td className="px-3 py-2.5 text-xs font-mono text-gray-400">{lead.id}</td>
                      <td className="px-3 py-2.5">
                        <div className="font-medium text-gray-800 hover:text-blue-600">
                          <Link href={`/leads/${lead.id}`}>{lead.companyName}</Link>
                        </div>
                        <div className="text-xs text-gray-400">{lead.employees} emp</div>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-gray-500">{lead.city}</td>
                      <td className="px-3 py-2.5">
                        <Badge variant="outline" className="text-xs py-0 px-1.5">{lead.industry}</Badge>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{ background: sc.bg, color: sc.color }}>
                          {pricing.serviceCategory === "CRM + App" || pricing.serviceCategory === "SaaS Platform"
                            ? <Hammer className="w-3 h-3" /> : null}
                          {pricing.serviceCategory}
                        </span>
                        <div className="text-xs text-gray-400 mt-0.5 max-w-32 truncate">{lead.serviceFit}</div>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="font-bold text-sm" style={{ color: lead.score >= 8 ? "#1E8449" : "#E67E22" }}>
                          {lead.score}/10
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                              style={{
                                background: lead.qualification === "HOT" ? "var(--hot-fill)" : "var(--warm-fill)",
                                color: lead.qualification === "HOT" ? "var(--hot-red)" : "var(--warm-amber)"
                              }}>
                          {lead.qualification}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`text-xs font-semibold ${lead.intentLevel === "HIGH" ? "text-red-600" : "text-amber-600"}`}>
                          {lead.intentLevel}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="text-xs font-semibold text-green-700">₹{pricing.monthlyPrice.toLocaleString("en-IN")}/mo</div>
                        <div className="text-xs text-gray-400">{pricing.tier}</div>
                      </td>
                      <td className="px-3 py-2.5">
                        {pricing.projectDev ? (
                          <div>
                            <div className="text-xs font-semibold text-purple-700">
                              ₹{(pricing.projectDev.minCost / 1000).toFixed(0)}K–{(pricing.projectDev.maxCost / 1000).toFixed(0)}K
                            </div>
                            <div className="text-xs text-gray-400">one-time</div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        <Link href={`/leads/${lead.id}`}
                              className="text-xs text-blue-600 hover:underline font-medium">
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Building2 className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No leads match your filters</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
