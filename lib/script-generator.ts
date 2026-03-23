import type { Lead } from "@/types";

const SERVICE_PITCH: Record<string, string> = {
  "CRM": "a simple CRM that tracks every lead, follow-up, and client interaction in one place — built for lean teams",
  "CRM + Client Portal": "a CRM with a client-facing portal — your clients see their own status and you stop answering the same status calls every week",
  "CRM + Appointment App": "a CRM with smart appointment booking — auto-sends reminders 24 hrs before and slashes no-shows by 40-60%",
  "CRM + Analytics": "a CRM with built-in analytics — you finally know your conversion rate and exactly where leads are falling off",
  "CRM + Web Platform": "a CRM paired with a lead-capturing website — every digital inquiry lands directly in your pipeline, no copy-pasting from DMs",
  "CRM + Lead Tracker": "a CRM with lead source attribution — you always know which channel gives you the best ROI",
  "CRM + Customer Portal": "a CRM with a customer-facing portal — buyers track their own project or order status without calling you",
  "CRM + Shipment Tracking": "a CRM with a live shipment visibility portal — clients check status themselves and stop flooding your team with calls",
  "CRM + ATS": "a CRM with an Applicant Tracking System — your candidate database is fully searchable and every past placement can be re-engaged",
  "CRM + Loyalty App": "a CRM with a built-in loyalty program — automatically rewards your best customers and turns them into your referral engine",
  "CRM + Renewal Tracker": "a CRM with renewal automation — flags every policy, contract, or subscription due in the next 30-90 days before it slips",
  "CRM + Client Management": "a full client lifecycle platform — from first inquiry to repeat purchase, every interaction tracked in one clean system",
  "CRM + WhatsApp Commerce": "a CRM with WhatsApp Broadcast integration — one click sends a personalized message to your entire customer list",
  "CRM + D2C Platform": "a CRM with a proper D2C storefront — moves your orders off Instagram DMs into a professional buying experience",
  "CRM + D2C Web Platform": "a CRM with a proper online storefront — moves your orders off Instagram DMs into a professional buying experience",
  "CRM + Document Portal": "a CRM with a secure client document vault — clients upload files directly and you stop chasing documents on WhatsApp",
  "CRM + Project Management": "a CRM with project milestone tracking — client conversations, task lists, and deadlines in one shared view",
  "CRM + App": "a CRM with a custom mobile app your clients and team can use from anywhere — no more WhatsApp as your operating system",
  "CRM + Patient App": "a CRM with a patient app — appointment booking, prescription history, follow-up reminders, all in one place",
  "CRM + Student App": "a CRM with a student app — schedules, progress tracking, fee alerts, and parent updates automated",
  "CRM + Member App": "a CRM with a member app — attendance, renewals, progress tracking, and engagement — all off WhatsApp",
  "CRM + Booking App": "a CRM with a real-time booking app — clients self-book, auto-reminders cut no-shows by 40%",
  "CRM + Order Management": "a CRM with unified order management — all channels in one dashboard, returns automated, clients informed",
  "CRM + Delivery App": "a CRM with a delivery tracking app — customers get real-time updates and your drivers get optimized routes",
  "CRM + Tele-consult App": "a CRM with a teleconsult app — secure sessions, prescription history, and follow-up reminders in one platform",
  "CRM + Event App": "a CRM with an event management app — registrations, check-in, attendee engagement, and post-event follow-up",
  "CRM + Inventory App": "a CRM with inventory management — real-time stock levels, reorder triggers, and sales trends in one view",
  "CRM + Quote Management": "a CRM with a quote-to-close system — proposals go out faster, follow-ups are automatic, conversion improves",
  "CRM + Subscription App": "a CRM with subscription management — pauses, upgrades, and cancellation prevention are all automated",
  "Web Platform + CRM": "a web platform with a CRM backend — your listings, leads, and client follow-ups managed in one connected system",
  "SaaS + Client Portal": "a SaaS platform with a dedicated client login — your clients have their own dashboard, you have full visibility",
  "SaaS + Mobile App": "a mobile-first SaaS platform — your entire operation: leads, tasks, client communication, all from a smartphone",
  "SaaS + App": "a lightweight mobile-first SaaS app — built for lean founder-led teams that need to move fast",
  "SaaS + E-commerce Platform": "a full-stack e-commerce SaaS — orders, CRM, loyalty, and marketing automation in one owned platform",
  "SaaS + Parent App": "a SaaS platform with a parent app — live progress, direct messaging, fee payments, and updates in one place",
  "CRM + Platform": "an all-in-one operations platform — pipeline management, client tracking, and performance reporting in one clean dashboard",
};

const IND_FRAME: Record<string, string> = {
  "Real Estate": "I went through {company}'s online presence — listings on MagicBricks, the Instagram page, and the website. Here's the honest gap I see: you're generating interest, but there's no system to follow up at the right time. A {emp}-person team can't manually track 100+ leads. That's not a people problem — it's a systems problem.",
  "Healthcare": "I looked into {company} — checked the Google My Business, the website, and the Instagram. Here's what I found: you're clearly building a strong practice, but patients who don't hear from you proactively don't come back. That's recoverable revenue every single month.",
  "Education": "I researched {company} — went through your website, Instagram, and what past students say about you. The gap is clear: during admission season, you're probably getting 2-3x more enquiries than your team can follow up with manually. The best leads are going cold in 48 hours.",
  "Financial Services": "I looked through {company}'s online profile — LinkedIn, website, Google reviews. Your reputation is solid. But advisory firms at your size face the same challenge: clients who don't hear from you proactively move assets to someone who does.",
  "Food & Beverage": "I went through {company}'s Instagram, Zomato/Swiggy presence, and website. Here's what's interesting: you have a strong product and decent reviews — but zero system to bring satisfied customers back. That's your biggest untapped revenue source.",
  "Fitness": "I checked {company} — Instagram, Google reviews, website. You clearly have a quality product and loyal members. But here's the pattern I see at fitness businesses your size: renewal reminders are manual, member engagement drops after month 3, and re-activation is zero. That's fixable.",
  "Events": "I looked at {company}'s work — Instagram portfolio, LinkedIn, client testimonials. Really impressive. But corporate clients book their event vendors 6-12 months ahead. If you're not in front of them with a follow-up when that window opens, they go with whoever is.",
  "Events / Marketing": "I went through {company}'s portfolio and client presence. Strong creative work — but agencies at this stage lose retainers not because the work is bad, but because the reporting and communication systems make clients feel uninformed.",
  "Media / Marketing": "I researched {company} — LinkedIn presence, website, client case studies. The work is solid. But I notice most agencies your size lose retainer clients not because of results — but because clients don't have real-time visibility into what's happening.",
  "Retail / Fashion": "I went through {company}'s Instagram, website, and customer comments. You have a loyal base. But without a CRM, every sale is a one-time transaction. Your past customers are your easiest next sale — if you have a system to reach them.",
  "Retail": "I looked into {company} — Google My Business, Instagram, website. Good products, decent presence. The gap is loyalty and re-engagement: your best customers are buying somewhere else because you have no automated way to stay in front of them.",
  "HR & Recruitment": "I checked {company}'s LinkedIn and website. Your candidate database and client relationships are your two most valuable assets — but both depreciate fast without a structured system to keep them active and searchable.",
  "Interior Design": "I went through {company}'s portfolio — Instagram, website, Houzz if applicable. Stunning work. But here's the pattern: design firms at your stage get most new projects from referrals, yet have no system to stay warm with past clients after project handover. That's where the referrals stop.",
  "Legal / Compliance": "I researched {company} online. Compliance advisory is a trust-based business — and trust erodes the moment a client has to chase you for an update. A deadline management and proactive communication system isn't optional at scale.",
  "Legal": "I looked at {company}'s online presence. Strong credentials. But legal clients who have to call for status updates eventually find a lawyer who sends the update before they ask. That's the one retention lever most firms ignore.",
  "Consulting": "I went through {company}'s LinkedIn and website. Solid positioning. The biggest deal-killer at this stage isn't the quality of your work — it's the follow-up gap between proposal and decision. Deals go cold in that window.",
  "Logistics": "I looked into {company}'s presence and client reviews. The single most common client complaint in logistics is always the same: 'I don't know where my shipment is.' Giving clients self-serve visibility eliminates 60-70% of inbound calls and the complaints that come with them.",
  "E-Commerce": "I went through {company}'s Instagram, website, and product reviews. You've clearly built a quality D2C brand. But here's the honest gap: 60-70% of people who engage with your content or buy once never come back — not because they didn't like the product, but because there's no automated follow-up pulling them back.",
};

export function generateSalesScript(lead: Omit<Lead, "salesScript" | "contact">): string {
  const { companyName, city, industry, employees, serviceFit, action,
          painPoint1, painPoint2, painPoint3, buyingTrigger } = lead;

  const pitch = SERVICE_PITCH[serviceFit] ??
    "a tailored CRM and automation platform built for small businesses";

  const actLower = action.toLowerCase();
  let greeting: string;
  if (actLower.includes("linkedin")) {
    greeting = `Hi [Name] — I went through ${companyName}'s profile and wanted to reach out directly. I'll keep this short and specific.`;
  } else if (actLower.includes("instagram")) {
    greeting = `Hey — I came across ${companyName} on Instagram, spent some time going through your content and your website. I want to be straight about exactly why I'm reaching out.`;
  } else if (actLower.includes("office visit") || actLower.includes("direct")) {
    greeting = `Thanks for taking a minute. I want to be upfront — I looked into ${companyName} before coming here and I want to show you something specific.`;
  } else if (actLower.includes("whatsapp")) {
    greeting = `Hi! I researched ${companyName} before reaching out — wanted to be specific so I don't waste your time.`;
  } else {
    greeting = `Hi, am I speaking with the owner of ${companyName}? I looked into the business before calling — I want to be specific, so I'll be brief.`;
  }

  const defaultFrame = `I went through ${companyName}'s online presence — here's the specific gap I found for a ${employees}-person ${industry.toLowerCase()} business in ${city}.`;
  const frameTemplate = IND_FRAME[industry] ?? defaultFrame;
  const frame = frameTemplate
    .replace(/\{company\}/g, companyName)
    .replace(/\{city\}/g, city)
    .replace(/\{emp\}/g, employees);

  const diagnosis = `Specifically, here's what I found for ${companyName}:\n  1. ${painPoint1}\n  2. ${painPoint2}\n  3. ${painPoint3}\n\nThese three things together are the exact pattern we solve for ${industry.toLowerCase()} businesses at your stage.`;

  const value = `We build ${pitch}.\n\nFor ${companyName} specifically — ${employees} people, ${city} — full setup takes under a week. We handle the onboarding completely. No tech headache on your side.`;

  const close = `Here's why I'm reaching out now specifically: ${buyingTrigger}.\n\nThat's the exact moment where having this system in place makes the difference between capturing the opportunity and losing it to someone better organised.\n\nCan we do a 15-minute demo this week? Not a presentation — I'll show you the product working for a ${industry.toLowerCase()} business the same size as yours. What day works?`;

  return `${greeting}\n\n${frame}\n\n${diagnosis}\n\n${value}\n\n${close}`;
}
