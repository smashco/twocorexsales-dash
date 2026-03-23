"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Users, Zap, MessageCircle, AlertCircle } from "lucide-react";
import type { Industry } from "@/types";

interface CheatSheetData {
  buyingTriggers: string[];
  decisionMaker: string;
  bestChannel: string;
  typicalObjection: string;
  insiderTip?: string;
}

const CHEAT_SHEETS: Record<Industry, CheatSheetData> = {
  "Real Estate": {
    buyingTriggers: [
      "Opening a new sales office or expanding team",
      "Lost a deal because of poor lead follow-up",
      "Growing from sole-agent to a team of 5+",
    ],
    decisionMaker: "Owner / Principal Broker (not the agents)",
    bestChannel: "WhatsApp > Phone Call > Instagram DM",
    typicalObjection: "\"We track everything on Excel and WhatsApp groups\"",
    insiderTip: "Lead with how many deals they're losing daily by not following up fast enough.",
  },
  Healthcare: {
    buyingTriggers: [
      "New clinic opening or multi-branch expansion",
      "Appointment no-shows above 20%",
      "Doctor wants to reduce receptionist workload",
    ],
    decisionMaker: "Clinic Owner / Practice Manager (not the doctor for small clinics)",
    bestChannel: "Phone Call > WhatsApp > LinkedIn",
    typicalObjection: "\"We're too busy to switch systems right now\"",
    insiderTip: "Focus on patient recall and no-show reduction — that's direct revenue impact.",
  },
  Education: {
    buyingTriggers: [
      "New academic year intake season (April–June, Oct–Dec)",
      "Low inquiry-to-admission conversion rate",
      "Counselors overwhelmed during peak season",
    ],
    decisionMaker: "Director / Principal / Operations Head",
    bestChannel: "LinkedIn > Phone Call > Email",
    typicalObjection: "\"Our counselors already follow up manually\"",
    insiderTip: "Ask about their current inquiry-to-admission rate. Industry avg is 15%; CRM typically doubles it.",
  },
  Fitness: {
    buyingTriggers: [
      "New gym launch or expansion to second location",
      "High member churn (>30% monthly)",
      "Running paid ads but poor lead conversion",
    ],
    decisionMaker: "Owner / Manager (Fitness Centers are owner-operated)",
    bestChannel: "Instagram DM > WhatsApp > Phone",
    typicalObjection: "\"Our members aren't tech-savvy\"",
    insiderTip: "Show the WhatsApp automation flow — gym owners love it when they see the trial-reminder message.",
  },
  "Financial Services": {
    buyingTriggers: [
      "Audit or compliance review coming up",
      "New advisor joins the team",
      "Expanding from mutual funds to insurance or loans",
    ],
    decisionMaker: "Partner / Principal Advisor / CEO of IFA firm",
    bestChannel: "LinkedIn > Email > Phone",
    typicalObjection: "\"SEBI regulations limit what tools we can use\"",
    insiderTip: "Lead with compliance and documentation — financial advisors love anything that creates audit trails.",
  },
  Events: {
    buyingTriggers: [
      "Taking on a large corporate event (500+ pax)",
      "Managing 3+ simultaneous events",
      "Need vendor + client communication in one place",
    ],
    decisionMaker: "Founder / Operations Head",
    bestChannel: "Instagram DM > WhatsApp > LinkedIn",
    typicalObjection: "\"Every event is different, can't standardize\"",
    insiderTip: "Show checklist and vendor communication features — event planners drown in WhatsApp groups.",
  },
  "Events / Marketing": {
    buyingTriggers: [
      "Scaling from 10 to 30+ clients",
      "Losing track of deliverables across client accounts",
      "Need client-facing portals for project visibility",
    ],
    decisionMaker: "Founder / Creative Director / Account Head",
    bestChannel: "LinkedIn > Instagram > WhatsApp",
    typicalObjection: "\"We manage everything through Notion or Asana\"",
    insiderTip: "Position as a client communication + billing hub, not just project management.",
  },
  "Media / Marketing": {
    buyingTriggers: [
      "Adding retainer clients beyond 10",
      "Reporting takes more than 2 hours per client per month",
      "Client onboarding is still done via email",
    ],
    decisionMaker: "Founder / Account Director",
    bestChannel: "LinkedIn > Email > Phone",
    typicalObjection: "\"We already use HubSpot / Monday / Asana\"",
    insiderTip: "Differentiate on India pricing and built-for-SMB complexity (not enterprise bloat).",
  },
  "Retail / Fashion": {
    buyingTriggers: [
      "Opening new store locations",
      "WhatsApp order management getting out of hand",
      "Lost repeat customers due to poor follow-up",
    ],
    decisionMaker: "Owner / Brand Manager",
    bestChannel: "Instagram DM > WhatsApp > Phone",
    typicalObjection: "\"Most of our sales happen in-store\"",
    insiderTip: "Show how loyalty + repeat purchase reminders drive 20–40% of revenue for retail clients.",
  },
  Retail: {
    buyingTriggers: [
      "Expanding to D2C online channel",
      "Managing inventory across 2+ locations",
      "Repeat customer rate below 25%",
    ],
    decisionMaker: "Store Owner / Operations Manager",
    bestChannel: "WhatsApp > Phone > Instagram",
    typicalObjection: "\"We're a small shop, we don't need a CRM\"",
    insiderTip: "Position as a customer loyalty tool rather than CRM — it's more relatable for retail owners.",
  },
  "HR & Recruitment": {
    buyingTriggers: [
      "Handling 50+ job applications manually",
      "Client wants real-time placement updates",
      "Scaling from freelance recruiter to a team",
    ],
    decisionMaker: "Founder / Head of Talent Acquisition",
    bestChannel: "LinkedIn > Phone > Email",
    typicalObjection: "\"We use LinkedIn Recruiter for everything\"",
    insiderTip: "Show the candidate pipeline + client reporting views — that's what sells it for agencies.",
  },
  "Interior Design": {
    buyingTriggers: [
      "Managing 5+ concurrent projects",
      "Client communication scattered across WhatsApp and email",
      "Vendor quotes and approvals causing delays",
    ],
    decisionMaker: "Principal Designer / Studio Owner",
    bestChannel: "Instagram DM > WhatsApp > Phone",
    typicalObjection: "\"Each project is too unique to templatize\"",
    insiderTip: "Lead with client approval tracking and project timeline — designers love showing clients progress.",
  },
  Legal: {
    buyingTriggers: [
      "Taking on more than 20 active matters",
      "Court date reminders getting missed",
      "Client onboarding is still paper-based",
    ],
    decisionMaker: "Managing Partner / Senior Partner",
    bestChannel: "Phone > Email > LinkedIn",
    typicalObjection: "\"Legal is confidential — we can't use cloud tools\"",
    insiderTip: "Emphasize data locality, access controls, and that case data never leaves their account.",
  },
  "Legal / Compliance": {
    buyingTriggers: [
      "Regulatory deadline tracking becoming unmanageable",
      "Client documents disorganized across email",
      "Expanding practice areas or team",
    ],
    decisionMaker: "Managing Partner / Compliance Officer",
    bestChannel: "Phone > LinkedIn > Email",
    typicalObjection: "\"We have a very specific workflow that software can't match\"",
    insiderTip: "Offer a custom workflow demo — legal clients respond well to 'we can configure this for your firm'.",
  },
  Consulting: {
    buyingTriggers: [
      "Scaling beyond 1:1 client engagements",
      "Proposal-to-close rate below 30%",
      "Post-project client retention below 40%",
    ],
    decisionMaker: "Founder / Managing Director",
    bestChannel: "LinkedIn > Email > Phone",
    typicalObjection: "\"We're too boutique for a CRM\"",
    insiderTip: "Position as a proposal pipeline and follow-up tool — consultants leak deals in the follow-up phase.",
  },
  Logistics: {
    buyingTriggers: [
      "Managing 50+ shipments/deliveries daily",
      "Client calls asking for status updates constantly",
      "Onboarding new logistics partners",
    ],
    decisionMaker: "Operations Head / Founder",
    bestChannel: "Phone > WhatsApp > LinkedIn",
    typicalObjection: "\"We use our own TMS (Transport Management System)\"",
    insiderTip: "Focus on the client-facing portal — logistics companies love giving customers a tracking dashboard.",
  },
  "Food & Beverage": {
    buyingTriggers: [
      "Opening a new outlet or cloud kitchen",
      "Managing corporate catering inquiries manually",
      "Loyalty program running on paper or spreadsheet",
    ],
    decisionMaker: "Owner / Operations Manager",
    bestChannel: "Instagram DM > WhatsApp > Phone",
    typicalObjection: "\"We just opened and need to stabilize first\"",
    insiderTip: "Frame the CRM as a 'first 3 months free' pilot — F&B owners are risk-averse about costs.",
  },
  "E-Commerce": {
    buyingTriggers: [
      "Cart abandonment rate above 60%",
      "Customer support queries unmanageable",
      "Launching a D2C brand from marketplace to own website",
    ],
    decisionMaker: "Founder / Head of Growth / CMO",
    bestChannel: "LinkedIn > Email > Instagram",
    typicalObjection: "\"We have everything on Shopify\"",
    insiderTip: "Lead with customer LTV — e-commerce CRM sells on repeat purchase rate improvement.",
  },
};

interface IndustryCheatSheetProps {
  industry: Industry;
}

export function IndustryCheatSheet({ industry }: IndustryCheatSheetProps) {
  const [expanded, setExpanded] = useState(false);
  const data = CHEAT_SHEETS[industry];

  if (!data) return null;

  return (
    <div className="rounded-xl border border-indigo-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-4 py-3 bg-indigo-50 hover:bg-indigo-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">🎯</span>
          <span className="text-sm font-semibold text-indigo-900">
            {industry} Cheat Sheet
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-indigo-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-indigo-600" />
        )}
      </button>

      {expanded && (
        <div className="bg-white divide-y divide-gray-100">
          {/* Buying Triggers */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Key Buying Triggers
              </span>
            </div>
            <ul className="space-y-1">
              {data.buyingTriggers.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                  <span className="text-amber-400 mt-0.5 shrink-0">•</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Decision Maker */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Decision Maker
              </span>
            </div>
            <p className="text-xs text-gray-700">{data.decisionMaker}</p>
          </div>

          {/* Best Channel */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Best Channel
              </span>
            </div>
            <p className="text-xs text-gray-700 font-medium">{data.bestChannel}</p>
          </div>

          {/* Typical Objection */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Typical Objection
              </span>
            </div>
            <p className="text-xs text-red-700 italic">{data.typicalObjection}</p>
          </div>

          {/* Insider Tip */}
          {data.insiderTip && (
            <div className="px-4 py-3 bg-amber-50">
              <div className="flex items-start gap-2">
                <span className="text-base shrink-0">💡</span>
                <p className="text-xs text-amber-900 font-medium">{data.insiderTip}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
