// ── Industries ────────────────────────────────────────────────────────────────
export type Industry =
  | "Real Estate"
  | "Healthcare"
  | "Education"
  | "Food & Beverage"
  | "Fitness"
  | "Financial Services"
  | "Events"
  | "Events / Marketing"
  | "Media / Marketing"
  | "Retail / Fashion"
  | "Retail"
  | "HR & Recruitment"
  | "Interior Design"
  | "Legal"
  | "Legal / Compliance"
  | "Consulting"
  | "Logistics"
  | "E-Commerce"
  | "Manufacturing"
  | "Agriculture"
  | "Hospitality"
  | "Automotive"
  | "Pharmaceutical"
  | "Construction"
  | "Travel & Tourism";

export type Qualification = "HOT" | "WARM";
export type Category = "HIGH VALUE" | "NURTURE";
export type IntentLevel = "HIGH" | "MEDIUM";

export type CRMStatus =
  | "not_started"
  | "researched"
  | "message_sent"
  | "in_conversation"
  | "demo_scheduled"
  | "proposal_sent"
  | "won"
  | "lost"
  | "nurturing";

// ── Lead ──────────────────────────────────────────────────────────────────────
export interface Lead {
  id: string;
  companyName: string;
  city: string;
  industry: Industry;
  website: string;
  employees: string;
  serviceFit: string;
  qualification: Qualification;
  confidencePct: number;
  score: number;
  category: Category;
  painPoint1: string;
  painPoint2: string;
  painPoint3: string;
  intentLevel: IntentLevel;
  buyingTrigger: string;
  action: string;
  outreachMessage: string;
  salesScript: string;
  contact: string;
}

// ── Pricing ───────────────────────────────────────────────────────────────────
export type PricingTier = "Starter" | "Growth" | "Business";
export type ServiceCategory = "Basic CRM" | "Custom App" | "CRM + Portal" | "ERP Standard" | "Enterprise ERP";

export interface ProjectDevCost {
  label: string;
  minCost: number;   // one-time project build cost (INR)
  maxCost: number;
  floorCost: number;
  note: string;
}

export interface PricingRecommendation {
  tier: PricingTier;
  serviceCategory: ServiceCategory;
  projectPrice: number;          // recommended one-time project cost (INR, min ₹1.3L)
  monthlyPrice: number;          // 10% of projectPrice / month (support + hosting)
  annualPrice: number;           // monthlyPrice × 10 (2 months free)
  floorPrice: number;            // min acceptable project cost
  openingOffer: string;
  annualPitch: string;
  rationale: string;
  projectDev: ProjectDevCost;
}

// ── CRM State ─────────────────────────────────────────────────────────────────
export interface CallLog {
  id: string;
  timestamp: string;
  channel: string;
  outcome: string;
  notes: string;
  createdBy?: string;
}

export interface LeadCRMState {
  leadId: string;
  status: CRMStatus;
  callLogs: CallLog[];
  generalNotes: string;
  customOutreachMessage: string | null;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  isStarred: boolean;
}

export interface CRMStore {
  version: number;
  leads: Record<string, LeadCRMState>;
  lastUpdated: string;
}

// ── AI Insights ───────────────────────────────────────────────────────────────
export interface AIInsights {
  leadId: string;
  generatedAt: string;
  priorityReasons: string[];
  strongestTalkingPoints: string[];
  objectionHandling: { objection: string; response: string }[];
  riskFactors: string[];
  suggestedFollowUpTiming: string;
  openingLineVariants: string[];
}

// ── Lead Enrichment ───────────────────────────────────────────────────────────
export interface LeadEnrichment {
  leadId: string;
  websiteValid: boolean | null;
  scrapedAddress: string | null;
  scrapedPhone: string | null;
  scrapedEmail: string | null;
  contactName: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  websiteTitle: string | null;
  websiteAbout: string | null;
  enrichedAt: string;
  rawData: unknown | null;
}

// ── Lead Viewer (presence) ─────────────────────────────────────────────────────
export interface LeadViewer {
  id: string;
  leadId: string;
  repName: string;
  lastSeen: string;
}

// ── Social Intelligence ────────────────────────────────────────────────────────
export interface SocialIntelData {
  leadId: string;
  generatedAt: string;
  socialProfiles: {
    linkedin: string | null;
    instagram: string | null;
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
  };
  onlinePresenceScore: number;
  onlinePresenceLabel: "Excellent" | "Good" | "Moderate" | "Weak" | "Minimal";
  companySnapshot: {
    estimatedFounded: string;
    founderOrLeader: string;
    businessType: string;
    primaryMarket: string;
    estimatedMonthlyRevenue: string;
    staffExpansion: string;
  };
  recentOnlineActivity: string[];
  digitalPresenceSummary: string;
  outreachConversationStarters: string[];
  socialEngagementLevel: "High" | "Medium" | "Low" | "None";
  googleBusinessInsights: {
    estimatedRating: string;
    reviewActivity: string;
    businessHours: string;
  };
  contentStrategy: string;
  brandVoice: string;
  keyPersonnelOnline: string[];
  websiteAnalysis: string;
  redFlags: string[];
}

// ── Business Intelligence ──────────────────────────────────────────────────────
export interface BizIntelData {
  leadId: string;
  generatedAt: string;
  healthScore: { score: number; label: string; factors: string[] };
  budgetLikelihood: { percentage: number; reasoning: string; signals: string[] };
  dealSize: { min: string; max: string; mostLikely: string; reasoning: string };
  timeToClose: { minWeeks: number; maxWeeks: number; reasoning: string };
  decisionMaker: { title: string; decisionStyle: string; priorities: string[]; howToApproach: string };
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
  competitive: { mainCompetitors: string[]; ourAdvantage: string[]; switchingBarriers: string };
  industryTrends: string[];
  growthSignals: string[];
  currentTechStack: string[];
  digitalMaturity: { score: number; label: string; gaps: string[] };
  salesCycleRecommendation: { stage: string; nextAction: string; urgency: "HIGH" | "MEDIUM" | "LOW" };
  revenueEstimate: { annual: string; monthly: string; reasoning: string };
  roiForClient: { annualSavings: string; timeToROI: string; primaryBenefit: string };
  marketContext: { localMarketSize: string; growthRate: string; opportunity: string };
  riskMatrix: { risk: string; likelihood: "HIGH" | "MEDIUM" | "LOW"; impact: "HIGH" | "MEDIUM" | "LOW"; mitigation: string }[];
  expansionSignals: string[];
  marketingMaturity: { level: string; currentChannels: string[]; budget: string };
  buyingSignals: string[];
  nextBestAction: { action: string; timing: string; reasoning: string; script: string };
}

// ── One-Call Close Intelligence ────────────────────────────────────────────────
export interface CloseIntelData {
  leadId: string;
  generatedAt: string;
  masterCloseAngle: {
    headline: string;
    explanation: string;
    emotionalTrigger: string;
  };
  secretWeapon: string;
  oneCallScript: {
    opener: string;
    painDiagnosis: string[];
    solutionBridge: string;
    proofPoint: string;
    closingAsk: string;
    silenceInstruction: string;
  };
  objectionKillers: {
    objection: string;
    rebuttalScript: string;
    recoveryMove: string;
  }[];
  urgencyAmmo: string[];
  priceAnchor: {
    costOfInaction: string;
    valueFrame: string;
    trialOffer: string;
  };
  nuclearOption: string;
  buyingSignalToWatch: string;
  followUpPlan: string;
}

// ── Live Intent Signals ────────────────────────────────────────────────────────
export interface DetectedTech {
  tool: string;
  category: "CRM" | "ERP / Accounting" | "E-Commerce" | "Payment" | "Marketing" | "HR / Payroll" | "Support" | "Website Builder" | "Logistics" | "Analytics" | "Other";
  implication: string;
}

export interface IntentSignal {
  type: "Vendor Dissatisfaction" | "Active Evaluation" | "Price Shopping" | "Feature Gap" | "No Current Solution" | "Compliance Trigger" | "Growth Trigger" | "Competitor Threat";
  signal: string;
  source: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  urgency: "Strike Now" | "Follow Up This Week" | "Add to Nurture" | "Monitor";
  salesAdvice: string;
}

export interface IntentSignalData {
  leadId: string;
  generatedAt: string;
  detectedTechStack: DetectedTech[];
  techStackGap: string;
  intentScore: number;
  intentScoreLabel: "Very High" | "High" | "Medium" | "Low";
  switchingReadiness: "Ready to Switch" | "Actively Evaluating" | "Considering" | "Satisfied with Current" | "No Current Tool";
  signals: IntentSignal[];
  indianMarketContext: string;
  competitorToolsDetected: string[];
  recommendedApproach: string;
  nextBestAction: {
    action: string;
    timing: string;
    openingLine: string;
  };
}

// ── Competitor Intelligence ────────────────────────────────────────────────────
export interface VendorShoppingSignal {
  signal: string;
  evidence: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  actionableAdvice: string;
}

export interface CompetitorProfile {
  companyName: string;
  relevance: string;
  techStack: string[];
  strengths: string[];
  weaknesses: string[];
  winAngle: string;
  pricingEstimate: string;
}

export interface CompetitorIntelData {
  leadId: string;
  generatedAt: string;
  competitors: CompetitorProfile[];
  vendorShoppingSignals: VendorShoppingSignal[];
  evaluationStatus: "Actively Evaluating" | "Recently Switched" | "Loyal to Current" | "No Clear Vendor" | "Dissatisfied with Current";
  evaluationSummary: string;
  marketGapAnalysis: {
    gapDescription: string;
    opportunity: string;
    twoCoreXAngle: string;
  };
  recommendedPitch: string;
  urgencyIndicator: "Strike Now" | "Warm Up First" | "Nurture" | "High Alert — Competitor Active";
}

// ── Proposal Intelligence ──────────────────────────────────────────────────────
export interface ProposalFeature {
  name: string;
  description: string;
  painItSolves: string;
  impact: string;
}

export interface ImplementationPhase {
  phase: number;
  title: string;
  duration: string;
  deliverables: string[];
  milestone: string;
}

export interface BeforeAfterItem {
  area: string;
  before: string;
  after: string;
}

export interface ProposalIntelData {
  leadId: string;
  generatedAt: string;
  solutionName: string;
  elevatorPitch: string;
  features: ProposalFeature[];
  beforeAfter: BeforeAfterItem[];
  implementationTimeline: ImplementationPhase[];
  expectedROI: {
    timeToROI: string;
    monthlyTimeSaved: string;
    revenueImpact: string;
    costSavings: string;
  };
  successMetrics: string[];
  whyTwoCoreX: string[];
  pricingJustification: string;
  callToActionScripts: {
    primary: string;
    followUp: string;
    objectionBridge: string;
  };
}

// ── Battle Card ───────────────────────────────────────────────────────────────
export interface BattleCard {
  lead: Lead;
  crmState: LeadCRMState;
  rankScore: number;
  rankReason: string;
}

// ── Dashboard Stats ───────────────────────────────────────────────────────────
export interface DashboardStats {
  totalLeads: number;
  hotCount: number;
  warmCount: number;
  highValueCount: number;
  avgScore: number;
  byIndustry: { industry: string; count: number; hot: number; avgScore: number }[];
  scoreDistribution: { score: number; count: number }[];
  byStatus: { status: CRMStatus; label: string; count: number }[];
}
