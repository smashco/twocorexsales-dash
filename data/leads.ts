import { generateSalesScript } from "@/lib/script-generator";
import type { Lead } from "@/types";

export const LEADS: Lead[] = [
  {
    id: "RE-1",
    companyName: "PropDesk Realty",
    city: "Andheri, Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "propdeskre.in",
    employees: "5–12",
    serviceFit: "CRM",
    qualification: "HOT",
    confidencePct: 85,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "WhatsApp is the CRM — no pipeline",
    painPoint2: "Repeat tenants not re-engaged at renewal",
    painPoint3: "No listing-to-buyer matching system",
    intentLevel: "HIGH",
    buyingTrigger: "Growing to 3-member team",
    action: "LinkedIn DM to founder",
    outreachMessage: "Hey — for a boutique rental brokerage, lease renewal reminders are repeat revenue. Is there a system tracking when current tenants' leases are up?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-2",
    companyName: "Kaveri Properties",
    city: "Pune Old City",
    industry: "Real Estate" as Lead["industry"],
    website: "kaveriproperties.in",
    employees: "5–10",
    serviceFit: "CRM",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Lead database in physical notebook",
    painPoint2: "No digital property listing",
    painPoint3: "Referral program entirely verbal",
    intentLevel: "HIGH",
    buyingTrigger: "Decades of client relationships not digitized",
    action: "Office visit in Sadashiv Peth",
    outreachMessage: "Hi — for a trusted brokerage with decades of clients, that relationship database is your biggest asset. Is it stored digitally?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-3",
    companyName: "InvestRight NRI Advisory",
    city: "Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "investrightnri.com",
    employees: "3–8",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 86,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Document collection via email — no secure vault",
    painPoint2: "Property shortlist as WhatsApp PPT",
    painPoint3: "No real-time deal status for NRI client",
    intentLevel: "HIGH",
    buyingTrigger: "NRI buyers managing remotely need digital process",
    action: "LinkedIn to founder",
    outreachMessage: "Hi — NRI clients managing investments remotely need a lot more structure. Is there a portal where they can track shortlisted properties and documents?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-4",
    companyName: "SmartDen Realty",
    city: "Navi Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "smartdenrealty.in",
    employees: "5–12",
    serviceFit: "CRM + Web Platform",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Instagram leads not connected to CRM",
    painPoint2: "Manual follow-up drops at step 3",
    painPoint3: "Home loan partner referrals informal",
    intentLevel: "HIGH",
    buyingTrigger: "Scaling 3-person team",
    action: "Instagram/LinkedIn DM",
    outreachMessage: "Hey — for a first-time buyer brokerage, the 8-12 touchpoint cycle means every lead needs structured follow-up. How is your team tracking that?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-5",
    companyName: "GharWala",
    city: "Pune",
    industry: "Real Estate" as Lead["industry"],
    website: "gharwala.in",
    employees: "5–15",
    serviceFit: "SaaS + Mobile App",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Landlord onboarding manual",
    painPoint2: "Tenant inquiry routing unstructured",
    painPoint3: "Lease and deposit tracking absent",
    intentLevel: "HIGH",
    buyingTrigger: "Proptech startup with MVP — needs CRM layer",
    action: "LinkedIn to founders",
    outreachMessage: "Hey — hyperlocal rental platforms need a strong landlord management layer. How are you currently onboarding landlord partners?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-6",
    companyName: "PropScout India",
    city: "Panvel",
    industry: "Real Estate" as Lead["industry"],
    website: "propscoutindia.com",
    employees: "3–8",
    serviceFit: "CRM",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Leads from Google in one WhatsApp group",
    painPoint2: "Site visit no-shows (2-hr drive cost)",
    painPoint3: "Post-visit follow-up per-broker only",
    intentLevel: "HIGH",
    buyingTrigger: "High-margin plot sales where each no-show is costly",
    action: "Direct office visit",
    outreachMessage: "Hi — for weekend home sales, a no-show on a site visit is really costly. Is there a confirmation and reminder process?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-7",
    companyName: "City Nest Properties",
    city: "Andheri West",
    industry: "Real Estate" as Lead["industry"],
    website: "citynestproperties.in",
    employees: "5–12",
    serviceFit: "CRM",
    qualification: "WARM",
    confidencePct: 78,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Buyer requirements in WhatsApp messages",
    painPoint2: "Owner follow-up drops after 1 week",
    painPoint3: "No digital brochure system",
    intentLevel: "HIGH",
    buyingTrigger: "New listings not matched to waiting buyers fast",
    action: "LinkedIn/JustDial cold outreach",
    outreachMessage: "Hi — when a new listing comes in, how quickly can your team match it to interested buyers in your database?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-8",
    companyName: "PlotKing",
    city: "Navi Mumbai Periphery",
    industry: "Real Estate" as Lead["industry"],
    website: "plotking.in",
    employees: "3–10",
    serviceFit: "CRM + Web Platform",
    qualification: "HOT",
    confidencePct: 80,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Google Ads leads not followed up within 1hr",
    painPoint2: "Inventory shared via WhatsApp PDF",
    painPoint3: "Site visit coordination personal phone",
    intentLevel: "HIGH",
    buyingTrigger: "Google Ads spend wasted without fast follow-up",
    action: "Facebook/Google Ads manager DM",
    outreachMessage: "Hi — for plot sales, speed of follow-up on digital leads is critical. What's the average time between a form submission and your team's first call?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-9",
    companyName: "UrbanNest Brokers",
    city: "Bandra/Juhu",
    industry: "Real Estate" as Lead["industry"],
    website: "urbannestre.in",
    employees: "3–10",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "High-value client data on personal phones — security risk",
    painPoint2: "Multiple brokers approaching same landlord",
    painPoint3: "Renewal tracking manual",
    intentLevel: "HIGH",
    buyingTrigger: "Luxury rental segment — missed renewal = lost crore deal",
    action: "LinkedIn DM to founders",
    outreachMessage: "Hi — for a premium rental firm, client confidentiality and coordination between team members are critical. Is there a shared system?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-10",
    companyName: "MicroBuild Constructions",
    city: "Pune Outskirts",
    industry: "Real Estate" as Lead["industry"],
    website: "microbuildpune.in",
    employees: "8–20",
    serviceFit: "CRM + Customer Portal",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Buyer nurture drops after initial inquiry",
    painPoint2: "Site progress via WhatsApp photos only",
    painPoint3: "Customization requests tracked informally",
    intentLevel: "HIGH",
    buyingTrigger: "Boutique bungalow project — each buyer must be nurtured 3-12 months",
    action: "Office visit to founder",
    outreachMessage: "Hi — for a boutique bungalow developer, the buyer journey is long. Is there a structured way you stay in touch with interested buyers?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-11",
    companyName: "GreenAcres Weekend Homes",
    city: "Karjat/Alibag",
    industry: "Real Estate" as Lead["industry"],
    website: "greenacresindia.in",
    employees: "5–15",
    serviceFit: "CRM + Web Platform",
    qualification: "HOT",
    confidencePct: 80,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Multiple visits before buying — follow-up between visits manual",
    painPoint2: "Property updates sent occasionally without system",
    painPoint3: "No platform showing all plots with pricing",
    intentLevel: "HIGH",
    buyingTrigger: "Weekend home buyers need multi-visit nurture",
    action: "Instagram DM to founder",
    outreachMessage: "Hi — for weekend home sales, buyers visit 2-3 times before committing. Is there a nurture system keeping them engaged between visits?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-12",
    companyName: "PropCare NRI Management",
    city: "Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "propcaremanagement.in",
    employees: "5–15",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 85,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Monthly rent confirmation via personal email — no receipt automation",
    painPoint2: "Maintenance tickets via phone — no NRI visibility",
    painPoint3: "Tenant agreements on WhatsApp",
    intentLevel: "HIGH",
    buyingTrigger: "NRI property owners need remote peace of mind",
    action: "NRI forums + LinkedIn",
    outreachMessage: "Hi — NRI property owners need to see rent receipts and maintenance tickets without calling. Is there a portal for that?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-13",
    companyName: "Nest Finders Pune",
    city: "Pune",
    industry: "Real Estate" as Lead["industry"],
    website: "nestfinderspune.com",
    employees: "3–10",
    serviceFit: "CRM + Web Platform",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "June-July college surge creates 500+ WhatsApp inquiries",
    painPoint2: "Flatmate matching is manual",
    painPoint3: "Landlord inventory not tracked centrally",
    intentLevel: "HIGH",
    buyingTrigger: "College admission rush June-July overwhelms capacity",
    action: "LinkedIn + college Facebook groups",
    outreachMessage: "Hey — the college admission rush in June-July must be overwhelming for a Pune rental service. How are you handling that volume?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-14",
    companyName: "BrickWise Realty",
    city: "Pune",
    industry: "Real Estate" as Lead["industry"],
    website: "brickwiserealty.in",
    employees: "5–12",
    serviceFit: "CRM + Analytics",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Lead-to-visit conversion rate unknown",
    painPoint2: "Market intel collected manually",
    painPoint3: "Instagram Ads leads not auto-captured",
    intentLevel: "HIGH",
    buyingTrigger: "Data-forward brokerage positioning without internal data irony",
    action: "LinkedIn DM to founder",
    outreachMessage: "Hey — curious what your own internal lead tracking looks like right now — proper CRM or still in a spreadsheet?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-15",
    companyName: "Kokan Homes Advisory",
    city: "Navi Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "kokanhomesadvisory.in",
    employees: "3–8",
    serviceFit: "CRM + Web Platform",
    qualification: "WARM",
    confidencePct: 76,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Portfolio shared via WhatsApp PDF",
    painPoint2: "No buyer-to-property matching",
    painPoint3: "Zero web presence — 100% referral",
    intentLevel: "MEDIUM",
    buyingTrigger: "Niche market growing — digital discovery needed",
    action: "WhatsApp business profile + LinkedIn",
    outreachMessage: "Hi — for a coastal property niche, buyers research heavily online. Is there a website where they can browse?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-16",
    companyName: "ThinkProperty Startup",
    city: "Pune",
    industry: "Real Estate" as Lead["industry"],
    website: "thinkproperty.co.in",
    employees: "3–8",
    serviceFit: "CRM",
    qualification: "HOT",
    confidencePct: 80,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Buyer requirements and shortlists not tracked per version",
    painPoint2: "Developer commission tracking informal",
    painPoint3: "Old shortlists sent by mistake",
    intentLevel: "HIGH",
    buyingTrigger: "Buyer's agent model growing in Pune",
    action: "LinkedIn DM",
    outreachMessage: "Hi — as a buyer's agent, tracking evolving requirements over months is tricky. Is there a system where preference updates are logged?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-17",
    companyName: "SpaceBase Commercial Leasing",
    city: "Pune",
    industry: "Real Estate" as Lead["industry"],
    website: "spacebase.co.in",
    employees: "5–15",
    serviceFit: "CRM",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Client requirements change rapidly — no timestamped log",
    painPoint2: "Lease expiry of placed clients not tracked",
    painPoint3: "Negotiation trail in email + WhatsApp",
    intentLevel: "HIGH",
    buyingTrigger: "Startup office space market growing in Pune",
    action: "LinkedIn Sales Navigator",
    outreachMessage: "Hi — for commercial leasing, lease expiry of existing clients is a natural repeat business trigger. Are you tracking those renewal dates?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-18",
    companyName: "TopFloor Realty",
    city: "Dadar/Prabhadevi",
    industry: "Real Estate" as Lead["industry"],
    website: "topfloorrealty.in",
    employees: "5–15",
    serviceFit: "CRM",
    qualification: "WARM",
    confidencePct: 75,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Buyer list not maintained digitally",
    painPoint2: "New listing notifications via individual WhatsApp messages",
    painPoint3: "Seller follow-up for listing agreement signing informal",
    intentLevel: "MEDIUM",
    buyingTrigger: "Premium central suburb listing volume growing",
    action: "Office visit to broker",
    outreachMessage: "Hi — when a good flat listing comes in Dadar, how quickly can your team notify all interested buyers?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-19",
    companyName: "PuneHomeHunters",
    city: "Pune East",
    industry: "Real Estate" as Lead["industry"],
    website: "punehomehunters.in",
    employees: "3–8",
    serviceFit: "CRM",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "New project launches not systematically notified to buyers",
    painPoint2: "Buyer requirements in spreadsheet",
    painPoint3: "Developer commission not tracked formally",
    intentLevel: "MEDIUM",
    buyingTrigger: "Kharadi/Hadapsar corridor growing fast",
    action: "LinkedIn + housing.com leads",
    outreachMessage: "Hi — for a buyer-focused brokerage in Pune East, new launch notifications to your buyer list are key. Is that going out in a structured way?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-20",
    companyName: "InvestorFirst Properties",
    city: "Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "investorfirstre.in",
    employees: "3–8",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Investor portfolio not tracked in system",
    painPoint2: "New opportunities as WhatsApp forwards",
    painPoint3: "Yield/ROI calculations manual per query",
    intentLevel: "HIGH",
    buyingTrigger: "High-value investor clients expect professional service",
    action: "LinkedIn premium DM",
    outreachMessage: "Hi — for an investment property advisor, matching the right opportunity to the right investor profile is key. Is there a matching system?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-21",
    companyName: "VillaSearch India",
    city: "Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "villasearchindia.com",
    employees: "3–10",
    serviceFit: "Web Platform + CRM",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Property availability calendar managed manually — double booking risk",
    painPoint2: "Inquiry to booking takes 48+ hours",
    painPoint3: "No automated seasonal pricing",
    intentLevel: "HIGH",
    buyingTrigger: "Luxury villa market growing for destination weddings and corporate retreats",
    action: "Instagram DM + wedding planner partnerships",
    outreachMessage: "Hi — for a villa rental platform, double bookings from manual calendar management are a reputation risk. Is availability managed in a shared calendar?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-22",
    companyName: "Brick & Beyond Developers",
    city: "Navi Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "brickandbeyond.co.in",
    employees: "8–20",
    serviceFit: "CRM",
    qualification: "WARM",
    confidencePct: 75,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Buyer inquiries in shared Excel file",
    painPoint2: "Site visit confirmation via personal calls",
    painPoint3: "Post-booking milestones only on buyer request",
    intentLevel: "MEDIUM",
    buyingTrigger: "Single project developer — lean team needs a system",
    action: "Office visit",
    outreachMessage: "Hi — for a boutique developer, how is the team managing buyer follow-up from inquiry to booking? Any shared system?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-23",
    companyName: "Samruddhi Constructions",
    city: "Panvel",
    industry: "Real Estate" as Lead["industry"],
    website: "samruddhibuilders.in",
    employees: "10–20",
    serviceFit: "CRM",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "CIDCO season inquiry spike not manageable manually",
    painPoint2: "Follow-up only when buyer calls back",
    painPoint3: "Project completion updates ad-hoc",
    intentLevel: "MEDIUM",
    buyingTrigger: "Panvel CIDCO season creating lead surge",
    action: "Direct office visit",
    outreachMessage: "Hi — Panvel CIDCO season creates a lot of inquiries in a short window. How is your team capturing and following up on all of them?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-24",
    companyName: "SkyBuild Boutique Developers",
    city: "Pune",
    industry: "Real Estate" as Lead["industry"],
    website: "skybuildpune.in",
    employees: "8–20",
    serviceFit: "CRM",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Broker coordination via personal WhatsApp — commission disputes",
    painPoint2: "Lead tracking in founder's personal contacts",
    painPoint3: "Document collection on WhatsApp",
    intentLevel: "HIGH",
    buyingTrigger: "Expanding from 2 to 3 active projects",
    action: "LinkedIn + direct office",
    outreachMessage: "Hi — for a boutique developer, which broker brought which lead can become a big dispute without a proper log. Is that tracked formally?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-25",
    companyName: "PropertyPal",
    city: "Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "propertypalmumbai.in",
    employees: "3–10",
    serviceFit: "CRM + Web Platform",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "YouTube/Instagram leads land in DMs — no CRM",
    painPoint2: "No follow-up sequence for engaged non-inquirers",
    painPoint3: "Lead distribution among 3-person team has no logic",
    intentLevel: "HIGH",
    buyingTrigger: "Content-driven brokerage generating leads but losing them",
    action: "Instagram/LinkedIn DM to founder",
    outreachMessage: "Hey — great content strategy. When someone watches your property tour videos multiple times but doesn't message, is there a way to re-engage them?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-26",
    companyName: "FlatFindr",
    city: "Navi Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "flatfindr.in",
    employees: "3–8",
    serviceFit: "SaaS + App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Landlord verification process manual and inconsistent",
    painPoint2: "Tenant-to-property matching manual",
    painPoint3: "No revenue model automation",
    intentLevel: "HIGH",
    buyingTrigger: "Zero-brokerage startup scaling — needs proper tech platform",
    action: "LinkedIn DM to founders",
    outreachMessage: "Hey — for a zero-brokerage rental startup, landlord trust is everything. What does the landlord verification workflow look like?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-27",
    companyName: "Heritage Homes Advisory",
    city: "South Mumbai",
    industry: "Real Estate" as Lead["industry"],
    website: "heritagehomesadvisory.com",
    employees: "3–8",
    serviceFit: "CRM + Web Platform",
    qualification: "WARM",
    confidencePct: 72,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Buyer and seller relationships in personal notebooks",
    painPoint2: "No digital showcase — photos via WhatsApp only",
    painPoint3: "Complex legal documentation tracking informal",
    intentLevel: "MEDIUM",
    buyingTrigger: "Heritage/old property niche in Mumbai growing",
    action: "LinkedIn + real estate lawyer introductions",
    outreachMessage: "Hi — the heritage property market in Mumbai is very relationship-driven. Is the database of interested buyers stored digitally anywhere?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-1",
    companyName: "Homoeo Life Clinic",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "homoeolifeclinic.in",
    employees: "10–25",
    serviceFit: "CRM + Appointment App",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Monthly consultation reminders all manual",
    painPoint2: "Patient records in paper files",
    painPoint3: "No referral program despite strong word-of-mouth",
    intentLevel: "HIGH",
    buyingTrigger: "Expanding from 2 to 5 clinics",
    action: "LinkedIn/Instagram DM to doctor-founder",
    outreachMessage: "Hi — for a homeopathy practice, patients who miss their monthly follow-up often drop off treatment. Is there a reminder system in place?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-2",
    companyName: "Spine & Joint Clinic",
    city: "Andheri, Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "spinejointclinic.in",
    employees: "10–20",
    serviceFit: "CRM + Appointment App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Surgery inquiry follow-up takes 48 hours",
    painPoint2: "Post-surgery rehab compliance low",
    painPoint3: "No digital second-opinion consultation channel",
    intentLevel: "HIGH",
    buyingTrigger: "Instagram health content generating 50+ leads/month",
    action: "Instagram DM to doctor",
    outreachMessage: "Hi — noticed your spine clinic runs health content on Instagram. When someone DMs asking about a consultation, what does the follow-up look like?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-3",
    companyName: "Smile Design Dental Studio",
    city: "Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "smiledesign.in",
    employees: "10–25",
    serviceFit: "CRM + Consultation",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "High-value Instagram leads not followed up within the hour",
    painPoint2: "Treatment proposal sent as WhatsApp PDF — no follow-up trigger",
    painPoint3: "Google review requests not sent post-treatment",
    intentLevel: "HIGH",
    buyingTrigger: "Instagram cosmetic dentistry demand surge — high CAC",
    action: "Instagram DM to doctor-founder",
    outreachMessage: "Hey — your smile makeover work looks incredible. When someone comes in for an assessment and doesn't book, does your team have a process to re-engage them?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-4",
    companyName: "Glow Skin Dermatology",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "glowskinpune.in",
    employees: "5–12",
    serviceFit: "CRM + Booking App",
    qualification: "HOT",
    confidencePct: 86,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Instagram DM inquiries not followed up systematically",
    painPoint2: "Treatment package completion not tracked per patient",
    painPoint3: "Post-procedure follow-up depends on doctor memory",
    intentLevel: "HIGH",
    buyingTrigger: "Instagram driving consultation inquiries — conversion system absent",
    action: "Instagram DM",
    outreachMessage: "Hi — for a dermatology clinic, treatment package completion is direct revenue. Is there a system tracking which patients are mid-package?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-5",
    companyName: "Happy Smiles Dental Clinic",
    city: "Andheri",
    industry: "Healthcare" as Lead["industry"],
    website: "happysmilesdental.in",
    employees: "4–8",
    serviceFit: "CRM + Appointment App",
    qualification: "HOT",
    confidencePct: 85,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "6-month recall reminder not automated",
    painPoint2: "Appointment no-shows with no reminder system",
    painPoint3: "Treatment plan tracking in paper files",
    intentLevel: "HIGH",
    buyingTrigger: "200+ active patients but recall is paper-based",
    action: "LinkedIn/JustDial DM",
    outreachMessage: "Hi — for a dental practice, the 6-month recall is everything. Is that automated or does your receptionist call patients individually?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-6",
    companyName: "ActiveLife Physiotherapy",
    city: "Powai, Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "activelifephysio.in",
    employees: "3–8",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Session attendance in paper register — no digital notification to referrer",
    painPoint2: "Home exercise program printed and often lost",
    painPoint3: "Referral network (ortho doctors) not formally managed",
    intentLevel: "HIGH",
    buyingTrigger: "Ortho surgeon referrals are the main lead source — no tracking",
    action: "LinkedIn DM to physiotherapist-founder",
    outreachMessage: "Hi — physiotherapy outcomes depend on patients doing exercises between sessions. How are you sharing those programs — paper or phone-accessible?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-7",
    companyName: "KidsCare Pediatric Clinic",
    city: "Baner, Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "kidscaredrclinic.in",
    employees: "3–8",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Vaccination schedules tracked in paper files — missed doses common",
    painPoint2: "Growth milestone tracking not digital",
    painPoint3: "New parent inquiries not followed up after first call",
    intentLevel: "HIGH",
    buyingTrigger: "Young families in Baner/Aundh — high engagement expectation",
    action: "Instagram DM to pediatrician",
    outreachMessage: "Hi — for a pediatrician, vaccination reminder for the first 2 years is the most important parent touchpoint. Is that automated from your end?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-8",
    companyName: "VisionClear Eye Clinic",
    city: "Navi Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "visionclearclinic.in",
    employees: "4–10",
    serviceFit: "CRM + Appointment App",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Spectacle patients not recalled for annual checkup — churn to optical stores",
    painPoint2: "LASIK inquiry follow-up delayed 2+ days",
    painPoint3: "Corporate eye checkup camps in Excel",
    intentLevel: "HIGH",
    buyingTrigger: "Spectacle prescription market growing in Navi Mumbai IT corridor",
    action: "LinkedIn DM to doctor",
    outreachMessage: "Hi — spectacle patients who get a new prescription often don't come back unless reminded. Is there an automated annual checkup reminder?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-9",
    companyName: "NutriLife Wellness Clinic",
    city: "Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "nutrilifeclinic.in",
    employees: "3–6",
    serviceFit: "CRM + Client App",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Client diet plan compliance not tracked between sessions",
    painPoint2: "No app for clients to log meals",
    painPoint3: "Gym trainer referrals not tracked formally",
    intentLevel: "HIGH",
    buyingTrigger: "Growing Instagram following but no consultation funnel",
    action: "Instagram DM to dietitian",
    outreachMessage: "Hi — for a nutrition practice, client accountability between sessions is everything. Is there a way for clients to log meals and for you to monitor between appointments?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-10",
    companyName: "MindSpace Counseling Center",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "mindspacecounseling.in",
    employees: "5–12",
    serviceFit: "CRM + Secure Portal",
    qualification: "HOT",
    confidencePct: 85,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Appointment booking via phone — no secure online booking",
    painPoint2: "Session notes in individual therapist laptop — no backup",
    painPoint3: "Appointment no-show rate 20-25% without reminders",
    intentLevel: "HIGH",
    buyingTrigger: "Mental health demand post-COVID growing significantly in Pune",
    action: "LinkedIn DM to practice founder",
    outreachMessage: "Hi — for a therapy practice, client privacy and appointment reliability are both critical. Is there a secure online booking system?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-11",
    companyName: "Dr. Joshi Homeopathy",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "drjoshihomoeo.in",
    employees: "2–6",
    serviceFit: "CRM + Appointment App",
    qualification: "WARM",
    confidencePct: 78,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Long-term patients not getting automated follow-up",
    painPoint2: "Medicine refill reminders not sent",
    painPoint3: "Google My Business inquiries not followed up",
    intentLevel: "MEDIUM",
    buyingTrigger: "Long treatment cycles (6-12 months) need digital nurture",
    action: "Google My Business message + LinkedIn",
    outreachMessage: "Hi — for a homeopathy practice with long treatment cycles, is there a reminder system for monthly consultations or medicine refills?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-12",
    companyName: "FemHealth Clinic",
    city: "Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "femhealthclinic.in",
    employees: "5–10",
    serviceFit: "CRM + Patient App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Treatment plan not accessible digitally between visits",
    painPoint2: "Progress tracking (hormonal labs, weight) manual",
    painPoint3: "Patient acquisition through Instagram — no consultation funnel",
    intentLevel: "HIGH",
    buyingTrigger: "PCOS/hormonal health segment growing — high patient engagement expectation",
    action: "Instagram DM to doctor-founder",
    outreachMessage: "Hi — for a women's health clinic, patients want access to their data between appointments. Is there a portal where they can track progress?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-13",
    companyName: "SpineRight Chiropractic",
    city: "Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "spineright.in",
    employees: "3–8",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Session package tracking manual — patients finish without knowing remaining sessions",
    painPoint2: "Home postural correction shared as PDF",
    painPoint3: "Corporate wellness tie-up potential not pursued",
    intentLevel: "HIGH",
    buyingTrigger: "Corporate desk worker market growing for chiropractic",
    action: "LinkedIn DM to chiropractor",
    outreachMessage: "Hi — for a chiropractic practice, session package completion tracking is key revenue management. Is that in a system or tracked manually?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-14",
    companyName: "BreathEasy Respiratory Clinic",
    city: "Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "breatheasyclinic.in",
    employees: "4–8",
    serviceFit: "CRM + Appointment App",
    qualification: "WARM",
    confidencePct: 76,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Asthma/COPD patients not getting seasonal follow-ups",
    painPoint2: "Spirometry test results on printed report",
    painPoint3: "No inhaler technique follow-up workflow",
    intentLevel: "MEDIUM",
    buyingTrigger: "Pollution-driven respiratory demand growing in Mumbai",
    action: "LinkedIn DM to pulmonologist",
    outreachMessage: "Hi — for respiratory patients, seasonal triggers are predictable. Is there a proactive outreach before monsoon/winter?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-15",
    companyName: "TinyFeet Pediatrics",
    city: "Navi Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "tinyfeetclinic.in",
    employees: "3–8",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Newborn vaccination schedule reminders manually sent — some missed",
    painPoint2: "Growth tracking not shareable digitally with parents",
    painPoint3: "Night fever/emergency calls not logged",
    intentLevel: "HIGH",
    buyingTrigger: "Growing family population in Navi Mumbai suburbs",
    action: "Instagram DM to pediatrician",
    outreachMessage: "Hi — for a pediatric practice, parents of newborns want to feel supported constantly. Are vaccination reminders going out automatically?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-16",
    companyName: "BodyBalance Physiotherapy",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "bodybalancephysio.in",
    employees: "5–12",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Sports injury patients stop coming after acute pain relief — incomplete recovery",
    painPoint2: "Referral from sports coaches/gyms not tracked",
    painPoint3: "Corporate ergonomics workshops not re-engaged",
    intentLevel: "HIGH",
    buyingTrigger: "Sports physio demand growing in Pune's young population",
    action: "LinkedIn DM + gym partnership outreach",
    outreachMessage: "Hi — sports rehab patients often stop coming after acute pain goes away. Is there a structured follow-up that brings them back to complete the protocol?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-17",
    companyName: "ClearMind Therapy Studio",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "clearmindtherapy.in",
    employees: "3–8",
    serviceFit: "CRM + Secure Booking",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Session gaps not tracked — re-engagement not done",
    painPoint2: "Client intake form collected on paper",
    painPoint3: "Insurance claim documentation support is manual",
    intentLevel: "HIGH",
    buyingTrigger: "CBT/therapy demand post-COVID growing strongly in Pune",
    action: "LinkedIn DM to psychologist-founder",
    outreachMessage: "Hi — for a therapy practice, clients who take a break mid-therapy often need a gentle nudge to restart. Is there a structured re-engagement process?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-18",
    companyName: "SmilePlus Dental Studio",
    city: "Navi Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "smileplus.dental",
    employees: "5–10",
    serviceFit: "CRM + Recall App",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Orthodontic adjustment compliance drops after 6 months",
    painPoint2: "Cosmetic inquiry follow-up manual",
    painPoint3: "Google reviews not systematically requested post-treatment",
    intentLevel: "HIGH",
    buyingTrigger: "Growing Navi Mumbai young professional demographic wants cosmetic dental work",
    action: "Instagram DM + Google My Business",
    outreachMessage: "Hi — for braces patients, monthly appointment compliance is critical for outcomes. Is there an automated reminder before each adjustment?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-19",
    companyName: "WomenFirst Gynecology Clinic",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "womenfirstclinic.in",
    employees: "4–8",
    serviceFit: "CRM + Appointment App",
    qualification: "WARM",
    confidencePct: 77,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Antenatal care appointment tracking paper-based",
    painPoint2: "Post-delivery follow-up not systematized",
    painPoint3: "All appointments via phone — no online booking",
    intentLevel: "MEDIUM",
    buyingTrigger: "Growing young family demographic in Pune",
    action: "LinkedIn DM to gynecologist",
    outreachMessage: "Hi — for an antenatal care practice, the 8-9 month journey has very specific milestone visits. Is that appointment schedule tracked digitally?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-20",
    companyName: "SkinScript Dermatology",
    city: "Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "skinscriptclinic.in",
    employees: "4–8",
    serviceFit: "CRM + Tele-consult App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Online consultation booking via Instagram DM — unscalable",
    painPoint2: "Prescription shared on personal WhatsApp",
    painPoint3: "Follow-up consultation reminders not sent",
    intentLevel: "HIGH",
    buyingTrigger: "Tele-derm practice growing fast on Instagram — needs a proper platform",
    action: "Instagram DM to doctor",
    outreachMessage: "Hey — your tele-derm model is smart. When patients message for an online consult, is there a booking system or does it happen in DMs?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-21",
    companyName: "PrimaCare Diagnostic Centre",
    city: "Navi Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "primacaredx.in",
    employees: "8–20",
    serviceFit: "CRM + Report Portal",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Reports delivered via physical copy or personal WhatsApp — not secure",
    painPoint2: "Doctor referral tracking not done",
    painPoint3: "Home collection booking via phone only",
    intentLevel: "MEDIUM",
    buyingTrigger: "Independent diagnostic centre competing against chains needs differentiation",
    action: "LinkedIn + doctor clinic visits",
    outreachMessage: "Hi — independent diagnostic centres that offer home collection and digital reports tend to win against chains on convenience. Are those set up?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-22",
    companyName: "InnerBalance Ayurveda",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "innerbalanceayurveda.in",
    employees: "5–12",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 76,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Panchakarma treatment reminders and diet plans on paper",
    painPoint2: "Post-treatment lifestyle plan not followed up",
    painPoint3: "Corporate wellness Ayurveda sessions not tracked",
    intentLevel: "MEDIUM",
    buyingTrigger: "Post-COVID Ayurveda demand surge in Pune",
    action: "Instagram DM + yoga studio partnerships",
    outreachMessage: "Hi — Ayurveda's biggest challenge is getting patients to follow lifestyle guidance between visits. How are those recommendations shared?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-23",
    companyName: "Dr. Verma ENT Clinic",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "drvermanent.in",
    employees: "3–8",
    serviceFit: "CRM + Appointment App",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Allergy season surge not manageable without pre-booking",
    painPoint2: "Hearing aid follow-ups for elderly patients not scheduled",
    painPoint3: "Surgery inquiry follow-up manual",
    intentLevel: "MEDIUM",
    buyingTrigger: "Allergy and pollution driving ENT demand in Pune",
    action: "LinkedIn DM to ENT doctor",
    outreachMessage: "Hi — allergy seasons are predictable and bring a surge in patients. Is there a way to pre-schedule appointments in advance?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-24",
    companyName: "Recover Strong Rehab Centre",
    city: "Navi Mumbai",
    industry: "Healthcare" as Lead["industry"],
    website: "recoverstrongrehab.in",
    employees: "5–12",
    serviceFit: "CRM + Patient App",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Post-surgical patients need structured protocols — not standardized digitally",
    painPoint2: "Referring surgeon has no visibility on rehab progress",
    painPoint3: "Home exercise compliance tracking absent",
    intentLevel: "HIGH",
    buyingTrigger: "Post-surgical rehab referrals from Navi Mumbai hospitals growing",
    action: "LinkedIn DM to physiotherapist-director",
    outreachMessage: "Hi — for a post-surgical rehab centre, the referring surgeon would love to know how their patient is progressing. Is there a digital communication loop back?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-25",
    companyName: "SilverCare Geriatric Clinic",
    city: "Pune",
    industry: "Healthcare" as Lead["industry"],
    website: "silvercareclinic.in",
    employees: "5–12",
    serviceFit: "CRM + Family App",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Health updates to adult children of elderly patients via personal calls — hard to scale",
    painPoint2: "Multi-medication tracking for elderly patients paper-based",
    painPoint3: "Regular check-up scheduling for seniors not automated",
    intentLevel: "HIGH",
    buyingTrigger: "Ageing population in Pune suburbs creating geriatric care demand",
    action: "LinkedIn DM + old age home partnerships",
    outreachMessage: "Hi — for a geriatric practice, adult children are as much the client as the patient. Is there a way for them to see health updates digitally?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-1",
    companyName: "MithaiBox",
    city: "Mumbai",
    industry: "Food & Beverage" as Lead["industry"],
    website: "mithaibox.in",
    employees: "10–25",
    serviceFit: "CRM + D2C Web",
    qualification: "WARM",
    confidencePct: 76,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Corporate Diwali orders via email/WhatsApp — no structured intake",
    painPoint2: "Repeat corporate buyers not proactively reminded",
    painPoint3: "No delivery tracking shared with buyers",
    intentLevel: "MEDIUM",
    buyingTrigger: "Corporate gifting season Oct-Nov is single biggest revenue window",
    action: "LinkedIn DM to founder + corporate purchase heads",
    outreachMessage: "Hi — for a premium gifting brand, Diwali season must be make-or-break. How does your team manage bulk corporate orders during that window?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-2",
    companyName: "Tiffin Express",
    city: "Pune",
    industry: "Food & Beverage" as Lead["industry"],
    website: "tiffinexpresspune.com",
    employees: "5–20",
    serviceFit: "CRM + Subscription App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Plan pauses and cancellations managed via founder's personal WhatsApp",
    painPoint2: "Daily delivery confirmation to customers manual",
    painPoint3: "No data on which localities have highest demand",
    intentLevel: "HIGH",
    buyingTrigger: "Crossing 150 subscribers — WhatsApp process breaking down",
    action: "Instagram/WhatsApp DM to founder",
    outreachMessage: "Hey — tiffin subscription businesses hit a wall around 100-150 subscribers when WhatsApp management breaks down. How are you handling pauses and cancellations?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-3",
    companyName: "The Morning Pantry",
    city: "Mumbai",
    industry: "Food & Beverage" as Lead["industry"],
    website: "themorningpantry.in",
    employees: "5–15",
    serviceFit: "CRM + Subscription App",
    qualification: "HOT",
    confidencePct: 79,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Pause requests via founder's personal WhatsApp",
    painPoint2: "Billing done manually — some customers not billed",
    painPoint3: "No analytics on which items most popular",
    intentLevel: "HIGH",
    buyingTrigger: "Scaling from 80 to 200 subscribers",
    action: "Instagram DM to founder",
    outreachMessage: "Hey — for a subscription food business, billing and pause management gets really complex fast. How many subscribers are you managing right now?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-4",
    companyName: "HomeBites Tiffin",
    city: "Mumbai",
    industry: "Food & Beverage" as Lead["industry"],
    website: "homebites.in",
    employees: "2–8",
    serviceFit: "CRM + Subscription App",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Pause/cancel requests via founder phone",
    painPoint2: "No subscription billing automation",
    painPoint3: "Delivery area expansion without route data",
    intentLevel: "HIGH",
    buyingTrigger: "Solo operator scaling beyond manual capacity",
    action: "Instagram/WhatsApp DM",
    outreachMessage: "Hey — for a tiffin service scaling beyond 50 subscribers, pause and billing management on WhatsApp gets really hard. How are you handling that?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-5",
    companyName: "SliceBox Pizza",
    city: "Pune",
    industry: "Food & Beverage" as Lead["industry"],
    website: "sliceboxpizza.in",
    employees: "8–15",
    serviceFit: "CRM + Loyalty App",
    qualification: "HOT",
    confidencePct: 80,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "No loyalty program — regulars not identified",
    painPoint2: "Online orders only via Swiggy/Zomato — no owned channel",
    painPoint3: "Birthday/occasion promotions not personalized",
    intentLevel: "HIGH",
    buyingTrigger: "2-outlet chain ready for loyalty infrastructure",
    action: "Instagram DM to owner",
    outreachMessage: "Hey — for a pizza chain with regulars, a birthday offer can significantly increase repeat orders. Is there any loyalty system across your 2 outlets?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-6",
    companyName: "The Chai Stop",
    city: "Mumbai",
    industry: "Food & Beverage" as Lead["industry"],
    website: "thechaistop.in",
    employees: "5–12",
    serviceFit: "CRM + Loyalty App",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "No customer data from kiosks — entirely anonymous",
    painPoint2: "Corporate office chai subscriptions tracked manually",
    painPoint3: "Kiosk performance comparison not possible",
    intentLevel: "MEDIUM",
    buyingTrigger: "Corporate subscription chai model has strong B2B potential",
    action: "Direct B2B outreach to office managers",
    outreachMessage: "Hi — for a chai kiosk chain, the corporate subscription model is usually the most stable revenue. Is that tracked and billed in a system?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-7",
    companyName: "SweetNest Bakery",
    city: "Pune",
    industry: "Food & Beverage" as Lead["industry"],
    website: "sweetnestbakery.in",
    employees: "3–8",
    serviceFit: "CRM + Order Management",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Custom cake orders tracked in WhatsApp — details missed",
    painPoint2: "Bulk corporate gifting orders at festivals are chaotic",
    painPoint3: "No customer reorder reminders for birthdays/anniversaries",
    intentLevel: "HIGH",
    buyingTrigger: "Custom cake market growing — order management critical",
    action: "Instagram DM to baker-founder",
    outreachMessage: "Hi — for custom cake orders, missing a detail from a WhatsApp message is a common problem. Is there a structured order form customers fill?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-8",
    companyName: "Fusion Bites Cloud Kitchen",
    city: "Mumbai",
    industry: "Food & Beverage" as Lead["industry"],
    website: "fusionbiteskitchen.in",
    employees: "5–12",
    serviceFit: "CRM + D2C Platform",
    qualification: "WARM",
    confidencePct: 72,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "100% dependent on Swiggy/Zomato — no owned customer channel",
    painPoint2: "Repeat customers incentivized only by platform discounts",
    painPoint3: "No B2B corporate lunch avenue explored",
    intentLevel: "MEDIUM",
    buyingTrigger: "High platform commission eating into margins — need owned channel",
    action: "LinkedIn DM to founder + Swiggy account manager intro",
    outreachMessage: "Hey — 100% dependency on Swiggy/Zomato means high commissions on every order. Are you building any direct ordering channel?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-1",
    companyName: "BurnFit Boutique Studio",
    city: "Navi Mumbai",
    industry: "Fitness" as Lead["industry"],
    website: "burnfitstudio.in",
    employees: "5–15",
    serviceFit: "CRM + Member App",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Class attendance not tracked — no early warning for inactive members",
    painPoint2: "Member referral program informal — no tracking",
    painPoint3: "Renewal reminders via founder's personal WhatsApp",
    intentLevel: "HIGH",
    buyingTrigger: "Membership waitlist growing — ready to scale",
    action: "Instagram DM to studio owner",
    outreachMessage: "Hey — boutique fitness studios live on member retention. How do you currently identify a member who's going quiet before they actually cancel?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-2",
    companyName: "FitKraft Wellness",
    city: "Pune",
    industry: "Fitness" as Lead["industry"],
    website: "fitkraft.in",
    employees: "5–20",
    serviceFit: "SaaS + App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Online clients managed across 3 different channels",
    painPoint2: "No client progress dashboard",
    painPoint3: "Subscription billing via manual bank transfer",
    intentLevel: "HIGH",
    buyingTrigger: "Growing beyond 50 online clients — WhatsApp management breaking",
    action: "Instagram/LinkedIn DM to founder-trainer",
    outreachMessage: "Hey — hybrid fitness coaching at scale needs a platform beyond WhatsApp. As you grow beyond 50 online clients, how are you tracking progress and billing?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-3",
    companyName: "SweatBox CrossFit",
    city: "Mumbai",
    industry: "Fitness" as Lead["industry"],
    website: "sweatboxcrossfit.in",
    employees: "3–8",
    serviceFit: "CRM + Member App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Membership renewal reminders via coach personal phone",
    painPoint2: "WOD schedule on Instagram — no member app",
    painPoint3: "Drop-off detection only after member cancels",
    intentLevel: "HIGH",
    buyingTrigger: "Community-first gym — retention is core product",
    action: "Instagram DM to box owner",
    outreachMessage: "Hey — for a CrossFit box, the community is everything. Is there a way to spot members going quiet before they actually cancel?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-4",
    companyName: "FlexStudio Pilates",
    city: "Pune",
    industry: "Fitness" as Lead["industry"],
    website: "flexstudiopilates.in",
    employees: "3–8",
    serviceFit: "CRM + Class Booking",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Classes overbooked because booking via WhatsApp has no real-time capacity",
    painPoint2: "Session pack expiry not tracked",
    painPoint3: "Trial class follow-up for conversion not structured",
    intentLevel: "HIGH",
    buyingTrigger: "Reformer Pilates market growing fast in Pune",
    action: "Instagram DM to studio owner",
    outreachMessage: "Hi — for a boutique Pilates studio, overbooking a reformer class by accident is a bad experience. Is class capacity managed in real time?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-5",
    companyName: "PunchFit Boxing Academy",
    city: "Navi Mumbai",
    industry: "Fitness" as Lead["industry"],
    website: "punchfitboxing.in",
    employees: "3–8",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 80,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Student belt/level progression tracking in manual register",
    painPoint2: "Parent communication for junior students via WhatsApp group",
    painPoint3: "Competition registration and fee tracking informal",
    intentLevel: "HIGH",
    buyingTrigger: "Junior sports academy — parents expect digital progress updates",
    action: "Instagram DM + school outreach",
    outreachMessage: "Hey — for a boxing academy with junior students, parents want to see their child's progress. Is belt/level tracking digital or on paper?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-6",
    companyName: "InnerGlow Wellness Studio",
    city: "Mumbai",
    industry: "Fitness" as Lead["industry"],
    website: "innerglowwellness.in",
    employees: "5–12",
    serviceFit: "CRM + Booking App",
    qualification: "WARM",
    confidencePct: 75,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Recurring therapy session reminder not automated",
    painPoint2: "Treatment package balance tracking manual",
    painPoint3: "Corporate wellness tie-up potential ignored",
    intentLevel: "MEDIUM",
    buyingTrigger: "Corporate wellness market growing — this studio doesn't have a B2B approach",
    action: "LinkedIn DM to studio owner",
    outreachMessage: "Hi — for clients on a weekly therapy package, a simple reminder the day before their session reduces no-shows. Is that automated?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-7",
    companyName: "RunClub Mumbai",
    city: "Mumbai",
    industry: "Fitness" as Lead["industry"],
    website: "runclubmumbai.in",
    employees: "2–8",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 73,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Member database spread across WhatsApp groups",
    painPoint2: "Coaching plan delivery via Google Docs",
    painPoint3: "Event registration and fee collection manual",
    intentLevel: "MEDIUM",
    buyingTrigger: "Marathon and running community growing fast in Mumbai",
    action: "Instagram DM to founder-coach",
    outreachMessage: "Hey — for a running club, coordinating across multiple WhatsApp groups gets messy. Is there a central platform for members?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-1",
    companyName: "MoneyMind Financial Planning",
    city: "Navi Mumbai",
    industry: "Financial Services" as Lead["industry"],
    website: "moneymind.in",
    employees: "5–15",
    serviceFit: "CRM + Client App",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Client onboarding done via email PDF forms — slow",
    painPoint2: "No client-facing portal to view financial plan progress",
    painPoint3: "Annual review meetings not proactively scheduled",
    intentLevel: "HIGH",
    buyingTrigger: "Growing from 20 to 100 clients — needs a system beyond founder memory",
    action: "LinkedIn DM to founder",
    outreachMessage: "Hey — goal-based financial planning is a great model. As you grow beyond 30-40 clients, keeping track of each person's goals manually gets hard. How are you managing that?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-2",
    companyName: "LoanConnect DSA",
    city: "Pune",
    industry: "Financial Services" as Lead["industry"],
    website: "loanconnect.co.in",
    employees: "10–25",
    serviceFit: "CRM + Lead Tracker",
    qualification: "HOT",
    confidencePct: 83,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Loan leads from multiple sources not in one place",
    painPoint2: "Loan application status per bank tracked in personal email",
    painPoint3: "Commission reconciliation with banks manual and slow",
    intentLevel: "HIGH",
    buyingTrigger: "Adding 3 new bank partnerships — volume increasing",
    action: "LinkedIn DM to DSA principal",
    outreachMessage: "Hi — for a DSA with 5+ bank partners, tracking which loan is at which stage with which bank must get complex. Is there a consolidated system?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-3",
    companyName: "Monarch Broking",
    city: "Mumbai",
    industry: "Financial Services" as Lead["industry"],
    website: "monarchbroking.in",
    employees: "5–20",
    serviceFit: "CRM + Client Management",
    qualification: "WARM",
    confidencePct: 72,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Dormant client reactivation never happens — no system to flag",
    painPoint2: "SIP renewal reminders depend on broker remembering",
    painPoint3: "KYC renewal dates not tracked — SEBI compliance risk",
    intentLevel: "MEDIUM",
    buyingTrigger: "SEBI compliance tightening for sub-brokers",
    action: "LinkedIn DM to proprietor",
    outreachMessage: "Hi — for a sub-broker, dormant client reactivation is often the easiest revenue with existing book. Is there a system flagging clients inactive for 60-90 days?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-4",
    companyName: "VKapoor Tax & Accounts",
    city: "Mumbai",
    industry: "Financial Services" as Lead["industry"],
    website: "vkapoortax.in",
    employees: "2–6",
    serviceFit: "CRM + Document Portal",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "200+ client tax files collected annually via WhatsApp",
    painPoint2: "Filing deadline tracking per client in Excel",
    painPoint3: "Invoice follow-up for fees uncomfortable without system",
    intentLevel: "HIGH",
    buyingTrigger: "July IT filing season = same WhatsApp chaos every year",
    action: "CA Institute network + LinkedIn DM",
    outreachMessage: "Hi — for a CA firm, collecting tax documents from 200 clients every July on WhatsApp must be chaotic. Is there a client portal where they upload documents directly?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-5",
    companyName: "PolicyBoss Insurance Advisory",
    city: "Pune",
    industry: "Financial Services" as Lead["industry"],
    website: "policybossadvisory.in",
    employees: "1–5",
    serviceFit: "CRM + Renewal Tracker",
    qualification: "HOT",
    confidencePct: 86,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Policy renewal dates tracked in diary — misses happen",
    painPoint2: "No automated renewal reminder to client",
    painPoint3: "New policy lead follow-up from referrals not tracked",
    intentLevel: "HIGH",
    buyingTrigger: "Insurance portfolio growing beyond manual diary capacity",
    action: "LinkedIn DM + IRDA agent network",
    outreachMessage: "Hi — for an insurance advisor, one missed renewal is a client lost and a compliance risk. Is there a system that flags renewals coming up in the next 90 days?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-6",
    companyName: "RichMinds Investment Advisory",
    city: "Navi Mumbai",
    industry: "Financial Services" as Lead["industry"],
    website: "richminds.in",
    employees: "2–5",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 85,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Financial plans shared as PDF — no interactive portal",
    painPoint2: "Annual review scheduling depends on client reaching out",
    painPoint3: "Goal progress not visible to client between reviews",
    intentLevel: "HIGH",
    buyingTrigger: "SEBI RIA regulations increasing documentation requirements",
    action: "LinkedIn DM to SEBI RIA founder",
    outreachMessage: "Hi — for a registered investment advisor, clients paying fees expect to see their goal progress digitally. Is there a portal for that?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-7",
    companyName: "SmallCap Equity Advisory",
    city: "Mumbai",
    industry: "Financial Services" as Lead["industry"],
    website: "smallcapadvisory.in",
    employees: "3–8",
    serviceFit: "CRM + Client Portal",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Stock ideas delivered to clients via WhatsApp group — no audit trail",
    painPoint2: "Client portfolio tracking not centralized",
    painPoint3: "SEBI compliance documentation for advisory fees manual",
    intentLevel: "MEDIUM",
    buyingTrigger: "SEBI compliance pressure on equity advisors",
    action: "LinkedIn DM to SEBI RIA",
    outreachMessage: "Hi — for a SEBI-registered equity advisor, sharing stock recommendations via WhatsApp groups creates compliance issues. Is there a more structured channel?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-1",
    companyName: "Corporatix Events",
    city: "Pune",
    industry: "Events" as Lead["industry"],
    website: "corporatixevents.com",
    employees: "10–25",
    serviceFit: "CRM + Project Management",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Proposal follow-up is ad-hoc — no pipeline visibility",
    painPoint2: "Repeat corporate clients not proactively approached before annual event season",
    painPoint3: "Vendor booking and payment tracked separately per event",
    intentLevel: "MEDIUM",
    buyingTrigger: "Q1 corporate event season (Jan-March) is active",
    action: "LinkedIn DM to founder",
    outreachMessage: "Hi — for a corporate events company, repeat business from the same client is gold. Is there a system to remind your team to reach out to last year's clients before their event season?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-2",
    companyName: "Reel Moments Photography",
    city: "Mumbai",
    industry: "Events" as Lead["industry"],
    website: "reelmoments.in",
    employees: "10–25",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Inquiry to booking conversion rate unknown — no pipeline tracking",
    painPoint2: "Payment installment reminders via personal messages — awkward",
    painPoint3: "Album delivery delays not communicated proactively",
    intentLevel: "HIGH",
    buyingTrigger: "Growing to cover 80+ weddings per year — founder can't manage pipeline personally",
    action: "Instagram DM to creative director",
    outreachMessage: "Hey — love the portfolio. For a photography brand doing high volumes, the inquiry-to-booking pipeline and payment tracking can get complex. Is that currently in a CRM?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-3",
    companyName: "Vibe Productions",
    city: "Navi Mumbai",
    industry: "Events / Marketing" as Lead["industry"],
    website: "vibeproductions.in",
    employees: "10–25",
    serviceFit: "CRM + Project Management",
    qualification: "WARM",
    confidencePct: 71,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Client pipeline not tracked — founder tracks opportunities mentally",
    painPoint2: "Campaign execution checklist restarted from scratch every project",
    painPoint3: "No standardized post-campaign reporting template",
    intentLevel: "MEDIUM",
    buyingTrigger: "Brand activation market growing in Navi Mumbai corporate zone",
    action: "LinkedIn DM to founder",
    outreachMessage: "Hi — for a brand activation agency, proposal follow-up timing is critical — one day late and the budget goes elsewhere. Is there a system to track where each proposal stands?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-4",
    companyName: "WedCraft Events",
    city: "Mumbai",
    industry: "Events" as Lead["industry"],
    website: "wedcraft.in",
    employees: "3–8",
    serviceFit: "CRM + Project Management",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "6-month wedding planning on WhatsApp — version confusion",
    painPoint2: "Payment milestone reminders manual",
    painPoint3: "Vendor database recreated per wedding",
    intentLevel: "HIGH",
    buyingTrigger: "Scaling from 30 to 60 events per year — current process not manageable",
    action: "Instagram DM to wedding planner founder",
    outreachMessage: "Hey — for a wedding planner, the 6-month client journey is complex. Is there a shared system with clients to track tasks and approvals?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-5",
    companyName: "ContentLoop Digital Agency",
    city: "Pune",
    industry: "Media / Marketing" as Lead["industry"],
    website: "contentloop.in",
    employees: "3–8",
    serviceFit: "CRM + Client Management",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Client retainer pipeline tracked only by founder",
    painPoint2: "Monthly deliverables and approvals via WhatsApp — version confusion",
    painPoint3: "No automated monthly reporting to clients",
    intentLevel: "MEDIUM",
    buyingTrigger: "Growing retainer client base — manual processes eating into delivery bandwidth",
    action: "LinkedIn DM to founder",
    outreachMessage: "Hi — for a digital agency with retainer clients, monthly reporting is usually the most time-consuming task. Is that generated automatically or built manually?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-1",
    companyName: "The Label Studio",
    city: "Mumbai",
    industry: "Retail / Fashion" as Lead["industry"],
    website: "thelabelstudio.in",
    employees: "10–25",
    serviceFit: "CRM + D2C Web Platform",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Orders via Instagram DM and WhatsApp — no centralized order management",
    painPoint2: "Restocking popular items not communicated to interested customers",
    painPoint3: "No loyalty or repeat customer program",
    intentLevel: "HIGH",
    buyingTrigger: "Growing Instagram following enabling D2C scale",
    action: "Instagram DM to brand founder",
    outreachMessage: "Hey — love the Label Studio aesthetic. For a brand with your following, moving orders from Instagram DMs to a proper website could significantly improve the buying experience. Has that been on the radar?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-2",
    companyName: "Ethnic Vault",
    city: "Mumbai",
    industry: "Retail / Fashion" as Lead["industry"],
    website: "ethnicvault.in",
    employees: "10–25",
    serviceFit: "CRM + WhatsApp Commerce",
    qualification: "WARM",
    confidencePct: 72,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Festival season outreach to existing customers not systematized",
    painPoint2: "Bridal customers who bought once never re-engaged",
    painPoint3: "WhatsApp catalog sharing manual — same images to hundreds individually",
    intentLevel: "MEDIUM",
    buyingTrigger: "Diwali + wedding season Oct-Dec window",
    action: "Instagram DM + WhatsApp business outreach",
    outreachMessage: "Hi — for an ethnic wear boutique, Diwali season must be peak. Are you proactively reaching out to customers from last year before the season opens?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-3",
    companyName: "ActiveGear Sports Retail",
    city: "Navi Mumbai",
    industry: "Retail" as Lead["industry"],
    website: "activegear.in",
    employees: "10–25",
    serviceFit: "CRM + Web Platform",
    qualification: "WARM",
    confidencePct: 70,
    score: 6,
    category: "NURTURE",
    painPoint1: "School bulk orders contacted only when schools call — no proactive pipeline",
    painPoint2: "No online catalog for B2B clients",
    painPoint3: "Individual consumer loyalty not tracked",
    intentLevel: "MEDIUM",
    buyingTrigger: "B2B school procurement season June-July is the big window",
    action: "LinkedIn DM to owner + school sports teacher outreach",
    outreachMessage: "Hi — for a sports retailer with B2B school clients, annual procurement season is big. Is there a system to proactively reach out to schools before that season?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-4",
    companyName: "TinyTreasures Kids Store",
    city: "Navi Mumbai",
    industry: "Retail" as Lead["industry"],
    website: "tinytreasures.in",
    employees: "3–8",
    serviceFit: "CRM + Loyalty App",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Loyal families not recognized — no loyalty program",
    painPoint2: "New product arrival notifications via Instagram only",
    painPoint3: "Bulk gifting orders for baby showers tracked manually",
    intentLevel: "MEDIUM",
    buyingTrigger: "Baby retail loyalty has natural 5-year lifecycle per family",
    action: "Instagram DM + mommy blogger partnerships",
    outreachMessage: "Hi — for a baby store, the same family comes back from newborn to age 5. Is there a loyalty program that recognizes and rewards those long-term customers?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-5",
    companyName: "UrbanThreads Boutique",
    city: "Mumbai",
    industry: "Retail / Fashion" as Lead["industry"],
    website: "urbanthreadsfashion.in",
    employees: "3–6",
    serviceFit: "CRM + WhatsApp Commerce",
    qualification: "WARM",
    confidencePct: 72,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Festival season outreach to existing customers not systematized",
    painPoint2: "New collection sharing via WhatsApp broadcast — unorganized",
    painPoint3: "No restock notification for sold-out items",
    intentLevel: "MEDIUM",
    buyingTrigger: "Fashion boutique with loyal customer base — digital outreach absent",
    action: "Instagram DM to boutique owner",
    outreachMessage: "Hi — for a fashion boutique, your existing customers are the easiest to sell to. Is there a system to notify them about new collections before posting on Instagram?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HR-1",
    companyName: "HireRight IT Recruitment",
    city: "Pune",
    industry: "HR & Recruitment" as Lead["industry"],
    website: "hireright.in",
    employees: "10–25",
    serviceFit: "CRM + ATS",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Candidate database in LinkedIn SavedList + Excel — not searchable",
    painPoint2: "Client feedback on submitted profiles via WhatsApp — no structured log",
    painPoint3: "Past candidates not re-engaged when matching new roles appear",
    intentLevel: "HIGH",
    buyingTrigger: "IT hiring market recovering in 2025-26 — volume increasing",
    action: "LinkedIn DM to recruitment founder",
    outreachMessage: "Hi — for IT recruitment, your candidate database is your biggest asset. Is there a searchable system for past candidates?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HR-2",
    companyName: "PeopleFirst HR Outsourcing",
    city: "Navi Mumbai",
    industry: "HR & Recruitment" as Lead["industry"],
    website: "peoplefirsthr.in",
    employees: "10–25",
    serviceFit: "SaaS + Client Portal",
    qualification: "HOT",
    confidencePct: 75,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Payroll processed manually in Excel for each client — error-prone",
    painPoint2: "No client portal — employees call HR team for payslips",
    painPoint3: "PF/ESIC compliance documentation assembled manually each month",
    intentLevel: "HIGH",
    buyingTrigger: "Scaling from 15 to 40 client companies",
    action: "LinkedIn DM to founder",
    outreachMessage: "Hi — for an HR outsourcing firm, payroll processing in Excel for 20+ clients must be a monthly crunch. Is that automated in any way?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HR-3",
    companyName: "CareerCraft Campus Recruitment",
    city: "Pune",
    industry: "HR & Recruitment" as Lead["industry"],
    website: "careercraft.co.in",
    employees: "5–20",
    serviceFit: "CRM + Platform",
    qualification: "WARM",
    confidencePct: 70,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Employer-to-college matching done from memory — no structured matching system",
    painPoint2: "Campus drive scheduling via email chains",
    painPoint3: "Placement outcome data not tracked formally",
    intentLevel: "MEDIUM",
    buyingTrigger: "Campus recruitment market recovering as hiring picks up",
    action: "LinkedIn DM + college placement cell outreach",
    outreachMessage: "Hi — matching the right employers to the right college campuses is your core skill. Is there a system to manage that matching and track outcomes?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HR-4",
    companyName: "QuickHire Recruitment",
    city: "Mumbai",
    industry: "HR & Recruitment" as Lead["industry"],
    website: "quickhire.co.in",
    employees: "2–5",
    serviceFit: "CRM + ATS",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Candidate profiles in LinkedIn SavedList + personal Excel",
    painPoint2: "Client job requirements tracked in email threads",
    painPoint3: "Interview schedule coordination via personal WhatsApp",
    intentLevel: "HIGH",
    buyingTrigger: "Solo recruiter growing to a small team",
    action: "LinkedIn DM to founder",
    outreachMessage: "Hi — for a solo recruiter, your candidate database is your core asset. Is there a searchable system for past candidates?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HR-5",
    companyName: "HRFirst Compliance Consultant",
    city: "Pune",
    industry: "HR & Recruitment" as Lead["industry"],
    website: "hrfirstconsult.in",
    employees: "2–5",
    serviceFit: "CRM + Compliance Calendar",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "PF/ESIC/Labour law deadlines for 15+ clients tracked in personal calendar",
    painPoint2: "Client document collection for compliance filing via WhatsApp",
    painPoint3: "No client portal to view their own compliance status",
    intentLevel: "HIGH",
    buyingTrigger: "Compliance complexity increasing with new labour codes",
    action: "LinkedIn DM + CA firm referrals",
    outreachMessage: "Hi — managing PF and labour compliance deadlines for 15 client companies manually is a significant risk. Is there a shared calendar or reminder system?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ID-1",
    companyName: "SpaceWorks Studio",
    city: "Mumbai",
    industry: "Interior Design" as Lead["industry"],
    website: "spaceworksstudio.in",
    employees: "10–25",
    serviceFit: "CRM + Project Management",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "3D design revision approvals via WhatsApp — client confusion on versions",
    painPoint2: "Vendor procurement in Excel — delays cause site hold-ups",
    painPoint3: "Payment milestone follow-up done manually",
    intentLevel: "HIGH",
    buyingTrigger: "Growing from 5 to 15 simultaneous projects",
    action: "LinkedIn DM to principal designer",
    outreachMessage: "Hi — for an interior design studio, client approval tracking across multiple revision rounds is where most time gets lost. How are you managing design approvals?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ID-2",
    companyName: "DesignNest Modular Kitchen",
    city: "Pune",
    industry: "Interior Design" as Lead["industry"],
    website: "designnest.in",
    employees: "10–25",
    serviceFit: "CRM + Quotation SaaS",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Site measurement appointments via personal calls — no calendar system",
    painPoint2: "Custom quotation preparation takes 48 hours — leads go cold",
    painPoint3: "Production and installation status not visible to customer",
    intentLevel: "HIGH",
    buyingTrigger: "Pune new apartment launches creating lead surge for modular kitchens",
    action: "LinkedIn DM + developer sales team partnerships",
    outreachMessage: "Hi — new apartment launches in Pune create a surge in modular kitchen inquiries. How quickly is your team able to send a quote after a site visit?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ID-3",
    companyName: "ArchiCraft Design Studio",
    city: "Navi Mumbai",
    industry: "Interior Design" as Lead["industry"],
    website: "archicraft.in",
    employees: "10–20",
    serviceFit: "CRM + Client Portal",
    qualification: "WARM",
    confidencePct: 73,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Drawing versions shared via WhatsApp — old versions cause site errors",
    painPoint2: "Client not proactively updated on site progress",
    painPoint3: "Payment milestone follow-up done verbally",
    intentLevel: "MEDIUM",
    buyingTrigger: "Architecture and ID firm in growing Navi Mumbai residential market",
    action: "LinkedIn DM to principal architect",
    outreachMessage: "Hi — for an architecture firm, drawing version confusion on site can be really costly. Is there a version-controlled way you share drawings?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ID-4",
    companyName: "ReDesign Room",
    city: "Mumbai",
    industry: "Interior Design" as Lead["industry"],
    website: "redesignroom.in",
    employees: "2–5",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Design revision approvals via WhatsApp — old versions cause site errors",
    painPoint2: "Vendor procurement per project fully manual",
    painPoint3: "Client payment milestone follow-up awkward without system",
    intentLevel: "HIGH",
    buyingTrigger: "Solo designer growing to a small team — needs a system",
    action: "Instagram DM to designer",
    outreachMessage: "Hey — for an interior designer, getting the wrong version executed on site is a nightmare. Is there a version-controlled way you share drawings with contractors?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LC-1",
    companyName: "LexPartners LLP",
    city: "Mumbai",
    industry: "Legal" as Lead["industry"],
    website: "lexpartners.in",
    employees: "10–25",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Matter status not visible to clients without calling office",
    painPoint2: "Billing for hourly work tracked manually — disputes",
    painPoint3: "Critical deadline calendar in partners' personal calendars — risk",
    intentLevel: "HIGH",
    buyingTrigger: "Growing from 2 to 5 partner firm",
    action: "LinkedIn DM to managing partner",
    outreachMessage: "Hi — for a growing law firm, critical deadlines and matter status in a shared system rather than individual calendars is a significant risk management need. Is that centralized anywhere?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LC-2",
    companyName: "Strategy Lab Consulting",
    city: "Pune",
    industry: "Consulting" as Lead["industry"],
    website: "strategylabconsulting.com",
    employees: "5–20",
    serviceFit: "CRM + Proposal Management",
    qualification: "WARM",
    confidencePct: 73,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "No pipeline tracking — principal doesn't know pending proposals",
    painPoint2: "Project deliverable tracking via email — scope creep common",
    painPoint3: "Client referral program informal",
    intentLevel: "MEDIUM",
    buyingTrigger: "SME consulting market growing in Pune",
    action: "LinkedIn DM to principal consultant",
    outreachMessage: "Hi — for a consulting boutique, your pipeline of pending proposals is your most important metric. Is that tracked in a CRM or still from memory?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LC-3",
    companyName: "Complianz Secretarial",
    city: "Navi Mumbai",
    industry: "Legal / Compliance" as Lead["industry"],
    website: "complianz.co.in",
    employees: "5–20",
    serviceFit: "CRM + Compliance Calendar",
    qualification: "HOT",
    confidencePct: 83,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Compliance deadlines for 50 companies tracked in single Excel — high risk of error",
    painPoint2: "Client reminders for document submission sent manually — often late",
    painPoint3: "No client portal to view own compliance status",
    intentLevel: "HIGH",
    buyingTrigger: "MCA21 and GST portal changes increasing compliance complexity",
    action: "LinkedIn DM to CS-founder",
    outreachMessage: "Hi — managing ROC and GST deadlines for 50 companies in Excel is a significant compliance risk. Is there an automated reminder system in place?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LC-4",
    companyName: "Veritas Legal Associates",
    city: "Pune",
    industry: "Legal" as Lead["industry"],
    website: "veritaslegal.in",
    employees: "5–15",
    serviceFit: "CRM + Case Management",
    qualification: "WARM",
    confidencePct: 70,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Client calls for case status take significant lawyer and receptionist time",
    painPoint2: "Hearing dates tracked in physical diary — risk of misses",
    painPoint3: "Client billing disputes from lack of activity logs",
    intentLevel: "MEDIUM",
    buyingTrigger: "Growing civil and commercial law practice in Pune",
    action: "LinkedIn DM + CA/CS referral network",
    outreachMessage: "Hi — one of the biggest time drains for law offices is clients calling to ask 'what's the status of my case.' Is there a way for clients to check that themselves?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-1",
    companyName: "EduBridge Learning Solutions",
    city: "Mumbai",
    industry: "Education" as Lead["industry"],
    website: "edubridgeindia.com",
    employees: "100–150",
    serviceFit: "SaaS + CRM",
    qualification: "WARM",
    confidencePct: 68,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Quarterly CSR reporting takes days to compile from Excel",
    painPoint2: "Student dropout detection is reactive — no early alert",
    painPoint3: "Placement outcome data tracked per center — not consolidated",
    intentLevel: "MEDIUM",
    buyingTrigger: "CSR partners demanding real-time dashboards",
    action: "Program Director / Operations Head",
    outreachMessage: "Hi — when your CSR partners ask for quarterly placement data, how long does your team typically spend pulling that report?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-2",
    companyName: "Orchids International School",
    city: "Mumbai",
    industry: "Education" as Lead["industry"],
    website: "orchidsinternationalschool.com",
    employees: "150–200",
    serviceFit: "SaaS + Parent App",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Parent communication via WhatsApp circulars — no read confirmation",
    painPoint2: "Admission inquiry tracking during Jan-April is manual",
    painPoint3: "Fee reminder calls made manually for defaulters",
    intentLevel: "MEDIUM",
    buyingTrigger: "Chain expanding to new cities — needs standardized digital processes",
    action: "Principal or Corporate Admin Office",
    outreachMessage: "Hi — with schools expanding to new cities, standardizing parent communication becomes tricky. Is the current process the same at each Orchids campus?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-3",
    companyName: "Vibgyor High School (Pune)",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "vibgyor.edu.in",
    employees: "100–150",
    serviceFit: "SaaS + Mobile App",
    qualification: "WARM",
    confidencePct: 71,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "No centralized view of admission inquiries across campuses",
    painPoint2: "Fee defaulter follow-up depends on individual class teachers — awkward",
    painPoint3: "Parent-teacher meeting slots via physical diary",
    intentLevel: "MEDIUM",
    buyingTrigger: "New Pune campus launch",
    action: "Regional Ops Director",
    outreachMessage: "Hi — for a multi-campus school chain, is PTM slot booking still done at the front desk or is there a digital system parents can use?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-4",
    companyName: "Lexicon International School",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "lexiconschools.edu.in",
    employees: "80–130",
    serviceFit: "Parent App + Admission CRM",
    qualification: "HOT",
    confidencePct: 73,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Parents don't know in real time if child is absent",
    painPoint2: "Bus tracking not available — parents anxiously wait",
    painPoint3: "Homework shared in WhatsApp groups — chaotic during exams",
    intentLevel: "HIGH",
    buyingTrigger: "IT corridor parents demanding app-based school management",
    action: "School Director or Founder",
    outreachMessage: "Hi — for schools in the Hinjewadi corridor, parents are tech-savvy and compare notes about school apps. Does Lexicon have a dedicated parent app?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-5",
    companyName: "Apex Coaching Classes",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "apexclassespune.com",
    employees: "15–40",
    serviceFit: "CRM + Student App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Admission inquiry calls missed during teaching hours",
    painPoint2: "Test results shared on physical printout — parents want digital",
    painPoint3: "Fee collection reminder via personal WhatsApp",
    intentLevel: "HIGH",
    buyingTrigger: "JEE admission season April 2026 approaching",
    action: "Approach Director before March-end",
    outreachMessage: "Hi — JEE admission season is coming up. When inquiry calls come in and the director is teaching, are those captured somewhere?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-6",
    companyName: "TopScore Academy",
    city: "Mumbai",
    industry: "Education" as Lead["industry"],
    website: "topscoreacademy.in",
    employees: "15–35",
    serviceFit: "CRM + Parent Communication App",
    qualification: "HOT",
    confidencePct: 80,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Parent inquiries about test results come via phone — faculty can't handle volume",
    painPoint2: "No structured follow-up for demo class no-shows",
    painPoint3: "Fee defaulters tracked manually",
    intentLevel: "HIGH",
    buyingTrigger: "2-centre coaching academy at scale inflection point",
    action: "Centre Director",
    outreachMessage: "Hi — for a 2-centre coaching academy, keeping parents updated on test performance is important. Are results going to parents in real time?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-7",
    companyName: "Career Launcher (Pune)",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "careerlauncher.com",
    employees: "30–60",
    serviceFit: "CRM + Student Portal",
    qualification: "WARM",
    confidencePct: 75,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Inquiry calls not logged systematically — leads fall off",
    painPoint2: "No student-facing portal for test series access",
    painPoint3: "Fee installment reminders done manually",
    intentLevel: "MEDIUM",
    buyingTrigger: "CAT/banking exam cycle starting April 2026",
    action: "Centre Manager",
    outreachMessage: "Hi — for a coaching centre managing CAT and banking exam batches simultaneously, how is each student's test performance and fee schedule tracked?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-8",
    companyName: "PACE IIT & Medical",
    city: "Mumbai/Pune",
    industry: "Education" as Lead["industry"],
    website: "paceeducation.in",
    employees: "50–100",
    serviceFit: "CRM + Student App",
    qualification: "HOT",
    confidencePct: 80,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "During April-July admission peak, inquiry calls go unanswered",
    painPoint2: "Parent visibility on weekly mock test performance requires physical report",
    painPoint3: "Study schedule changes communicated via WhatsApp group",
    intentLevel: "HIGH",
    buyingTrigger: "Class 11 admission season April 2026 is next major window",
    action: "Director or Admission Head",
    outreachMessage: "Hi — JEE admission season is almost here. Does PACE have a system to track and follow up with every lead, or does the admission team manage manually?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-9",
    companyName: "Pratham Education Foundation",
    city: "Mumbai/Pune",
    industry: "Education" as Lead["industry"],
    website: "pratham.org",
    employees: "100–150",
    serviceFit: "SaaS + Impact Reporting",
    qualification: "WARM",
    confidencePct: 67,
    score: 6,
    category: "NURTURE",
    painPoint1: "Donor impact reports compiled manually — takes weeks",
    painPoint2: "Learning level assessments tracked in Excel — no real-time data",
    painPoint3: "Volunteer coordination via phone/WhatsApp — high dropout",
    intentLevel: "MEDIUM",
    buyingTrigger: "Large donors requiring real-time impact dashboards",
    action: "Program Director or Operations Head",
    outreachMessage: "Hi — for Pratham, is beneficiary learning data tracked in a central system or still compiled from field sheets to Excel?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-10",
    companyName: "Triumph Academy",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "triumphacademy.in",
    employees: "20–50",
    serviceFit: "CRM + NEET Performance App",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Founder personally counseling all inquiries — not scalable",
    painPoint2: "Weekly mock test results shared in class physically — parents not in loop",
    painPoint3: "No automated fee reminder",
    intentLevel: "HIGH",
    buyingTrigger: "Scaling from 60 to 150 students for next batch",
    action: "Founder via LinkedIn/Instagram",
    outreachMessage: "Hi — congrats on the growth at Triumph. For a NEET coaching centre scaling from 60 to 150+ students, does the team have a system ready to manage that?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-11",
    companyName: "Wisdom High School",
    city: "Thane/Mumbai",
    industry: "Education" as Lead["industry"],
    website: "wisdomhighschool.com",
    employees: "80–120",
    serviceFit: "Parent App + Admission CRM",
    qualification: "WARM",
    confidencePct: 68,
    score: 6,
    category: "NURTURE",
    painPoint1: "Admission season handled entirely by front desk — no lead tracking",
    painPoint2: "No real-time parent notifications for events/emergencies",
    painPoint3: "Fee defaulters identified only after term end",
    intentLevel: "MEDIUM",
    buyingTrigger: "New academic year expansion",
    action: "Principal or School Director",
    outreachMessage: "Hi — during admission season, how does the front desk team track which inquiries have been followed up on vs. pending?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-12",
    companyName: "Delhi Public School NM",
    city: "Navi Mumbai",
    industry: "Education" as Lead["industry"],
    website: "dpsnm.in",
    employees: "100–150",
    serviceFit: "Digital Admin + App",
    qualification: "WARM",
    confidencePct: 69,
    score: 6,
    category: "NURTURE",
    painPoint1: "Physical attendance registers — teachers spend 10 mins per class on admin",
    painPoint2: "Parents calling school for attendance confirmation",
    painPoint3: "Fee collection via cash/cheque — parents want UPI",
    intentLevel: "MEDIUM",
    buyingTrigger: "DPS franchise requires schools to meet modern quality standards",
    action: "Principal or School Admin Officer",
    outreachMessage: "Hi — for a school with DPS brand standards, is fee collection at DPS Navi Mumbai already fully digital or is there still a significant cash/cheque component?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-13",
    companyName: "Apeejay School",
    city: "Nerul, Navi Mumbai",
    industry: "Education" as Lead["industry"],
    website: "apeejayschool.org",
    employees: "80–120",
    serviceFit: "Parent App + School CRM",
    qualification: "WARM",
    confidencePct: 68,
    score: 6,
    category: "NURTURE",
    painPoint1: "Admission inquiry calls logged in register — zero management visibility",
    painPoint2: "Parents wait 3-5 days for callback on admission queries",
    painPoint3: "School events communicated via paper circulars",
    intentLevel: "MEDIUM",
    buyingTrigger: "New academic year admissions opening",
    action: "Principal or Admissions Coordinator",
    outreachMessage: "Hi — admission season is almost here. When an inquiry call comes in, how quickly does your team typically get back to them?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-14",
    companyName: "Abhinava Vidyalaya",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "abhinavaedu.com",
    employees: "80–150",
    serviceFit: "Digital Admin + Parent App",
    qualification: "WARM",
    confidencePct: 65,
    score: 6,
    category: "NURTURE",
    painPoint1: "All communication via physical circulars — no digital backup",
    painPoint2: "Fee collection via cash/DD — time-consuming for working parents",
    painPoint3: "PTM registration done via physical consent slips",
    intentLevel: "MEDIUM",
    buyingTrigger: "Parents comparing with newer schools offering apps",
    action: "Principal or School Secretary",
    outreachMessage: "Hi — traditional schools in Pune are getting parent feedback asking for more digital communication options. Is Abhinava considering moving fee payments to digital?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-15",
    companyName: "GIIS Pune",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "giis.ac.in",
    employees: "80–130",
    serviceFit: "SaaS + Parent App",
    qualification: "WARM",
    confidencePct: 71,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "High volume of parent queries about IB assessments — email response not fast enough",
    painPoint2: "No digital alumni tracking",
    painPoint3: "Admission inquiry from NRI/overseas parents needs digital-first process",
    intentLevel: "MEDIUM",
    buyingTrigger: "NRI/overseas admission surge for Pune school",
    action: "Principal or Admissions Director",
    outreachMessage: "Hi — for an international school, NRI and overseas admission inquiries come at odd hours with high expectations for fast response. Is there a digital process for those?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-16",
    companyName: "Career Point Coaching NM",
    city: "Navi Mumbai",
    industry: "Education" as Lead["industry"],
    website: "careerpoint.ac.in",
    employees: "20–50",
    serviceFit: "CRM + Student App",
    qualification: "HOT",
    confidencePct: 79,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "New brand in competitive Navi Mumbai market — needs fast follow-up",
    painPoint2: "No system to identify which school most enrollments come from",
    painPoint3: "Parent communication about test schedules via personal teacher WhatsApp",
    intentLevel: "HIGH",
    buyingTrigger: "April 2026 Class 11 admission season is first major growth window",
    action: "Founder/Director directly",
    outreachMessage: "Hey — building a coaching brand in Navi Mumbai from scratch is exciting but the April admission season is make-or-break. Is there a CRM or follow-up system ready?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-17",
    companyName: "Billabong High School",
    city: "Mumbai",
    industry: "Education" as Lead["industry"],
    website: "billabonghigh.com",
    employees: "80–120",
    serviceFit: "Parent App + Admission CRM",
    qualification: "WARM",
    confidencePct: 69,
    score: 6,
    category: "NURTURE",
    painPoint1: "Admission inquiry follow-up inconsistent — depends on individual coordinator",
    painPoint2: "Parent communication channels fragmented",
    painPoint3: "No centralized admission data across campuses",
    intentLevel: "MEDIUM",
    buyingTrigger: "Peer schools improving digital offerings",
    action: "School Director or Principal",
    outreachMessage: "Hi — in Mumbai's premium school segment, parents compare the digital experience. Does Billabong High have a central parent app or is each campus managing independently?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-18",
    companyName: "Kidzee Franchise NM",
    city: "Navi Mumbai",
    industry: "Education" as Lead["industry"],
    website: "kidzee.com",
    employees: "5–20",
    serviceFit: "CRM + Parent App",
    qualification: "WARM",
    confidencePct: 72,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Admission inquiries via JustDial and Instagram DMs — no single place to track",
    painPoint2: "Daily activity updates to parents via WhatsApp group — can't handle 50+ parents",
    painPoint3: "No re-enrollment follow-up for older sibling",
    intentLevel: "HIGH",
    buyingTrigger: "Pre-school enrollment season opening for June 2026 batch",
    action: "Franchise owner via Instagram or Google My Business",
    outreachMessage: "Hi — noticed your Kidzee franchise on Google Maps. For the upcoming June admission cycle, how are you managing inquiries — everything on WhatsApp or more structured?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-19",
    companyName: "Topper Study Circle",
    city: "Mumbai",
    industry: "Education" as Lead["industry"],
    website: "topperstudycircle.com",
    employees: "10–30",
    serviceFit: "CRM + Student App",
    qualification: "HOT",
    confidencePct: 80,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Founder handles all admission calls personally — bottleneck at scale",
    painPoint2: "Test results tracked in Google Sheets — not visible to parents in real time",
    painPoint3: "Student batch WhatsApp group used for everything — chaotic",
    intentLevel: "HIGH",
    buyingTrigger: "Batch expansion planned for June 2026",
    action: "Founder via Instagram/LinkedIn",
    outreachMessage: "Hey — small-batch coaching startups usually hit a wall when they cross 50 students. How are you thinking about scaling parent communication for the June batch?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-20",
    companyName: "ISBS Pune",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "indiraisbspune.ac.in",
    employees: "50–100",
    serviceFit: "CRM + Student Portal",
    qualification: "WARM",
    confidencePct: 71,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Admission inquiries from 5 sources not unified",
    painPoint2: "GD-PI scheduling is logistical nightmare in manual form",
    painPoint3: "Enrolled student portal for timetable and marks not digital",
    intentLevel: "MEDIUM",
    buyingTrigger: "New MBA batch enrollment opens March 2026",
    action: "Admissions Director or Dean",
    outreachMessage: "Hi — MBA admissions season is typically hectic with inquiries from multiple sources. How is ISBS tracking which inquiries have completed all steps?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-21",
    companyName: "EuroKids Franchise",
    city: "Mumbai/Pune",
    industry: "Education" as Lead["industry"],
    website: "eurokidsindia.com",
    employees: "5–20",
    serviceFit: "CRM + Parent App",
    qualification: "WARM",
    confidencePct: 70,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Daily parent updates via WhatsApp group — privacy issues",
    painPoint2: "Admission season managed in a notebook — no digital record",
    painPoint3: "No automated reminder for monthly fee collection",
    intentLevel: "MEDIUM",
    buyingTrigger: "EuroKids corporate pushing franchises to improve digital parent experience",
    action: "Individual franchise owner via Google My Business",
    outreachMessage: "Hi — for a EuroKids franchise, daily parent communication is everything. Is the daily activity update going to parents individually or via a group?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-22",
    companyName: "MBAPath Coaching",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "mbapath.in",
    employees: "10–25",
    serviceFit: "CRM + Student Portal",
    qualification: "HOT",
    confidencePct: 79,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "CAT result season inquiry surge not manageable without CRM",
    painPoint2: "GD-PI schedule communicated via personal WhatsApp",
    painPoint3: "No alumni outcomes tracking for marketing",
    intentLevel: "HIGH",
    buyingTrigger: "CAT 2025 results = hot GD-PI coaching window open right now",
    action: "Founder via LinkedIn",
    outreachMessage: "Hey — MBA coaching results season is right now. When CAT results drop, how many inquiries does the team get and how are those being tracked?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-23",
    companyName: "DY Patil International School",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "dpis.edu.in",
    employees: "80–130",
    serviceFit: "SaaS + Parent App",
    qualification: "WARM",
    confidencePct: 69,
    score: 6,
    category: "NURTURE",
    painPoint1: "IB students have complex assignment and CAS requirements — error-prone manually",
    painPoint2: "University counseling process not in a student portal — per counselor system",
    painPoint3: "High parent fees = high digital expectation",
    intentLevel: "MEDIUM",
    buyingTrigger: "IB board requirement for student e-portfolios",
    action: "Principal or Head of Administration",
    outreachMessage: "Hi — for an IB school, CAS activity tracking and university counseling documentation are complex. Is there a student portal where all of that is tracked?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-24",
    companyName: "The Orchid School",
    city: "Pune",
    industry: "Education" as Lead["industry"],
    website: "theorchidschool.org",
    employees: "80–120",
    serviceFit: "Parent App + Admission Portal",
    qualification: "WARM",
    confidencePct: 70,
    score: 6,
    category: "NURTURE",
    painPoint1: "Admission inquiry process requires physical visit — inconvenient for digital-first parents",
    painPoint2: "Report cards distributed physically — lost or delayed",
    painPoint3: "Parent-teacher communication via school diary + WhatsApp — no official channel",
    intentLevel: "MEDIUM",
    buyingTrigger: "Competing schools in Baner now have parent apps",
    action: "Principal or Admissions Coordinator",
    outreachMessage: "Hi — Baner has become very competitive for schools. Does The Orchid School have a parent app or is communication still mainly through school diary and WhatsApp?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-25",
    companyName: "Podar International School",
    city: "Mumbai",
    industry: "Education" as Lead["industry"],
    website: "podarinternationalschool.com",
    employees: "150–200",
    serviceFit: "Parent App + Admission Portal",
    qualification: "WARM",
    confidencePct: 72,
    score: 6,
    category: "NURTURE",
    painPoint1: "Admission inquiries from multiple channels not unified",
    painPoint2: "Parent queries handled via admin WhatsApp numbers — no accountability",
    painPoint3: "Alumni engagement and sibling re-enrollment not managed",
    intentLevel: "MEDIUM",
    buyingTrigger: "New campus launch requiring streamlined admission",
    action: "School Principal or Chain Ops Director",
    outreachMessage: "Hi — during admission season, managing inquiries from three different channels simultaneously is tough. Is there a central system your admission team uses?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-1",
    companyName: "SwiftMove Logistics",
    city: "Mumbai",
    industry: "Logistics" as Lead["industry"],
    website: "swiftmovelogistics.in",
    employees: "20–50",
    serviceFit: "SaaS + Mobile App",
    qualification: "HOT",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Delivery route planning done manually every morning",
    painPoint2: "Proof of delivery is a photo in WhatsApp group — no structured log",
    painPoint3: "COD cash reconciliation at day-end via verbal — errors frequent",
    intentLevel: "HIGH",
    buyingTrigger: "Client base growing from 10 to 30 SME clients — current system breaking",
    action: "Founder or Operations Head",
    outreachMessage: "Hi — for a last-mile delivery service, COD reconciliation at the end of the day is usually the biggest headache. How is that currently handled?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-2",
    companyName: "QuickShift Movers",
    city: "Mumbai",
    industry: "Logistics" as Lead["industry"],
    website: "quickshiftmovers.in",
    employees: "15–40",
    serviceFit: "CRM + Quote Management",
    qualification: "HOT",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Quote generation is manual — takes 24 hrs, customers book elsewhere",
    painPoint2: "Seasonal peak floods inquiries without a system",
    painPoint3: "No structured review collection after the move",
    intentLevel: "HIGH",
    buyingTrigger: "Adding 2 new teams for peak season",
    action: "Founder directly",
    outreachMessage: "Hi — for a movers business, speed of response to a quote request is everything. How quickly does your team typically send a quote after an inquiry?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-3",
    companyName: "CoolChain Logistics",
    city: "Pune",
    industry: "Logistics" as Lead["industry"],
    website: "coolchainpune.in",
    employees: "20–50",
    serviceFit: "SaaS + Client Portal",
    qualification: "WARM",
    confidencePct: 74,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Temperature log data collected manually from drivers — compliance risk",
    painPoint2: "Pharma clients require digital delivery reports — prepared in Excel",
    painPoint3: "No real-time shipment tracking for clients",
    intentLevel: "MEDIUM",
    buyingTrigger: "Pharma client audit requirements",
    action: "Operations Head or Director",
    outreachMessage: "Hi — pharma clients are increasingly demanding real-time temperature logs and digital delivery confirmation. Is CoolChain generating those reports digitally?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-4",
    companyName: "FleetWise Transport",
    city: "Navi Mumbai",
    industry: "Logistics" as Lead["industry"],
    website: "fleetwiseindia.com",
    employees: "15–35",
    serviceFit: "SaaS + Mobile App",
    qualification: "WARM",
    confidencePct: 73,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Employee attendance on cabs tracked via paper register — billing disputes common",
    painPoint2: "Monthly invoice to corporate clients prepared manually — delayed 7-10 days",
    painPoint3: "Driver performance and route deviation not monitored",
    intentLevel: "MEDIUM",
    buyingTrigger: "Getting a new corporate IT client contract",
    action: "Director directly",
    outreachMessage: "Hi — for corporate transport, billing disputes from attendance records are a common pain point. Is employee attendance on your cabs tracked digitally?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-5",
    companyName: "CargoConnect Freight",
    city: "Pune",
    industry: "Logistics" as Lead["industry"],
    website: "cargoconnectpune.com",
    employees: "15–40",
    serviceFit: "CRM + Shipment Tracking",
    qualification: "WARM",
    confidencePct: 70,
    score: 7,
    category: "HIGH VALUE",
    painPoint1: "Clients calling 5 times daily for shipment status updates",
    painPoint2: "Customs clearance status communicated via email — no portal",
    painPoint3: "Invoice generation delayed post-delivery",
    intentLevel: "MEDIUM",
    buyingTrigger: "Growing freight volume from Pune's manufacturing corridor",
    action: "Director directly",
    outreachMessage: "Hi — for a freight company, the most common client complaint is 'I don't know where my shipment is.' Is there a portal where clients can check status themselves?",
    get salesScript() { return generateSalesScript(this as Lead); },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-1",
    companyName: "Stitch & Bloom",
    city: "Mumbai, Bandra",
    industry: "E-Commerce",
    website: "stitchandbloom.in",
    employees: "2-8",
    serviceFit: "CRM + D2C Platform",
    qualification: "HOT",
    confidencePct: 88,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Instagram DM orders tracked manually in Notes app",
    painPoint2: "No post-purchase follow-up — customers never come back",
    painPoint3: "Zero visibility into best-selling products vs dead stock",
    intentLevel: "HIGH",
    buyingTrigger: "You just launched a new collection and have no system to notify past buyers",
    action: "Instagram DM — @stitchandbloom",
    outreachMessage: `Hi, I saw your new collection on Instagram — stunning work! I help D2C fashion brands in Mumbai replace the Excel/DM chaos with an automated system for orders, follow-ups, and repeat buyers. Would love to show you how in 10 mins?`,
    get salesScript() { return `Hi, I saw Stitch & Bloom on Instagram — love what you're building in e-commerce.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Instagram DM orders tracked manually in Notes app
2. No post-purchase follow-up — customers never come back
3. Zero visibility into best-selling products vs dead stock

We've built a CRM + D2C platform that handles orders, customer data, and re-marketing in one place — specifically for e-commerce businesses your size in Mumbai.

You just launched a new collection and have no system to notify past buyers — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-2",
    companyName: "OrganicNest",
    city: "Pune, Koregaon Park",
    industry: "E-Commerce",
    website: "organicnest.in",
    employees: "3-10",
    serviceFit: "CRM + WhatsApp Commerce",
    qualification: "HOT",
    confidencePct: 91,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "WhatsApp orders from 3 different numbers — no central tracking",
    painPoint2: "Repeat customers have to message every time to reorder",
    painPoint3: "No automated reminders when a customer's usual order is due",
    intentLevel: "HIGH",
    buyingTrigger: "Your subscription organic box model needs automation to scale past 200 customers",
    action: "Instagram DM — @organicnest.in",
    outreachMessage: `Hi! Came across OrganicNest on Instagram — love the subscription box concept. I help organic D2C brands in Pune automate WhatsApp orders and reorder reminders so you're not chasing customers manually. Quick 10-min demo?`,
    get salesScript() { return `Hi, I saw OrganicNest on Instagram — love what you're building in e-commerce.

E-commerce brands in Pune are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. WhatsApp orders from 3 different numbers — no central tracking
2. Repeat customers have to message every time to reorder
3. No automated reminders when a customer's usual order is due

We've built a CRM + WhatsApp commerce system that automates orders, follow-ups, and broadcasts — specifically for e-commerce businesses your size in Pune.

Your subscription organic box model needs automation to scale past 200 customers — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-3",
    companyName: "TechGadget Hub",
    city: "Mumbai, Andheri",
    industry: "E-Commerce",
    website: "techgadhub.in",
    employees: "5-15",
    serviceFit: "CRM + Order Management",
    qualification: "HOT",
    confidencePct: 85,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Orders from website, Amazon, and Instagram all tracked separately",
    painPoint2: "Return/exchange requests handled on WhatsApp with no ticket system",
    painPoint3: "Can't identify top customers or predict which SKUs will run out",
    intentLevel: "HIGH",
    buyingTrigger: "Scaling to 500+ orders/month makes manual tracking impossible",
    action: "LinkedIn — search TechGadget Hub Mumbai",
    outreachMessage: `Hi [Name], I help electronics e-commerce brands in Mumbai unify their order channels — website, Amazon, Instagram — into one CRM with automated follow-ups and return tracking. Handling 500+ orders manually? Worth a 15-min chat.`,
    get salesScript() { return `Hi [Name], I came across TechGadget Hub on LinkedIn — impressive work in the e-commerce space.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Orders from website, Amazon, and Instagram all tracked separately
2. Return/exchange requests handled on WhatsApp with no ticket system
3. Can't identify top customers or predict which SKUs will run out

We've built a CRM + order management system that tracks every order from placement to delivery — specifically for e-commerce businesses your size in Mumbai.

Scaling to 500+ orders/month makes manual tracking impossible — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-4",
    companyName: "GlowCraft Beauty",
    city: "Navi Mumbai, Vashi",
    industry: "E-Commerce",
    website: "glowcraft.in",
    employees: "2-8",
    serviceFit: "CRM + Loyalty App",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "No loyalty program — every customer treated the same",
    painPoint2: "Repurchase rate is low because there are no automated reminders",
    painPoint3: "Influencer gifting tracked in Excel with no ROI measurement",
    intentLevel: "HIGH",
    buyingTrigger: "Skincare D2C brands that launch loyalty programs see 3x repeat purchase rates",
    action: "Instagram DM — @glowcraft.beauty",
    outreachMessage: `Hi! Saw GlowCraft on Instagram — great skincare line. I help beauty D2C brands in Navi Mumbai build loyalty apps that turn one-time buyers into monthly customers. Your repurchase rate could be 3x higher. Quick demo?`,
    get salesScript() { return `Hi, I saw GlowCraft Beauty on Instagram — love what you're building in e-commerce.

E-commerce brands in Navi Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. No loyalty program — every customer treated the same
2. Repurchase rate is low because there are no automated reminders
3. Influencer gifting tracked in Excel with no ROI measurement

We've built a CRM + loyalty app that turns one-time buyers into repeat customers — specifically for e-commerce businesses your size in Navi Mumbai.

Skincare D2C brands that launch loyalty programs see 3x repeat purchase rates — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-5",
    companyName: "KiddoCraft Store",
    city: "Thane, Ghodbunder Road",
    industry: "E-Commerce",
    website: "kiddocraft.in",
    employees: "2-8",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Parents ask for order status on WhatsApp — manual replies all day",
    painPoint2: "No wishlist or pre-order feature for upcoming products",
    painPoint3: "Zero re-engagement after first purchase — no win-back sequence",
    intentLevel: "HIGH",
    buyingTrigger: "Festive season is peak — handling it without a system costs sales and sanity",
    action: "Instagram DM — @kiddocraft.store",
    outreachMessage: `Hi! KiddoCraft looks lovely — I saw it on Instagram. I help kids' product brands in Thane build a CRM + app so order tracking, wishlist, and reorder flows are automated. Would love to show you — 10 minutes?`,
    get salesScript() { return `Hi, I saw KiddoCraft Store on Instagram — love what you're building in e-commerce.

E-commerce brands in Thane are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Parents ask for order status on WhatsApp — manual replies all day
2. No wishlist or pre-order feature for upcoming products
3. Zero re-engagement after first purchase — no win-back sequence

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for e-commerce businesses your size in Thane.

Festive season is peak — handling it without a system costs sales and sanity — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-6",
    companyName: "ZenHome Decor",
    city: "Pune, Baner",
    industry: "E-Commerce",
    website: "zenhome.in",
    employees: "3-10",
    serviceFit: "CRM + D2C Platform",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Interior design clients want a portal to track their custom orders",
    painPoint2: "No way to segment B2C buyers from B2B interior designers",
    painPoint3: "Post-order follow-up is zero — no review requests or referral asks",
    intentLevel: "HIGH",
    buyingTrigger: "Home decor brands that go D2C with a proper platform see 40% higher AOV",
    action: "Instagram DM — @zenhome.decor",
    outreachMessage: `Hi! ZenHome's aesthetic is incredible — came across you on Instagram. I help home decor D2C brands in Pune build a branded platform that handles B2B + B2C orders, custom order tracking, and automated follow-ups. 10-min demo?`,
    get salesScript() { return `Hi, I saw ZenHome Decor on Instagram — love what you're building in e-commerce.

E-commerce brands in Pune are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Interior design clients want a portal to track their custom orders
2. No way to segment B2C buyers from B2B interior designers
3. Post-order follow-up is zero — no review requests or referral asks

We've built a CRM + D2C platform that handles orders, customer data, and re-marketing in one place — specifically for e-commerce businesses your size in Pune.

Home decor brands that go D2C with a proper platform see 40% higher AOV — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-7",
    companyName: "FitSportz India",
    city: "Mumbai, Goregaon",
    industry: "E-Commerce",
    website: "fitsportz.in",
    employees: "5-15",
    serviceFit: "SaaS + E-commerce Platform",
    qualification: "HOT",
    confidencePct: 89,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Selling on 5 platforms with no unified inventory or order data",
    painPoint2: "No subscription or bundle automation for protein/supplement reorders",
    painPoint3: "Customer data lives in Shopify, Amazon Seller, and 2 Excel files",
    intentLevel: "HIGH",
    buyingTrigger: "Sports nutrition D2C brands scaling past ₹50L/month need a unified SaaS platform",
    action: "LinkedIn — search FitSportz India",
    outreachMessage: `Hi [Name], I help sports D2C brands in Mumbai unify multi-channel orders, inventory, and CRM into one platform with subscription automation. If FitSportz is managing 5 channels manually, this conversation is overdue. 15-min call?`,
    get salesScript() { return `Hi [Name], I came across FitSportz India on LinkedIn — impressive work in the e-commerce space.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Selling on 5 platforms with no unified inventory or order data
2. No subscription or bundle automation for protein/supplement reorders
3. Customer data lives in Shopify, Amazon Seller, and 2 Excel files

We've built a full SaaS + e-commerce platform with inventory, CRM, and marketing automation built in — specifically for e-commerce businesses your size in Mumbai.

Sports nutrition D2C brands scaling past ₹50L/month need a unified SaaS platform — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-8",
    companyName: "HandmadeIndia Co",
    city: "Mumbai, Dharavi",
    industry: "E-Commerce",
    website: "handmadeindia.co",
    employees: "2-8",
    serviceFit: "CRM + WhatsApp Commerce",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "Artisan sellers have no digital order system — all WhatsApp",
    painPoint2: "International buyers want tracking links — not available",
    painPoint3: "No system to manage 50+ artisan suppliers and their stock levels",
    intentLevel: "MEDIUM",
    buyingTrigger: "Craft marketplaces on Instagram are scaling fast and need commerce automation",
    action: "Instagram DM — @handmadeindia.co",
    outreachMessage: `Hi! HandmadeIndia is doing amazing work — I saw it on Instagram. I help artisan marketplaces in Mumbai automate WhatsApp orders, give buyers tracking links, and manage suppliers in one system. 10 mins?`,
    get salesScript() { return `Hi, I saw HandmadeIndia Co on Instagram — love what you're building in e-commerce.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Artisan sellers have no digital order system — all WhatsApp
2. International buyers want tracking links — not available
3. No system to manage 50+ artisan suppliers and their stock levels

We've built a CRM + WhatsApp commerce system that automates orders, follow-ups, and broadcasts — specifically for e-commerce businesses your size in Mumbai.

Craft marketplaces on Instagram are scaling fast and need commerce automation — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-9",
    companyName: "NutriSnack Box",
    city: "Pune, Wakad",
    industry: "E-Commerce",
    website: "nutrisnackbox.in",
    employees: "2-8",
    serviceFit: "CRM + Order Management",
    qualification: "HOT",
    confidencePct: 88,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Monthly subscription box orders managed in Excel — errors every month",
    painPoint2: "No way to pause/modify subscriptions without manual WhatsApp",
    painPoint3: "Churn happens silently — no early warning or save sequence",
    intentLevel: "HIGH",
    buyingTrigger: "Healthy snack subscription brands need order automation before 500+ subs",
    action: "Instagram DM — @nutrisnackbox",
    outreachMessage: `Hi! NutriSnack Box looks great — monthly subscription model is smart. I help subscription snack brands in Pune automate orders, pauses, and churn prevention. Managing it manually at scale is brutal — quick 10 min?`,
    get salesScript() { return `Hi, I saw NutriSnack Box on Instagram — love what you're building in e-commerce.

E-commerce brands in Pune are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Monthly subscription box orders managed in Excel — errors every month
2. No way to pause/modify subscriptions without manual WhatsApp
3. Churn happens silently — no early warning or save sequence

We've built a CRM + order management system that tracks every order from placement to delivery — specifically for e-commerce businesses your size in Pune.

Healthy snack subscription brands need order automation before 500+ subs — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-10",
    companyName: "PawsDelight Pet Store",
    city: "Mumbai, Mulund",
    industry: "E-Commerce",
    website: "pawsdelight.in",
    employees: "2-8",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Pet parents want a vet appointment + order history in one place",
    painPoint2: "Reorder reminders for pet food are sent manually on WhatsApp",
    painPoint3: "No loyalty rewards for regular pet parents — no differentiation",
    intentLevel: "MEDIUM",
    buyingTrigger: "Pet care e-commerce brands that build an app see 60% higher lifetime value",
    action: "Instagram DM — @pawsdelight.pets",
    outreachMessage: `Hi! PawsDelight is adorable — I saw you on Instagram. I help pet care brands in Mumbai build a CRM + app with reorder reminders, loyalty rewards, and vet booking. Pet parents love it. Quick 10-min demo?`,
    get salesScript() { return `Hi, I saw PawsDelight Pet Store on Instagram — love what you're building in e-commerce.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Pet parents want a vet appointment + order history in one place
2. Reorder reminders for pet food are sent manually on WhatsApp
3. No loyalty rewards for regular pet parents — no differentiation

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for e-commerce businesses your size in Mumbai.

Pet care e-commerce brands that build an app see 60% higher lifetime value — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-11",
    companyName: "UrbanThreads",
    city: "Mumbai, Bandra",
    industry: "E-Commerce",
    website: "urbanthreads.in",
    employees: "3-10",
    serviceFit: "CRM + D2C Platform",
    qualification: "HOT",
    confidencePct: 91,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "New drops sell out in DMs but no waiting list or pre-order system",
    painPoint2: "Influencer collaboration orders tracked in DMs — zero system",
    painPoint3: "No size/style preference data to personalize new collection alerts",
    intentLevel: "HIGH",
    buyingTrigger: "Streetwear brands doing limited drops need CRM + pre-order to maximize revenue",
    action: "Instagram DM — @urbanthreads.in",
    outreachMessage: `Hi! UrbanThreads drops are fire — I follow you on Instagram. I help streetwear D2C brands in Mumbai build CRM + pre-order platforms so limited drops don't lose revenue to manual DMs. 10-min chat?`,
    get salesScript() { return `Hi, I saw UrbanThreads on Instagram — love what you're building in e-commerce.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. New drops sell out in DMs but no waiting list or pre-order system
2. Influencer collaboration orders tracked in DMs — zero system
3. No size/style preference data to personalize new collection alerts

We've built a CRM + D2C platform that handles orders, customer data, and re-marketing in one place — specifically for e-commerce businesses your size in Mumbai.

Streetwear brands doing limited drops need CRM + pre-order to maximize revenue — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-12",
    companyName: "SaffronKitchen",
    city: "Pune, Kothrud",
    industry: "E-Commerce",
    website: "saffronkitchen.in",
    employees: "2-8",
    serviceFit: "CRM + WhatsApp Commerce",
    qualification: "WARM",
    confidencePct: 79,
    score: 7,
    category: "NURTURE",
    painPoint1: "Spice blend orders placed on WhatsApp with no order history",
    painPoint2: "Gift hamper season requires manual packing + dispatch coordination",
    painPoint3: "No automated reorder triggers for regular spice buyers",
    intentLevel: "MEDIUM",
    buyingTrigger: "Festival season demand spikes make manual WhatsApp order handling unsustainable",
    action: "Instagram DM — @saffronkitchen.in",
    outreachMessage: `Hi! SaffronKitchen's packaging is stunning — came across you on Instagram. I help artisanal food brands in Pune automate WhatsApp orders, reorder triggers, and hamper dispatch. Festival season is coming — want to see how?`,
    get salesScript() { return `Hi, I saw SaffronKitchen on Instagram — love what you're building in e-commerce.

E-commerce brands in Pune are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Spice blend orders placed on WhatsApp with no order history
2. Gift hamper season requires manual packing + dispatch coordination
3. No automated reorder triggers for regular spice buyers

We've built a CRM + WhatsApp commerce system that automates orders, follow-ups, and broadcasts — specifically for e-commerce businesses your size in Pune.

Festival season demand spikes make manual WhatsApp order handling unsustainable — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-13",
    companyName: "MindfulBrew",
    city: "Navi Mumbai, Kharghar",
    industry: "E-Commerce",
    website: "mindfulbrew.in",
    employees: "2-8",
    serviceFit: "CRM + Loyalty App",
    qualification: "HOT",
    confidencePct: 85,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Tea subscribers lapse after 2-3 months with no win-back system",
    painPoint2: "No way to know which flavors drive most re-purchases",
    painPoint3: "Referral program runs on honour system with zero tracking",
    intentLevel: "HIGH",
    buyingTrigger: "Herbal tea D2C brands with 200+ customers need a loyalty app to retain them",
    action: "Instagram DM — @mindfulbrew",
    outreachMessage: `Hi! MindfulBrew looks beautiful — I saw it on Instagram. I help wellness D2C brands in Navi Mumbai build loyalty apps that track repurchases, run referral programs, and win back lapsed customers automatically. Quick demo?`,
    get salesScript() { return `Hi, I saw MindfulBrew on Instagram — love what you're building in e-commerce.

E-commerce brands in Navi Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Tea subscribers lapse after 2-3 months with no win-back system
2. No way to know which flavors drive most re-purchases
3. Referral program runs on honour system with zero tracking

We've built a CRM + loyalty app that turns one-time buyers into repeat customers — specifically for e-commerce businesses your size in Navi Mumbai.

Herbal tea D2C brands with 200+ customers need a loyalty app to retain them — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-14",
    companyName: "PixelCraft Accessories",
    city: "Mumbai, Andheri",
    industry: "E-Commerce",
    website: "pixelcraft.in",
    employees: "3-10",
    serviceFit: "CRM + Order Management",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "Phone case orders from 4 channels — no unified dashboard",
    painPoint2: "Custom design orders take too long — no status portal for buyers",
    painPoint3: "Bulk B2B orders (corporate gifts) managed in email threads",
    intentLevel: "MEDIUM",
    buyingTrigger: "Custom accessories brands scaling B2B corporate orders need a proper order system",
    action: "LinkedIn — search PixelCraft Accessories Mumbai",
    outreachMessage: `Hi [Name], I help digital accessories brands in Mumbai manage multi-channel orders, custom design requests, and B2B corporate orders in one CRM. If you're handling bulk orders over email, I can show you a better way — 15 mins?`,
    get salesScript() { return `Hi [Name], I came across PixelCraft Accessories on LinkedIn — impressive work in the e-commerce space.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Phone case orders from 4 channels — no unified dashboard
2. Custom design orders take too long — no status portal for buyers
3. Bulk B2B orders (corporate gifts) managed in email threads

We've built a CRM + order management system that tracks every order from placement to delivery — specifically for e-commerce businesses your size in Mumbai.

Custom accessories brands scaling B2B corporate orders need a proper order system — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-15",
    companyName: "BambooNest",
    city: "Pune, Viman Nagar",
    industry: "E-Commerce",
    website: "bamboonest.in",
    employees: "3-10",
    serviceFit: "SaaS + E-commerce Platform",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Eco-product brand with no CRM — no customer data owned by them",
    painPoint2: "Marketplace fees eating margin but no D2C infrastructure",
    painPoint3: "Sustainability story not reflected in post-purchase experience",
    intentLevel: "HIGH",
    buyingTrigger: "Sustainable brands moving off marketplaces to D2C need a full platform to do it right",
    action: "LinkedIn — search BambooNest Pune",
    outreachMessage: `Hi [Name], BambooNest's sustainability mission is impressive. I help eco D2C brands in Pune move from marketplace dependency to a full owned SaaS platform — with CRM, orders, and brand storytelling built in. 15-min call?`,
    get salesScript() { return `Hi [Name], I came across BambooNest on LinkedIn — impressive work in the e-commerce space.

E-commerce brands in Pune are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Eco-product brand with no CRM — no customer data owned by them
2. Marketplace fees eating margin but no D2C infrastructure
3. Sustainability story not reflected in post-purchase experience

We've built a full SaaS + e-commerce platform with inventory, CRM, and marketing automation built in — specifically for e-commerce businesses your size in Pune.

Sustainable brands moving off marketplaces to D2C need a full platform to do it right — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-16",
    companyName: "SilkRoute Apparel",
    city: "Mumbai, Juhu",
    industry: "E-Commerce",
    website: "silkrouteapparel.in",
    employees: "5-15",
    serviceFit: "CRM + D2C Platform",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Premium apparel buyers expect a seamless D2C experience — not a basic site",
    painPoint2: "No VIP customer tier or early access program",
    painPoint3: "Alteration and customization requests managed on WhatsApp",
    intentLevel: "HIGH",
    buyingTrigger: "Premium fashion D2C brands need a platform that matches the product quality",
    action: "Instagram DM — @silkrouteapparel",
    outreachMessage: `Hi! SilkRoute's premium apparel is stunning — I saw it on Instagram. I help luxury fashion D2C brands in Mumbai build a platform that matches the brand: VIP tiers, early access, customization portal. Quick 10-min demo?`,
    get salesScript() { return `Hi, I saw SilkRoute Apparel on Instagram — love what you're building in e-commerce.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Premium apparel buyers expect a seamless D2C experience — not a basic site
2. No VIP customer tier or early access program
3. Alteration and customization requests managed on WhatsApp

We've built a CRM + D2C platform that handles orders, customer data, and re-marketing in one place — specifically for e-commerce businesses your size in Mumbai.

Premium fashion D2C brands need a platform that matches the product quality — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-17",
    companyName: "JungleBlend Coffee",
    city: "Pune, Aundh",
    industry: "E-Commerce",
    website: "jungleblend.in",
    employees: "2-8",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Coffee subscription churn has no save mechanism",
    painPoint2: "Customers want to customize grind and roast but there's no self-serve option",
    painPoint3: "No referral tracking — word-of-mouth sales are invisible",
    intentLevel: "MEDIUM",
    buyingTrigger: "Artisan coffee D2C brands with 300+ subscribers are ready for a proper app",
    action: "Instagram DM — @jungleblend.coffee",
    outreachMessage: `Hi! JungleBlend's single-origin coffees look amazing — came across you on Instagram. I help specialty coffee brands in Pune build CRM + subscription apps with customization, referrals, and churn prevention. 10 mins?`,
    get salesScript() { return `Hi, I saw JungleBlend Coffee on Instagram — love what you're building in e-commerce.

E-commerce brands in Pune are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Coffee subscription churn has no save mechanism
2. Customers want to customize grind and roast but there's no self-serve option
3. No referral tracking — word-of-mouth sales are invisible

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for e-commerce businesses your size in Pune.

Artisan coffee D2C brands with 300+ subscribers are ready for a proper app — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-18",
    companyName: "VelvetCare Skincare",
    city: "Mumbai, Colaba",
    industry: "E-Commerce",
    website: "velvetcare.in",
    employees: "3-10",
    serviceFit: "CRM + Loyalty App",
    qualification: "HOT",
    confidencePct: 89,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Luxury skincare buyers expect personalization — not generic emails",
    painPoint2: "No skin profile or routine builder to increase basket size",
    painPoint3: "Referrals happen organically but are never tracked or rewarded",
    intentLevel: "HIGH",
    buyingTrigger: "Luxury beauty D2C brands doing ₹30L+/month need CRM + loyalty to 10x LTV",
    action: "Instagram DM — @velvetcare.luxury",
    outreachMessage: `Hi! VelvetCare's formulations look luxurious — I saw you on Instagram. I help premium skincare brands in Mumbai build CRM + loyalty apps with skin profiles, personalized recommendations, and tracked referrals. Quick demo?`,
    get salesScript() { return `Hi, I saw VelvetCare Skincare on Instagram — love what you're building in e-commerce.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Luxury skincare buyers expect personalization — not generic emails
2. No skin profile or routine builder to increase basket size
3. Referrals happen organically but are never tracked or rewarded

We've built a CRM + loyalty app that turns one-time buyers into repeat customers — specifically for e-commerce businesses your size in Mumbai.

Luxury beauty D2C brands doing ₹30L+/month need CRM + loyalty to 10x LTV — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-19",
    companyName: "TerraCycle Goods",
    city: "Navi Mumbai, Belapur",
    industry: "E-Commerce",
    website: "terracycle.in",
    employees: "2-8",
    serviceFit: "CRM + WhatsApp Commerce",
    qualification: "WARM",
    confidencePct: 78,
    score: 7,
    category: "NURTURE",
    painPoint1: "Sustainable product orders from 3 channels with no unified view",
    painPoint2: "Corporate bulk orders handled over email with no tracking",
    painPoint3: "Customer education content not linked to product re-purchase journey",
    intentLevel: "MEDIUM",
    buyingTrigger: "Sustainable goods brands entering B2B corporate gifting need a CRM for it",
    action: "LinkedIn — search TerraCycle Goods Navi Mumbai",
    outreachMessage: `Hi [Name], TerraCycle's sustainable vision is exactly what corporates want for gifting now. I help eco brands in Navi Mumbai manage WhatsApp orders + B2B corporate accounts in one CRM. 15-min call to show you?`,
    get salesScript() { return `Hi [Name], I came across TerraCycle Goods on LinkedIn — impressive work in the e-commerce space.

E-commerce brands in Navi Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Sustainable product orders from 3 channels with no unified view
2. Corporate bulk orders handled over email with no tracking
3. Customer education content not linked to product re-purchase journey

We've built a CRM + WhatsApp commerce system that automates orders, follow-ups, and broadcasts — specifically for e-commerce businesses your size in Navi Mumbai.

Sustainable goods brands entering B2B corporate gifting need a CRM for it — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-20",
    companyName: "CloudWardrobe Fashion",
    city: "Mumbai, Bandra",
    industry: "E-Commerce",
    website: "cloudwardrobe.in",
    employees: "5-15",
    serviceFit: "SaaS + E-commerce Platform",
    qualification: "HOT",
    confidencePct: 88,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Fashion rental model needs subscription + return tracking that no basic platform offers",
    painPoint2: "Garment condition scoring and damage deposit management is all manual",
    painPoint3: "No CRM to track stylist preferences and repeat rental history",
    intentLevel: "HIGH",
    buyingTrigger: "Fashion rental brands are a hot category — the one with the best platform wins",
    action: "LinkedIn — search CloudWardrobe Fashion Mumbai",
    outreachMessage: `Hi [Name], CloudWardrobe's rental model is ahead of the curve. I build SaaS platforms for fashion-tech brands in Mumbai — rental tracking, subscription billing, damage management, stylist CRM. This is exactly the infrastructure you need. 15-min call?`,
    get salesScript() { return `Hi [Name], I came across CloudWardrobe Fashion on LinkedIn — impressive work in the e-commerce space.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Fashion rental model needs subscription + return tracking that no basic platform offers
2. Garment condition scoring and damage deposit management is all manual
3. No CRM to track stylist preferences and repeat rental history

We've built a full SaaS + e-commerce platform with inventory, CRM, and marketing automation built in — specifically for e-commerce businesses your size in Mumbai.

Fashion rental brands are a hot category — the one with the best platform wins — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-28",
    companyName: "SkylineProperties",
    city: "Mumbai, Lower Parel",
    industry: "Real Estate",
    website: "skylineproperties.in",
    employees: "5-15",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Site visit scheduling managed over 4 different WhatsApp numbers",
    painPoint2: "Clients want a portal to track their booking and payment milestones",
    painPoint3: "Broker network has no centralized app — leads get poached",
    intentLevel: "HIGH",
    buyingTrigger: "You have 200+ units in pipeline and need a system before the next launch",
    action: "LinkedIn — search SkylineProperties Mumbai",
    outreachMessage: `Hi [Name], I help real estate developers in Mumbai build CRM + client apps so buyers track their booking online and your team stops managing site visits over WhatsApp. 200+ units pipeline? Let's talk — 15 mins.`,
    get salesScript() { return `Hi [Name], I came across SkylineProperties on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Mumbai are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. Site visit scheduling managed over 4 different WhatsApp numbers
2. Clients want a portal to track their booking and payment milestones
3. Broker network has no centralized app — leads get poached

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for real estate businesses your size in Mumbai.

You have 200+ units in pipeline and need a system before the next launch — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-29",
    companyName: "PrimeNest Realty",
    city: "Pune, Hinjewadi",
    industry: "Real Estate",
    website: "primenest.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Lead response time is 2-3 hours because there's no mobile CRM",
    painPoint2: "No app for field agents to update site visit status in real time",
    painPoint3: "Buyers keep asking for a status portal — you don't have one",
    intentLevel: "HIGH",
    buyingTrigger: "IT corridor properties in Hinjewadi are moving fast — slow follow-up loses deals",
    action: "LinkedIn — search PrimeNest Realty Pune",
    outreachMessage: `Hi [Name], I build mobile CRM apps for real estate brokers in Pune — your field agents update leads from site, and buyers get a status portal on their phone. If you're losing deals to slow response, let's chat — 15 mins.`,
    get salesScript() { return `Hi [Name], I came across PrimeNest Realty on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Pune are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. Lead response time is 2-3 hours because there's no mobile CRM
2. No app for field agents to update site visit status in real time
3. Buyers keep asking for a status portal — you don't have one

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for real estate businesses your size in Pune.

IT corridor properties in Hinjewadi are moving fast — slow follow-up loses deals — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-30",
    companyName: "CityHomez",
    city: "Navi Mumbai, Kharghar",
    industry: "Real Estate",
    website: "cityhomez.in",
    employees: "2-8",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 82,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Property listings shared over WhatsApp with no tracking",
    painPoint2: "No follow-up reminders for interested buyers who went cold",
    painPoint3: "Client documents (Aadhar, PAN, income proof) collected on email — scattered",
    intentLevel: "MEDIUM",
    buyingTrigger: "Kharghar corridor seeing high buyer interest — need a system to capitalize on it",
    action: "LinkedIn — search CityHomez Navi Mumbai",
    outreachMessage: `Hi [Name], I help real estate agencies in Navi Mumbai build a CRM + app to track interested buyers, auto-follow-up with cold leads, and collect KYC documents digitally. Kharghar demand is high right now — ready to scale?`,
    get salesScript() { return `Hi [Name], I came across CityHomez on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Navi Mumbai are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. Property listings shared over WhatsApp with no tracking
2. No follow-up reminders for interested buyers who went cold
3. Client documents (Aadhar, PAN, income proof) collected on email — scattered

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for real estate businesses your size in Navi Mumbai.

Kharghar corridor seeing high buyer interest — need a system to capitalize on it — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-31",
    companyName: "VantageVillas",
    city: "Mumbai, Thane",
    industry: "Real Estate",
    website: "vantagevillas.in",
    employees: "3-10",
    serviceFit: "SaaS + Mobile App",
    qualification: "HOT",
    confidencePct: 88,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Villa project clients need a payment milestone tracker — now it's WhatsApp updates",
    painPoint2: "Construction progress photos shared in a group — no organized client portal",
    painPoint3: "No digital handover checklist — snag lists on paper",
    intentLevel: "HIGH",
    buyingTrigger: "Luxury villa project buyers expect a premium digital experience to match the product",
    action: "LinkedIn — search VantageVillas Thane",
    outreachMessage: `Hi [Name], I build SaaS platforms + client apps for luxury villa developers in Thane. Your buyers should be able to track construction milestones, view progress photos, and sign off on snagging — all on an app. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across VantageVillas on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Mumbai are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. Villa project clients need a payment milestone tracker — now it's WhatsApp updates
2. Construction progress photos shared in a group — no organized client portal
3. No digital handover checklist — snag lists on paper

We've built a full SaaS platform with a mobile app so your business runs digitally end-to-end — specifically for real estate businesses your size in Mumbai.

Luxury villa project buyers expect a premium digital experience to match the product — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-32",
    companyName: "EstateMaster",
    city: "Pune, Wakad",
    industry: "Real Estate",
    website: "estatemaster.in",
    employees: "5-15",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Property management for 50+ tenants done over phone and Excel",
    painPoint2: "Rent collection reminders sent manually every month",
    painPoint3: "Maintenance requests from tenants have no ticketing system",
    intentLevel: "MEDIUM",
    buyingTrigger: "Property managers with 50+ units lose hours monthly to manual rent follow-ups",
    action: "LinkedIn — search EstateMaster Pune",
    outreachMessage: `Hi [Name], managing 50+ rental units manually is a full-time job you shouldn't have. I build CRM + tenant apps for property managers in Pune — rent reminders, maintenance tickets, and payment tracking automated. 15 mins?`,
    get salesScript() { return `Hi [Name], I came across EstateMaster on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Pune are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. Property management for 50+ tenants done over phone and Excel
2. Rent collection reminders sent manually every month
3. Maintenance requests from tenants have no ticketing system

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for real estate businesses your size in Pune.

Property managers with 50+ units lose hours monthly to manual rent follow-ups — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-33",
    companyName: "PropConnect Brokers",
    city: "Mumbai, Malad",
    industry: "Real Estate",
    website: "propconnect.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 86,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "10 brokers sharing one WhatsApp group for leads — duplicate follow-ups",
    painPoint2: "No mobile app for brokers to log client meetings on the go",
    painPoint3: "Commission tracking and splits done in Excel — disputes every month",
    intentLevel: "HIGH",
    buyingTrigger: "Broker teams without a mobile CRM lose 30% of leads to internal miscommunication",
    action: "LinkedIn — search PropConnect Brokers Mumbai",
    outreachMessage: `Hi [Name], I build broker CRM apps for real estate teams in Mumbai — individual pipelines, mobile lead logging, and automated commission tracking. If your team is in one WhatsApp group, let's fix that — 15 mins.`,
    get salesScript() { return `Hi [Name], I came across PropConnect Brokers on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Mumbai are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. 10 brokers sharing one WhatsApp group for leads — duplicate follow-ups
2. No mobile app for brokers to log client meetings on the go
3. Commission tracking and splits done in Excel — disputes every month

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for real estate businesses your size in Mumbai.

Broker teams without a mobile CRM lose 30% of leads to internal miscommunication — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-34",
    companyName: "UrbanAbode Pvt Ltd",
    city: "Pune, Baner",
    industry: "Real Estate",
    website: "urbanabode.in",
    employees: "5-15",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "Co-living property residents have no app for maintenance, bills, or community",
    painPoint2: "Occupancy tracking done in Excel — no real-time view",
    painPoint3: "Move-in and move-out process is fully manual paperwork",
    intentLevel: "MEDIUM",
    buyingTrigger: "Co-living operators scaling to 100+ beds need a resident app to stay competitive",
    action: "LinkedIn — search UrbanAbode Pune",
    outreachMessage: `Hi [Name], I help co-living operators in Pune build resident apps — maintenance requests, rent payment, move-in checklist, community board. If you're managing 100+ residents over WhatsApp, let's upgrade that — 15 mins.`,
    get salesScript() { return `Hi [Name], I came across UrbanAbode Pvt Ltd on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Pune are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. Co-living property residents have no app for maintenance, bills, or community
2. Occupancy tracking done in Excel — no real-time view
3. Move-in and move-out process is fully manual paperwork

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for real estate businesses your size in Pune.

Co-living operators scaling to 100+ beds need a resident app to stay competitive — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-35",
    companyName: "LandmarkHomes",
    city: "Navi Mumbai, Panvel",
    industry: "Real Estate",
    website: "landmarkhomes.in",
    employees: "2-8",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "New NAVI Mumbai projects getting 500+ enquiries — no CRM to manage",
    painPoint2: "Site visit requests via Magicbricks and 99acres not captured in one place",
    painPoint3: "No automated follow-up for enquiries that go cold after 48 hours",
    intentLevel: "HIGH",
    buyingTrigger: "Panvel corridor is booming — agents without a mobile CRM will miss the wave",
    action: "LinkedIn — search LandmarkHomes Panvel",
    outreachMessage: `Hi [Name], Panvel is seeing its biggest real estate boom. I help developers and brokers there build CRM + apps to manage portal enquiries, auto-follow-up, and site visit scheduling. Are you capturing all your leads? 15 mins.`,
    get salesScript() { return `Hi [Name], I came across LandmarkHomes on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Navi Mumbai are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. New NAVI Mumbai projects getting 500+ enquiries — no CRM to manage
2. Site visit requests via Magicbricks and 99acres not captured in one place
3. No automated follow-up for enquiries that go cold after 48 hours

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for real estate businesses your size in Navi Mumbai.

Panvel corridor is booming — agents without a mobile CRM will miss the wave — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-36",
    companyName: "Greenfield Spaces",
    city: "Pune, Kharadi",
    industry: "Real Estate",
    website: "greenfieldspaces.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 87,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Commercial real estate leads from LinkedIn and referrals tracked in email",
    painPoint2: "Lease renewal dates for tenants not tracked — missed opportunities",
    painPoint3: "No client portal for commercial tenants to raise issues or see contract status",
    intentLevel: "HIGH",
    buyingTrigger: "Kharadi IT office demand is surging — need a commercial real estate CRM now",
    action: "LinkedIn — search Greenfield Spaces Pune",
    outreachMessage: `Hi [Name], I help commercial real estate firms in Pune build CRM + tenant apps — lease tracking, renewal alerts, issue management. With Kharadi demand surging, the one with the best system wins. 15-min call?`,
    get salesScript() { return `Hi [Name], I came across Greenfield Spaces on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Pune are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. Commercial real estate leads from LinkedIn and referrals tracked in email
2. Lease renewal dates for tenants not tracked — missed opportunities
3. No client portal for commercial tenants to raise issues or see contract status

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for real estate businesses your size in Pune.

Kharadi IT office demand is surging — need a commercial real estate CRM now — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RE-37",
    companyName: "NestQuest Realty",
    city: "Mumbai, Borivali",
    industry: "Real Estate",
    website: "nestquest.in",
    employees: "2-8",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 81,
    score: 7,
    category: "NURTURE",
    painPoint1: "NRI clients buying property remotely need a digital experience — not WhatsApp",
    painPoint2: "Power of attorney and documentation process is fully email-based",
    painPoint3: "No way to schedule virtual tours for NRI buyers",
    intentLevel: "MEDIUM",
    buyingTrigger: "NRI real estate market in Mumbai is growing 25% YoY — digital experience is mandatory",
    action: "LinkedIn — search NestQuest Realty Mumbai",
    outreachMessage: `Hi [Name], NRI buyers in Mumbai expect a digital-first experience — virtual tours, document portal, milestone tracking. I help agencies like yours build exactly that as a CRM + app. Quick 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across NestQuest Realty on LinkedIn — impressive work in the real estate space.

Real estate agents and developers in Mumbai are sitting on huge lead lists but converting less than 5% — because there's no system to follow up at the right time.

Specifically for businesses like yours I often see three things:
1. NRI clients buying property remotely need a digital experience — not WhatsApp
2. Power of attorney and documentation process is fully email-based
3. No way to schedule virtual tours for NRI buyers

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for real estate businesses your size in Mumbai.

NRI real estate market in Mumbai is growing 25% YoY — digital experience is mandatory — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-26",
    companyName: "CareClinic Mumbai",
    city: "Mumbai, Andheri",
    industry: "Healthcare",
    website: "careclinic.in",
    employees: "5-15",
    serviceFit: "CRM + Patient App",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Patients book appointments on WhatsApp and cancel without notice",
    painPoint2: "No post-visit follow-up — patients don't come back for follow-up care",
    painPoint3: "Medical records and prescriptions shared on WhatsApp — not HIPAA-adjacent secure",
    intentLevel: "HIGH",
    buyingTrigger: "Multi-specialty clinics in Mumbai building a patient app see 50% lower no-shows",
    action: "LinkedIn — search CareClinic Mumbai",
    outreachMessage: `Hi [Name], I build patient apps for multi-specialty clinics in Mumbai — appointment booking, prescription history, automated follow-up reminders. If patients are booking on WhatsApp, you're losing revenue. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across CareClinic Mumbai on LinkedIn — impressive work in the healthcare space.

Healthcare providers in Mumbai are losing patients to competitors simply because there's no automated reminder, follow-up, or patient engagement system in place.

Specifically for businesses like yours I often see three things:
1. Patients book appointments on WhatsApp and cancel without notice
2. No post-visit follow-up — patients don't come back for follow-up care
3. Medical records and prescriptions shared on WhatsApp — not HIPAA-adjacent secure

We've built a CRM + patient app for teleconsult, records, and follow-up reminders — specifically for healthcare businesses your size in Mumbai.

Multi-specialty clinics in Mumbai building a patient app see 50% lower no-shows — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-27",
    companyName: "SmilePlus Dental",
    city: "Pune, Aundh",
    industry: "Healthcare",
    website: "smileplus.in",
    employees: "3-10",
    serviceFit: "CRM + Appointment App",
    qualification: "HOT",
    confidencePct: 88,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Dental appointment reminders sent manually — 30% no-show rate",
    painPoint2: "Patients switch dentists because there's no treatment follow-up app",
    painPoint3: "No way for patients to see their X-rays or treatment plan digitally",
    intentLevel: "HIGH",
    buyingTrigger: "Dental practices that launch a patient app reduce no-shows by 40% in 3 months",
    action: "LinkedIn — search SmilePlus Dental Pune",
    outreachMessage: `Hi [Name], I build appointment apps for dental clinics in Pune — automated reminders, treatment plan sharing, X-ray access. If you're at 30% no-shows, this pays for itself in the first month. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across SmilePlus Dental on LinkedIn — impressive work in the healthcare space.

Healthcare providers in Pune are losing patients to competitors simply because there's no automated reminder, follow-up, or patient engagement system in place.

Specifically for businesses like yours I often see three things:
1. Dental appointment reminders sent manually — 30% no-show rate
2. Patients switch dentists because there's no treatment follow-up app
3. No way for patients to see their X-rays or treatment plan digitally

We've built a CRM + appointment app that lets clients self-book and sends reminders automatically — specifically for healthcare businesses your size in Pune.

Dental practices that launch a patient app reduce no-shows by 40% in 3 months — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-28",
    companyName: "WellnessFirst Clinic",
    city: "Navi Mumbai, Vashi",
    industry: "Healthcare",
    website: "wellnessfirst.in",
    employees: "5-15",
    serviceFit: "CRM + Patient App",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Chronic care patients (diabetes, BP) have no app for remote monitoring",
    painPoint2: "Diet and medication compliance tracking is done over WhatsApp",
    painPoint3: "No automated health milestone alerts to bring patients back",
    intentLevel: "HIGH",
    buyingTrigger: "Chronic care management is moving to apps — clinics without one are losing patients",
    action: "LinkedIn — search WellnessFirst Clinic Vashi",
    outreachMessage: `Hi [Name], I help wellness clinics in Navi Mumbai build patient apps for chronic care — remote monitoring, medication reminders, diet tracking. Your chronic care patients need this. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across WellnessFirst Clinic on LinkedIn — impressive work in the healthcare space.

Healthcare providers in Navi Mumbai are losing patients to competitors simply because there's no automated reminder, follow-up, or patient engagement system in place.

Specifically for businesses like yours I often see three things:
1. Chronic care patients (diabetes, BP) have no app for remote monitoring
2. Diet and medication compliance tracking is done over WhatsApp
3. No automated health milestone alerts to bring patients back

We've built a CRM + patient app for teleconsult, records, and follow-up reminders — specifically for healthcare businesses your size in Navi Mumbai.

Chronic care management is moving to apps — clinics without one are losing patients — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-29",
    companyName: "PhysioActive",
    city: "Mumbai, Bandra",
    industry: "Healthcare",
    website: "physioactive.in",
    employees: "2-8",
    serviceFit: "CRM + Appointment App",
    qualification: "WARM",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Physiotherapy exercise programs sent as PDF over WhatsApp — no tracking",
    painPoint2: "Session progress not tracked — therapist relies on patient's memory",
    painPoint3: "No home exercise reminder app — compliance drops after 2 weeks",
    intentLevel: "MEDIUM",
    buyingTrigger: "Physio practices that offer a recovery app retain patients 3x longer",
    action: "LinkedIn — search PhysioActive Mumbai",
    outreachMessage: `Hi [Name], I build recovery apps for physiotherapy clinics in Mumbai — exercise programs, progress tracking, compliance reminders. Patients who can see their progress stay the full course. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across PhysioActive on LinkedIn — impressive work in the healthcare space.

Healthcare providers in Mumbai are losing patients to competitors simply because there's no automated reminder, follow-up, or patient engagement system in place.

Specifically for businesses like yours I often see three things:
1. Physiotherapy exercise programs sent as PDF over WhatsApp — no tracking
2. Session progress not tracked — therapist relies on patient's memory
3. No home exercise reminder app — compliance drops after 2 weeks

We've built a CRM + appointment app that lets clients self-book and sends reminders automatically — specifically for healthcare businesses your size in Mumbai.

Physio practices that offer a recovery app retain patients 3x longer — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-30",
    companyName: "MindSpace Therapy",
    city: "Pune, Koregaon Park",
    industry: "Healthcare",
    website: "mindspace.in",
    employees: "3-10",
    serviceFit: "CRM + Tele-consult App",
    qualification: "HOT",
    confidencePct: 89,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Therapy sessions on Zoom or WhatsApp call — no secure dedicated platform",
    painPoint2: "Session notes managed in Google Docs — no patient-wise history",
    painPoint3: "No mood tracking or between-session journaling app for clients",
    intentLevel: "HIGH",
    buyingTrigger: "Mental health platforms are the fastest growing segment — get your own app before competition",
    action: "LinkedIn — search MindSpace Therapy Pune",
    outreachMessage: `Hi [Name], I build tele-consult apps for therapy practices in Pune — secure sessions, session notes, mood tracking, and follow-up reminders. If you're doing sessions over WhatsApp, your clients deserve better. 15-min chat?`,
    get salesScript() { return `Hi [Name], I came across MindSpace Therapy on LinkedIn — impressive work in the healthcare space.

Healthcare providers in Pune are losing patients to competitors simply because there's no automated reminder, follow-up, or patient engagement system in place.

Specifically for businesses like yours I often see three things:
1. Therapy sessions on Zoom or WhatsApp call — no secure dedicated platform
2. Session notes managed in Google Docs — no patient-wise history
3. No mood tracking or between-session journaling app for clients

We've built a CRM + tele-consult app for video visits, prescriptions, and follow-up reminders — specifically for healthcare businesses your size in Pune.

Mental health platforms are the fastest growing segment — get your own app before competition — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-31",
    companyName: "HealthEasy Diagnostics",
    city: "Thane, Thane West",
    industry: "Healthcare",
    website: "healtheasy.in",
    employees: "5-15",
    serviceFit: "CRM + Patient App",
    qualification: "WARM",
    confidencePct: 82,
    score: 7,
    category: "NURTURE",
    painPoint1: "Lab reports sent over WhatsApp — no secure delivery or storage",
    painPoint2: "Patients don't get automated alerts when reports are ready",
    painPoint3: "No CRM to track which patients need annual health checkup reminders",
    intentLevel: "MEDIUM",
    buyingTrigger: "Diagnostic centers sending reports on WhatsApp will face data compliance issues in 2025",
    action: "LinkedIn — search HealthEasy Diagnostics Thane",
    outreachMessage: `Hi [Name], I build patient apps for diagnostic centers in Thane — secure report delivery, automated alerts, and annual checkup reminders. Sending reports on WhatsApp is a compliance risk. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across HealthEasy Diagnostics on LinkedIn — impressive work in the healthcare space.

Healthcare providers in Thane are losing patients to competitors simply because there's no automated reminder, follow-up, or patient engagement system in place.

Specifically for businesses like yours I often see three things:
1. Lab reports sent over WhatsApp — no secure delivery or storage
2. Patients don't get automated alerts when reports are ready
3. No CRM to track which patients need annual health checkup reminders

We've built a CRM + patient app for teleconsult, records, and follow-up reminders — specifically for healthcare businesses your size in Thane.

Diagnostic centers sending reports on WhatsApp will face data compliance issues in 2025 — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-32",
    companyName: "AyurVeda Wellness",
    city: "Mumbai, Juhu",
    industry: "Healthcare",
    website: "ayurvedawellness.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 81,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Ayurvedic treatment plans (14-day, 21-day) have no tracking app",
    painPoint2: "Patients on Panchakarma need daily diet/herb compliance tracking",
    painPoint3: "No e-commerce integration for patients to order herbs after discharge",
    intentLevel: "MEDIUM",
    buyingTrigger: "Wellness tourism is booming — Ayurvedic centers with an app attract premium clients",
    action: "Instagram DM — @ayurvedawellness.mumbai",
    outreachMessage: `Hi! AyurVeda Wellness looks incredible — I saw you on Instagram. I help Ayurvedic centers in Mumbai build patient apps with treatment tracking, herb compliance reminders, and a shop. Premium clients expect a premium experience. Demo?`,
    get salesScript() { return `Hi, I saw AyurVeda Wellness on Instagram — love what you're building in healthcare.

Healthcare providers in Mumbai are losing patients to competitors simply because there's no automated reminder, follow-up, or patient engagement system in place.

Specifically for businesses like yours I often see three things:
1. Ayurvedic treatment plans (14-day, 21-day) have no tracking app
2. Patients on Panchakarma need daily diet/herb compliance tracking
3. No e-commerce integration for patients to order herbs after discharge

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for healthcare businesses your size in Mumbai.

Wellness tourism is booming — Ayurvedic centers with an app attract premium clients — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HC-33",
    companyName: "FertilityCare Clinic",
    city: "Pune, Camp",
    industry: "Healthcare",
    website: "fertilitycare.in",
    employees: "5-15",
    serviceFit: "CRM + Patient App",
    qualification: "HOT",
    confidencePct: 91,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "IVF patients need a cycle tracking app — now managed over WhatsApp",
    painPoint2: "Hormone test results and protocol updates sent as image screenshots",
    painPoint3: "Emotional support resources not digitally accessible between appointments",
    intentLevel: "HIGH",
    buyingTrigger: "Fertility clinic patients expect a dedicated app — it increases trust and retention",
    action: "LinkedIn — search FertilityCare Clinic Pune",
    outreachMessage: `Hi [Name], I build patient apps for fertility clinics in Pune — IVF cycle tracking, secure test results, protocol updates, and emotional support resources. Your patients are going through the hardest journey — give them the best tool. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across FertilityCare Clinic on LinkedIn — impressive work in the healthcare space.

Healthcare providers in Pune are losing patients to competitors simply because there's no automated reminder, follow-up, or patient engagement system in place.

Specifically for businesses like yours I often see three things:
1. IVF patients need a cycle tracking app — now managed over WhatsApp
2. Hormone test results and protocol updates sent as image screenshots
3. Emotional support resources not digitally accessible between appointments

We've built a CRM + patient app for teleconsult, records, and follow-up reminders — specifically for healthcare businesses your size in Pune.

Fertility clinic patients expect a dedicated app — it increases trust and retention — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-8",
    companyName: "IronZone Gym",
    city: "Mumbai, Goregaon",
    industry: "Fitness",
    website: "ironzone.in",
    employees: "5-15",
    serviceFit: "CRM + Member App",
    qualification: "HOT",
    confidencePct: 89,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Membership renewals tracked manually — renewals are missed every month",
    painPoint2: "Members have no app to track their workouts, weight, or progress photos",
    painPoint3: "PT session bookings managed over WhatsApp — trainers double-book",
    intentLevel: "HIGH",
    buyingTrigger: "Gyms with a member app see 35% lower dropout rates within 6 months",
    action: "Instagram DM — @ironzone.gym",
    outreachMessage: `Hi! IronZone looks like a serious gym — I saw you on Instagram. I build member apps for gyms in Mumbai — workout tracking, PT booking, automated renewal reminders. Gyms with an app lose 35% fewer members. Quick demo?`,
    get salesScript() { return `Hi, I saw IronZone Gym on Instagram — love what you're building in fitness.

Fitness studios and gyms in Mumbai are facing 40%+ dropout rates every quarter because there's no automated engagement, progress tracking, or renewal system.

Specifically for businesses like yours I often see three things:
1. Membership renewals tracked manually — renewals are missed every month
2. Members have no app to track their workouts, weight, or progress photos
3. PT session bookings managed over WhatsApp — trainers double-book

We've built a CRM + member app that keeps clients engaged, tracks attendance, and sends nudges — specifically for fitness businesses your size in Mumbai.

Gyms with a member app see 35% lower dropout rates within 6 months — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-9",
    companyName: "YogaBliss Studio",
    city: "Pune, Koregaon Park",
    industry: "Fitness",
    website: "yogabliss.in",
    employees: "2-8",
    serviceFit: "CRM + Booking App",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Class bookings via WhatsApp — always full or confusion about who's in which class",
    painPoint2: "No waitlist system — drop-outs mean empty mats with no replacement",
    painPoint3: "Monthly passes not tracked — students attend more than they paid for",
    intentLevel: "HIGH",
    buyingTrigger: "Yoga studios that launch a booking app run at 90%+ capacity consistently",
    action: "Instagram DM — @yogabliss.pune",
    outreachMessage: `Hi! YogaBliss looks beautiful — I saw you on Instagram. I build booking apps for yoga studios in Pune — class scheduling, waitlists, pass tracking. Studios with an app run at 90%+ capacity. Quick 10-min demo?`,
    get salesScript() { return `Hi, I saw YogaBliss Studio on Instagram — love what you're building in fitness.

Fitness studios and gyms in Pune are facing 40%+ dropout rates every quarter because there's no automated engagement, progress tracking, or renewal system.

Specifically for businesses like yours I often see three things:
1. Class bookings via WhatsApp — always full or confusion about who's in which class
2. No waitlist system — drop-outs mean empty mats with no replacement
3. Monthly passes not tracked — students attend more than they paid for

We've built a CRM + booking app so customers can reserve slots directly from their phone — specifically for fitness businesses your size in Pune.

Yoga studios that launch a booking app run at 90%+ capacity consistently — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-10",
    companyName: "CrossFit Pune",
    city: "Pune, Baner",
    industry: "Fitness",
    website: "crossfitpune.in",
    employees: "3-10",
    serviceFit: "CRM + Member App",
    qualification: "WARM",
    confidencePct: 84,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "WOD (workout of the day) scores tracked on a whiteboard — no digital history",
    painPoint2: "Member leaderboards are manual — kills competitive motivation",
    painPoint3: "Nutrition coaching advice sent on WhatsApp with no structured tracking",
    intentLevel: "MEDIUM",
    buyingTrigger: "CrossFit boxes that digitize the experience retain members 40% longer",
    action: "Instagram DM — @crossfitpune",
    outreachMessage: `Hi! CrossFit Pune looks intense — I saw you on Instagram. I build member apps for CrossFit boxes that track WOD scores, leaderboards, and nutrition plans. Your community deserves a digital experience to match the intensity. Demo?`,
    get salesScript() { return `Hi, I saw CrossFit Pune on Instagram — love what you're building in fitness.

Fitness studios and gyms in Pune are facing 40%+ dropout rates every quarter because there's no automated engagement, progress tracking, or renewal system.

Specifically for businesses like yours I often see three things:
1. WOD (workout of the day) scores tracked on a whiteboard — no digital history
2. Member leaderboards are manual — kills competitive motivation
3. Nutrition coaching advice sent on WhatsApp with no structured tracking

We've built a CRM + member app that keeps clients engaged, tracks attendance, and sends nudges — specifically for fitness businesses your size in Pune.

CrossFit boxes that digitize the experience retain members 40% longer — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-11",
    companyName: "SoulCycle Dance",
    city: "Mumbai, Andheri",
    industry: "Fitness",
    website: "soulcycle.in",
    employees: "2-8",
    serviceFit: "CRM + Booking App",
    qualification: "HOT",
    confidencePct: 88,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Dance batch bookings via Instagram DM — constant back and forth",
    painPoint2: "No digital attendance — instructors mark manually in a notebook",
    painPoint3: "Student recital and event registrations handled over WhatsApp groups",
    intentLevel: "HIGH",
    buyingTrigger: "Dance studios managing 200+ students need a booking app to stay sane",
    action: "Instagram DM — @soulcycle.dance",
    outreachMessage: `Hi! SoulCycle Dance looks amazing — I follow you on Instagram. I build booking apps for dance studios in Mumbai — batch scheduling, attendance, event registration. 200+ students on WhatsApp? Let me show you a better way. 10 mins.`,
    get salesScript() { return `Hi, I saw SoulCycle Dance on Instagram — love what you're building in fitness.

Fitness studios and gyms in Mumbai are facing 40%+ dropout rates every quarter because there's no automated engagement, progress tracking, or renewal system.

Specifically for businesses like yours I often see three things:
1. Dance batch bookings via Instagram DM — constant back and forth
2. No digital attendance — instructors mark manually in a notebook
3. Student recital and event registrations handled over WhatsApp groups

We've built a CRM + booking app so customers can reserve slots directly from their phone — specifically for fitness businesses your size in Mumbai.

Dance studios managing 200+ students need a booking app to stay sane — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-12",
    companyName: "TrimFit Wellness",
    city: "Navi Mumbai, Vashi",
    industry: "Fitness",
    website: "trimfit.in",
    employees: "3-10",
    serviceFit: "SaaS + Mobile App",
    qualification: "HOT",
    confidencePct: 88,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Online fitness coaching delivered over WhatsApp — not scalable",
    painPoint2: "No progress tracking dashboard for online clients",
    painPoint3: "Diet plans sent as PDF — no interactive meal tracker",
    intentLevel: "HIGH",
    buyingTrigger: "Online fitness coaches scaling past 100 clients need a SaaS platform to deliver it properly",
    action: "Instagram DM — @trimfit.wellness",
    outreachMessage: `Hi! TrimFit's transformations on Instagram are incredible. I build SaaS + mobile apps for online fitness coaches in Navi Mumbai — progress tracking, interactive meal plans, video workouts. Scaling past 100 clients on WhatsApp? Let's fix that. Demo?`,
    get salesScript() { return `Hi, I saw TrimFit Wellness on Instagram — love what you're building in fitness.

Fitness studios and gyms in Navi Mumbai are facing 40%+ dropout rates every quarter because there's no automated engagement, progress tracking, or renewal system.

Specifically for businesses like yours I often see three things:
1. Online fitness coaching delivered over WhatsApp — not scalable
2. No progress tracking dashboard for online clients
3. Diet plans sent as PDF — no interactive meal tracker

We've built a full SaaS platform with a mobile app so your business runs digitally end-to-end — specifically for fitness businesses your size in Navi Mumbai.

Online fitness coaches scaling past 100 clients need a SaaS platform to deliver it properly — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-13",
    companyName: "MartialEdge Academy",
    city: "Mumbai, Borivali",
    industry: "Fitness",
    website: "martialedge.in",
    employees: "3-10",
    serviceFit: "CRM + Member App",
    qualification: "WARM",
    confidencePct: 81,
    score: 7,
    category: "NURTURE",
    painPoint1: "Belt grading system tracked in Excel — students don't know where they stand",
    painPoint2: "Tournament registrations collected over WhatsApp — errors and misses",
    painPoint3: "No parent visibility app for kids' classes",
    intentLevel: "MEDIUM",
    buyingTrigger: "Martial arts academies with 150+ students need an app to manage belt progression",
    action: "LinkedIn — search MartialEdge Academy Mumbai",
    outreachMessage: `Hi [Name], I build member apps for martial arts academies in Mumbai — belt tracking, tournament registration, parent visibility for kids' classes. If 150+ students are on one WhatsApp group, I can show you a much better way. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across MartialEdge Academy on LinkedIn — impressive work in the fitness space.

Fitness studios and gyms in Mumbai are facing 40%+ dropout rates every quarter because there's no automated engagement, progress tracking, or renewal system.

Specifically for businesses like yours I often see three things:
1. Belt grading system tracked in Excel — students don't know where they stand
2. Tournament registrations collected over WhatsApp — errors and misses
3. No parent visibility app for kids' classes

We've built a CRM + member app that keeps clients engaged, tracks attendance, and sends nudges — specifically for fitness businesses your size in Mumbai.

Martial arts academies with 150+ students need an app to manage belt progression — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-14",
    companyName: "PowerLift Gym",
    city: "Pune, Hadapsar",
    industry: "Fitness",
    website: "powerlift.in",
    employees: "2-8",
    serviceFit: "CRM + Member App",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "Supplement sales not tracked in CRM — upsell opportunities missed",
    painPoint2: "Personal training packages expire with no automated reminder",
    painPoint3: "Member referrals tracked manually with no rewards system",
    intentLevel: "MEDIUM",
    buyingTrigger: "Gyms that launch a member app with integrated supplement shop see 25% higher revenue",
    action: "LinkedIn — search PowerLift Gym Pune",
    outreachMessage: `Hi [Name], I build member apps for gyms in Pune — PT package reminders, supplement shop, referral rewards, progress tracking. Gyms with an app see 25% higher revenue per member. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across PowerLift Gym on LinkedIn — impressive work in the fitness space.

Fitness studios and gyms in Pune are facing 40%+ dropout rates every quarter because there's no automated engagement, progress tracking, or renewal system.

Specifically for businesses like yours I often see three things:
1. Supplement sales not tracked in CRM — upsell opportunities missed
2. Personal training packages expire with no automated reminder
3. Member referrals tracked manually with no rewards system

We've built a CRM + member app that keeps clients engaged, tracks attendance, and sends nudges — specifically for fitness businesses your size in Pune.

Gyms that launch a member app with integrated supplement shop see 25% higher revenue — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIT-15",
    companyName: "FlexCore Pilates",
    city: "Mumbai, Bandra",
    industry: "Fitness",
    website: "flexcore.in",
    employees: "2-8",
    serviceFit: "CRM + Booking App",
    qualification: "HOT",
    confidencePct: 86,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Reformer Pilates sessions book out in 10 minutes — no waitlist system",
    painPoint2: "Clients want to see available slots from their phone — not via DM",
    painPoint3: "Session packages expire silently — no reminder to the client",
    intentLevel: "HIGH",
    buyingTrigger: "Pilates studios that add a booking app see 30% fewer no-shows and full classes",
    action: "Instagram DM — @flexcore.pilates",
    outreachMessage: `Hi! FlexCore's Pilates content on Instagram is great — I follow you. I build booking apps for Pilates studios in Mumbai — real-time slot booking, waitlists, package expiry reminders. If reformer classes book out in DMs, there's a smarter way. Demo?`,
    get salesScript() { return `Hi, I saw FlexCore Pilates on Instagram — love what you're building in fitness.

Fitness studios and gyms in Mumbai are facing 40%+ dropout rates every quarter because there's no automated engagement, progress tracking, or renewal system.

Specifically for businesses like yours I often see three things:
1. Reformer Pilates sessions book out in 10 minutes — no waitlist system
2. Clients want to see available slots from their phone — not via DM
3. Session packages expire silently — no reminder to the client

We've built a CRM + booking app so customers can reserve slots directly from their phone — specifically for fitness businesses your size in Mumbai.

Pilates studios that add a booking app see 30% fewer no-shows and full classes — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-26",
    companyName: "BrightMind Academy",
    city: "Mumbai, Malad",
    industry: "Education",
    website: "brightmind.in",
    employees: "5-15",
    serviceFit: "CRM + Student App",
    qualification: "HOT",
    confidencePct: 89,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Homework and test results sent to parents over 3 separate WhatsApp groups",
    painPoint2: "No student performance dashboard — parents call teachers for updates",
    painPoint3: "Fee payment reminders sent manually every month",
    intentLevel: "HIGH",
    buyingTrigger: "Coaching classes in Mumbai that launch a student app retain 90% of students year-on-year",
    action: "LinkedIn — search BrightMind Academy Mumbai",
    outreachMessage: `Hi [Name], I build student apps for coaching classes in Mumbai — performance tracking, homework, fee payments, parent updates. If parent calls for updates are eating your teachers' time, let me show you the fix. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across BrightMind Academy on LinkedIn — impressive work in the education space.

Education businesses in Mumbai are struggling to retain students and keep parents engaged — most run on WhatsApp groups and spreadsheets.

Specifically for businesses like yours I often see three things:
1. Homework and test results sent to parents over 3 separate WhatsApp groups
2. No student performance dashboard — parents call teachers for updates
3. Fee payment reminders sent manually every month

We've built a CRM + student app with schedules, progress tracking, and parent updates — specifically for education businesses your size in Mumbai.

Coaching classes in Mumbai that launch a student app retain 90% of students year-on-year — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-27",
    companyName: "CodeKids Mumbai",
    city: "Mumbai, Powai",
    industry: "Education",
    website: "codekids.in",
    employees: "3-10",
    serviceFit: "SaaS + Parent App",
    qualification: "HOT",
    confidencePct: 91,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Online coding curriculum delivered over Zoom with no structured app",
    painPoint2: "Parents want to see project submissions and progress — not just report cards",
    painPoint3: "No gamification or badge system to keep kids motivated",
    intentLevel: "HIGH",
    buyingTrigger: "Kids' coding schools that launch a learning app see 80% higher retention",
    action: "LinkedIn — search CodeKids Mumbai",
    outreachMessage: `Hi [Name], I build SaaS + parent apps for kids' coding schools in Mumbai — curriculum delivery, project showcase, gamification, parent progress view. If you're teaching on Zoom, you're one step away from being replaced by a platform. Let me help — 15 mins.`,
    get salesScript() { return `Hi [Name], I came across CodeKids Mumbai on LinkedIn — impressive work in the education space.

Education businesses in Mumbai are struggling to retain students and keep parents engaged — most run on WhatsApp groups and spreadsheets.

Specifically for businesses like yours I often see three things:
1. Online coding curriculum delivered over Zoom with no structured app
2. Parents want to see project submissions and progress — not just report cards
3. No gamification or badge system to keep kids motivated

We've built a platform that handles your SaaS + Parent App needs end-to-end — specifically for education businesses your size in Mumbai.

Kids' coding schools that launch a learning app see 80% higher retention — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-28",
    companyName: "LanguagePlus Institute",
    city: "Pune, Camp",
    industry: "Education",
    website: "languageplus.in",
    employees: "3-10",
    serviceFit: "CRM + Student App",
    qualification: "WARM",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Vocabulary practice and listening exercises sent over WhatsApp",
    painPoint2: "Student progress across levels tracked in Excel — hard to visualize",
    painPoint3: "No automated batch scheduling or level-up notifications",
    intentLevel: "MEDIUM",
    buyingTrigger: "Language institutes that build a learning app double their trial-to-enrolment rate",
    action: "LinkedIn — search LanguagePlus Institute Pune",
    outreachMessage: `Hi [Name], I build student apps for language institutes in Pune — exercise delivery, level tracking, batch scheduling, progress milestones. If students are practicing vocabulary on WhatsApp forwards, there's a much better way. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across LanguagePlus Institute on LinkedIn — impressive work in the education space.

Education businesses in Pune are struggling to retain students and keep parents engaged — most run on WhatsApp groups and spreadsheets.

Specifically for businesses like yours I often see three things:
1. Vocabulary practice and listening exercises sent over WhatsApp
2. Student progress across levels tracked in Excel — hard to visualize
3. No automated batch scheduling or level-up notifications

We've built a CRM + student app with schedules, progress tracking, and parent updates — specifically for education businesses your size in Pune.

Language institutes that build a learning app double their trial-to-enrolment rate — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-29",
    companyName: "ArtSpark Studio",
    city: "Mumbai, Juhu",
    industry: "Education",
    website: "artspark.in",
    employees: "2-8",
    serviceFit: "CRM + Student App",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "Art portfolio of students has no digital platform — physical folders",
    painPoint2: "Parent feedback after every class collected on paper",
    painPoint3: "Class fee payments and batch rosters managed in one messy Excel file",
    intentLevel: "MEDIUM",
    buyingTrigger: "Art studios that digitize student portfolios attract premium admissions",
    action: "Instagram DM — @artspark.studio",
    outreachMessage: `Hi! ArtSpark Studio looks wonderful — I saw you on Instagram. I build student apps for art studios in Mumbai — digital portfolios, parent feedback, batch management, and fee tracking. 10-min demo?`,
    get salesScript() { return `Hi, I saw ArtSpark Studio on Instagram — love what you're building in education.

Education businesses in Mumbai are struggling to retain students and keep parents engaged — most run on WhatsApp groups and spreadsheets.

Specifically for businesses like yours I often see three things:
1. Art portfolio of students has no digital platform — physical folders
2. Parent feedback after every class collected on paper
3. Class fee payments and batch rosters managed in one messy Excel file

We've built a CRM + student app with schedules, progress tracking, and parent updates — specifically for education businesses your size in Mumbai.

Art studios that digitize student portfolios attract premium admissions — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-30",
    companyName: "IAS Pathshala",
    city: "Pune, Deccan",
    industry: "Education",
    website: "iaspathshala.in",
    employees: "5-15",
    serviceFit: "SaaS + Parent App",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "UPSC mock test results shared as PDF on WhatsApp — no analysis",
    painPoint2: "Current affairs updates delivered via WhatsApp broadcast — no engagement tracking",
    painPoint3: "Student counselling and mentorship scheduling fully manual",
    intentLevel: "HIGH",
    buyingTrigger: "UPSC coaching institutes that launch a SaaS platform outperform offline-only competitors by 2x",
    action: "LinkedIn — search IAS Pathshala Pune",
    outreachMessage: `Hi [Name], I build SaaS platforms for UPSC coaching institutes in Pune — mock tests with instant analytics, current affairs app, mentorship scheduling. If serious UPSC aspirants aren't getting a digital experience, they'll find one that offers it. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across IAS Pathshala on LinkedIn — impressive work in the education space.

Education businesses in Pune are struggling to retain students and keep parents engaged — most run on WhatsApp groups and spreadsheets.

Specifically for businesses like yours I often see three things:
1. UPSC mock test results shared as PDF on WhatsApp — no analysis
2. Current affairs updates delivered via WhatsApp broadcast — no engagement tracking
3. Student counselling and mentorship scheduling fully manual

We've built a platform that handles your SaaS + Parent App needs end-to-end — specifically for education businesses your size in Pune.

UPSC coaching institutes that launch a SaaS platform outperform offline-only competitors by 2x — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-31",
    companyName: "MusicMaestro School",
    city: "Mumbai, Bandra",
    industry: "Education",
    website: "musicmaestro.in",
    employees: "2-8",
    serviceFit: "CRM + Student App",
    qualification: "WARM",
    confidencePct: 82,
    score: 7,
    category: "NURTURE",
    painPoint1: "Practice schedules and song assignments sent on WhatsApp",
    painPoint2: "No way for students to record and submit practice videos for teacher review",
    painPoint3: "Recital and performance registrations collected in a Google Form — clunky",
    intentLevel: "MEDIUM",
    buyingTrigger: "Music schools that offer a practice app have 60% better student retention",
    action: "Instagram DM — @musicmaestro.school",
    outreachMessage: `Hi! MusicMaestro School looks impressive — I saw you on Instagram. I build student apps for music schools in Mumbai — practice schedules, video submissions, recital registrations. Students who track practice progress stay enrolled. Demo?`,
    get salesScript() { return `Hi, I saw MusicMaestro School on Instagram — love what you're building in education.

Education businesses in Mumbai are struggling to retain students and keep parents engaged — most run on WhatsApp groups and spreadsheets.

Specifically for businesses like yours I often see three things:
1. Practice schedules and song assignments sent on WhatsApp
2. No way for students to record and submit practice videos for teacher review
3. Recital and performance registrations collected in a Google Form — clunky

We've built a CRM + student app with schedules, progress tracking, and parent updates — specifically for education businesses your size in Mumbai.

Music schools that offer a practice app have 60% better student retention — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ED-32",
    companyName: "StemGenius Labs",
    city: "Navi Mumbai, Belapur",
    industry: "Education",
    website: "stemgenius.in",
    employees: "3-10",
    serviceFit: "CRM + Student App",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Robotics kit assignments and project tracking done in Google Classroom",
    painPoint2: "Parents have no visibility into project milestones and competition readiness",
    painPoint3: "Competition registrations and team rosters managed over email",
    intentLevel: "HIGH",
    buyingTrigger: "STEM activity centers building a student app see 3x referrals from engaged parents",
    action: "LinkedIn — search StemGenius Labs Navi Mumbai",
    outreachMessage: `Hi [Name], I build student apps for STEM activity centers in Navi Mumbai — project tracking, parent visibility, competition management. Parents who can see their child's robotics progress become your best marketing. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across StemGenius Labs on LinkedIn — impressive work in the education space.

Education businesses in Navi Mumbai are struggling to retain students and keep parents engaged — most run on WhatsApp groups and spreadsheets.

Specifically for businesses like yours I often see three things:
1. Robotics kit assignments and project tracking done in Google Classroom
2. Parents have no visibility into project milestones and competition readiness
3. Competition registrations and team rosters managed over email

We've built a CRM + student app with schedules, progress tracking, and parent updates — specifically for education businesses your size in Navi Mumbai.

STEM activity centers building a student app see 3x referrals from engaged parents — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-9",
    companyName: "TiffinBox Cloud Kitchen",
    city: "Mumbai, Malad",
    industry: "Food & Beverage",
    website: "tiffinbox.in",
    employees: "5-15",
    serviceFit: "CRM + Delivery App",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Tiffin orders placed on WhatsApp daily — errors and misses inevitable",
    painPoint2: "No route optimization for delivery boys — late deliveries every day",
    painPoint3: "Monthly subscription tiffin plans managed in Excel — cancellations untracked",
    intentLevel: "HIGH",
    buyingTrigger: "Cloud kitchens managing 200+ daily orders on WhatsApp will hit a wall at 300",
    action: "LinkedIn — search TiffinBox Cloud Kitchen Mumbai",
    outreachMessage: `Hi [Name], I build delivery CRM apps for cloud kitchens in Mumbai — WhatsApp order automation, delivery route optimization, subscription management. If you're doing 200+ orders manually, you're one bad review away from chaos. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across TiffinBox Cloud Kitchen on LinkedIn — impressive work in the food & beverage space.

F&B brands in Mumbai are spending on ads to get new customers but have zero system to bring them back — no loyalty, no automated follow-up, no re-order triggers.

Specifically for businesses like yours I often see three things:
1. Tiffin orders placed on WhatsApp daily — errors and misses inevitable
2. No route optimization for delivery boys — late deliveries every day
3. Monthly subscription tiffin plans managed in Excel — cancellations untracked

We've built a CRM + delivery app that tracks orders, notifies customers, and handles returns — specifically for food & beverage businesses your size in Mumbai.

Cloud kitchens managing 200+ daily orders on WhatsApp will hit a wall at 300 — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-10",
    companyName: "BrewCraft Taproom",
    city: "Pune, Koregaon Park",
    industry: "Food & Beverage",
    website: "brewcraft.in",
    employees: "5-15",
    serviceFit: "CRM + Loyalty App",
    qualification: "WARM",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Regular craft beer customers have no loyalty or pint club system",
    painPoint2: "Events and tap takeovers promoted only on Instagram — no direct notification to regulars",
    painPoint3: "Private table bookings for events managed over phone and email",
    intentLevel: "MEDIUM",
    buyingTrigger: "Craft beer taprooms that launch a loyalty app see 50% higher repeat visit frequency",
    action: "Instagram DM — @brewcraft.pune",
    outreachMessage: `Hi! BrewCraft Taproom looks amazing — I saw you on Instagram. I build loyalty apps for craft beer bars in Pune — pint clubs, event notifications, table booking. Regulars who earn points come back more. Quick demo?`,
    get salesScript() { return `Hi, I saw BrewCraft Taproom on Instagram — love what you're building in food & beverage.

F&B brands in Pune are spending on ads to get new customers but have zero system to bring them back — no loyalty, no automated follow-up, no re-order triggers.

Specifically for businesses like yours I often see three things:
1. Regular craft beer customers have no loyalty or pint club system
2. Events and tap takeovers promoted only on Instagram — no direct notification to regulars
3. Private table bookings for events managed over phone and email

We've built a CRM + loyalty app that turns one-time buyers into repeat customers — specifically for food & beverage businesses your size in Pune.

Craft beer taprooms that launch a loyalty app see 50% higher repeat visit frequency — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-11",
    companyName: "CaterElite Caterers",
    city: "Mumbai, Andheri",
    industry: "Food & Beverage",
    website: "caterelite.in",
    employees: "5-15",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 88,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Catering event bookings managed over email threads — no CRM",
    painPoint2: "Menu customization and change requests lost in WhatsApp",
    painPoint3: "Client invoices sent manually — no automated billing or payment tracking",
    intentLevel: "HIGH",
    buyingTrigger: "Catering companies managing 20+ monthly events need a CRM app to scale without chaos",
    action: "LinkedIn — search CaterElite Caterers Mumbai",
    outreachMessage: `Hi [Name], I build CRM apps for catering companies in Mumbai — event booking, menu management, automated billing, client communication. If you're managing 20+ events over email and WhatsApp, I can save you 10 hours a week. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across CaterElite Caterers on LinkedIn — impressive work in the food & beverage space.

F&B brands in Mumbai are spending on ads to get new customers but have zero system to bring them back — no loyalty, no automated follow-up, no re-order triggers.

Specifically for businesses like yours I often see three things:
1. Catering event bookings managed over email threads — no CRM
2. Menu customization and change requests lost in WhatsApp
3. Client invoices sent manually — no automated billing or payment tracking

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for food & beverage businesses your size in Mumbai.

Catering companies managing 20+ monthly events need a CRM app to scale without chaos — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-12",
    companyName: "FreshBowl Meal Prep",
    city: "Navi Mumbai, Vashi",
    industry: "Food & Beverage",
    website: "freshbowl.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Weekly meal prep subscription changes (add/remove items) over WhatsApp",
    painPoint2: "No customer nutrition dashboard — clients don't know their macros",
    painPoint3: "Referral program runs on trust — no tracking or automatic rewards",
    intentLevel: "HIGH",
    buyingTrigger: "Meal prep businesses scaling past 150 weekly customers need an app to manage complexity",
    action: "Instagram DM — @freshbowl.mealprep",
    outreachMessage: `Hi! FreshBowl's meal prep content on Instagram is great. I build subscription apps for meal prep businesses in Navi Mumbai — weekly plan management, nutrition tracking, referral rewards. 150+ weekly customers on WhatsApp? Time for an app. Demo?`,
    get salesScript() { return `Hi, I saw FreshBowl Meal Prep on Instagram — love what you're building in food & beverage.

F&B brands in Navi Mumbai are spending on ads to get new customers but have zero system to bring them back — no loyalty, no automated follow-up, no re-order triggers.

Specifically for businesses like yours I often see three things:
1. Weekly meal prep subscription changes (add/remove items) over WhatsApp
2. No customer nutrition dashboard — clients don't know their macros
3. Referral program runs on trust — no tracking or automatic rewards

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for food & beverage businesses your size in Navi Mumbai.

Meal prep businesses scaling past 150 weekly customers need an app to manage complexity — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-13",
    companyName: "ChefTable Private Dining",
    city: "Mumbai, Juhu",
    industry: "Food & Beverage",
    website: "cheftable.in",
    employees: "2-8",
    serviceFit: "CRM + Booking App",
    qualification: "WARM",
    confidencePct: 81,
    score: 7,
    category: "NURTURE",
    painPoint1: "Private dining and chef-at-home bookings over Instagram DM — messy",
    painPoint2: "Dietary restriction and preference data collected fresh each time",
    painPoint3: "No waitlist for popular weekend slots — revenue lost",
    intentLevel: "MEDIUM",
    buyingTrigger: "Private dining experiences in Mumbai attract premium buyers who expect digital booking",
    action: "Instagram DM — @cheftable.mumbai",
    outreachMessage: `Hi! ChefTable's private dining experiences look incredible — I saw them on Instagram. I build booking apps for exclusive F&B experiences in Mumbai — online booking, preference capture, waitlist. Premium product deserves premium booking. Demo?`,
    get salesScript() { return `Hi, I saw ChefTable Private Dining on Instagram — love what you're building in food & beverage.

F&B brands in Mumbai are spending on ads to get new customers but have zero system to bring them back — no loyalty, no automated follow-up, no re-order triggers.

Specifically for businesses like yours I often see three things:
1. Private dining and chef-at-home bookings over Instagram DM — messy
2. Dietary restriction and preference data collected fresh each time
3. No waitlist for popular weekend slots — revenue lost

We've built a CRM + booking app so customers can reserve slots directly from their phone — specifically for food & beverage businesses your size in Mumbai.

Private dining experiences in Mumbai attract premium buyers who expect digital booking — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FB-14",
    companyName: "GrainGuru Bakery",
    city: "Pune, Aundh",
    industry: "Food & Beverage",
    website: "grainguru.in",
    employees: "2-8",
    serviceFit: "CRM + Loyalty App",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "Regular bakery customers have no digital loyalty or rewards",
    painPoint2: "Custom cake orders tracked in WhatsApp — confirmation errors common",
    painPoint3: "No pre-order system for limited-edition seasonal bakes",
    intentLevel: "MEDIUM",
    buyingTrigger: "Artisan bakeries that add a loyalty app see 40% more repeat orders from regulars",
    action: "Instagram DM — @grainguru.bakery",
    outreachMessage: `Hi! GrainGuru's artisan bakes look incredible — I saw you on Instagram. I build loyalty apps for bakeries in Pune — points for regulars, custom cake orders, pre-order for seasonal items. 40% more repeat orders. Quick 10-min demo?`,
    get salesScript() { return `Hi, I saw GrainGuru Bakery on Instagram — love what you're building in food & beverage.

F&B brands in Pune are spending on ads to get new customers but have zero system to bring them back — no loyalty, no automated follow-up, no re-order triggers.

Specifically for businesses like yours I often see three things:
1. Regular bakery customers have no digital loyalty or rewards
2. Custom cake orders tracked in WhatsApp — confirmation errors common
3. No pre-order system for limited-edition seasonal bakes

We've built a CRM + loyalty app that turns one-time buyers into repeat customers — specifically for food & beverage businesses your size in Pune.

Artisan bakeries that add a loyalty app see 40% more repeat orders from regulars — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-8",
    companyName: "WealthPath Advisors",
    city: "Mumbai, Lower Parel",
    industry: "Financial Services",
    website: "wealthpath.in",
    employees: "3-10",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Client portfolio updates sent as WhatsApp screenshots — not professional",
    painPoint2: "SIP and mutual fund renewal reminders sent manually — reminders missed",
    painPoint3: "No client portal — clients have to call or WhatsApp for every query",
    intentLevel: "HIGH",
    buyingTrigger: "Wealth advisors without a client portal are losing clients to Zerodha and Groww",
    action: "LinkedIn — search WealthPath Advisors Mumbai",
    outreachMessage: `Hi [Name], I build CRM + client portals for wealth advisors in Mumbai — portfolio dashboards, automated renewal reminders, secure document sharing. Clients who have a portal stay 5 years longer. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across WealthPath Advisors on LinkedIn — impressive work in the financial services space.

Financial advisors in Mumbai are manually tracking SIP renewals, policy expiries, and client follow-ups in Excel — while digital advisors automate it all.

Specifically for businesses like yours I often see three things:
1. Client portfolio updates sent as WhatsApp screenshots — not professional
2. SIP and mutual fund renewal reminders sent manually — reminders missed
3. No client portal — clients have to call or WhatsApp for every query

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for financial services businesses your size in Mumbai.

Wealth advisors without a client portal are losing clients to Zerodha and Groww — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-9",
    companyName: "InsureSmart Brokers",
    city: "Pune, Deccan",
    industry: "Financial Services",
    website: "insuresmart.in",
    employees: "2-8",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 88,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Insurance policy renewal tracking done manually in Excel — renewals slipping",
    painPoint2: "No centralized client policy history — agents start from scratch every renewal",
    painPoint3: "Claim status updates given over phone — no client self-serve portal",
    intentLevel: "HIGH",
    buyingTrigger: "Insurance brokers losing 20% of renewals annually to manual tracking can't afford another year of Excel",
    action: "LinkedIn — search InsureSmart Brokers Pune",
    outreachMessage: `Hi [Name], I help insurance brokers in Pune automate renewal tracking and build client portals — policies, claims status, automated reminders. If you're losing 20% of renewals to Excel gaps, this will fix it. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across InsureSmart Brokers on LinkedIn — impressive work in the financial services space.

Financial advisors in Pune are manually tracking SIP renewals, policy expiries, and client follow-ups in Excel — while digital advisors automate it all.

Specifically for businesses like yours I often see three things:
1. Insurance policy renewal tracking done manually in Excel — renewals slipping
2. No centralized client policy history — agents start from scratch every renewal
3. Claim status updates given over phone — no client self-serve portal

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for financial services businesses your size in Pune.

Insurance brokers losing 20% of renewals annually to manual tracking can't afford another year of Excel — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-10",
    companyName: "LoanEase Finance",
    city: "Navi Mumbai, Vashi",
    industry: "Financial Services",
    website: "loanease.in",
    employees: "3-10",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 87,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Loan application status given over phone — applicants call 3x a day",
    painPoint2: "Document collection via WhatsApp — KYC documents scattered in chats",
    painPoint3: "No CRM to track which applicants went cold and need re-engagement",
    intentLevel: "HIGH",
    buyingTrigger: "NBFC and DSA loan businesses without a digital pipeline lose 30% of applicants to friction",
    action: "LinkedIn — search LoanEase Finance Navi Mumbai",
    outreachMessage: `Hi [Name], I build CRM + applicant portals for loan DSAs in Navi Mumbai — application tracking, digital KYC collection, automated status updates. Applicants who have a portal stop calling. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across LoanEase Finance on LinkedIn — impressive work in the financial services space.

Financial advisors in Navi Mumbai are manually tracking SIP renewals, policy expiries, and client follow-ups in Excel — while digital advisors automate it all.

Specifically for businesses like yours I often see three things:
1. Loan application status given over phone — applicants call 3x a day
2. Document collection via WhatsApp — KYC documents scattered in chats
3. No CRM to track which applicants went cold and need re-engagement

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for financial services businesses your size in Navi Mumbai.

NBFC and DSA loan businesses without a digital pipeline lose 30% of applicants to friction — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-11",
    companyName: "TaxSmart CA Firm",
    city: "Mumbai, Andheri",
    industry: "Financial Services",
    website: "taxsmart.in",
    employees: "3-10",
    serviceFit: "CRM + Client Portal",
    qualification: "WARM",
    confidencePct: 83,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Client documents (Form 16, bank statements) collected on WhatsApp every year",
    painPoint2: "ITR filing deadlines tracked in an Excel — missed deadlines hurt reputation",
    painPoint3: "No way for clients to check their filing status without calling",
    intentLevel: "MEDIUM",
    buyingTrigger: "CA firms without a client portal get buried in WhatsApp messages during tax season",
    action: "LinkedIn — search TaxSmart CA Firm Mumbai",
    outreachMessage: `Hi [Name], tax season is coming and I help CA firms in Mumbai replace the WhatsApp chaos with a client portal — document upload, ITR status tracking, automated deadline reminders. Built for CA firms. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across TaxSmart CA Firm on LinkedIn — impressive work in the financial services space.

Financial advisors in Mumbai are manually tracking SIP renewals, policy expiries, and client follow-ups in Excel — while digital advisors automate it all.

Specifically for businesses like yours I often see three things:
1. Client documents (Form 16, bank statements) collected on WhatsApp every year
2. ITR filing deadlines tracked in an Excel — missed deadlines hurt reputation
3. No way for clients to check their filing status without calling

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for financial services businesses your size in Mumbai.

CA firms without a client portal get buried in WhatsApp messages during tax season — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-12",
    companyName: "GrowthFirst Capital",
    city: "Mumbai, BKC",
    industry: "Financial Services",
    website: "growthfirst.in",
    employees: "5-15",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 91,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Startup investor relations managed over email threads and phone",
    painPoint2: "No investor dashboard to track cap table, MIS reports, and portfolio updates",
    painPoint3: "Portfolio companies have no digital reporting interface",
    intentLevel: "HIGH",
    buyingTrigger: "Micro VCs and family offices without an investor portal lose credibility with LPs",
    action: "LinkedIn — search GrowthFirst Capital Mumbai",
    outreachMessage: `Hi [Name], I build investor CRM + portals for micro VCs in Mumbai — LP dashboards, cap table management, portfolio MIS. If you're managing LP relationships over email, you're behind the curve. 15-min call?`,
    get salesScript() { return `Hi [Name], I came across GrowthFirst Capital on LinkedIn — impressive work in the financial services space.

Financial advisors in Mumbai are manually tracking SIP renewals, policy expiries, and client follow-ups in Excel — while digital advisors automate it all.

Specifically for businesses like yours I often see three things:
1. Startup investor relations managed over email threads and phone
2. No investor dashboard to track cap table, MIS reports, and portfolio updates
3. Portfolio companies have no digital reporting interface

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for financial services businesses your size in Mumbai.

Micro VCs and family offices without an investor portal lose credibility with LPs — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "FIN-13",
    companyName: "RealReturn Investments",
    city: "Pune, Baner",
    industry: "Financial Services",
    website: "realreturn.in",
    employees: "2-8",
    serviceFit: "CRM + Client Portal",
    qualification: "WARM",
    confidencePct: 82,
    score: 7,
    category: "NURTURE",
    painPoint1: "Real estate investment advisory clients have no digital portfolio tracker",
    painPoint2: "Rental income and yield updates sent via WhatsApp screenshots monthly",
    painPoint3: "Client onboarding documents collected via Google Drive links — no structure",
    intentLevel: "MEDIUM",
    buyingTrigger: "Real estate investment advisors managing 50+ client portfolios need a CRM + portal",
    action: "LinkedIn — search RealReturn Investments Pune",
    outreachMessage: `Hi [Name], I build CRM + client portals for real estate investment advisors in Pune — portfolio tracking, rental income dashboards, digital onboarding. If you're managing 50+ clients on WhatsApp, I can help. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across RealReturn Investments on LinkedIn — impressive work in the financial services space.

Financial advisors in Pune are manually tracking SIP renewals, policy expiries, and client follow-ups in Excel — while digital advisors automate it all.

Specifically for businesses like yours I often see three things:
1. Real estate investment advisory clients have no digital portfolio tracker
2. Rental income and yield updates sent via WhatsApp screenshots monthly
3. Client onboarding documents collected via Google Drive links — no structure

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for financial services businesses your size in Pune.

Real estate investment advisors managing 50+ client portfolios need a CRM + portal — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-6",
    companyName: "GalaEvents Mumbai",
    city: "Mumbai, Bandra",
    industry: "Events / Marketing",
    website: "galaevents.in",
    employees: "5-15",
    serviceFit: "CRM + Event App",
    qualification: "HOT",
    confidencePct: 88,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Guest list and RSVP management via Excel shared over WhatsApp",
    painPoint2: "No event app for attendee check-in — staff with clipboard at entrance",
    painPoint3: "Post-event client feedback collected over phone — no structured data",
    intentLevel: "HIGH",
    buyingTrigger: "Event companies managing 500+ guest lists on Excel risk embarrassing on-the-day failures",
    action: "LinkedIn — search GalaEvents Mumbai",
    outreachMessage: `Hi [Name], I build event CRM apps for event companies in Mumbai — digital RSVP, QR check-in, attendee management, post-event feedback. If your team is still on clipboards at the entrance, let me show you a better way. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across GalaEvents Mumbai on LinkedIn — impressive work in the events / marketing space.

Event and marketing agencies in Mumbai are scaling fast but managing everything on spreadsheets — no lead tracking, no CRM, no post-campaign client report system.

Specifically for businesses like yours I often see three things:
1. Guest list and RSVP management via Excel shared over WhatsApp
2. No event app for attendee check-in — staff with clipboard at entrance
3. Post-event client feedback collected over phone — no structured data

We've built a CRM + event app for attendee management, ticketing, and post-event follow-up — specifically for events / marketing businesses your size in Mumbai.

Event companies managing 500+ guest lists on Excel risk embarrassing on-the-day failures — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-7",
    companyName: "CelebratePune Events",
    city: "Pune, Koregaon Park",
    industry: "Events / Marketing",
    website: "celebratepune.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 82,
    score: 7,
    category: "NURTURE",
    painPoint1: "Wedding and corporate event inquiries managed in a personal Gmail",
    painPoint2: "Vendor coordination (caterer, decorator, AV) tracked in WhatsApp groups",
    painPoint3: "No client portal for couples or corporates to see event progress",
    intentLevel: "MEDIUM",
    buyingTrigger: "Event planners handling 10+ events simultaneously need a CRM to stay organized",
    action: "Instagram DM — @celebratepune",
    outreachMessage: `Hi! CelebratePune looks gorgeous — I saw your work on Instagram. I build CRM apps for event planners in Pune — client portals, vendor coordination, inquiry tracking. If you're juggling 10+ events on WhatsApp, I can help. Quick demo?`,
    get salesScript() { return `Hi, I saw CelebratePune Events on Instagram — love what you're building in events / marketing.

Event and marketing agencies in Pune are scaling fast but managing everything on spreadsheets — no lead tracking, no CRM, no post-campaign client report system.

Specifically for businesses like yours I often see three things:
1. Wedding and corporate event inquiries managed in a personal Gmail
2. Vendor coordination (caterer, decorator, AV) tracked in WhatsApp groups
3. No client portal for couples or corporates to see event progress

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for events / marketing businesses your size in Pune.

Event planners handling 10+ events simultaneously need a CRM to stay organized — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-8",
    companyName: "TechSummit Events",
    city: "Mumbai, BKC",
    industry: "Events / Marketing",
    website: "techsummit.in",
    employees: "5-15",
    serviceFit: "CRM + Event App",
    qualification: "HOT",
    confidencePct: 89,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Conference registrations managed via Google Forms and manual Excel",
    painPoint2: "Speaker and sponsor management tracked in scattered email threads",
    painPoint3: "No networking app for attendees — missed engagement opportunity",
    intentLevel: "HIGH",
    buyingTrigger: "B2B tech conferences growing past 300 attendees need a proper event management platform",
    action: "LinkedIn — search TechSummit Events Mumbai",
    outreachMessage: `Hi [Name], I build event management CRM apps for B2B conference companies in Mumbai — registrations, speaker management, sponsor CRM, attendee networking app. If your next event has 300+ attendees, this is the system you need. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across TechSummit Events on LinkedIn — impressive work in the events / marketing space.

Event and marketing agencies in Mumbai are scaling fast but managing everything on spreadsheets — no lead tracking, no CRM, no post-campaign client report system.

Specifically for businesses like yours I often see three things:
1. Conference registrations managed via Google Forms and manual Excel
2. Speaker and sponsor management tracked in scattered email threads
3. No networking app for attendees — missed engagement opportunity

We've built a CRM + event app for attendee management, ticketing, and post-event follow-up — specifically for events / marketing businesses your size in Mumbai.

B2B tech conferences growing past 300 attendees need a proper event management platform — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-9",
    companyName: "SocialBuzz Agency",
    city: "Mumbai, Andheri",
    industry: "Events / Marketing",
    website: "socialbuzz.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 81,
    score: 7,
    category: "NURTURE",
    painPoint1: "Campaign deliverables and deadlines tracked in WhatsApp groups with clients",
    painPoint2: "No client reporting dashboard — reports made manually in PowerPoint",
    painPoint3: "New client onboarding is fully unstructured — 3 emails and 5 calls",
    intentLevel: "MEDIUM",
    buyingTrigger: "Marketing agencies managing 15+ clients can't deliver consistent reporting without a CRM",
    action: "LinkedIn — search SocialBuzz Agency Mumbai",
    outreachMessage: `Hi [Name], I build CRM apps for marketing agencies in Mumbai — client dashboards, automated reporting, campaign tracking, structured onboarding. If you're making reports in PowerPoint, I can save you 8 hours a month per client. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across SocialBuzz Agency on LinkedIn — impressive work in the events / marketing space.

Event and marketing agencies in Mumbai are scaling fast but managing everything on spreadsheets — no lead tracking, no CRM, no post-campaign client report system.

Specifically for businesses like yours I often see three things:
1. Campaign deliverables and deadlines tracked in WhatsApp groups with clients
2. No client reporting dashboard — reports made manually in PowerPoint
3. New client onboarding is fully unstructured — 3 emails and 5 calls

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for events / marketing businesses your size in Mumbai.

Marketing agencies managing 15+ clients can't deliver consistent reporting without a CRM — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EV-10",
    companyName: "PhotoMoment Studios",
    city: "Pune, Aundh",
    industry: "Events / Marketing",
    website: "photomoment.in",
    employees: "2-8",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "Wedding and event photos delivered over Google Drive links — no branded experience",
    painPoint2: "Client inquiry and booking managed over Instagram DM",
    painPoint3: "No gallery app where families can tag, download, and share photos",
    intentLevel: "MEDIUM",
    buyingTrigger: "Photography studios that offer a client gallery app get 3x the referrals from weddings",
    action: "Instagram DM — @photomoment.studio",
    outreachMessage: `Hi! PhotoMoment's wedding photography is stunning — I saw it on Instagram. I build gallery apps for photography studios in Pune — branded photo delivery, client tagging, CRM for bookings. Studios with a gallery app get 3x more referrals. Demo?`,
    get salesScript() { return `Hi, I saw PhotoMoment Studios on Instagram — love what you're building in events / marketing.

Event and marketing agencies in Pune are scaling fast but managing everything on spreadsheets — no lead tracking, no CRM, no post-campaign client report system.

Specifically for businesses like yours I often see three things:
1. Wedding and event photos delivered over Google Drive links — no branded experience
2. Client inquiry and booking managed over Instagram DM
3. No gallery app where families can tag, download, and share photos

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for events / marketing businesses your size in Pune.

Photography studios that offer a client gallery app get 3x the referrals from weddings — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HR-6",
    companyName: "TalentBridge India",
    city: "Mumbai, Andheri",
    industry: "HR & Recruitment",
    website: "talentbridge.in",
    employees: "5-15",
    serviceFit: "CRM + ATS",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Candidate pipelines for 30+ active jobs managed in Google Sheets",
    painPoint2: "Client HR managers expect weekly status updates — done manually in email",
    painPoint3: "Interview scheduling via WhatsApp — candidates drop off due to friction",
    intentLevel: "HIGH",
    buyingTrigger: "Recruitment agencies managing 30+ JDs without an ATS lose 25% of candidates to competitors who respond faster",
    action: "LinkedIn — search TalentBridge India Mumbai",
    outreachMessage: `Hi [Name], I build CRM + ATS systems for recruitment agencies in Mumbai — candidate pipelines, client status updates, automated interview scheduling. Managing 30+ JDs in Google Sheets? Let me show you what 2x faster placement looks like. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across TalentBridge India on LinkedIn — impressive work in the hr & recruitment space.

Recruitment agencies in Mumbai are managing 50+ job pipelines on WhatsApp and Excel — candidates fall through cracks and clients get zero status updates.

Specifically for businesses like yours I often see three things:
1. Candidate pipelines for 30+ active jobs managed in Google Sheets
2. Client HR managers expect weekly status updates — done manually in email
3. Interview scheduling via WhatsApp — candidates drop off due to friction

We've built a CRM + ATS that manages job pipelines, candidate tracking, and client communication — specifically for hr & recruitment businesses your size in Mumbai.

Recruitment agencies managing 30+ JDs without an ATS lose 25% of candidates to competitors who respond faster — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HR-7",
    companyName: "HireRight Solutions",
    city: "Pune, Hinjewadi",
    industry: "HR & Recruitment",
    website: "hireright.in",
    employees: "3-10",
    serviceFit: "CRM + ATS",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "IT recruitment for Hinjewadi companies involves 100+ CVs per role — no ATS",
    painPoint2: "Candidate reference checks tracked in email — slow and unstructured",
    painPoint3: "No CRM for client IT HR managers — relationships lost when a recruiter leaves",
    intentLevel: "HIGH",
    buyingTrigger: "IT recruitment agencies in Hinjewadi without an ATS are leaving 40% of placements on the table",
    action: "LinkedIn — search HireRight Solutions Pune",
    outreachMessage: `Hi [Name], I build CRM + ATS platforms for IT recruitment agencies in Hinjewadi — CV parsing, pipeline management, reference check tracking, client dashboards. 40% more placements with the right system. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across HireRight Solutions on LinkedIn — impressive work in the hr & recruitment space.

Recruitment agencies in Pune are managing 50+ job pipelines on WhatsApp and Excel — candidates fall through cracks and clients get zero status updates.

Specifically for businesses like yours I often see three things:
1. IT recruitment for Hinjewadi companies involves 100+ CVs per role — no ATS
2. Candidate reference checks tracked in email — slow and unstructured
3. No CRM for client IT HR managers — relationships lost when a recruiter leaves

We've built a CRM + ATS that manages job pipelines, candidate tracking, and client communication — specifically for hr & recruitment businesses your size in Pune.

IT recruitment agencies in Hinjewadi without an ATS are leaving 40% of placements on the table — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HR-8",
    companyName: "StaffConnect Agency",
    city: "Navi Mumbai, Vashi",
    industry: "HR & Recruitment",
    website: "staffconnect.in",
    employees: "5-15",
    serviceFit: "CRM + ATS",
    qualification: "WARM",
    confidencePct: 82,
    score: 7,
    category: "NURTURE",
    painPoint1: "Blue-collar staffing for 50+ companies managed in 5 separate WhatsApp groups",
    painPoint2: "Worker attendance and deployment tracking done in Excel",
    painPoint3: "No client portal for companies to raise staffing requests digitally",
    intentLevel: "MEDIUM",
    buyingTrigger: "Staffing agencies managing 200+ contract workers without software are one dispute away from chaos",
    action: "LinkedIn — search StaffConnect Agency Navi Mumbai",
    outreachMessage: `Hi [Name], I build CRM + ATS apps for staffing agencies in Navi Mumbai — worker management, deployment tracking, digital client requests. Managing 200+ workers over WhatsApp is risky — let me show you a better way. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across StaffConnect Agency on LinkedIn — impressive work in the hr & recruitment space.

Recruitment agencies in Navi Mumbai are managing 50+ job pipelines on WhatsApp and Excel — candidates fall through cracks and clients get zero status updates.

Specifically for businesses like yours I often see three things:
1. Blue-collar staffing for 50+ companies managed in 5 separate WhatsApp groups
2. Worker attendance and deployment tracking done in Excel
3. No client portal for companies to raise staffing requests digitally

We've built a CRM + ATS that manages job pipelines, candidate tracking, and client communication — specifically for hr & recruitment businesses your size in Navi Mumbai.

Staffing agencies managing 200+ contract workers without software are one dispute away from chaos — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "HR-9",
    companyName: "CareerPivot Consulting",
    city: "Mumbai, BKC",
    industry: "HR & Recruitment",
    website: "careerpivot.in",
    employees: "2-8",
    serviceFit: "CRM + Client Portal",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "Career coaching sessions scheduled over email — no booking system",
    painPoint2: "Client progress tracked informally — no structured coaching CRM",
    painPoint3: "No portal for clients to access resources, session notes, and homework",
    intentLevel: "MEDIUM",
    buyingTrigger: "Career coaches scaling past 50 active clients need a CRM + portal to stay personal at scale",
    action: "LinkedIn — search CareerPivot Consulting Mumbai",
    outreachMessage: `Hi [Name], I build coaching CRM + client portals for career consultants in Mumbai — session scheduling, progress tracking, resource library. If you're managing 50+ career coaching clients manually, there's a smarter way. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across CareerPivot Consulting on LinkedIn — impressive work in the hr & recruitment space.

Recruitment agencies in Mumbai are managing 50+ job pipelines on WhatsApp and Excel — candidates fall through cracks and clients get zero status updates.

Specifically for businesses like yours I often see three things:
1. Career coaching sessions scheduled over email — no booking system
2. Client progress tracked informally — no structured coaching CRM
3. No portal for clients to access resources, session notes, and homework

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for hr & recruitment businesses your size in Mumbai.

Career coaches scaling past 50 active clients need a CRM + portal to stay personal at scale — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-6",
    companyName: "TrendSpot Fashion",
    city: "Mumbai, Malad",
    industry: "Retail / Fashion",
    website: "trendspot.in",
    employees: "3-10",
    serviceFit: "CRM + Loyalty App",
    qualification: "HOT",
    confidencePct: 88,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Regular fashion customers have no loyalty points or rewards — no reason to return",
    painPoint2: "New collection launches promoted on Instagram but regular buyers aren't notified first",
    painPoint3: "No way to segment VIP customers from casual walk-ins",
    intentLevel: "HIGH",
    buyingTrigger: "Fashion retailers that launch a loyalty app see 45% increase in repeat footfall",
    action: "Instagram DM — @trendspot.fashion",
    outreachMessage: `Hi! TrendSpot Fashion looks great — I saw you on Instagram. I build loyalty apps for fashion retailers in Mumbai — points, VIP early access, new arrival notifications. Retailers with a loyalty app see 45% more repeat customers. Demo?`,
    get salesScript() { return `Hi, I saw TrendSpot Fashion on Instagram — love what you're building in retail / fashion.

Fashion retailers in Mumbai are running on Instagram DMs and no CRM — new collection launches go to everyone instead of the right customer segment.

Specifically for businesses like yours I often see three things:
1. Regular fashion customers have no loyalty points or rewards — no reason to return
2. New collection launches promoted on Instagram but regular buyers aren't notified first
3. No way to segment VIP customers from casual walk-ins

We've built a CRM + loyalty app that turns one-time buyers into repeat customers — specifically for retail / fashion businesses your size in Mumbai.

Fashion retailers that launch a loyalty app see 45% increase in repeat footfall — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-7",
    companyName: "HomeZone Store",
    city: "Pune, Wakad",
    industry: "Retail",
    website: "homezone.in",
    employees: "3-10",
    serviceFit: "CRM + Loyalty App",
    qualification: "WARM",
    confidencePct: 82,
    score: 7,
    category: "NURTURE",
    painPoint1: "Home furnishing customers visit once and never come back",
    painPoint2: "No CRM to track which customer bought what — upsell is impossible",
    painPoint3: "Interior design referrals from customers are not tracked or rewarded",
    intentLevel: "MEDIUM",
    buyingTrigger: "Home furnishing retailers building a loyalty CRM see 3x higher lifetime customer value",
    action: "LinkedIn — search HomeZone Store Pune",
    outreachMessage: `Hi [Name], I help home furnishing retailers in Pune build loyalty CRM apps — purchase history, re-engagement alerts, referral tracking. If your customers buy once and disappear, I have the solution. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across HomeZone Store on LinkedIn — impressive work in the retail space.

Retail stores in Pune are spending on footfall but have no way to track who bought what, send re-purchase reminders, or run a digital loyalty program.

Specifically for businesses like yours I often see three things:
1. Home furnishing customers visit once and never come back
2. No CRM to track which customer bought what — upsell is impossible
3. Interior design referrals from customers are not tracked or rewarded

We've built a CRM + loyalty app that turns one-time buyers into repeat customers — specifically for retail businesses your size in Pune.

Home furnishing retailers building a loyalty CRM see 3x higher lifetime customer value — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-8",
    companyName: "SpiceBox Grocery",
    city: "Navi Mumbai, Kharghar",
    industry: "Retail",
    website: "spicebox.in",
    employees: "2-8",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 86,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Regular grocery customers ordering via WhatsApp — manual order entry daily",
    painPoint2: "No recurring order feature — customers reorder the same list every week",
    painPoint3: "Delivery time slot booking over phone — inefficient routing",
    intentLevel: "HIGH",
    buyingTrigger: "Neighbourhood grocery stores with 200+ WhatsApp orders daily need an app",
    action: "LinkedIn — search SpiceBox Grocery Navi Mumbai",
    outreachMessage: `Hi [Name], I build grocery CRM apps for neighbourhood stores in Navi Mumbai — WhatsApp order automation, recurring order lists, delivery slot booking. 200+ orders daily on WhatsApp? Let me automate that. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across SpiceBox Grocery on LinkedIn — impressive work in the retail space.

Retail stores in Navi Mumbai are spending on footfall but have no way to track who bought what, send re-purchase reminders, or run a digital loyalty program.

Specifically for businesses like yours I often see three things:
1. Regular grocery customers ordering via WhatsApp — manual order entry daily
2. No recurring order feature — customers reorder the same list every week
3. Delivery time slot booking over phone — inefficient routing

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for retail businesses your size in Navi Mumbai.

Neighbourhood grocery stores with 200+ WhatsApp orders daily need an app — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-9",
    companyName: "JewelNest Jewellers",
    city: "Mumbai, Dadar",
    industry: "Retail / Fashion",
    website: "jewelnest.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 81,
    score: 7,
    category: "NURTURE",
    painPoint1: "Jewellery repair and customization order tracking fully manual",
    painPoint2: "Customer purchase history not maintained — no anniversary/birthday marketing",
    painPoint3: "No digital catalogue — customers ask for WhatsApp photos",
    intentLevel: "MEDIUM",
    buyingTrigger: "Jewellery retailers building a CRM + app ahead of wedding season capture 3x more referrals",
    action: "Instagram DM — @jewelnest.jewels",
    outreachMessage: `Hi! JewelNest's jewellery looks beautiful — I saw you on Instagram. I build CRM apps for jewellers in Mumbai — digital catalogue, repair tracking, anniversary reminders, and referral rewards. Wedding season is perfect timing. Demo?`,
    get salesScript() { return `Hi, I saw JewelNest Jewellers on Instagram — love what you're building in retail / fashion.

Fashion retailers in Mumbai are running on Instagram DMs and no CRM — new collection launches go to everyone instead of the right customer segment.

Specifically for businesses like yours I often see three things:
1. Jewellery repair and customization order tracking fully manual
2. Customer purchase history not maintained — no anniversary/birthday marketing
3. No digital catalogue — customers ask for WhatsApp photos

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for retail / fashion businesses your size in Mumbai.

Jewellery retailers building a CRM + app ahead of wedding season capture 3x more referrals — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "RT-10",
    companyName: "BookNest Bookstore",
    city: "Pune, Koregaon Park",
    industry: "Retail",
    website: "booknest.in",
    employees: "2-8",
    serviceFit: "CRM + Loyalty App",
    qualification: "WARM",
    confidencePct: 79,
    score: 7,
    category: "NURTURE",
    painPoint1: "Book recommendations given in person — no digital personalization",
    painPoint2: "No loyalty system — regular readers have no reason to choose you over Amazon",
    painPoint3: "Author events and reading circles promoted only via Instagram — poor attendance",
    intentLevel: "MEDIUM",
    buyingTrigger: "Indie bookstores building a reader loyalty app retain customers that Amazon can't",
    action: "Instagram DM — @booknest.pune",
    outreachMessage: `Hi! BookNest looks like a true reader's paradise — I saw you on Instagram. I build loyalty apps for indie bookstores in Pune — personalized recommendations, reader rewards, event registration. Amazon can't replicate community. Demo?`,
    get salesScript() { return `Hi, I saw BookNest Bookstore on Instagram — love what you're building in retail.

Retail stores in Pune are spending on footfall but have no way to track who bought what, send re-purchase reminders, or run a digital loyalty program.

Specifically for businesses like yours I often see three things:
1. Book recommendations given in person — no digital personalization
2. No loyalty system — regular readers have no reason to choose you over Amazon
3. Author events and reading circles promoted only via Instagram — poor attendance

We've built a CRM + loyalty app that turns one-time buyers into repeat customers — specifically for retail businesses your size in Pune.

Indie bookstores building a reader loyalty app retain customers that Amazon can't — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ID-5",
    companyName: "SpaceStudio Interiors",
    city: "Mumbai, Bandra",
    industry: "Interior Design",
    website: "spacestudio.in",
    employees: "3-10",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 89,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Design mood boards and progress photos shared via WhatsApp and Google Drive",
    painPoint2: "Client approval for materials and finishes tracked in email threads",
    painPoint3: "No project timeline portal — clients call for every update",
    intentLevel: "HIGH",
    buyingTrigger: "Interior design firms that launch a client portal win more ₹50L+ projects from corporates",
    action: "Instagram DM — @spacestudio.interiors",
    outreachMessage: `Hi! SpaceStudio's work is stunning — I saw it on Instagram. I build CRM + client portals for interior designers in Mumbai — mood boards, material approvals, project timelines, all in one place. Clients love it. Quick 10-min demo?`,
    get salesScript() { return `Hi, I saw SpaceStudio Interiors on Instagram — love what you're building in interior design.

Interior design firms in Mumbai are losing projects at the proposal stage because there's no professional follow-up system, client portal, or project timeline tool.

Specifically for businesses like yours I often see three things:
1. Design mood boards and progress photos shared via WhatsApp and Google Drive
2. Client approval for materials and finishes tracked in email threads
3. No project timeline portal — clients call for every update

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for interior design businesses your size in Mumbai.

Interior design firms that launch a client portal win more ₹50L+ projects from corporates — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ID-6",
    companyName: "DesignVerse Studio",
    city: "Pune, Koregaon Park",
    industry: "Interior Design",
    website: "designverse.in",
    employees: "2-8",
    serviceFit: "CRM + Project Management",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Multiple ongoing projects with no centralized task management",
    painPoint2: "Contractor coordination over WhatsApp — delays not tracked",
    painPoint3: "No client-facing progress view — trust breaks down mid-project",
    intentLevel: "HIGH",
    buyingTrigger: "Interior designers managing 5+ simultaneous projects without a CRM lose clients at the halfway mark",
    action: "Instagram DM — @designverse.studio",
    outreachMessage: `Hi! DesignVerse's portfolio is incredible — I follow you on Instagram. I build CRM + project management tools for interior designers in Pune — contractor tracking, client progress portal, task management. 5+ projects at once? Let me help. Demo?`,
    get salesScript() { return `Hi, I saw DesignVerse Studio on Instagram — love what you're building in interior design.

Interior design firms in Pune are losing projects at the proposal stage because there's no professional follow-up system, client portal, or project timeline tool.

Specifically for businesses like yours I often see three things:
1. Multiple ongoing projects with no centralized task management
2. Contractor coordination over WhatsApp — delays not tracked
3. No client-facing progress view — trust breaks down mid-project

We've built a CRM + project management platform so clients and your team stay aligned — specifically for interior design businesses your size in Pune.

Interior designers managing 5+ simultaneous projects without a CRM lose clients at the halfway mark — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ID-7",
    companyName: "HavenCraft Design",
    city: "Mumbai, Powai",
    industry: "Interior Design",
    website: "havencraft.in",
    employees: "3-10",
    serviceFit: "CRM + Quote Management",
    qualification: "WARM",
    confidencePct: 83,
    score: 7,
    category: "NURTURE",
    painPoint1: "Interior design quotes prepared in Word and shared over email — slow process",
    painPoint2: "No follow-up system for leads who said they'll think about it",
    painPoint3: "Referrals from happy clients are not tracked or incentivized",
    intentLevel: "MEDIUM",
    buyingTrigger: "Interior design firms closing less than 30% of their estimates need a CRM + quote system",
    action: "LinkedIn — search HavenCraft Design Mumbai",
    outreachMessage: `Hi [Name], I build CRM + quote systems for interior designers in Mumbai — fast proposals, automated follow-ups, and referral tracking. If you're closing less than 30% of estimates, your follow-up system needs fixing. 15 mins?`,
    get salesScript() { return `Hi [Name], I came across HavenCraft Design on LinkedIn — impressive work in the interior design space.

Interior design firms in Mumbai are losing projects at the proposal stage because there's no professional follow-up system, client portal, or project timeline tool.

Specifically for businesses like yours I often see three things:
1. Interior design quotes prepared in Word and shared over email — slow process
2. No follow-up system for leads who said they'll think about it
3. Referrals from happy clients are not tracked or incentivized

We've built a CRM + quote management system that turns proposals into signed contracts faster — specifically for interior design businesses your size in Mumbai.

Interior design firms closing less than 30% of their estimates need a CRM + quote system — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ID-8",
    companyName: "ArtBox Interiors",
    city: "Navi Mumbai, Vashi",
    industry: "Interior Design",
    website: "artbox.in",
    employees: "2-8",
    serviceFit: "CRM + Client Portal",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "3D renders and design files sent over Google Drive — version confusion",
    painPoint2: "Payment milestone tracking done in a personal Excel file",
    painPoint3: "Post-project handover has no digital documentation — snag disputes common",
    intentLevel: "MEDIUM",
    buyingTrigger: "Interior designers adding a client portal see 60% fewer mid-project disputes",
    action: "Instagram DM — @artbox.interiors",
    outreachMessage: `Hi! ArtBox Interiors has a beautiful aesthetic — I saw you on Instagram. I build client portals for interior designers in Navi Mumbai — 3D render sharing, payment milestones, digital handover. Fewer disputes, happier clients. Demo?`,
    get salesScript() { return `Hi, I saw ArtBox Interiors on Instagram — love what you're building in interior design.

Interior design firms in Navi Mumbai are losing projects at the proposal stage because there's no professional follow-up system, client portal, or project timeline tool.

Specifically for businesses like yours I often see three things:
1. 3D renders and design files sent over Google Drive — version confusion
2. Payment milestone tracking done in a personal Excel file
3. Post-project handover has no digital documentation — snag disputes common

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for interior design businesses your size in Navi Mumbai.

Interior designers adding a client portal see 60% fewer mid-project disputes — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "ID-9",
    companyName: "BlueprintHomes",
    city: "Pune, Baner",
    industry: "Interior Design",
    website: "blueprinthomes.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 86,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "New construction interior leads come from Magicbricks but are not tracked",
    painPoint2: "Site measurement and layout data shared in WhatsApp images — no structured storage",
    painPoint3: "Vendor (furniture, tiles, lighting) contacts not centralized — delays pile up",
    intentLevel: "HIGH",
    buyingTrigger: "Interior firms working on new construction projects in Pune Baner have a 6-month window to dominate the market",
    action: "LinkedIn — search BlueprintHomes Pune",
    outreachMessage: `Hi [Name], I build CRM + apps for interior design firms in Pune targeting new construction buyers — lead tracking from portals, vendor management, site notes app. Baner construction market is booming — are you capturing every lead? 15 mins.`,
    get salesScript() { return `Hi [Name], I came across BlueprintHomes on LinkedIn — impressive work in the interior design space.

Interior design firms in Pune are losing projects at the proposal stage because there's no professional follow-up system, client portal, or project timeline tool.

Specifically for businesses like yours I often see three things:
1. New construction interior leads come from Magicbricks but are not tracked
2. Site measurement and layout data shared in WhatsApp images — no structured storage
3. Vendor (furniture, tiles, lighting) contacts not centralized — delays pile up

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for interior design businesses your size in Pune.

Interior firms working on new construction projects in Pune Baner have a 6-month window to dominate the market — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-6",
    companyName: "SwiftHaul Logistics",
    city: "Navi Mumbai, Turbhe",
    industry: "Logistics",
    website: "swifthaul.in",
    employees: "5-15",
    serviceFit: "CRM + Shipment Tracking",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Clients call and WhatsApp every day asking for shipment status",
    painPoint2: "Delivery exceptions (delays, damage) reported manually — client informed last",
    painPoint3: "No CRM for B2B client account management — relationships managed in Gmail",
    intentLevel: "HIGH",
    buyingTrigger: "Logistics companies without a shipment tracking CRM lose their biggest accounts to competitors who offer visibility",
    action: "LinkedIn — search SwiftHaul Logistics Navi Mumbai",
    outreachMessage: `Hi [Name], I build shipment tracking CRM systems for logistics companies in Navi Mumbai — real-time client visibility, exception alerts, account management. If clients are calling for status updates, I can automate that. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across SwiftHaul Logistics on LinkedIn — impressive work in the logistics space.

Logistics companies in Navi Mumbai are managing 100+ daily shipments on Excel and WhatsApp — clients have no visibility, and delays aren't flagged in time.

Specifically for businesses like yours I often see three things:
1. Clients call and WhatsApp every day asking for shipment status
2. Delivery exceptions (delays, damage) reported manually — client informed last
3. No CRM for B2B client account management — relationships managed in Gmail

We've built a CRM + shipment tracking system so clients always know where their order is — specifically for logistics businesses your size in Navi Mumbai.

Logistics companies without a shipment tracking CRM lose their biggest accounts to competitors who offer visibility — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-7",
    companyName: "CargoLink Express",
    city: "Mumbai, Andheri",
    industry: "Logistics",
    website: "cargolink.in",
    employees: "5-15",
    serviceFit: "CRM + Shipment Tracking",
    qualification: "HOT",
    confidencePct: 88,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "E-commerce client shipment data in 3 different courier portals — no unified view",
    painPoint2: "COD remittance tracking done manually — disputes with e-commerce clients weekly",
    painPoint3: "No automated SLA breach alerts — clients find out before you do",
    intentLevel: "HIGH",
    buyingTrigger: "Third-party logistics for e-commerce needs real-time SLA tracking before scaling past 500 shipments/day",
    action: "LinkedIn — search CargoLink Express Mumbai",
    outreachMessage: `Hi [Name], I build unified shipment tracking CRM systems for 3PL companies in Mumbai — multi-courier dashboard, COD tracking, automated SLA alerts. If your e-commerce clients are finding out about delays before you do, let's fix that. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across CargoLink Express on LinkedIn — impressive work in the logistics space.

Logistics companies in Mumbai are managing 100+ daily shipments on Excel and WhatsApp — clients have no visibility, and delays aren't flagged in time.

Specifically for businesses like yours I often see three things:
1. E-commerce client shipment data in 3 different courier portals — no unified view
2. COD remittance tracking done manually — disputes with e-commerce clients weekly
3. No automated SLA breach alerts — clients find out before you do

We've built a CRM + shipment tracking system so clients always know where their order is — specifically for logistics businesses your size in Mumbai.

Third-party logistics for e-commerce needs real-time SLA tracking before scaling past 500 shipments/day — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-8",
    companyName: "MovEasy Packers",
    city: "Pune, Hadapsar",
    industry: "Logistics",
    website: "moveasy.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 82,
    score: 7,
    category: "NURTURE",
    painPoint1: "Home shifting quotes prepared over phone — no digital estimation tool",
    painPoint2: "Packing crew scheduling managed in WhatsApp — no structured dispatch",
    painPoint3: "Post-move feedback never collected — no referral or review strategy",
    intentLevel: "MEDIUM",
    buyingTrigger: "Home relocation companies digitizing their booking and dispatch process see 50% more referrals",
    action: "LinkedIn — search MovEasy Packers Pune",
    outreachMessage: `Hi [Name], I build CRM apps for packers and movers in Pune — digital quotation, crew dispatch scheduling, and post-move review automation. Companies with a booking app get 50% more referrals. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across MovEasy Packers on LinkedIn — impressive work in the logistics space.

Logistics companies in Pune are managing 100+ daily shipments on Excel and WhatsApp — clients have no visibility, and delays aren't flagged in time.

Specifically for businesses like yours I often see three things:
1. Home shifting quotes prepared over phone — no digital estimation tool
2. Packing crew scheduling managed in WhatsApp — no structured dispatch
3. Post-move feedback never collected — no referral or review strategy

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for logistics businesses your size in Pune.

Home relocation companies digitizing their booking and dispatch process see 50% more referrals — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-9",
    companyName: "FreshRoute Cold Chain",
    city: "Mumbai, Borivali",
    industry: "Logistics",
    website: "freshroute.in",
    employees: "5-15",
    serviceFit: "CRM + Shipment Tracking",
    qualification: "HOT",
    confidencePct: 87,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Temperature-sensitive delivery status shared via driver WhatsApp — no system",
    painPoint2: "Client SLAs for cold chain breach not monitored in real time",
    painPoint3: "No CRM to manage pharmaceutical and FMCG client accounts",
    intentLevel: "HIGH",
    buyingTrigger: "Cold chain logistics companies face regulatory pressure to track and document temperature compliance",
    action: "LinkedIn — search FreshRoute Cold Chain Mumbai",
    outreachMessage: `Hi [Name], I build CRM + tracking systems for cold chain logistics companies in Mumbai — real-time shipment status, temperature compliance logs, client SLA alerts. Regulatory requirements are tightening — get ahead of it. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across FreshRoute Cold Chain on LinkedIn — impressive work in the logistics space.

Logistics companies in Mumbai are managing 100+ daily shipments on Excel and WhatsApp — clients have no visibility, and delays aren't flagged in time.

Specifically for businesses like yours I often see three things:
1. Temperature-sensitive delivery status shared via driver WhatsApp — no system
2. Client SLAs for cold chain breach not monitored in real time
3. No CRM to manage pharmaceutical and FMCG client accounts

We've built a CRM + shipment tracking system so clients always know where their order is — specifically for logistics businesses your size in Mumbai.

Cold chain logistics companies face regulatory pressure to track and document temperature compliance — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "LG-10",
    companyName: "LastMilePlus",
    city: "Navi Mumbai, Vashi",
    industry: "Logistics",
    website: "lastmileplus.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 81,
    score: 7,
    category: "NURTURE",
    painPoint1: "Hyperlocal delivery for D2C brands managed with delivery boys on personal WhatsApp",
    painPoint2: "Proof of delivery (POD) photos shared informally — disputes with clients",
    painPoint3: "No route optimization — delivery boys take longest paths, increasing fuel cost",
    intentLevel: "MEDIUM",
    buyingTrigger: "Hyperlocal delivery startups scaling to 1000+ deliveries/day need a proper dispatch app",
    action: "LinkedIn — search LastMilePlus Navi Mumbai",
    outreachMessage: `Hi [Name], I build delivery CRM apps for hyperlocal logistics companies in Navi Mumbai — automated dispatch, route optimization, POD capture. Scaling to 1000 deliveries/day on WhatsApp? Let me show you a better way. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across LastMilePlus on LinkedIn — impressive work in the logistics space.

Logistics companies in Navi Mumbai are managing 100+ daily shipments on Excel and WhatsApp — clients have no visibility, and delays aren't flagged in time.

Specifically for businesses like yours I often see three things:
1. Hyperlocal delivery for D2C brands managed with delivery boys on personal WhatsApp
2. Proof of delivery (POD) photos shared informally — disputes with clients
3. No route optimization — delivery boys take longest paths, increasing fuel cost

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for logistics businesses your size in Navi Mumbai.

Hyperlocal delivery startups scaling to 1000+ deliveries/day need a proper dispatch app — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "CO-1",
    companyName: "StratEdge Consultants",
    city: "Mumbai, Lower Parel",
    industry: "Consulting",
    website: "stratedge.in",
    employees: "3-10",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 88,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Consulting deliverables (reports, decks) shared over Google Drive — no branded experience",
    painPoint2: "No client portal to track project milestones, status, and timelines",
    painPoint3: "Repeat engagement from clients low because there's no structured follow-up",
    intentLevel: "HIGH",
    buyingTrigger: "Management consultants without a client portal lose retainer clients to larger firms with better UX",
    action: "LinkedIn — search StratEdge Consultants Mumbai",
    outreachMessage: `Hi [Name], I build CRM + client portals for management consultants in Mumbai — project milestone tracking, deliverable sharing, automated follow-ups. Consultants with a portal retain clients 2x longer. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across StratEdge Consultants on LinkedIn — impressive work in the consulting space.

Consulting firms in Mumbai are winning projects but losing repeat business — no CRM, no follow-up cadence, no client satisfaction tracking.

Specifically for businesses like yours I often see three things:
1. Consulting deliverables (reports, decks) shared over Google Drive — no branded experience
2. No client portal to track project milestones, status, and timelines
3. Repeat engagement from clients low because there's no structured follow-up

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for consulting businesses your size in Mumbai.

Management consultants without a client portal lose retainer clients to larger firms with better UX — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "CO-2",
    companyName: "GrowthLabs Advisory",
    city: "Pune, Baner",
    industry: "Consulting",
    website: "growthlabs.in",
    employees: "2-8",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 86,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Startup advisory clients have no portal to track KPIs and OKRs",
    painPoint2: "Investor deck iterations shared over 15 email chains — version chaos",
    painPoint3: "No CRM to follow up with cold leads from startup events",
    intentLevel: "HIGH",
    buyingTrigger: "Startup advisory firms that build a client portal get featured in investor networks as a premium service",
    action: "LinkedIn — search GrowthLabs Advisory Pune",
    outreachMessage: `Hi [Name], I build CRM + client portals for startup advisors in Pune — KPI tracking, document collaboration, investor deck versioning. Advisory firms with a portal are seen as premium. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across GrowthLabs Advisory on LinkedIn — impressive work in the consulting space.

Consulting firms in Pune are winning projects but losing repeat business — no CRM, no follow-up cadence, no client satisfaction tracking.

Specifically for businesses like yours I often see three things:
1. Startup advisory clients have no portal to track KPIs and OKRs
2. Investor deck iterations shared over 15 email chains — version chaos
3. No CRM to follow up with cold leads from startup events

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for consulting businesses your size in Pune.

Startup advisory firms that build a client portal get featured in investor networks as a premium service — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "CO-3",
    companyName: "ProcessPro Consulting",
    city: "Navi Mumbai, Belapur",
    industry: "Consulting",
    website: "processpro.in",
    employees: "3-10",
    serviceFit: "CRM",
    qualification: "WARM",
    confidencePct: 80,
    score: 7,
    category: "NURTURE",
    painPoint1: "Business process consulting leads managed in personal Gmail and WhatsApp",
    painPoint2: "No pipeline visibility — can't forecast monthly revenue from active projects",
    painPoint3: "Client feedback and NPS collection completely absent — churn is invisible",
    intentLevel: "MEDIUM",
    buyingTrigger: "Process consulting firms without a CRM can't scale beyond 10 concurrent clients without losing quality",
    action: "LinkedIn — search ProcessPro Consulting Navi Mumbai",
    outreachMessage: `Hi [Name], I build CRM systems for process consulting firms in Navi Mumbai — client pipeline, project tracking, revenue forecasting. If you can't see your revenue 3 months out, you need a CRM. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across ProcessPro Consulting on LinkedIn — impressive work in the consulting space.

Consulting firms in Navi Mumbai are winning projects but losing repeat business — no CRM, no follow-up cadence, no client satisfaction tracking.

Specifically for businesses like yours I often see three things:
1. Business process consulting leads managed in personal Gmail and WhatsApp
2. No pipeline visibility — can't forecast monthly revenue from active projects
3. Client feedback and NPS collection completely absent — churn is invisible

We've built a smart CRM that tracks every lead, client, and deal in one dashboard — specifically for consulting businesses your size in Navi Mumbai.

Process consulting firms without a CRM can't scale beyond 10 concurrent clients without losing quality — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "MM-1",
    companyName: "PixelPulse Digital",
    city: "Mumbai, Andheri",
    industry: "Media / Marketing",
    website: "pixelpulse.in",
    employees: "5-15",
    serviceFit: "CRM + Client Portal",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Campaign performance reports built manually in PowerPoint every month",
    painPoint2: "Client approvals for creatives via WhatsApp — confusion on which version is final",
    painPoint3: "Retainer renewal conversations always awkward because there's no visible value delivery",
    intentLevel: "HIGH",
    buyingTrigger: "Digital agencies that launch a client reporting portal reduce churn by 60% in year 1",
    action: "LinkedIn — search PixelPulse Digital Mumbai",
    outreachMessage: `Hi [Name], I build CRM + client portals for digital agencies in Mumbai — live campaign dashboards, creative approvals, automated monthly reports. Agencies with a client portal renew 3x more retainers. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across PixelPulse Digital on LinkedIn — impressive work in the media / marketing space.

Marketing agencies in Mumbai are winning clients but losing them to churn — no client portal, no automated reporting, no renewal reminders.

Specifically for businesses like yours I often see three things:
1. Campaign performance reports built manually in PowerPoint every month
2. Client approvals for creatives via WhatsApp — confusion on which version is final
3. Retainer renewal conversations always awkward because there's no visible value delivery

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for media / marketing businesses your size in Mumbai.

Digital agencies that launch a client reporting portal reduce churn by 60% in year 1 — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "MM-2",
    companyName: "ContentForge Studio",
    city: "Pune, Viman Nagar",
    industry: "Media / Marketing",
    website: "contentforge.in",
    employees: "3-10",
    serviceFit: "CRM + Client Portal",
    qualification: "WARM",
    confidencePct: 83,
    score: 7,
    category: "NURTURE",
    painPoint1: "Content calendar shared over Google Sheets — clients edit without tracking",
    painPoint2: "Video and content deliverables uploaded to Google Drive with confusing folder structures",
    painPoint3: "No system to track content performance and report it to clients",
    intentLevel: "MEDIUM",
    buyingTrigger: "Content studios managing 15+ client brands need a CRM + portal to deliver consistently",
    action: "LinkedIn — search ContentForge Studio Pune",
    outreachMessage: `Hi [Name], I build CRM + client portals for content studios in Pune — content calendars, deliverable tracking, performance reporting. If clients are editing your Google Sheet directly, it's time for a proper system. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across ContentForge Studio on LinkedIn — impressive work in the media / marketing space.

Marketing agencies in Pune are winning clients but losing them to churn — no client portal, no automated reporting, no renewal reminders.

Specifically for businesses like yours I often see three things:
1. Content calendar shared over Google Sheets — clients edit without tracking
2. Video and content deliverables uploaded to Google Drive with confusing folder structures
3. No system to track content performance and report it to clients

We've built a CRM + branded client portal where your clients can log in and see project updates — specifically for media / marketing businesses your size in Pune.

Content studios managing 15+ client brands need a CRM + portal to deliver consistently — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "MM-3",
    companyName: "InfluenceNow Agency",
    city: "Mumbai, Bandra",
    industry: "Media / Marketing",
    website: "influencenow.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 88,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Influencer outreach tracked in Excel — responses and follow-ups missed",
    painPoint2: "Brand brief sharing and influencer contracts managed over email",
    painPoint3: "No platform to track live campaign performance across 50+ influencers",
    intentLevel: "HIGH",
    buyingTrigger: "Influencer marketing agencies managing 50+ creators need a CRM app or they lose brands to agencies that have one",
    action: "LinkedIn — search InfluenceNow Agency Mumbai",
    outreachMessage: `Hi [Name], I build CRM apps for influencer marketing agencies in Mumbai — creator pipeline, contract management, live campaign performance tracking. Brands choose agencies with better reporting. 15-min demo?`,
    get salesScript() { return `Hi [Name], I came across InfluenceNow Agency on LinkedIn — impressive work in the media / marketing space.

Marketing agencies in Mumbai are winning clients but losing them to churn — no client portal, no automated reporting, no renewal reminders.

Specifically for businesses like yours I often see three things:
1. Influencer outreach tracked in Excel — responses and follow-ups missed
2. Brand brief sharing and influencer contracts managed over email
3. No platform to track live campaign performance across 50+ influencers

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for media / marketing businesses your size in Mumbai.

Influencer marketing agencies managing 50+ creators need a CRM app or they lose brands to agencies that have one — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-21",
    companyName: "FreshFarm Basket",
    city: "Pune, Wakad",
    industry: "E-Commerce",
    website: "freshfarmbasket.in",
    employees: "3-10",
    serviceFit: "CRM + App",
    qualification: "HOT",
    confidencePct: 89,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Farm-fresh vegetable orders placed daily on WhatsApp — fulfillment errors",
    painPoint2: "No subscription or weekly plan app for regular customers",
    painPoint3: "Delivery boys have no app — routing is verbal instructions every morning",
    intentLevel: "HIGH",
    buyingTrigger: "Farm-to-home delivery businesses scaling past 300 daily orders need a dedicated app",
    action: "Instagram DM — @freshfarmbasket",
    outreachMessage: `Hi! FreshFarm Basket looks amazing — I saw you on Instagram. I build CRM + apps for farm-to-home delivery businesses in Pune — subscription plans, order management, delivery routing. 300+ daily orders on WhatsApp? Time for an app. Demo?`,
    get salesScript() { return `Hi, I saw FreshFarm Basket on Instagram — love what you're building in e-commerce.

E-commerce brands in Pune are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Farm-fresh vegetable orders placed daily on WhatsApp — fulfillment errors
2. No subscription or weekly plan app for regular customers
3. Delivery boys have no app — routing is verbal instructions every morning

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for e-commerce businesses your size in Pune.

Farm-to-home delivery businesses scaling past 300 daily orders need a dedicated app — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-22",
    companyName: "SportZone D2C",
    city: "Mumbai, Powai",
    industry: "E-Commerce",
    website: "sportzone.in",
    employees: "5-15",
    serviceFit: "SaaS + E-commerce Platform",
    qualification: "HOT",
    confidencePct: 90,
    score: 9,
    category: "HIGH VALUE",
    painPoint1: "Sports equipment D2C brand has no branded platform — selling on Amazon only",
    painPoint2: "No customer data ownership — Amazon controls the relationship",
    painPoint3: "Team sports bulk orders managed over email — no B2B portal",
    intentLevel: "HIGH",
    buyingTrigger: "Sports D2C brands losing 30% margin to Amazon need a full owned platform with B2B capabilities",
    action: "LinkedIn — search SportZone D2C Mumbai",
    outreachMessage: `Hi [Name], I build full D2C SaaS platforms for sports equipment brands in Mumbai — own your customer data, B2B portal for team orders, and marketing automation. You should own your customer relationship, not Amazon. 15 mins.`,
    get salesScript() { return `Hi [Name], I came across SportZone D2C on LinkedIn — impressive work in the e-commerce space.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Sports equipment D2C brand has no branded platform — selling on Amazon only
2. No customer data ownership — Amazon controls the relationship
3. Team sports bulk orders managed over email — no B2B portal

We've built a platform that handles your SaaS + E-commerce Platform needs end-to-end — specifically for e-commerce businesses your size in Mumbai.

Sports D2C brands losing 30% margin to Amazon need a full owned platform with B2B capabilities — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-23",
    companyName: "GiftCurate Gifting",
    city: "Mumbai, Colaba",
    industry: "E-Commerce",
    website: "giftcurate.in",
    employees: "3-10",
    serviceFit: "CRM + WhatsApp Commerce",
    qualification: "WARM",
    confidencePct: 82,
    score: 7,
    category: "NURTURE",
    painPoint1: "Corporate gifting orders managed over email with no tracking portal",
    painPoint2: "Seasonal gifting demand spikes with no automation for order processing",
    painPoint3: "No white-label gifting portal for corporate HR to self-order",
    intentLevel: "MEDIUM",
    buyingTrigger: "Corporate gifting companies without a WhatsApp commerce CRM miss 40% of Diwali season revenue",
    action: "LinkedIn — search GiftCurate Gifting Mumbai",
    outreachMessage: `Hi [Name], I build WhatsApp commerce CRM platforms for corporate gifting companies in Mumbai — bulk order automation, corporate HR portals, seasonal campaign automation. Diwali season is coming — want to be ready? 15 mins.`,
    get salesScript() { return `Hi [Name], I came across GiftCurate Gifting on LinkedIn — impressive work in the e-commerce space.

E-commerce brands in Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Corporate gifting orders managed over email with no tracking portal
2. Seasonal gifting demand spikes with no automation for order processing
3. No white-label gifting portal for corporate HR to self-order

We've built a CRM + WhatsApp commerce system that automates orders, follow-ups, and broadcasts — specifically for e-commerce businesses your size in Mumbai.

Corporate gifting companies without a WhatsApp commerce CRM miss 40% of Diwali season revenue — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-24",
    companyName: "ArtPrint Co",
    city: "Pune, Aundh",
    industry: "E-Commerce",
    website: "artprintco.in",
    employees: "2-8",
    serviceFit: "CRM + App",
    qualification: "WARM",
    confidencePct: 79,
    score: 7,
    category: "NURTURE",
    painPoint1: "Custom print orders (canvas, frames) managed via Instagram DM with no confirmation",
    painPoint2: "Order status updates sent manually after each production stage",
    painPoint3: "No way to preview custom designs before order confirmation — rework is high",
    intentLevel: "MEDIUM",
    buyingTrigger: "Custom print D2C brands launching a design preview app double their conversion rate",
    action: "Instagram DM — @artprintco",
    outreachMessage: `Hi! ArtPrint Co's custom prints are beautiful — I saw them on Instagram. I build CRM apps for custom print brands in Pune — design preview, order tracking, automated production status updates. Demo?`,
    get salesScript() { return `Hi, I saw ArtPrint Co on Instagram — love what you're building in e-commerce.

E-commerce brands in Pune are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Custom print orders (canvas, frames) managed via Instagram DM with no confirmation
2. Order status updates sent manually after each production stage
3. No way to preview custom designs before order confirmation — rework is high

We've built a CRM + custom mobile app your team and clients can use from anywhere — specifically for e-commerce businesses your size in Pune.

Custom print D2C brands launching a design preview app double their conversion rate — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  },
  {
    id: "EC-25",
    companyName: "HerbalRoots Wellness",
    city: "Navi Mumbai, Kharghar",
    industry: "E-Commerce",
    website: "herbalroots.in",
    employees: "2-8",
    serviceFit: "CRM + Loyalty App",
    qualification: "HOT",
    confidencePct: 86,
    score: 8,
    category: "HIGH VALUE",
    painPoint1: "Ayurvedic supplement subscription customers lapse with no win-back",
    painPoint2: "No product recommendation engine based on health goals",
    painPoint3: "Referrals from wellness community not tracked or rewarded",
    intentLevel: "HIGH",
    buyingTrigger: "Herbal wellness D2C brands building loyalty apps in 2025 will dominate the repeat purchase market",
    action: "Instagram DM — @herbalroots.wellness",
    outreachMessage: `Hi! HerbalRoots looks great — I saw you on Instagram. I build loyalty apps for herbal wellness D2C brands in Navi Mumbai — subscription retention, product recommendation, referral rewards. Demo?`,
    get salesScript() { return `Hi, I saw HerbalRoots Wellness on Instagram — love what you're building in e-commerce.

E-commerce brands in Navi Mumbai are losing 60–70% of potential revenue to cart abandonment, zero post-purchase follow-up, and WhatsApp orders tracked manually in Excel.

Specifically for businesses like yours I often see three things:
1. Ayurvedic supplement subscription customers lapse with no win-back
2. No product recommendation engine based on health goals
3. Referrals from wellness community not tracked or rewarded

We've built a CRM + loyalty app that turns one-time buyers into repeat customers — specifically for e-commerce businesses your size in Navi Mumbai.

Herbal wellness D2C brands building loyalty apps in 2025 will dominate the repeat purchase market — that's exactly when businesses like yours see the most ROI from getting this in place. Want me to walk you through how it works in 15 minutes? No pitch, just a quick demo.`; },
    get contact() { return `Research: JustDial / LinkedIn — ${this.companyName}, ${this.city}`; },
  }
];

// Total: 227 leads
