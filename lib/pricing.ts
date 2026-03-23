import type { Lead, PricingRecommendation, PricingTier, ServiceCategory, ProjectDevCost } from "@/types";

function parseMinEmployees(empRange: string): number {
  const match = empRange.match(/(\d+)/);
  return match ? parseInt(match[1]) : 5;
}

function getServiceAddon(serviceFit: string): number {
  const modules = serviceFit.split("+").length - 1;
  if (modules === 0) return 0;
  if (modules === 1) return 200;
  if (modules === 2) return 300;
  return 400;
}

export function getServiceCategory(serviceFit: string): ServiceCategory {
  if (serviceFit.includes("SaaS")) return "SaaS Platform";
  if (serviceFit.match(/\bApp\b/)) return "CRM + App";
  if (serviceFit.match(/Portal|Web|Platform|D2C/)) return "CRM + Portal/Web";
  return "CRM Only";
}

function getProjectDevCost(category: ServiceCategory): ProjectDevCost | null {
  switch (category) {
    case "CRM Only":
      return null;
    case "CRM + Portal/Web":
      return {
        label: "Web Portal Development",
        minCost: 35000,
        maxCost: 65000,
        floorCost: 25000,
        note: "Custom client/admin portal design + CRM integration + deployment",
      };
    case "CRM + App":
      return {
        label: "Mobile App Development",
        minCost: 80000,
        maxCost: 150000,
        floorCost: 60000,
        note: "Cross-platform app (iOS + Android) + backend APIs + CRM sync",
      };
    case "SaaS Platform":
      return {
        label: "Full SaaS Platform Build",
        minCost: 200000,
        maxCost: 350000,
        floorCost: 150000,
        note: "Complete platform: web dashboard + mobile app + CRM + integrations + hosting setup",
      };
  }
}

export function getPricingRecommendation(lead: Lead): PricingRecommendation {
  const minEmp = parseMinEmployees(lead.employees);

  let tier: PricingTier;
  let basePrice: number;

  if (minEmp <= 5) {
    tier = "Starter";
    basePrice = 799;
  } else if (minEmp <= 15) {
    tier = "Growth";
    basePrice = 1299;
  } else {
    tier = "Business";
    basePrice = 1999;
  }

  const addon = getServiceAddon(lead.serviceFit);
  const monthlyPrice = basePrice + addon;
  const annualPrice = monthlyPrice * 10;
  const floorPrice = Math.round(monthlyPrice * 0.5);
  const saving = monthlyPrice * 2;

  const serviceCategory = getServiceCategory(lead.serviceFit);
  const projectDev = getProjectDevCost(serviceCategory);

  const openingOffer = `Since you're one of our first customers in ${lead.city}, your first 3 months are completely free. After that it's ₹${monthlyPrice.toLocaleString("en-IN")}/month — cancel anytime.`;

  const annualPitch = `Or lock in the annual plan: ₹${annualPrice.toLocaleString("en-IN")}/year — you save ₹${saving.toLocaleString("en-IN")} (2 months free).`;

  const rationale = `${tier} tier for ${lead.employees} employees + ${lead.serviceFit} complexity`;

  return {
    tier,
    serviceCategory,
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
  "CRM Only":       { label: "CRM Only",        color: "#374151", bg: "#F9FAFB" },
  "CRM + Portal/Web": { label: "CRM + Portal/Web", color: "#1D4ED8", bg: "#EFF6FF" },
  "CRM + App":      { label: "CRM + App",        color: "#7C3AED", bg: "#FAF5FF" },
  "SaaS Platform":  { label: "SaaS Platform",    color: "#B45309", bg: "#FFFBEB" },
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
