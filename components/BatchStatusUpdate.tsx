"use client";
import { useState } from "react";
import { CheckSquare, Square, ChevronDown, X } from "lucide-react";
import { updateStatus } from "@/lib/crm-storage";
import { CRM_STATUS_LABELS } from "@/lib/pricing";
import type { Lead, CRMStatus } from "@/types";

const STATUSES: CRMStatus[] = [
  "not_started", "researched", "message_sent", "in_conversation",
  "demo_scheduled", "proposal_sent", "won", "lost", "nurturing",
];

interface BatchStatusUpdateProps {
  leads: Lead[];
  /** Called after batch update to trigger a parent re-render if needed */
  onUpdated?: (leadIds: string[], status: CRMStatus) => void;
}

export function BatchStatusUpdate({ leads, onUpdated }: BatchStatusUpdateProps) {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<{ count: number; status: string } | null>(null);

  const allSelected = leads.length > 0 && selected.size === leads.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleSelectionMode = () => {
    setSelectionMode((m) => !m);
    setSelected(new Set());
    setDropdownOpen(false);
    setLastUpdated(null);
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(leads.map((l) => l.id)));
    }
  };

  const toggleLead = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleBatchUpdate = async (status: CRMStatus) => {
    if (selected.size === 0) return;
    setUpdating(true);
    setDropdownOpen(false);

    const ids = Array.from(selected);
    ids.forEach((id) => updateStatus(id, status));

    setLastUpdated({ count: ids.length, status: CRM_STATUS_LABELS[status] });
    onUpdated?.(ids, status);
    setSelected(new Set());
    setUpdating(false);
  };

  return (
    <>
      {/* Toggle button — place in the toolbar */}
      <button
        onClick={toggleSelectionMode}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
          selectionMode
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <CheckSquare className="w-3.5 h-3.5" />
        {selectionMode ? "Exit Select" : "Select Leads"}
      </button>

      {/* Selection checkboxes — exported as helper component */}
      {selectionMode && (
        <>
          {/* Header select-all */}
          <div className="sr-only" data-batch-header>
            <button onClick={toggleAll}>
              {allSelected ? "Deselect all" : someSelected ? "Deselect all" : "Select all"}
            </button>
          </div>
        </>
      )}

      {/* Floating action bar */}
      {selectionMode && selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-3">
            <span className="text-sm font-semibold">
              {selected.size} lead{selected.size !== 1 ? "s" : ""} selected
            </span>

            {/* Status dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((d) => !d)}
                disabled={updating}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Update Status
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {dropdownOpen && (
                <div className="absolute bottom-full mb-2 left-0 w-52 bg-white rounded-xl shadow-xl border overflow-hidden">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleBatchUpdate(s)}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {CRM_STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelected(new Set())}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Success toast (inline, no external lib needed) */}
      {lastUpdated && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white rounded-xl shadow-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
          ✓ Updated {lastUpdated.count} lead{lastUpdated.count !== 1 ? "s" : ""} to &quot;{lastUpdated.status}&quot;
          <button onClick={() => setLastUpdated(null)} className="ml-2 opacity-70 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Export helpers for the leads table */}
      {selectionMode && (
        <style>{`
          [data-lead-row] { cursor: pointer; }
          [data-lead-row]:hover { background: rgba(59,130,246,0.05); }
        `}</style>
      )}
    </>
  );
}

/**
 * Row checkbox — use inside each table row when selectionMode is active.
 * Export separately so the leads page can import it.
 */
export function BatchRowCheckbox({
  leadId,
  selected,
  onToggle,
}: {
  leadId: string;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <td className="px-3 py-2.5 w-8">
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(leadId); }}
        className="text-gray-400 hover:text-blue-600 transition-colors"
      >
        {selected ? (
          <CheckSquare className="w-4 h-4 text-blue-600" />
        ) : (
          <Square className="w-4 h-4" />
        )}
      </button>
    </td>
  );
}

/**
 * Header checkbox — use in the table header.
 */
export function BatchHeaderCheckbox({
  allSelected,
  someSelected,
  onToggleAll,
}: {
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
}) {
  return (
    <th className="px-3 py-2.5 w-8">
      <button
        onClick={onToggleAll}
        className="text-white/60 hover:text-white transition-colors"
      >
        {allSelected ? (
          <CheckSquare className="w-4 h-4 text-white" />
        ) : someSelected ? (
          <CheckSquare className="w-4 h-4 text-white/50" />
        ) : (
          <Square className="w-4 h-4" />
        )}
      </button>
    </th>
  );
}

/*
═══════════════════════════════════════════════════════════════════════════════
ADD THIS TO /app/leads/page.tsx
═══════════════════════════════════════════════════════════════════════════════

1. Imports (add at top):
   import { BatchStatusUpdate, BatchRowCheckbox, BatchHeaderCheckbox } from "@/components/BatchStatusUpdate";
   import type { CRMStatus } from "@/types";

2. New state variables (add inside LeadsPage()):
   const [selectionMode, setSelectionMode] = useState(false);
   const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

3. Toggle / helper functions:
   const allSelected = filtered.length > 0 && selectedLeads.size === filtered.length;
   const someSelected = selectedLeads.size > 0 && !allSelected;
   const toggleAll = () => setSelectedLeads(
     allSelected ? new Set() : new Set(filtered.map(l => l.id))
   );
   const toggleLead = (id: string) => setSelectedLeads(prev => {
     const next = new Set(prev);
     next.has(id) ? next.delete(id) : next.add(id);
     return next;
   });

4. In the filters bar, next to Export CSV:
   <BatchStatusUpdate
     leads={filtered}
     selectionMode={selectionMode}
     setSelectionMode={setSelectionMode}
     selected={selectedLeads}
     setSelected={setSelectedLeads}
   />

   NOTE: You'll need to refactor BatchStatusUpdate to accept these as controlled props
   rather than managing state internally (current implementation is self-contained as
   a drop-in but for full table integration, controlled props are cleaner).

5. In the table <thead>, before the first <th>:
   {selectionMode && (
     <BatchHeaderCheckbox
       allSelected={allSelected}
       someSelected={someSelected}
       onToggleAll={toggleAll}
     />
   )}

6. In each table row (after the row opening <tr ...>):
   {selectionMode && (
     <BatchRowCheckbox
       leadId={lead.id}
       selected={selectedLeads.has(lead.id)}
       onToggle={toggleLead}
     />
   )}

═══════════════════════════════════════════════════════════════════════════════
*/
