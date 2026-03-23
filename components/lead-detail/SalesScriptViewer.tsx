"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Section { title: string; content: string; color: string; bg: string; }

function parseScript(script: string): Section[] {
  const parts = script.split("\n\n").filter(Boolean);
  const labels = ["Greeting", "Industry Frame", "Pain Diagnosis", "Value Pitch", "Close"];
  const styles = [
    { color: "#1A2744", bg: "#EEF0F5" },
    { color: "#0D4F5C", bg: "#E8F4F6" },
    { color: "#2471A3", bg: "#D6EAF8" },
    { color: "#1E8449", bg: "#D5F5E3" },
    { color: "#E67E22", bg: "#FDEBD0" },
  ];
  return parts.map((p, i) => ({
    title: labels[i] ?? `Section ${i + 1}`,
    content: p.trim(),
    color: styles[i]?.color ?? "#374151",
    bg: styles[i]?.bg ?? "#F9FAFB",
  }));
}

export function SalesScriptViewer({ script }: { script: string }) {
  const sections = parseScript(script);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());

  const copySection = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success("Section copied!");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(script);
    setCopiedAll(true);
    toast.success("Full script copied to clipboard!");
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const toggle = (i: number) => setCollapsed(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">5-section personalized script based on this company's pain points and channel</p>
        <Button size="sm" variant="outline" onClick={copyAll} className="gap-1.5 text-xs h-7">
          {copiedAll ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
          Copy Full Script
        </Button>
      </div>

      <ScrollArea className="h-[500px] pr-3">
        <div className="space-y-3">
          {sections.map((section, i) => (
            <div key={i} className="rounded-xl overflow-hidden border"
                 style={{ borderColor: section.color + "40" }}>
              <div className="flex items-center justify-between px-3 py-2 cursor-pointer"
                   style={{ background: section.bg }}
                   onClick={() => toggle(i)}>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                        style={{ background: section.color }}>
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: section.color }}>
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); copySection(section.content, i); }}
                    className="p-1 rounded hover:bg-white/60 transition-colors"
                  >
                    {copiedIdx === i
                      ? <Check className="w-3.5 h-3.5 text-green-600" />
                      : <Copy className="w-3.5 h-3.5" style={{ color: section.color }} />}
                  </button>
                  {collapsed.has(i) ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronUp className="w-3.5 h-3.5 text-gray-400" />}
                </div>
              </div>
              {!collapsed.has(i) && (
                <div className="px-4 py-3 bg-white">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
