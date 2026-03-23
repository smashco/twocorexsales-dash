"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy, RotateCcw, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getLeadCRMState, updateLeadCRMState } from "@/lib/crm-storage";

const LINKEDIN_LIMIT = 300;

export function OutreachCustomizer({ leadId, originalMessage }: { leadId: string; originalMessage: string }) {
  const [msg, setMsg] = useState(originalMessage);
  const [hasCustom, setHasCustom] = useState(false);

  useEffect(() => {
    const state = getLeadCRMState(leadId);
    if (state.customOutreachMessage) {
      setMsg(state.customOutreachMessage);
      setHasCustom(true);
    }
  }, [leadId]);

  const save = () => {
    updateLeadCRMState(leadId, { customOutreachMessage: msg });
    setHasCustom(true);
    toast.success("Your version saved!");
  };

  const restore = () => {
    updateLeadCRMState(leadId, { customOutreachMessage: null });
    setMsg(originalMessage);
    setHasCustom(false);
    toast.success("Restored to original");
  };

  const copy = () => {
    navigator.clipboard.writeText(msg);
    toast.success("Message copied to clipboard!");
  };

  const chars = msg.length;
  const overLimit = chars > LINKEDIN_LIMIT;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Edit and personalize the outreach message before sending</p>
          {hasCustom && <span className="text-xs font-semibold text-green-600">✓ Using your custom version</span>}
        </div>
        <Button size="sm" variant="outline" onClick={copy} className="gap-1.5 h-7 text-xs">
          <Copy className="w-3 h-3" /> Copy
        </Button>
      </div>

      <div className="relative">
        <Textarea
          className="text-sm resize-none min-h-32"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Edit your outreach message..."
        />
        <div className="absolute bottom-2 right-3 flex items-center gap-2">
          <span className={`text-xs font-mono ${overLimit ? "text-red-500 font-bold" : chars > 250 ? "text-amber-500" : "text-gray-400"}`}>
            {chars}/{LINKEDIN_LIMIT}
          </span>
        </div>
      </div>

      {overLimit && (
        <p className="text-xs text-red-500">⚠ Over LinkedIn DM limit ({chars - LINKEDIN_LIMIT} chars extra)</p>
      )}

      <div className="flex gap-2">
        <Button size="sm" onClick={save} className="gap-1.5 text-xs">
          <Save className="w-3 h-3" /> Save My Version
        </Button>
        {hasCustom && (
          <Button size="sm" variant="outline" onClick={restore} className="gap-1.5 text-xs text-gray-500">
            <RotateCcw className="w-3 h-3" /> Restore Original
          </Button>
        )}
      </div>

      {hasCustom && (
        <Accordion>
          <AccordionItem value="original" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-3 py-2 text-xs text-gray-400 hover:no-underline bg-gray-50">
              View original message
            </AccordionTrigger>
            <AccordionContent className="px-3 py-2">
              <p className="text-sm text-gray-500 italic">{originalMessage}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
