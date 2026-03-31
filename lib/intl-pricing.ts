import type { Lead, PricingTier, ServiceCategory, ProjectDevCost, PricingRecommendation } from "@/types";
import { getServiceCategory } from "./pricing";

// ── Country currency & multiplier config ──────────────────────────────────────
export interface CountryCurrency {
  code: string;       // USD, GBP, AED, etc.
  symbol: string;     // $, £, د.إ, etc.
  locale: string;     // en-US, en-GB, etc.
  /** Multiplier vs INR base (approx USD-equivalent pricing) */
  rateLabel: string;  // "USD", "GBP", etc.
}

const COUNTRY_CURRENCY: Record<string, CountryCurrency> = {
  "UAE":          { code: "AED", symbol: "AED ", locale: "en-AE", rateLabel: "AED" },
  "UK":           { code: "GBP", symbol: "£",   locale: "en-GB", rateLabel: "GBP" },
  "USA":          { code: "USD", symbol: "$",    locale: "en-US", rateLabel: "USD" },
  "Canada":       { code: "CAD", symbol: "C$",   locale: "en-CA", rateLabel: "CAD" },
  "Australia":    { code: "AUD", symbol: "A$",   locale: "en-AU", rateLabel: "AUD" },
  "Singapore":    { code: "SGD", symbol: "S$",   locale: "en-SG", rateLabel: "SGD" },
  "Malaysia":     { code: "MYR", symbol: "RM ",  locale: "ms-MY", rateLabel: "MYR" },
  "South Africa": { code: "ZAR", symbol: "R",    locale: "en-ZA", rateLabel: "ZAR" },
  "Nigeria":      { code: "NGN", symbol: "₦",    locale: "en-NG", rateLabel: "NGN" },
};

// ── USD-based project dev costs (international market rates) ──────────────────
// These are competitive rates for custom software from an offshore India dev shop
// targeting international SMBs — significantly higher than domestic INR pricing.
function getIntlProjectDevCost(category: ServiceCategory, minEmp: number): ProjectDevCost {
  switch (category) {
    case "Basic CRM":
      return {
        label: "Custom CRM Development",
        minCost: 3000,
        maxCost: 5000,
        floorCost: 2500,
        note: "Lead pipeline + contact management + messaging integration + reporting dashboard",
      };
    case "Custom App":
      return {
        label: "Custom Mobile App Development",
        minCost: 5000,
        maxCost: 8000,
        floorCost: 4000,
        note: "Cross-platform app (iOS + Android) + backend APIs + admin dashboard + App Store deployment",
      };
    case "CRM + Portal":
      return {
        label: "CRM + Web Portal",
        minCost: 6000,
        maxCost: 10000,
        floorCost: 5000,
        note: "CRM + client/admin web portal + role-based access + API integrations + cloud hosting",
      };
    case "ERP Standard":
      return {
        label: "Custom ERP Development",
        minCost: 8000,
        maxCost: 15000,
        floorCost: 7000,
        note: "Modules: inventory + procurement + billing + HR + reporting + mobile app",
      };
    case "Enterprise ERP":
      return {
        label: "Enterprise ERP Suite",
        minCost: minEmp >= 100 ? 18000 : 14000,
        maxCost: minEmp >= 100 ? 25000 : 20000,
        floorCost: minEmp >= 100 ? 12000 : 10000,
        note: "Full ERP: production + inventory + procurement + HR + CRM + finance + mobile + client portal",
      };
  }
}

// ── Currency conversion from USD base ─────────────────────────────────────────
// Approximate rates — rounded for clean pricing
const USD_TO_LOCAL: Record<string, number> = {
  "UAE":          3.67,
  "UK":           0.79,
  "USA":          1.00,
  "Canada":       1.36,
  "Australia":    1.53,
  "Singapore":    1.34,
  "Malaysia":     4.47,
  "South Africa": 18.2,
  "Nigeria":      1550,
};

function roundToNice(value: number, country: string): number {
  // Round to clean numbers based on currency magnitude
  if (country === "Nigeria") return Math.round(value / 10000) * 10000;
  if (country === "South Africa") return Math.round(value / 100) * 100;
  if (country === "Malaysia") return Math.round(value / 100) * 100;
  if (country === "UAE") return Math.round(value / 100) * 100;
  return Math.round(value / 50) * 50; // USD, GBP, CAD, AUD, SGD
}

// ── Main international pricing function ───────────────────────────────────────
export function getIntlPricingRecommendation(lead: Lead): PricingRecommendation & { currency: CountryCurrency; localProjectPrice: number; localMonthlyPrice: number; localAnnualPrice: number; localFloorPrice: number; localDevMin: number; localDevMax: number; localDevFloor: number } {
  const country = lead.country ?? "USA";
  const currency = COUNTRY_CURRENCY[country] ?? COUNTRY_CURRENCY["USA"];
  const rate = USD_TO_LOCAL[country] ?? 1;

  const minEmp = parseInt((lead.employees.match(/(\d+)/) || ["25"])[1]);
  const serviceCategory = getServiceCategory(lead.serviceFit);
  const projectDev = getIntlProjectDevCost(serviceCategory, minEmp);

  // USD base prices
  const projectPriceUSD = Math.round((projectDev.minCost + projectDev.maxCost) / 2 / 100) * 100;
  const monthlyPriceUSD = Math.round(projectPriceUSD * 0.10 / 25) * 25;
  const annualPriceUSD = monthlyPriceUSD * 10;
  const floorPriceUSD = projectDev.floorCost;

  // Convert to local currency
  const localProjectPrice = roundToNice(projectPriceUSD * rate, country);
  const localMonthlyPrice = roundToNice(monthlyPriceUSD * rate, country);
  const localAnnualPrice = roundToNice(monthlyPriceUSD * 10 * rate, country);
  const localFloorPrice = roundToNice(floorPriceUSD * rate, country);
  const localDevMin = roundToNice(projectDev.minCost * rate, country);
  const localDevMax = roundToNice(projectDev.maxCost * rate, country);
  const localDevFloor = roundToNice(projectDev.floorCost * rate, country);

  // Tier based on USD project price
  let tier: PricingTier;
  if (projectPriceUSD <= 5000) tier = "Starter";
  else if (projectPriceUSD <= 10000) tier = "Growth";
  else tier = "Business";

  const fmt = (v: number) => v.toLocaleString(currency.locale);

  const openingOffer = `Project build: ${currency.symbol}${fmt(localProjectPrice)} one-time. Then just ${currency.symbol}${fmt(localMonthlyPrice)}/month for hosting + support + updates — cancel anytime.`;
  const annualPitch = `Annual support plan: ${currency.symbol}${fmt(localAnnualPrice)}/year (2 months free) — includes all feature upgrades + priority support.`;
  const rationale = `${serviceCategory} for ${lead.employees}-employee ${lead.industry} company · Project: ${currency.symbol}${fmt(localProjectPrice)} · Monthly: ${currency.symbol}${fmt(localMonthlyPrice)}/mo`;

  return {
    tier,
    serviceCategory,
    // These store USD values for compatibility
    projectPrice: projectPriceUSD,
    monthlyPrice: monthlyPriceUSD,
    annualPrice: annualPriceUSD,
    floorPrice: floorPriceUSD,
    openingOffer,
    annualPitch,
    rationale,
    projectDev,
    // Local currency values
    currency,
    localProjectPrice,
    localMonthlyPrice,
    localAnnualPrice,
    localFloorPrice,
    localDevMin,
    localDevMax,
    localDevFloor,
  };
}

// ── Format helper ─────────────────────────────────────────────────────────────
export function fmtIntlPrice(value: number, country: string): string {
  const currency = COUNTRY_CURRENCY[country] ?? COUNTRY_CURRENCY["USA"];
  return `${currency.symbol}${value.toLocaleString(currency.locale)}`;
}

export function getCountryCurrency(country: string): CountryCurrency {
  return COUNTRY_CURRENCY[country] ?? COUNTRY_CURRENCY["USA"];
}
