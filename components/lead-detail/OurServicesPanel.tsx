"use client";

import type { Lead, PricingRecommendation } from "@/types";
import { CheckCircle2, Zap, Smartphone, Globe, Database, BarChart3, Shield, Clock, Wrench, Star } from "lucide-react";

interface Props {
  lead: Lead;
  pricing: PricingRecommendation;
}

const SERVICES = [
  {
    id: "Basic CRM",
    icon: "📊",
    title: "Basic CRM",
    tagline: "Organise leads, contacts & follow-ups in one place",
    price: "₹1,30,000 – ₹2,00,000",
    monthly: "₹14,000/mo",
    timeline: "4 – 6 weeks",
    color: "#374151",
    bg: "#F9FAFB",
    border: "#D1D5DB",
    includes: [
      "Lead pipeline with drag-and-drop Kanban board",
      "Contact & company management with custom fields",
      "WhatsApp + SMS follow-up integration",
      "Task reminders and follow-up alerts",
      "Sales reporting dashboard with charts",
      "Role-based access (Admin / Sales Rep)",
      "Mobile-responsive web app",
      "Cloud hosting + daily backups",
    ],
    bestFor: "10–25 employee businesses: consultants, service firms, small B2B companies managing leads manually or on Excel/WhatsApp.",
    deliverables: ["Web app (mobile-responsive)", "Admin panel", "WhatsApp API setup", "Basic analytics"],
  },
  {
    id: "Custom App",
    icon: "📱",
    title: "Custom Mobile App",
    tagline: "A branded iOS + Android app for your business",
    price: "₹2,00,000 – ₹3,50,000",
    monthly: "₹27,500/mo",
    timeline: "6 – 10 weeks",
    color: "#7C3AED",
    bg: "#FAF5FF",
    border: "#C4B5FD",
    includes: [
      "Cross-platform app (iOS + Android) — React Native",
      "Custom UI with your brand identity",
      "Backend APIs (Node.js + PostgreSQL)",
      "Admin dashboard for data management",
      "Push notifications (orders, alerts, updates)",
      "Google Play Store + Apple App Store deployment",
      "Offline mode support",
      "Cloud hosting + CDN + backups",
    ],
    bestFor: "Businesses needing a client-facing catalog, field team app, booking app, or service-request app.",
    deliverables: ["iOS app", "Android app", "Admin web panel", "REST APIs", "App Store listings"],
  },
  {
    id: "CRM + Portal",
    icon: "🌐",
    title: "CRM + Web Portal",
    tagline: "CRM system + a client-facing web portal in one",
    price: "₹2,50,000 – ₹4,20,000",
    monthly: "₹33,500/mo",
    timeline: "8 – 12 weeks",
    color: "#1D4ED8",
    bg: "#EFF6FF",
    border: "#93C5FD",
    includes: [
      "Full CRM: pipeline, contacts, deals, tasks, notes",
      "Client portal: customers can log in, view status, raise tickets",
      "Role-based access control (multiple user roles)",
      "3rd-party API integrations (payment, email, SMS, Tally)",
      "Custom workflows and automation rules",
      "Advanced reporting + export to Excel/PDF",
      "Cloud-hosted on AWS/GCP with SSL",
      "Mobile-responsive on all devices",
    ],
    bestFor: "B2B companies that need both internal team CRM and a self-service portal for clients (e.g. logistics, finance, consulting, construction).",
    deliverables: ["CRM web app", "Client portal", "Admin panel", "API integrations", "Analytics dashboard"],
  },
  {
    id: "ERP Standard",
    icon: "⚙️",
    title: "Custom ERP",
    tagline: "End-to-end business management across departments",
    price: "₹3,50,000 – ₹5,20,000",
    monthly: "₹43,500/mo",
    timeline: "12 – 18 weeks",
    color: "#065F46",
    bg: "#ECFDF5",
    border: "#6EE7B7",
    includes: [
      "Inventory management with stock alerts",
      "Purchase & procurement module",
      "Billing, invoicing & GST reports",
      "HR: attendance, payroll, leave management",
      "CRM: leads, pipeline, customer history",
      "Advanced reporting & business analytics",
      "Mobile app for field team + management",
      "Tally / QuickBooks integration",
    ],
    bestFor: "Mid-size manufacturers, logistics companies, distributors, or retail chains needing integrated operations management.",
    deliverables: ["ERP web app", "Mobile app", "All modules above", "Training", "Data migration support"],
  },
  {
    id: "Enterprise ERP",
    icon: "🏢",
    title: "Enterprise ERP Suite",
    tagline: "Full-scale digital transformation for large organisations",
    price: "₹5,00,000 – ₹8,50,000",
    monthly: "₹67,500/mo",
    timeline: "16 – 24 weeks",
    color: "#B45309",
    bg: "#FFFBEB",
    border: "#FCD34D",
    includes: [
      "Everything in ERP Standard, plus:",
      "Production & manufacturing workflow management",
      "Multi-branch & multi-warehouse support",
      "Finance module: P&L, balance sheet, budgeting",
      "Client portal with real-time order tracking",
      "Advanced AI-powered analytics & forecasting",
      "API integrations with banks, GST, Tally, SAP",
      "Dedicated account manager + priority 24/7 support",
    ],
    bestFor: "Large enterprises (100+ employees) or fast-scaling companies that need full digital operations management across all departments.",
    deliverables: ["Full ERP suite", "Mobile apps", "Client portal", "All integrations", "Dedicated support team"],
  },
];

const PROCESS_STEPS = [
  { icon: "🔍", title: "Discovery Call", desc: "We understand your business, pain points, and exact requirements. Free 45-minute session." },
  { icon: "📐", title: "Scoping & Proposal", desc: "Detailed feature list, wireframes, timeline, and fixed-price proposal within 3 days." },
  { icon: "🎨", title: "UI/UX Design", desc: "Custom design mockups approved by you before a single line of code is written." },
  { icon: "💻", title: "Development", desc: "Agile sprints with weekly demo updates. You see progress every week." },
  { icon: "🧪", title: "Testing & QA", desc: "Full testing on real devices before handover. Zero known bugs at launch." },
  { icon: "🚀", title: "Launch & Training", desc: "We deploy, onboard your team, and train staff. Go live in confidence." },
  { icon: "🛠️", title: "Support & Updates", desc: "Monthly support plan covers hosting, updates, bug fixes & new features." },
];

const TECH_STACK = [
  { layer: "Frontend", tech: "React.js / Next.js", note: "Fast, SEO-friendly web apps" },
  { layer: "Mobile", tech: "React Native", note: "One codebase → iOS + Android" },
  { layer: "Backend", tech: "Node.js + Express", note: "Scalable REST APIs" },
  { layer: "Database", tech: "PostgreSQL / MongoDB", note: "Reliable, cloud-native storage" },
  { layer: "Cloud", tech: "AWS / GCP", note: "99.9% uptime SLA, auto-scaling" },
  { layer: "Payments", tech: "Razorpay / PayU", note: "UPI, cards, net banking" },
  { layer: "Messaging", tech: "WhatsApp Business API", note: "Automated customer communication" },
  { layer: "Auth", tech: "JWT + OAuth", note: "Secure role-based login" },
];

export function OurServicesPanel({ lead, pricing }: Props) {
  const recommended = pricing.serviceCategory;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-xl p-4 text-white" style={{ background: "var(--navy)" }}>
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-wide">Recommended for {lead.companyName}</span>
        </div>
        <h2 className="text-xl font-bold">{recommended}</h2>
        <p className="text-white/70 text-sm mt-1">
          Based on {lead.employees} employees · {lead.industry} · {lead.serviceFit}
        </p>
        <div className="flex gap-4 mt-3">
          <div>
            <div className="text-xs text-white/50">Project Cost</div>
            <div className="text-lg font-bold text-yellow-400">₹{pricing.projectPrice.toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div className="text-xs text-white/50">Monthly Support</div>
            <div className="text-lg font-bold text-yellow-400">₹{pricing.monthlyPrice.toLocaleString("en-IN")}/mo</div>
          </div>
          <div>
            <div className="text-xs text-white/50">Annual Plan</div>
            <div className="text-lg font-bold text-yellow-400">₹{pricing.annualPrice.toLocaleString("en-IN")}/yr</div>
          </div>
        </div>
      </div>

      {/* All Service Tiers */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">All Service Tiers</h3>
        <div className="space-y-3">
          {SERVICES.map((svc) => {
            const isRecommended = svc.id === recommended;
            return (
              <div
                key={svc.id}
                className="rounded-xl border-2 overflow-hidden"
                style={{ borderColor: isRecommended ? svc.color : svc.border, background: isRecommended ? svc.bg : "#fff" }}
              >
                {/* Title row */}
                <div className="flex items-center justify-between px-4 py-3" style={{ background: isRecommended ? svc.color : "#F9FAFB" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{svc.icon}</span>
                    <div>
                      <div className="font-bold text-sm" style={{ color: isRecommended ? "#fff" : svc.color }}>
                        {svc.title}
                        {isRecommended && (
                          <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900">
                            ★ RECOMMENDED
                          </span>
                        )}
                      </div>
                      <div className="text-xs opacity-80" style={{ color: isRecommended ? "#fff" : "#6B7280" }}>
                        {svc.tagline}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="font-bold text-sm" style={{ color: isRecommended ? "#fff" : svc.color }}>{svc.price}</div>
                    <div className="text-xs opacity-70" style={{ color: isRecommended ? "#fff" : "#6B7280" }}>
                      {svc.monthly} support · {svc.timeline}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* What's included */}
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">What's Included</p>
                    <div className="space-y-1.5">
                      {svc.includes.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: svc.color }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Best For */}
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Best For</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{svc.bestFor}</p>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Deliverables</p>
                      <div className="flex flex-wrap gap-1.5">
                        {svc.deliverables.map((d, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ background: svc.bg, color: svc.color, border: `1px solid ${svc.border}` }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Timeline + support */}
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        Delivery: <span className="font-semibold text-gray-700">{svc.timeline}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Wrench className="w-3.5 h-3.5" />
                        Support: <span className="font-semibold text-gray-700">{svc.monthly}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What all plans include */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" /> Every Project Includes — No Hidden Costs
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            "Source code ownership — yours forever",
            "SSL certificate + secure HTTPS",
            "3 months free bug fix warranty",
            "Staff training + onboarding",
            "Cloud hosting setup + config",
            "Admin panel for managing data",
            "GST-compliant invoice",
            "NDA + contract before starting",
            "Weekly progress updates",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-green-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Our Process */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Our Delivery Process</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xl mb-1">{step.icon}</div>
              <div className="text-xs font-bold text-gray-800 mb-0.5">
                <span className="text-gray-400 mr-1">{String(i + 1).padStart(2, "0")}.</span>
                {step.title}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Technology Stack We Use</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TECH_STACK.map((t, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{t.layer}</div>
              <div className="text-sm font-bold text-gray-800">{t.tech}</div>
              <div className="text-xs text-gray-500 mt-0.5">{t.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why us for this lead */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" /> Why This Service Fits {lead.companyName}
        </h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-xs text-blue-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span><strong>Pain Point 1:</strong> {lead.painPoint1} → Our system automates this entirely.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-blue-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span><strong>Pain Point 2:</strong> {lead.painPoint2} → Built-in tracking and visibility solve this.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-blue-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span><strong>Pain Point 3:</strong> {lead.painPoint3} → Automated reports eliminate this manual work.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-blue-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span><strong>Buying Trigger:</strong> {lead.buyingTrigger}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl p-4 text-center" style={{ background: "var(--navy)" }}>
        <div className="text-white font-bold text-base mb-1">Ready to close {lead.companyName}?</div>
        <div className="text-white/60 text-sm mb-3">
          Open with: &quot;We&apos;ve built exactly this for {lead.industry} companies before — the project is ₹{pricing.projectPrice.toLocaleString("en-IN")} one-time, then just ₹{pricing.monthlyPrice.toLocaleString("en-IN")}/month.
          First 3 months free.&quot;
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold" style={{ background: "var(--gold)", color: "#1A1A2E" }}>
          <Zap className="w-4 h-4" />
          Recommend: {recommended} · ₹{pricing.projectPrice.toLocaleString("en-IN")}
        </div>
      </div>

    </div>
  );
}
