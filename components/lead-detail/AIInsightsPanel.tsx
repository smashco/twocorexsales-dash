"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sparkles, RefreshCw, AlertTriangle, Target, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { getCachedInsights, cacheInsights, getLeadCRMState } from "@/lib/crm-storage";
import type { Lead, AIInsights } from "@/types";
import { formatDistanceToNow } from "date-fns";

export function AIInsightsPanel({ lead }: { lead: Lead }) {
  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cached = getCachedInsights(lead.id);
    if (cached) setInsights(cached);
  }, [lead.id]);

  const generate = async () => {
    setLoading(true);
    try {
      const crmState = getLeadCRMState(lead.id);
      const res = await fetch("/api/ai-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, crmState }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Failed");
      cacheInsights(data.insights);
      setInsights(data.insights);
      toast.success("AI insights generated!");
    } catch (e) {
      toast.error("Failed to generate insights. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 py-2">
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Analyzing {lead.companyName} with Claude AI...</span>
        </div>
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
             style={{ background: "var(--nurture-fill)" }}>
          <Sparkles className="w-8 h-8" style={{ color: "var(--nurture-blue)" }} />
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-700">AI Sales Intelligence</p>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">
            Get Claude's analysis: priority reasons, talking points, objection handling, and risk factors specific to {lead.companyName}.
          </p>
        </div>
        <Button onClick={generate} className="gap-2" style={{ background: "var(--navy)" }}>
          <Sparkles className="w-4 h-4" />
          Generate AI Insights
        </Button>
      </div>
    );
  }

  const age = formatDistanceToNow(new Date(insights.generatedAt), { addSuffix: true });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Generated {age}</span>
        <Button size="sm" variant="outline" onClick={generate} className="gap-1.5 h-7 text-xs">
          <RefreshCw className="w-3 h-3" /> Regenerate
        </Button>
      </div>

      {/* Opening lines */}
      <div className="rounded-xl overflow-hidden border border-blue-100">
        <div className="px-4 py-2 flex items-center gap-2" style={{ background: "var(--nurture-fill)" }}>
          <MessageCircle className="w-4 h-4" style={{ color: "var(--nurture-blue)" }} />
          <span className="text-xs font-semibold" style={{ color: "var(--nurture-blue)" }}>Opening Line Variants</span>
        </div>
        <div className="p-3 space-y-2">
          {insights.openingLineVariants?.map((line, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-xs font-bold text-blue-400 shrink-0 mt-0.5">{i + 1}.</span>
              <p className="italic">"{line}"</p>
            </div>
          ))}
        </div>
      </div>

      <Accordion multiple defaultValue={["priority","talking","objections"]} className="space-y-2">
        <AccordionItem value="priority" className="border rounded-xl overflow-hidden">
          <AccordionTrigger className="px-4 py-2.5 hover:no-underline" style={{ background: "#FEF9E7" }}>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700">Why This Lead Is a Priority Now</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-3">
            <ul className="space-y-1.5">
              {insights.priorityReasons?.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-amber-500 mt-1 shrink-0">▸</span>{r}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="talking" className="border rounded-xl overflow-hidden">
          <AccordionTrigger className="px-4 py-2.5 hover:no-underline" style={{ background: "var(--green-fill)" }}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: "var(--green-hv)" }} />
              <span className="text-xs font-semibold" style={{ color: "var(--green-hv)" }}>Strongest Talking Points</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-3">
            <ul className="space-y-1.5">
              {insights.strongestTalkingPoints?.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-1 shrink-0">✓</span>{p}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="objections" className="border rounded-xl overflow-hidden">
          <AccordionTrigger className="px-4 py-2.5 hover:no-underline" style={{ background: "var(--hot-fill)" }}>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: "var(--hot-red)" }} />
              <span className="text-xs font-semibold" style={{ color: "var(--hot-red)" }}>Objection Handling</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-3">
            <div className="space-y-3">
              {insights.objectionHandling?.map((o, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "var(--hot-fill)", color: "var(--hot-red)" }}>
                    <p className="font-semibold mb-0.5">They say:</p>
                    <p>"{o.objection}"</p>
                  </div>
                  <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "var(--green-fill)", color: "var(--green-hv)" }}>
                    <p className="font-semibold mb-0.5">You say:</p>
                    <p>"{o.response}"</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="risks" className="border rounded-xl overflow-hidden">
          <AccordionTrigger className="px-4 py-2.5 hover:no-underline bg-gray-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-600">Risk Factors</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-3">
            <ul className="space-y-1.5">
              {insights.riskFactors?.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-gray-400 mt-1 shrink-0">⚠</span>{r}
                </li>
              ))}
            </ul>
            {insights.suggestedFollowUpTiming && (
              <div className="mt-3 p-2 rounded-lg bg-blue-50 text-xs text-blue-700">
                <span className="font-semibold">Follow-up timing: </span>
                {insights.suggestedFollowUpTiming}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
