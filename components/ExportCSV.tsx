"use client";
import { Download } from "lucide-react";
import type { Lead } from "@/types";
import { getPricingRecommendation } from "@/lib/pricing";

interface ExportCSVProps {
  leads: Lead[];
  filename?: string;
}

function escapeCsvField(field: string | number): string {
  const str = String(field);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function ExportCSV({ leads, filename = "twocorex-leads.csv" }: ExportCSVProps) {
  const handleExport = () => {
    const headers = [
      "ID",
      "Company",
      "City",
      "Industry",
      "Service Fit",
      "Score",
      "Qualification",
      "Intent",
      "Category",
      "Monthly Price (INR)",
      "Website",
      "Employees",
    ];

    const rows = leads.map((lead) => {
      const pricing = getPricingRecommendation(lead);
      return [
        lead.id,
        lead.companyName,
        lead.city,
        lead.industry,
        lead.serviceFit,
        lead.score,
        lead.qualification,
        lead.intentLevel,
        lead.category,
        pricing.monthlyPrice,
        lead.website,
        lead.employees,
      ].map(escapeCsvField);
    });

    const csv = [headers.map(escapeCsvField), ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={leads.length === 0}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <Download className="w-3.5 h-3.5" />
      Export CSV ({leads.length})
    </button>
  );
}

/*
═══════════════════════════════════════════════════════════════════════════════
ADD THIS TO /app/leads/page.tsx
═══════════════════════════════════════════════════════════════════════════════

1. At the top, add the import:
   import { ExportCSV } from "@/components/ExportCSV";

2. In the filters bar (the div with className="bg-white rounded-xl shadow-sm p-3 mb-4 ..."),
   add the ExportCSV button next to the lead count span at the end:

   // BEFORE:
   <span className="text-xs text-gray-400 ml-auto">{filtered.length} leads</span>

   // AFTER:
   <div className="ml-auto flex items-center gap-3">
     <ExportCSV leads={filtered} />
     <span className="text-xs text-gray-400">{filtered.length} leads</span>
   </div>

═══════════════════════════════════════════════════════════════════════════════
*/
