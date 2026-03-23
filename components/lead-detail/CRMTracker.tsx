"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Star, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getLeadCRMState, updateLeadCRMState, addCallLog, removeCallLog, toggleStar } from "@/lib/crm-storage";
import { CRM_STATUS_LABELS } from "@/lib/pricing";
import type { LeadCRMState, CRMStatus, CallLog } from "@/types";
import { format } from "date-fns";

const STATUSES: CRMStatus[] = [
  "not_started","researched","message_sent","in_conversation",
  "demo_scheduled","proposal_sent","won","lost","nurturing"
];

const STATUS_COLORS: Record<CRMStatus, string> = {
  not_started:"#9CA3AF", researched:"#6366F1", message_sent:"#2471A3",
  in_conversation:"#E67E22", demo_scheduled:"#8B5CF6", proposal_sent:"#0D4F5C",
  won:"#1E8449", lost:"#C0392B", nurturing:"#D97706",
};

export function CRMTracker({ leadId }: { leadId: string }) {
  const [state, setState] = useState<LeadCRMState | null>(null);
  const [logOpen, setLogOpen] = useState(false);
  const [logForm, setLogForm] = useState({ channel: "LinkedIn DM", outcome: "", notes: "" });

  useEffect(() => {
    setState(getLeadCRMState(leadId));
  }, [leadId]);

  if (!state) return <div className="h-32 flex items-center justify-center text-gray-400 text-sm">Loading...</div>;

  const handleStatus = (status: CRMStatus) => {
    updateLeadCRMState(leadId, { status });
    setState(s => s ? { ...s, status } : s);
    toast.success(`Status updated to "${CRM_STATUS_LABELS[status]}"`);
  };

  const handleNotes = (notes: string) => {
    setState(s => s ? { ...s, generalNotes: notes } : s);
  };

  const saveNotes = () => {
    updateLeadCRMState(leadId, { generalNotes: state.generalNotes });
    toast.success("Notes saved");
  };

  const handleAddLog = () => {
    if (!logForm.outcome.trim()) { toast.error("Please enter an outcome"); return; }
    addCallLog(leadId, {
      timestamp: new Date().toISOString(),
      channel: logForm.channel,
      outcome: logForm.outcome,
      notes: logForm.notes,
    });
    setState(getLeadCRMState(leadId));
    setLogOpen(false);
    setLogForm({ channel: "LinkedIn DM", outcome: "", notes: "" });
    toast.success("Call log added");
  };

  const handleDeleteLog = (logId: string) => {
    removeCallLog(leadId, logId);
    setState(getLeadCRMState(leadId));
    toast.success("Log removed");
  };

  const handleStar = () => {
    const newVal = toggleStar(leadId);
    setState(s => s ? { ...s, isStarred: newVal } : s);
    toast.success(newVal ? "Starred ⭐" : "Unstarred");
  };

  return (
    <div className="space-y-5">
      {/* Status + Star */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1.5">CRM Status</p>
          <Select value={state.status} onValueChange={v => handleStatus(v as CRMStatus)}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map(s => (
                <SelectItem key={s} value={s}>
                  <span style={{ color: STATUS_COLORS[s] }} className="font-medium">
                    {CRM_STATUS_LABELS[s]}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button onClick={handleStar} className="mt-5 p-2 rounded-lg border hover:bg-yellow-50 transition-colors">
          <Star className={`w-5 h-5 ${state.isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
        </button>
      </div>

      {/* Last contacted */}
      {state.lastContactedAt && (
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
          <Calendar className="w-3.5 h-3.5" />
          Last contacted: <span className="font-medium">{format(new Date(state.lastContactedAt), "dd MMM yyyy, h:mm a")}</span>
        </div>
      )}

      {/* Notes */}
      <div>
        <p className="text-xs text-gray-500 mb-1.5">General Notes</p>
        <Textarea
          placeholder="Add notes about this lead — decision maker name, key concerns, next steps..."
          className="text-sm min-h-24 resize-none"
          value={state.generalNotes}
          onChange={e => handleNotes(e.target.value)}
          onBlur={saveNotes}
        />
        <p className="text-xs text-gray-400 mt-1">Auto-saved on blur</p>
      </div>

      {/* Call Log */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Call Log ({state.callLogs.length})</p>
          <Button size="sm" variant="outline" onClick={() => setLogOpen(true)} className="gap-1.5 h-7 text-xs">
            <Plus className="w-3.5 h-3.5" /> Add Log
          </Button>
        </div>

        {state.callLogs.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-gray-400 border rounded-lg bg-gray-50">
            <MessageSquare className="w-8 h-8 mb-2 opacity-30" />
            <p className="text-xs">No call logs yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {state.callLogs.map((log, i) => (
              <div key={log.id}>
                {i > 0 && <Separator />}
                <div className="flex items-start gap-3 py-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{log.channel}</span>
                      <span className="text-xs text-gray-400">{format(new Date(log.timestamp), "dd MMM, h:mm a")}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-700">{log.outcome}</p>
                    {log.notes && <p className="text-xs text-gray-500 mt-0.5">{log.notes}</p>}
                  </div>
                  <button onClick={() => handleDeleteLog(log.id)} className="text-gray-300 hover:text-red-400 transition-colors mt-0.5">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Log Dialog */}
      <Dialog open={logOpen} onOpenChange={setLogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Log Contact Attempt</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Channel</label>
              <Select value={logForm.channel} onValueChange={v => setLogForm(f => ({ ...f, channel: v ?? f.channel }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["LinkedIn DM","Instagram DM","WhatsApp","Phone Call","Email","Office Visit"].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Outcome *</label>
              <input
                className="w-full text-sm border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="e.g. No response / Interested, call next week / Left voicemail"
                value={logForm.outcome}
                onChange={e => setLogForm(f => ({ ...f, outcome: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Notes</label>
              <Textarea
                className="text-sm resize-none"
                placeholder="Detailed notes from this interaction..."
                value={logForm.notes}
                onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddLog}>Save Log</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
