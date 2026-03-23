"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import type { Industry } from "@/types";

interface ObjectionPair {
  objection: string;
  response: string;
  tag?: string;
}

// Universal objections for all industries
const UNIVERSAL_OBJECTIONS: ObjectionPair[] = [
  {
    objection: "It's too expensive.",
    tag: "Price",
    response:
      "Your first 3 months are completely free — no card, no commitment. After that it's ₹X/month. Most clients make that back in the first deal they close through the CRM. What would it be worth if you could close even 2 extra clients per month?",
  },
  {
    objection: "We already have a system.",
    tag: "Competitor",
    response:
      "Interesting — what are you using currently? Most systems I hear about don't have [industry-specific feature]. Is there anything your current system doesn't do well that you wish it did?",
  },
  {
    objection: "It's not the right time.",
    tag: "Timing",
    response:
      "Totally understand. Can I ask — what would need to change for the timing to be right? If it's just about bandwidth, our setup takes under 30 minutes and we handle all onboarding for you.",
  },
  {
    objection: "Just send me information.",
    tag: "Stall",
    response:
      "Of course — I'll send that right over. Before I do, can I ask one quick question? What's the #1 thing you'd want the information to answer for you? That way I can tailor it to what matters most.",
  },
  {
    objection: "I need to think about it.",
    tag: "Delay",
    response:
      "Absolutely, take your time. What's the one thing you'd want to think through? If it's about the ROI or fit, I can answer that right now — no pressure.",
  },
  {
    objection: "We'll build it in-house.",
    tag: "Build vs Buy",
    response:
      "Building in-house means 6–18 months and ₹5L+ in dev costs before you see anything. We can have you live in a week. What part of the product were you most wanting to build custom?",
  },
  {
    objection: "I need to talk to my partner / director.",
    tag: "Authority",
    response:
      "Of course — let me make that easier for you. Would it help if I joined that conversation? Or I can prepare a one-page summary specifically addressing what they'd want to know — shall I send that?",
  },
];

// Industry-specific objections
const INDUSTRY_OBJECTIONS: Partial<Record<Industry, ObjectionPair[]>> = {
  "Real Estate": [
    {
      objection: "We manage leads on spreadsheets and WhatsApp.",
      tag: "Current Process",
      response:
        "That works when you have 10 leads. When you're handling 100+, you're losing deals in the chaos. Which lead was the last one that fell through the cracks on you?",
    },
    {
      objection: "Our team is not tech-savvy.",
      tag: "Adoption",
      response:
        "Our platform is designed for field agents — no training required. If they can WhatsApp, they can use this. We do a live demo in 20 minutes. Want to see it work on your phone right now?",
    },
  ],
  Healthcare: [
    {
      objection: "We're worried about patient data privacy.",
      tag: "Compliance",
      response:
        "Completely valid — patient data is sacred. Our platform doesn't store medical records; it handles scheduling, follow-ups, and appointment reminders only. Everything is encrypted and we can walk you through exactly what data is stored.",
    },
  ],
  Fitness: [
    {
      objection: "Our members don't like apps.",
      tag: "Adoption",
      response:
        "Fair — that's why we offer WhatsApp-based follow-ups too. Members get reminders on WhatsApp without installing anything. Want me to show you how that works?",
    },
  ],
  "E-Commerce": [
    {
      objection: "We already use Shopify / WooCommerce.",
      tag: "Integration",
      response:
        "We integrate directly with Shopify. Your orders and customer data sync automatically so you get a proper CRM on top of your store. Want to see the integration live?",
    },
  ],
  Education: [
    {
      objection: "Our admissions team already follows up manually.",
      tag: "Process",
      response:
        "Manual follow-ups work — until volume grows. What's your current follow-up rate for inquiries that don't convert in the first contact? Most institutes convert an extra 15–20% just by automating the follow-up cadence.",
    },
  ],
  "Financial Services": [
    {
      objection: "We have compliance restrictions on communication tools.",
      tag: "Compliance",
      response:
        "Understood — we can work within those. Our system logs all communications with timestamps which actually helps with compliance audits. Can I share our data handling documentation for your team to review?",
    },
  ],
};

interface ObjectionCardsProps {
  industry?: Industry;
}

export function ObjectionCards({ industry }: ObjectionCardsProps) {
  const [expanded, setExpanded] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);

  const industrySpecific = industry ? (INDUSTRY_OBJECTIONS[industry] ?? []) : [];
  const allObjections = [...industrySpecific, ...UNIVERSAL_OBJECTIONS];

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(key);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="rounded-xl border border-amber-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-4 py-3 bg-amber-50 hover:bg-amber-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">⚡</span>
          <span className="text-sm font-semibold text-amber-900">
            Objection Handlers
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-800 text-xs font-medium">
            {allObjections.length}
          </span>
          {industrySpecific.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
              {industrySpecific.length} for {industry}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-amber-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-amber-600" />
        )}
      </button>

      {/* Objection list */}
      {expanded && (
        <div className="divide-y divide-gray-100">
          {allObjections.map((obj, i) => {
            const key = `${i}-${obj.objection.slice(0, 10)}`;
            const isIndustrySpecific = i < industrySpecific.length;
            return (
              <div key={key} className="px-4 py-3 bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {isIndustrySpecific && (
                        <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-xs font-semibold">
                          {industry}
                        </span>
                      )}
                      {obj.tag && (
                        <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">
                          {obj.tag}
                        </span>
                      )}
                    </div>
                    {/* Objection */}
                    <p className="text-xs font-semibold text-red-700 mb-1.5 italic">
                      &ldquo;{obj.objection}&rdquo;
                    </p>
                    {/* Response */}
                    <p className="text-xs text-gray-700 leading-relaxed">{obj.response}</p>
                  </div>
                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(obj.response, key)}
                    className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 mt-1"
                    title="Copy response"
                  >
                    {copiedIdx === key ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
