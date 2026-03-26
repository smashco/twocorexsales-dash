import type { Lead, PricingRecommendation, PricingTier, ServiceCategory, ProjectDevCost } from "@/types";

export function getServiceCategory(serviceFit: string): ServiceCategory {
  const sf = serviceFit.toLowerCase();
  if (
    sf.includes("enterprise erp") ||
    (sf.includes("erp") && (sf.includes("suite") || sf.includes("full") || sf.includes("production")))
  ) return "Enterprise ERP";
  if (sf.includes("erp") || sf.includes("management system") || sf.includes("management erp")) return "ERP Standard";
  if (sf.includes("app") && (sf.includes("erp") || sf.includes("portal") || sf.includes("crm"))) return "CRM + Portal";
  if (sf.includes("app")) return "Custom App";
  if (sf.includes("portal") || sf.includes("platform") || sf.includes("saas")) return "CRM + Portal";
  return "Basic CRM";
}

function parseMinEmployees(empRange: string): number {
  const match = empRange.match(/(\d+)/);
  return match ? parseInt(match[1]) : 25;
}

function getProjectDevCost(category: ServiceCategory, minEmp: number): ProjectDevCost {
  switch (category) {
    case "Basic CRM":
      return {
        label: "Custom CRM Development",
        minCost: 130000,
        maxCost: 200000,
        floorCost: 110000,
        note: "Lead pipeline + contact management + WhatsApp integration + reporting dashboard",
      };
    case "Custom App":
      return {
        label: "Custom Mobile App Development",
        minCost: 200000,
        maxCost: 350000,
        floorCost: 160000,
        note: "Cross-platform app (iOS + Android) + backend APIs + admin dashboard + Play Store deployment",
      };
    case "CRM + Portal":
      return {
        label: "CRM + Web Portal",
        minCost: 250000,
        maxCost: 420000,
        floorCost: 200000,
        note: "CRM + client/admin web portal + role-based access + API integrations + cloud hosting",
      };
    case "ERP Standard":
      return {
        label: "Custom ERP Development",
        minCost: 350000,
        maxCost: 520000,
        floorCost: 280000,
        note: "Modules: inventory + procurement + billing + HR + reporting + mobile app",
      };
    case "Enterprise ERP":
      return {
        label: "Enterprise ERP Suite",
        minCost: minEmp >= 100 ? 600000 : 500000,
        maxCost: minEmp >= 100 ? 850000 : 680000,
        floorCost: minEmp >= 100 ? 480000 : 380000,
        note: "Full ERP: production + inventory + procurement + HR + CRM + finance + mobile + client portal",
      };
  }
}

export function getPricingRecommendation(lead: Lead): PricingRecommendation {
  const minEmp = parseMinEmployees(lead.employees);
  const serviceCategory = getServiceCategory(lead.serviceFit);
  const projectDev = getProjectDevCost(serviceCategory, minEmp);

  // Round project price to nearest ₹10,000
  const projectPrice = Math.round((projectDev.minCost + projectDev.maxCost) / 2 / 10000) * 10000;

  // Monthly support subscription = 10% of project cost, rounded to nearest ₹500
  const monthlyPrice = Math.round(projectPrice * 0.10 / 500) * 500;

  // Annual plan = 10 months (2 months free)
  const annualPrice = monthlyPrice * 10;
  const floorPrice = projectDev.floorCost;

  let tier: PricingTier;
  if (projectPrice <= 180000) tier = "Starter";
  else if (projectPrice <= 420000) tier = "Growth";
  else tier = "Business";

  const openingOffer = `Project build: ₹${projectPrice.toLocaleString("en-IN")} one-time. Then just ₹${monthlyPrice.toLocaleString("en-IN")}/month for hosting + support + updates — cancel anytime.`;

  const annualPitch = `Annual support plan: ₹${annualPrice.toLocaleString("en-IN")}/year (2 months free) — includes all feature upgrades + priority support.`;

  const rationale = `${serviceCategory} for ${lead.employees}-employee ${lead.industry} company · Project: ₹${projectPrice.toLocaleString("en-IN")} · Monthly: ₹${monthlyPrice.toLocaleString("en-IN")}/mo`;

  return {
    tier,
    serviceCategory,
    projectPrice,
    monthlyPrice,
    annualPrice,
    floorPrice,
    openingOffer,
    annualPitch,
    rationale,
    projectDev,
  };
}

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, { label: string; color: string; bg: string }> = {
  "Basic CRM":      { label: "Basic CRM",      color: "#374151", bg: "#F9FAFB" },
  "Custom App":     { label: "Custom App",     color: "#7C3AED", bg: "#FAF5FF" },
  "CRM + Portal":   { label: "CRM + Portal",   color: "#1D4ED8", bg: "#EFF6FF" },
  "ERP Standard":   { label: "ERP Standard",   color: "#065F46", bg: "#ECFDF5" },
  "Enterprise ERP": { label: "Enterprise ERP", color: "#B45309", bg: "#FFFBEB" },
};

export const CRM_STATUS_LABELS: Record<string, string> = {
  not_started:     "Not Started",
  researched:      "Researched",
  message_sent:    "Message Sent",
  in_conversation: "In Conversation",
  demo_scheduled:  "Demo Scheduled",
  proposal_sent:   "Proposal Sent",
  won:             "Won ✅",
  lost:            "Lost ❌",
  nurturing:       "Nurturing",
};
