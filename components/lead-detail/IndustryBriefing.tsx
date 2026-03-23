import Link from "next/link";
import { LEADS } from "@/data/leads";
import type { Lead } from "@/types";

export function IndustryBriefing({ lead }: { lead: Lead }) {
  const siblings = LEADS.filter(l => l.industry === lead.industry && l.id !== lead.id);
  const hot = siblings.filter(l => l.qualification === "HOT").length;
  const warm = siblings.filter(l => l.qualification === "WARM").length;
  const avgScore = siblings.length
    ? Math.round((siblings.reduce((s, l) => s + l.score, 0) / siblings.length) * 10) / 10
    : 0;

  return (
    <div className="space-y-4">
      {/* Industry stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl p-3 text-center" style={{ background: "var(--hot-fill)" }}>
          <div className="text-xl font-bold" style={{ color: "var(--hot-red)" }}>{hot}</div>
          <div className="text-xs text-gray-500">HOT in industry</div>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: "var(--warm-fill)" }}>
          <div className="text-xl font-bold" style={{ color: "var(--warm-amber)" }}>{warm}</div>
          <div className="text-xs text-gray-500">WARM in industry</div>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: "var(--green-fill)" }}>
          <div className="text-xl font-bold" style={{ color: "var(--green-hv)" }}>{avgScore}</div>
          <div className="text-xs text-gray-500">Avg score</div>
        </div>
      </div>

      {/* Other leads in same industry */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Other {lead.industry} Leads ({siblings.length})
        </p>
        <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
          {siblings
            .sort((a, b) => b.score - a.score)
            .map(l => (
              <Link key={l.id} href={`/leads/${l.id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group">
                <span className="text-xs font-mono text-gray-400 w-10 shrink-0">{l.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 group-hover:text-blue-700 truncate">{l.companyName}</div>
                  <div className="text-xs text-gray-400 truncate">{l.city} · {l.serviceFit}</div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs font-bold" style={{ color: l.score >= 8 ? "var(--green-hv)" : "var(--warm-amber)" }}>
                    {l.score}/10
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-xs font-bold"
                        style={{
                          background: l.qualification === "HOT" ? "var(--hot-fill)" : "var(--warm-fill)",
                          color: l.qualification === "HOT" ? "var(--hot-red)" : "var(--warm-amber)"
                        }}>
                    {l.qualification}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
