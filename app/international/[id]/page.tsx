import { notFound } from "next/navigation";
import Link from "next/link";
import { INTL_LEADS } from "@/data/international-leads";
import { getPricingRecommendation } from "@/lib/pricing";
import { TopBar } from "@/components/layout/TopBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesScriptViewer } from "@/components/lead-detail/SalesScriptViewer";
import { CRMTracker } from "@/components/lead-detail/CRMTracker";
import { AIInsightsPanel } from "@/components/lead-detail/AIInsightsPanel";
import { PricingCard } from "@/components/lead-detail/PricingCard";
import { OutreachCustomizer } from "@/components/lead-detail/OutreachCustomizer";
import { OurServicesPanel } from "@/components/lead-detail/OurServicesPanel";
import { FirstOutreachPanel } from "@/components/lead-detail/FirstOutreachPanel";
import { ChevronLeft, Globe, Users, AlertCircle, Zap, Clock } from "lucide-react";
import type { Lead } from "@/types";

const FLAG: Record<string, string> = {
  "UAE": "🇦🇪", "UK": "🇬🇧", "USA": "🇺🇸", "Canada": "🇨🇦",
  "Australia": "🇦🇺", "Singapore": "🇸🇬", "Malaysia": "🇲🇾",
  "South Africa": "🇿🇦", "Nigeria": "🇳🇬",
};

const COUNTRY_TZ: Record<string, { label: string; bestCall: string }> = {
  "UAE":          { label: "UAE (GST)",  bestCall: "11 AM–1 PM IST / 3–5 PM IST" },
  "UK":           { label: "UK (BST)",   bestCall: "1:30–4:30 PM IST" },
  "USA":          { label: "USA (ET)",   bestCall: "6:30–9 PM IST" },
  "Canada":       { label: "Canada (ET)", bestCall: "6:30–9 PM IST" },
  "Australia":    { label: "AUS (AEST)", bestCall: "5–8 AM IST" },
  "Singapore":    { label: "SGT",        bestCall: "7–11 AM IST" },
  "Malaysia":     { label: "MYT",        bestCall: "7–11 AM IST" },
  "South Africa": { label: "SAST",       bestCall: "11:30 AM–2:30 PM IST" },
  "Nigeria":      { label: "WAT",        bestCall: "12:30–3:30 PM IST" },
};

export function generateStaticParams() {
  return INTL_LEADS.map(l => ({ id: l.id }));
}

export default async function IntlLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = INTL_LEADS.find(l => l.id === id);
  if (!lead) notFound();
  const pricing = getPricingRecommendation(lead as Lead);
  const tz = COUNTRY_TZ[lead.country];

  return (
    <>
      <TopBar title={lead.companyName} />
      <div className="flex-1 p-3 md:p-4 lg:p-6 space-y-4">

        {/* Back */}
        <Link href="/international" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors min-h-[44px] py-3">
          <ChevronLeft className="w-3.5 h-3.5" /> Back to International Leads
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 md:px-5 py-4" style={{ background: "var(--navy)" }}>
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono text-white/40">{lead.id}</span>
                  <span className="text-sm">{FLAG[lead.country]}</span>
                  <span className="text-xs text-white/60">{lead.country}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: lead.qualification === "HOT" ? "var(--hot-fill)" : "var(--warm-fill)", color: lead.qualification === "HOT" ? "var(--hot-red)" : "var(--warm-amber)" }}>
                    {lead.qualification}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: lead.category === "HIGH VALUE" ? "var(--green-fill)" : "var(--nurture-fill)", color: lead.category === "HIGH VALUE" ? "var(--green-hv)" : "var(--nurture-blue)" }}>
                    {lead.category}
                  </span>
                </div>
                <h1 className="text-lg md:text-xl font-bold text-white">{lead.companyName}</h1>
                <p className="text-white/60 text-sm mt-0.5">{lead.city}, {lead.country} · {lead.industry}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-white">{lead.score}</div>
                  <div className="text-xs text-white/40">Score /10</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-white">{lead.confidencePct}%</div>
                  <div className="text-xs text-white/40">Confidence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Meta strip */}
          <div className="px-4 md:px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 border-b bg-gray-50">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{lead.employees} employees</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{lead.website.replace(/^https?:\/\//, "")}</a>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Zap className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{lead.serviceFit}</span>
            </div>
            {tz && (
              <div className="flex items-center gap-2 text-xs text-blue-700">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span><strong>Best call:</strong> {tz.bestCall}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto tabs-scroll -mx-3 md:mx-0 px-3 md:px-0">
            <TabsList className="bg-white shadow-sm border rounded-xl p-1 h-auto inline-flex flex-nowrap gap-1 min-w-max md:flex-wrap md:w-full md:min-w-0">
              {[
                ["overview", "Overview"],
                ["script",   "Sales Script"],
                ["crm",      "CRM Tracker"],
                ["ai",       "AI Insights"],
                ["msg",      "Outreach"],
                ["services", "💼 Our Services"],
                ["outreach", "🚀 First Outreach"],
              ].map(([val, label]) => (
                <TabsTrigger key={val} value={val}
                  className="text-xs px-3 py-2 rounded-lg whitespace-nowrap min-h-[36px] data-[state=active]:shadow-sm data-[state=active]:font-semibold">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Pain Points</p>
                <div className="space-y-2">
                  {[lead.painPoint1, lead.painPoint2, lead.painPoint3].map((pp, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                        style={{ background: ["#C0392B","#E67E22","#2471A3"][i] }}>{i + 1}</span>
                      {pp}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Buying Trigger</p>
                  <p className="text-sm text-gray-700 font-medium">{lead.buyingTrigger}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Recommended Action</p>
                  <p className="text-sm text-gray-700">{lead.action}</p>
                </div>
                {tz && (
                  <div className="rounded-lg p-3 bg-blue-50 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Best Time to Call (IST)
                    </p>
                    <p className="text-sm text-blue-800 font-medium">{tz.bestCall}</p>
                    <p className="text-xs text-blue-500">{tz.label}</p>
                  </div>
                )}
              </div>
            </div>
            <PricingCard pricing={pricing} />
          </TabsContent>

          <TabsContent value="script">
            <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
              <SalesScriptViewer script={lead.salesScript} />
            </div>
          </TabsContent>

          <TabsContent value="crm">
            <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
              <CRMTracker leadId={lead.id} />
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
              <AIInsightsPanel lead={lead as Lead} />
            </div>
          </TabsContent>

          <TabsContent value="msg">
            <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
              <OutreachCustomizer leadId={lead.id} originalMessage={lead.outreachMessage} />
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
              <OurServicesPanel lead={lead as Lead} pricing={pricing} />
            </div>
          </TabsContent>

          <TabsContent value="outreach">
            <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
              <FirstOutreachPanel lead={lead as Lead} pricing={pricing} />
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </>
  );
}
