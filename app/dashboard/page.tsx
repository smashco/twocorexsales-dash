import { LEADS } from "@/data/leads";
import { getDashboardStats } from "@/lib/leads";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { IndustryBarChart } from "@/components/dashboard/IndustryBarChart";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { ScoreDistribution } from "@/components/dashboard/ScoreDistribution";
import { PipelineKanban } from "@/components/dashboard/PipelineKanban";
import { TopBar } from "@/components/layout/TopBar";
import { Flame, Thermometer, Star, TrendingUp, Users } from "lucide-react";

export default function DashboardPage() {
  const stats = getDashboardStats(LEADS);

  return (
    <>
      <TopBar title="Dashboard" />
      <div className="flex-1 p-3 md:p-4 lg:p-6 space-y-4 md:space-y-6">

        {/* KPI Row — 2 cols on mobile (5th card full-width), 5 cols on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatsCard label="Total Leads" value={stats.totalLeads} sub="Across Maharashtra" icon={Users} color="navy" />
          <StatsCard label="HOT Leads" value={stats.hotCount} sub="Ready to close" icon={Flame} color="red" />
          <StatsCard label="WARM Leads" value={stats.warmCount} sub="Need nurturing" icon={Thermometer} color="amber" />
          <StatsCard label="High Value" value={stats.highValueCount} sub="Priority targets" icon={Star} color="green" />
          <div className="col-span-2 md:col-span-1">
            <StatsCard label="Avg Score" value={`${stats.avgScore}/10`} sub="Lead quality" icon={TrendingUp} color="blue" />
          </div>
        </div>

        {/* Charts Row 1 — full width on mobile, 2-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 min-w-0 overflow-hidden">
            <IndustryBarChart data={stats.byIndustry} />
          </div>
          <div className="min-w-0 overflow-hidden">
            <FunnelChart
              hot={stats.hotCount}
              warm={stats.warmCount}
              highValue={stats.highValueCount}
              nurture={LEADS.filter(l => l.category === "NURTURE").length}
            />
          </div>
        </div>

        {/* Charts Row 2 — full width on mobile, 2-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="min-w-0 overflow-hidden">
            <ScoreDistribution data={stats.scoreDistribution} />
          </div>
          <div className="lg:col-span-2 min-w-0 overflow-hidden">
            <PipelineKanban />
          </div>
        </div>

        {/* Top 10 Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b" style={{ background: "var(--navy)" }}>
            <h2 className="text-sm font-semibold text-white">Top 10 Leads by Score</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  {["ID", "Company", "City", "Industry", "Score", "Qual", "Service"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...LEADS].sort((a, b) => b.score - a.score || b.confidencePct - a.confidencePct)
                  .slice(0, 10).map((l, i) => (
                  <tr key={l.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2 text-xs font-mono text-gray-400">{l.id}</td>
                    <td className="px-3 py-2 font-medium text-gray-800">
                      <a href={`/leads/${l.id}`} className="hover:text-blue-600 transition-colors">{l.companyName}</a>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{l.city}</td>
                    <td className="px-3 py-2 text-gray-500">{l.industry}</td>
                    <td className="px-3 py-2">
                      <span className="font-bold text-green-700">{l.score}/10</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{
                              background: l.qualification === "HOT" ? "var(--hot-fill)" : "var(--warm-fill)",
                              color: l.qualification === "HOT" ? "var(--hot-red)" : "var(--warm-amber)"
                            }}>
                        {l.qualification}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{l.serviceFit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
