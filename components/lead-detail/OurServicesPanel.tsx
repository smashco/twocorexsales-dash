"use client";

import type { Lead, PricingRecommendation, ServiceCategory, Industry } from "@/types";
import { CheckCircle2, Zap, Clock, ArrowRight, Target, AlertCircle } from "lucide-react";

interface Props {
  lead: Lead;
  pricing: PricingRecommendation;
}

interface Module {
  icon: string;
  name: string;
  desc: string;
}

// ─── How many modules to show per service category ─────────────────────────────
const CATEGORY_MODULE_COUNT: Record<ServiceCategory, number> = {
  "Basic CRM":      5,
  "Custom App":     6,
  "CRM + Portal":   7,
  "ERP Standard":   8,
  "Enterprise ERP": 10,
};

// ─── Category theme ────────────────────────────────────────────────────────────
const CAT_THEME: Record<ServiceCategory, { color: string; bg: string; border: string; light: string }> = {
  "Basic CRM":      { color: "#374151", bg: "#F9FAFB", border: "#D1D5DB", light: "#F3F4F6" },
  "Custom App":     { color: "#7C3AED", bg: "#FAF5FF", border: "#C4B5FD", light: "#F5F3FF" },
  "CRM + Portal":   { color: "#1D4ED8", bg: "#EFF6FF", border: "#93C5FD", light: "#DBEAFE" },
  "ERP Standard":   { color: "#065F46", bg: "#ECFDF5", border: "#6EE7B7", light: "#D1FAE5" },
  "Enterprise ERP": { color: "#B45309", bg: "#FFFBEB", border: "#FCD34D", light: "#FEF3C7" },
};

// ─── Delivery timeline per category ───────────────────────────────────────────
const CATEGORY_TIMELINE: Record<ServiceCategory, {
  total: string;
  phases: { name: string; weeks: string; items: string[] }[];
}> = {
  "Basic CRM": {
    total: "4–6 weeks",
    phases: [
      { name: "Discovery & Design", weeks: "Week 1–2", items: ["Requirements workshop", "UI/UX wireframes", "Database architecture"] },
      { name: "Development", weeks: "Week 2–4", items: ["CRM core build", "WhatsApp API setup", "Role-based access"] },
      { name: "Testing & Launch", weeks: "Week 5–6", items: ["QA on real devices", "Staff training & onboarding", "Go live + handover"] },
    ],
  },
  "Custom App": {
    total: "6–10 weeks",
    phases: [
      { name: "Discovery & Design", weeks: "Week 1–2", items: ["App requirements mapping", "UI/UX design & prototype", "API architecture"] },
      { name: "Development", weeks: "Week 3–8", items: ["iOS + Android build", "Backend APIs + database", "Admin web panel"] },
      { name: "Testing & Launch", weeks: "Week 9–10", items: ["Device QA testing", "App Store + Play Store submission", "Training & handover"] },
    ],
  },
  "CRM + Portal": {
    total: "8–12 weeks",
    phases: [
      { name: "Discovery & Design", weeks: "Week 1–2", items: ["Process mapping workshop", "UI/UX design", "API integration planning"] },
      { name: "CRM Development", weeks: "Week 3–6", items: ["Pipeline, contacts, tasks", "Automation workflows", "Analytics reporting"] },
      { name: "Portal & Integrations", weeks: "Week 7–10", items: ["Client-facing portal", "3rd-party API integrations", "Role-based access control"] },
      { name: "Testing & Launch", weeks: "Week 11–12", items: ["User acceptance testing", "Staff training", "Go live + monitoring"] },
    ],
  },
  "ERP Standard": {
    total: "12–18 weeks",
    phases: [
      { name: "Discovery & Scoping", weeks: "Week 1–3", items: ["Process audit across departments", "Module scoping", "UI/UX design"] },
      { name: "Core Modules Build", weeks: "Week 4–8", items: ["Operations modules (inventory, billing, procurement)", "HR & payroll", "CRM pipeline"] },
      { name: "Mobile App & Reports", weeks: "Week 9–13", items: ["Android/iOS mobile app", "Analytics dashboard", "Tally/API integrations"] },
      { name: "Testing & Go Live", weeks: "Week 14–18", items: ["Full UAT", "Data migration from Excel/legacy", "Training & launch"] },
    ],
  },
  "Enterprise ERP": {
    total: "16–24 weeks",
    phases: [
      { name: "Discovery & Architecture", weeks: "Week 1–3", items: ["Enterprise process audit", "System architecture design", "UX design sprint"] },
      { name: "Core ERP Modules", weeks: "Week 4–10", items: ["Production, inventory, procurement", "Finance, HR, payroll", "CRM + pipeline"] },
      { name: "Advanced Features", weeks: "Week 11–16", items: ["Client portal", "Mobile apps (iOS + Android)", "AI analytics", "Bank/GST/Tally integrations"] },
      { name: "Enterprise Rollout", weeks: "Week 17–24", items: ["Multi-branch setup", "Legacy data migration", "Team training", "Phased go-live"] },
    ],
  },
};

// ─── Deliverables per category ─────────────────────────────────────────────────
const CATEGORY_DELIVERABLES: Record<ServiceCategory, string[]> = {
  "Basic CRM":      ["CRM web app (mobile-responsive)", "WhatsApp API setup", "Admin panel", "Basic analytics dashboard", "Source code ownership", "3 months free support"],
  "Custom App":     ["iOS App (App Store)", "Android App (Play Store)", "Admin web panel", "REST APIs + backend", "Push notification system", "Source code ownership"],
  "CRM + Portal":   ["CRM web app", "Client-facing portal", "Admin panel", "3rd-party API integrations", "Analytics dashboard", "Source code ownership"],
  "ERP Standard":   ["ERP web application", "Android/iOS mobile app", "All department modules", "Tally/QuickBooks integration", "Training + data migration", "Source code ownership"],
  "Enterprise ERP": ["Full ERP suite", "Mobile apps (iOS + Android)", "Client/partner portal", "All module integrations", "Dedicated account manager", "Source code ownership"],
};

// ─── Industry-specific module lists ────────────────────────────────────────────
const INDUSTRY_MODULES: Partial<Record<string, Module[]>> = {
  "Manufacturing": [
    { icon: "🏭", name: "Production Order Management", desc: "Track work orders, BOM, production stages and completion end-to-end" },
    { icon: "📦", name: "Inventory & Stock Control", desc: "Real-time stock levels, low-stock alerts, multi-warehouse tracking" },
    { icon: "🛒", name: "Raw Material Procurement", desc: "Purchase orders, supplier management, GRN and delivery tracking" },
    { icon: "✅", name: "Quality Control Module", desc: "Inspection checklists, defect logging, QC approvals before dispatch" },
    { icon: "🚚", name: "Dispatch & Delivery Tracking", desc: "Dispatch challan, transporter tracking, proof-of-delivery confirmation" },
    { icon: "👷", name: "Labour & Shift Management", desc: "Attendance, shift scheduling, operator performance reporting" },
    { icon: "🧾", name: "GST Billing & Invoicing", desc: "Auto-generate GST invoices, e-way bills, payment receipts" },
    { icon: "📊", name: "Management Dashboard & MIS", desc: "Plant-level KPIs, production vs target, daily MIS report" },
    { icon: "💰", name: "Cost & Margin Tracking", desc: "Per-unit cost analysis, overhead allocation, profit per order" },
    { icon: "🤝", name: "Vendor/Supplier Portal", desc: "Supplier login to view POs, upload invoices, track payments" },
  ],
  "Logistics": [
    { icon: "📍", name: "Live Shipment Tracking", desc: "Real-time GPS tracking of consignments with customer-facing map" },
    { icon: "🚛", name: "Fleet & Driver Management", desc: "Driver profiles, vehicle assignment, trip logs, licence expiry alerts" },
    { icon: "🏪", name: "Warehouse Management System", desc: "Inbound/outbound, rack management, stock reconciliation" },
    { icon: "👤", name: "Customer Self-Service Portal", desc: "Clients log in to track shipments, raise tickets, download POD" },
    { icon: "📋", name: "Proof of Delivery (POD)", desc: "Digital POD with photo + signature — auto-sent on delivery" },
    { icon: "🧾", name: "Invoice & Payment Tracking", desc: "Auto-generate freight invoices, track receivables, overdue reminders" },
    { icon: "📱", name: "Driver Mobile App", desc: "Android app: accept pickups, update status, capture POD in field" },
    { icon: "📊", name: "Business Analytics Dashboard", desc: "SLA compliance, route performance, revenue by client and route" },
    { icon: "💼", name: "Client CRM & Follow-ups", desc: "Lead pipeline, contract renewals, client communication log" },
    { icon: "🗺️", name: "Route Optimisation Engine", desc: "Suggest optimal routes, reduce fuel cost, cluster deliveries" },
  ],
  "Financial Services": [
    { icon: "👥", name: "Client Portfolio CRM", desc: "All clients, investments, policies and renewals in one dashboard" },
    { icon: "📋", name: "Lead Pipeline & Follow-ups", desc: "Capture leads, set reminders, track every follow-up call" },
    { icon: "📄", name: "Document Collection & KYC", desc: "Digital KYC upload, checklist tracking, status dashboard" },
    { icon: "💰", name: "Investment & Policy Tracker", desc: "Track SIPs, FDs, policies — maturity alerts and renewal reminders" },
    { icon: "🔔", name: "Renewal & Alert Automation", desc: "Auto WhatsApp/email alerts for upcoming renewals, maturity dates" },
    { icon: "📊", name: "Revenue & Commission Reports", desc: "Commission by RM, by product, by client — filterable reports" },
    { icon: "💬", name: "WhatsApp Integration", desc: "Send statements, policy updates, reminders — automated via WhatsApp" },
    { icon: "🔐", name: "Role-Based Access Control", desc: "RM sees only their clients; managers see all — secure access tiers" },
    { icon: "🤳", name: "Client Self-Service Portal", desc: "Clients view portfolio, download statements, raise service requests" },
    { icon: "🧾", name: "GST & Compliance Reports", desc: "Auto-generate compliance summaries, tax reports, audit-ready exports" },
  ],
  "Healthcare": [
    { icon: "🏥", name: "Patient Registration & Records", desc: "Digital OPD registration, patient history, diagnosis records" },
    { icon: "📅", name: "Appointment Scheduling", desc: "Online + walk-in booking, doctor calendar, WhatsApp confirmation" },
    { icon: "👨‍⚕️", name: "Doctor Queue Dashboard", desc: "Live token queue, doctor-wise schedule, waiting time display" },
    { icon: "🧾", name: "Billing & Insurance Claims", desc: "Itemised billing, insurance pre-auth workflow, receipt generation" },
    { icon: "🔬", name: "Lab Reports Management", desc: "Upload lab results, patient access via portal, normal range flags" },
    { icon: "💊", name: "Medicine Inventory", desc: "Pharmacy stock management, expiry alerts, auto-reorder triggers" },
    { icon: "🔔", name: "Patient Follow-up Reminders", desc: "Auto WhatsApp reminders for follow-ups, reports, health campaigns" },
    { icon: "📊", name: "Revenue & OPD Analytics", desc: "Daily patient count, revenue per doctor, monthly occupancy reports" },
    { icon: "🏢", name: "Multi-Branch Dashboard", desc: "Centralised view across all branches and clinics in one login" },
    { icon: "📱", name: "Patient Mobile App", desc: "Book appointments, view reports, get reminders — branded app" },
  ],
  "Education": [
    { icon: "🎓", name: "Student Enrollment & Profiles", desc: "Online admission, student records, guardian details, ID cards" },
    { icon: "📅", name: "Batch & Schedule Management", desc: "Create batches, assign faculty, timetable and room allocation" },
    { icon: "✅", name: "Attendance Tracking", desc: "Daily digital attendance — faculty marks via app, auto-alerts to parents" },
    { icon: "💰", name: "Fee Collection & Receipts", desc: "Online fee payment, due tracking, auto receipts, overdue reminders" },
    { icon: "📚", name: "Course & Content Management", desc: "Upload study material, assignments, quizzes by batch and course" },
    { icon: "📊", name: "Progress Reports & Analytics", desc: "Per-student marks, batch performance, dropout risk alerts" },
    { icon: "🔔", name: "WhatsApp Parent Updates", desc: "Attendance, fee dues, exam dates — automated WhatsApp notifications" },
    { icon: "🏆", name: "Certificate & Assessment Module", desc: "Online tests, auto-grading, generate certificates on completion" },
    { icon: "💼", name: "Lead Inquiry Pipeline", desc: "Track walk-ins, calls, demos — follow up until admission" },
    { icon: "👨‍🏫", name: "Faculty Performance Dashboard", desc: "Attendance, ratings, batch KPIs per trainer/faculty" },
  ],
  "E-Commerce": [
    { icon: "📦", name: "Product Catalog & Inventory", desc: "SKU management, variants, multi-warehouse real-time stock" },
    { icon: "🛒", name: "Order Management System", desc: "Orders from all channels, status tracking, packing workflow" },
    { icon: "👥", name: "Customer CRM & History", desc: "Customer profiles, purchase history, lifetime value, segments" },
    { icon: "💬", name: "WhatsApp Order Notifications", desc: "Auto-send order confirmation, shipping, delivery alerts" },
    { icon: "↩️", name: "Returns & Refunds Management", desc: "Return requests, approval workflow, refund or credit note" },
    { icon: "🤝", name: "Supplier & Vendor Management", desc: "Vendor POs, delivery tracking, quality rating, payment log" },
    { icon: "🏷️", name: "Discount & Promotion Engine", desc: "Coupon codes, flash sales, tier pricing, loyalty points" },
    { icon: "🚚", name: "Delivery & Logistics Integration", desc: "Shiprocket/Delhivery sync, AWB tracking, NDR management" },
    { icon: "📊", name: "Revenue & Sales Analytics", desc: "Best sellers, revenue by SKU, channel-wise performance, margins" },
    { icon: "🏪", name: "Multi-Platform Sync", desc: "Sync inventory + orders across website, app, WhatsApp, Instagram" },
  ],
  "Construction": [
    { icon: "🏗️", name: "Project Management Dashboard", desc: "All projects, milestones, deadlines — one command view" },
    { icon: "📸", name: "Site Progress Tracking", desc: "Daily site photos, % completion by milestone, supervisor notes" },
    { icon: "🧱", name: "Material Procurement & Tracking", desc: "Purchase orders, delivery confirmation, material reconciliation" },
    { icon: "👷", name: "Labour & Contractor Management", desc: "Daily headcount, contractor billing, safety compliance" },
    { icon: "👤", name: "Client Portal (Live Updates)", desc: "Clients see site progress, approve milestones, view photos" },
    { icon: "💰", name: "Budget vs Actual Tracker", desc: "Track spend per project, cost variance alerts, P&L view" },
    { icon: "📁", name: "Document & Drawing Repository", desc: "Drawings, approvals, contracts, inspection docs — all organised" },
    { icon: "🧾", name: "Invoice & Billing Module", desc: "Progress-linked invoicing, retention tracking, payment schedule" },
    { icon: "📱", name: "Site Engineer Mobile App", desc: "Field app: photo uploads, task updates, daily reports offline" },
    { icon: "📊", name: "Multi-Project Analytics", desc: "Revenue, margin, and progress across all active projects" },
  ],
  "Hospitality": [
    { icon: "🛏️", name: "Room Booking & Reservation", desc: "Front desk + online booking, room allocation, check-in/out" },
    { icon: "👤", name: "Guest Profile & History", desc: "Guest preferences, stay history, birthday/anniversary tracking" },
    { icon: "🍽️", name: "Restaurant & F&B POS", desc: "Table orders, KOT, billing, inventory auto-deduction" },
    { icon: "🛎️", name: "Housekeeping Management", desc: "Room status, task assignment, inspection checklist, turnaround" },
    { icon: "🎉", name: "Event & Banquet Booking", desc: "Hall bookings, menus, AV setup, client portal, payment tracking" },
    { icon: "💰", name: "Revenue & Occupancy Reports", desc: "Daily revenue, ADR, occupancy rate, RevPAR by room type" },
    { icon: "🌐", name: "OTA Channel Integration", desc: "Sync with MakeMyTrip, Booking.com, Airbnb — no double booking" },
    { icon: "💬", name: "Guest WhatsApp Communication", desc: "Auto check-in reminders, booking confirmation, review requests" },
    { icon: "👩‍💼", name: "Staff Attendance & Payroll", desc: "Shift scheduling, attendance, overtime, payslip generation" },
    { icon: "📊", name: "Management KPI Dashboard", desc: "Occupancy, revenue, complaints, ratings — live central view" },
  ],
  "Travel & Tourism": [
    { icon: "🌍", name: "Tour Package Management", desc: "Create, price and manage packages — custom and fixed departures" },
    { icon: "📋", name: "Booking & Itinerary Builder", desc: "Day-by-day itinerary, supplier booking, confirmation tracking" },
    { icon: "👥", name: "Customer CRM & Follow-ups", desc: "Inquiry to booking pipeline, travel history, birthday reminders" },
    { icon: "🤝", name: "Supplier & Hotel Booking", desc: "Vendor agreements, availability calendar, cost tracking" },
    { icon: "📄", name: "Document Management", desc: "Visa checklists, passport copies, hotel vouchers — organised" },
    { icon: "💰", name: "Payment & Commission Tracker", desc: "Client payment schedules, agent commissions, profit per booking" },
    { icon: "💬", name: "WhatsApp Booking Updates", desc: "Itinerary PDFs, visa updates, check-in reminders via WhatsApp" },
    { icon: "🏢", name: "Agent/Franchise Portal", desc: "Sub-agents log in to create bookings, earn and track commissions" },
    { icon: "📊", name: "Revenue Analytics Reports", desc: "Revenue by destination, agent, season — monthly view" },
    { icon: "📱", name: "Traveller Mobile App", desc: "Branded app: itinerary, destination info, travel alerts, SOS" },
  ],
  "Events / Marketing": [
    { icon: "📋", name: "Event CRM & Lead Pipeline", desc: "Track inquiries → proposal → booking funnel for every event" },
    { icon: "🤝", name: "Vendor & Venue Management", desc: "Vendor database, quote comparison, contract storage, payment log" },
    { icon: "💰", name: "Budget & P&L Tracker", desc: "Per-event budget, actual vs estimate, profitability dashboard" },
    { icon: "✅", name: "Team Task Coordination", desc: "Assign tasks per event, set deadlines, track to completion" },
    { icon: "👤", name: "Client Portal (Event Status)", desc: "Clients view progress, approve proposals, track payments" },
    { icon: "🧾", name: "Quotation & Invoice Builder", desc: "Generate branded quotes, convert to invoice on client approval" },
    { icon: "📸", name: "Photo & Creative Asset Library", desc: "Organise event photos, videos, branding assets by client/event" },
    { icon: "💬", name: "WhatsApp Client Updates", desc: "Event reminders, approvals, post-event thank-you messages" },
    { icon: "📊", name: "Revenue & Booking Analytics", desc: "Revenue by event type, client LTV, conversion rate reports" },
    { icon: "📣", name: "Campaign Performance Tracker", desc: "Ad spend, leads, cost per lead across Meta, Google, Instagram" },
  ],
  "Pharmaceutical": [
    { icon: "💊", name: "Product & Batch Management", desc: "SKU-wise inventory, batch numbers, expiry tracking, FIFO alerts" },
    { icon: "📦", name: "Distribution & Stock Management", desc: "Distributor-wise stock, secondary sales, indent management" },
    { icon: "📋", name: "Regulatory & Compliance Docs", desc: "Licence expiry alerts, batch test certificates, audit-ready docs" },
    { icon: "👤", name: "MR Field Force Tracking", desc: "Medical rep call reports, doctor visit logs, target vs achievement" },
    { icon: "🏥", name: "Doctor & Chemist CRM", desc: "Doctor profiles, prescription data, chemist relationships, sampling" },
    { icon: "⚠️", name: "Expiry & Recall Management", desc: "Auto-alerts for near-expiry stock, batch recall workflow" },
    { icon: "🛒", name: "Purchase Order Management", desc: "PO to supplier, receipt confirmation, GRN, quality check" },
    { icon: "🧾", name: "GST Invoicing & Reports", desc: "GST-compliant invoices, HSN-wise summary, e-way bill generation" },
    { icon: "🗺️", name: "Territory & Area Dashboard", desc: "Sales by zone/territory, target vs achievement heat map" },
    { icon: "📱", name: "MR Mobile App", desc: "Field app for visit reporting, order taking, call notes offline" },
  ],
  "Consulting": [
    { icon: "📋", name: "Client Project Management", desc: "Active engagements, deliverables, deadlines — all in one view" },
    { icon: "⏱️", name: "Time Tracking & Billing", desc: "Log hours per client, auto-generate invoices, track receivables" },
    { icon: "📁", name: "Document & SOP Repository", desc: "Organised docs by client/project — searchable, version-controlled" },
    { icon: "✅", name: "Team Task & Workflow", desc: "Assign tasks, track status, flag blockers, daily standup view" },
    { icon: "👤", name: "Client Portal (Status Updates)", desc: "Clients view progress, approve deliverables, download reports" },
    { icon: "🔔", name: "Compliance Calendar & Alerts", desc: "Due dates for filings, renewals, statutory obligations — auto-alerts" },
    { icon: "💼", name: "Lead Pipeline & Proposals", desc: "Track prospects, send branded proposals, follow up till close" },
    { icon: "🧾", name: "Invoice & Payment Management", desc: "Milestone-linked invoicing, payment reminders, receivable tracking" },
    { icon: "📊", name: "Revenue & Utilisation Reports", desc: "Revenue per client, consultant utilisation, monthly P&L view" },
    { icon: "💬", name: "WhatsApp Client Integration", desc: "Compliance reminders, document requests, status updates via WhatsApp" },
  ],
  "Interior Design": [
    { icon: "🏠", name: "Project & Client Management", desc: "Active projects, client details, scope, timeline — one dashboard" },
    { icon: "🪑", name: "Material & Vendor Catalogue", desc: "Product catalogue with pricing, vendor comparison, order tracking" },
    { icon: "📸", name: "Site Progress Photo Tracker", desc: "Daily site photos by milestone, before/after comparison view" },
    { icon: "💰", name: "Budget vs Actual Tracker", desc: "Per-room budget, actual spend, variance alerts, shared client view" },
    { icon: "👤", name: "Client Approval Portal", desc: "Clients approve designs, materials and quotes — digital sign-off" },
    { icon: "📋", name: "Quotation & Estimation Tool", desc: "Auto-generate itemised quotes with material + labour breakdown" },
    { icon: "👷", name: "Contractor Coordination", desc: "Assign work to contractors, track completion, daily updates" },
    { icon: "🧾", name: "Invoice & Payment Management", desc: "Progress-linked invoices, payment schedule, overdue reminders" },
    { icon: "🖼️", name: "Design Gallery Module", desc: "Before/after gallery per project — shareable with prospects" },
    { icon: "💬", name: "WhatsApp Client Updates", desc: "Site photos, approvals, updates delivered directly via WhatsApp" },
  ],
  "HR & Recruitment": [
    { icon: "📋", name: "Job Posting & ATS", desc: "Post jobs, collect applications, filter and shortlist candidates" },
    { icon: "🗃️", name: "Resume Database & Search", desc: "Searchable candidate database with skills, experience, tag filters" },
    { icon: "📅", name: "Interview Scheduling System", desc: "Coordinate interviews, send invites, log feedback, status tracking" },
    { icon: "🏢", name: "Client (Employer) CRM", desc: "Requirements from employers, SLA tracking, billing management" },
    { icon: "💰", name: "Placement & Revenue Tracking", desc: "Placements made, invoice per hire, revenue per client/consultant" },
    { icon: "👤", name: "Candidate Pipeline", desc: "Track candidates through stages — applied → interview → offer → joined" },
    { icon: "📁", name: "Onboarding Document Management", desc: "Collect offer letters, agreements, background check docs digitally" },
    { icon: "🧾", name: "Payroll & Compliance Reports", desc: "Payslips, PF/ESIC calculations, TDS summaries, compliance exports" },
    { icon: "📊", name: "Recruitment Analytics", desc: "Time-to-hire, source-of-hire, conversion rates, consultant KPIs" },
    { icon: "💬", name: "WhatsApp Candidate Comm", desc: "Interview reminders, offer letters, joining instructions via WhatsApp" },
  ],
  "Automotive": [
    { icon: "🚗", name: "Vehicle Inventory Management", desc: "Showroom inventory, specs, availability, booking hold status" },
    { icon: "🔧", name: "Service & Repair Orders", desc: "Job cards, repair estimates, parts required, technician assignment" },
    { icon: "👥", name: "Customer History & CRM", desc: "All customers, vehicles, service history, upcoming service alerts" },
    { icon: "🔩", name: "Parts Inventory & Procurement", desc: "Spare parts stock, reorder triggers, supplier management" },
    { icon: "👷", name: "Technician Job Tracking", desc: "Assign jobs, track completion time, technician performance" },
    { icon: "🧾", name: "Invoice & Payment Processing", desc: "Service invoices, GST billing, payment received tracking" },
    { icon: "🔔", name: "Service Reminder Automation", desc: "Auto WhatsApp/SMS for upcoming service due, insurance renewal" },
    { icon: "🏢", name: "Multi-Branch Dashboard", desc: "Centralised view of all showrooms/service centres in one login" },
    { icon: "📊", name: "Workshop Analytics", desc: "Revenue by service type, technician productivity, monthly MIS" },
    { icon: "📱", name: "Technician Mobile App", desc: "Field app to update job status, capture photos, customer sign-off" },
  ],
  "Real Estate": [
    { icon: "🏢", name: "Property Listings Management", desc: "All projects, units, floor plans, pricing — one admin panel" },
    { icon: "💼", name: "Lead Pipeline & Follow-ups", desc: "Capture leads, assign to CPs, follow-up history, site visit booking" },
    { icon: "📅", name: "Site Visit Scheduling", desc: "Book and track site visits, assign agents, post-visit follow-ups" },
    { icon: "👤", name: "Buyer Portal (Progress Updates)", desc: "Buyers see construction progress, make payments, download docs" },
    { icon: "📁", name: "Document Management", desc: "Agreement copies, floor plans, NOCs — organised by buyer" },
    { icon: "🤝", name: "Broker/Channel Partner Portal", desc: "CPs register, submit leads, track commissions, view inventory" },
    { icon: "💰", name: "Payment & Collection Tracking", desc: "Demand letter schedule, payment tracking, overdue follow-up" },
    { icon: "📦", name: "Inventory & Unit Management", desc: "Real-time unit availability — block, book, transfer status updates" },
    { icon: "📋", name: "Post-Sale CRM & Handover", desc: "Snagging, OC tracking, possession scheduling, post-handover support" },
    { icon: "📊", name: "Analytics & Revenue Dashboard", desc: "Bookings, collections, CP performance, project-wise P&L" },
  ],
  "Food & Beverage": [
    { icon: "🍽️", name: "POS & Order Management", desc: "Table orders, takeaway, delivery — all in one billing system" },
    { icon: "🧑‍🍳", name: "Kitchen Display System (KDS)", desc: "Orders auto-sent to kitchen display, ticket times, priority flags" },
    { icon: "📦", name: "Inventory & Recipe Management", desc: "Ingredient stock, recipe costing, wastage tracking, reorder alerts" },
    { icon: "🤝", name: "Supplier & Purchase Orders", desc: "Vendor POs, delivery confirmation, GRN, supplier rating" },
    { icon: "🛵", name: "Delivery Integration", desc: "Zomato/Swiggy/website orders synced — one view, all channels" },
    { icon: "🏆", name: "Customer Loyalty Program", desc: "Points per visit, birthday offers, re-engagement campaigns" },
    { icon: "💰", name: "Cost & Margin Analytics", desc: "Food cost %, gross margin per dish, daily P&L per outlet" },
    { icon: "🏢", name: "Multi-Outlet Dashboard", desc: "Centralised view of all locations — revenue, waste, occupancy" },
    { icon: "👩‍💼", name: "Staff & Payroll Module", desc: "Attendance, shift management, tip distribution, payslips" },
    { icon: "💬", name: "WhatsApp Engagement", desc: "Order updates, loyalty points, menu specials via WhatsApp" },
  ],
  "Agriculture": [
    { icon: "🌾", name: "Farm & Crop Management", desc: "Track crops by plot, input usage, harvest schedules, yield records" },
    { icon: "🛒", name: "Procurement & Farmer Portal", desc: "Farmer registration, produce submission, quality grading, payments" },
    { icon: "📦", name: "Inventory & Storage Management", desc: "Stock levels by warehouse, expiry tracking, FIFO management" },
    { icon: "✅", name: "Quality Check & Grading", desc: "Grading parameters, rejection logs, QC certificates, batch tracking" },
    { icon: "🚚", name: "Logistics & Delivery Management", desc: "Dispatch orders, vehicle tracking, delivery confirmation, POD" },
    { icon: "🧾", name: "GST Billing & Reports", desc: "Mandi-compliant invoicing, GST reports, e-way bill generation" },
    { icon: "📊", name: "Analytics & Yield Reports", desc: "Yield per crop/plot, revenue by variety, seasonal performance" },
    { icon: "📱", name: "Mobile App for Field Use", desc: "Field team captures data, GPS location, photos — offline capable" },
    { icon: "💰", name: "Farmer Payment Management", desc: "Advance tracking, crop-wise payments, statement generation" },
    { icon: "👤", name: "Buyer/Client Portal", desc: "Buyers view availability, place orders, track delivery, download invoices" },
  ],
  "Fitness": [
    { icon: "💪", name: "Member Registration & Plans", desc: "Profiles, plan assignment, photo ID, emergency contact records" },
    { icon: "📅", name: "Attendance & Check-In Tracking", desc: "QR or biometric check-in, daily attendance reports, no-show alerts" },
    { icon: "🏋️", name: "Trainer & Class Scheduling", desc: "Trainer allocation, group class schedule, personal training slots" },
    { icon: "💰", name: "Fee Collection & Renewals", desc: "Online payment, renewal reminders, EMI plans, revenue tracking" },
    { icon: "🥗", name: "Diet & Workout Plans", desc: "Assign personalised plans to members, track progress, update plans" },
    { icon: "📊", name: "Progress Tracking Dashboard", desc: "Weight, body fat, strength metrics — member and trainer view" },
    { icon: "🔔", name: "Renewal Reminder Automation", desc: "Auto WhatsApp/SMS before expiry — reduce member drop-offs" },
    { icon: "🏢", name: "Multi-Branch Management", desc: "Centralised view of all branches — members, revenue, trainers" },
    { icon: "📱", name: "Member Mobile App", desc: "Book classes, view schedule, track progress, pay fees — branded" },
    { icon: "💬", name: "WhatsApp Member Updates", desc: "Class reminders, birthday wishes, diet plans, renewal alerts" },
  ],
  "Retail": [
    { icon: "🛒", name: "POS & Billing System", desc: "Fast checkout with barcode scanning, GST invoicing, receipt printing" },
    { icon: "📦", name: "Inventory & Stock Management", desc: "Real-time stock, low-stock alerts, reorder management, wastage" },
    { icon: "🏆", name: "Customer Loyalty Program", desc: "Points on purchases, birthday offers, tier-based rewards" },
    { icon: "🤝", name: "Supplier & Purchase Orders", desc: "Vendor POs, delivery confirmation, GRN, supplier credit tracking" },
    { icon: "🏪", name: "Multi-Store Dashboard", desc: "Centralised stock and sales view across all store locations" },
    { icon: "🧾", name: "GST & Financial Reports", desc: "GST summaries, day-end cash reports, monthly P&L" },
    { icon: "↩️", name: "Return & Exchange Management", desc: "Easy returns workflow, restocking, refund or credit note" },
    { icon: "📊", name: "Sales Analytics & Forecasting", desc: "Best-seller reports, slow-moving stock, seasonal demand prediction" },
    { icon: "💬", name: "WhatsApp Customer Updates", desc: "Order ready alerts, promotion messages, loyalty point updates" },
    { icon: "👩‍💼", name: "Staff & Shift Management", desc: "Attendance, shift scheduling, incentive tracking, payslips" },
  ],
  "Retail / Fashion": [
    { icon: "👗", name: "Product Catalog & Inventory", desc: "SKU by size/colour/style, stock levels, multi-store tracking" },
    { icon: "🛒", name: "POS & Billing System", desc: "Fast checkout, barcode scanning, GST invoicing, receipt printing" },
    { icon: "🏆", name: "Customer Loyalty Program", desc: "Points, birthday offers, VIP tier rewards, re-engagement" },
    { icon: "💬", name: "WhatsApp Customer Updates", desc: "New arrivals, order ready alerts, sale announcements" },
    { icon: "🤝", name: "Supplier & Purchase Orders", desc: "Vendor POs, delivery confirmation, GRN, payment tracking" },
    { icon: "🏪", name: "Multi-Store Dashboard", desc: "Centralised stock and sales across all store locations" },
    { icon: "↩️", name: "Return & Exchange Management", desc: "Easy returns, restocking, exchange or credit note" },
    { icon: "📊", name: "Sales Analytics", desc: "Best-selling styles, slow movers, seasonal demand, revenue by store" },
    { icon: "🛵", name: "Online Order Management", desc: "Website/Instagram orders managed with fulfilment tracking" },
    { icon: "👩‍💼", name: "Staff & Shift Management", desc: "Attendance, shift scheduling, incentive tracking, payslips" },
  ],
  "Media / Marketing": [
    { icon: "📣", name: "Client Campaign Management", desc: "All campaigns by client — status, deliverables, performance, budget" },
    { icon: "📅", name: "Content Calendar & Asset Library", desc: "Plan and schedule posts, store creative assets, approval workflow" },
    { icon: "💼", name: "Lead Pipeline & Proposals", desc: "New business tracking, proposal builder, follow-up reminders" },
    { icon: "📊", name: "Campaign Performance Dashboard", desc: "ROAS, CPL, impressions, conversions — all channels in one view" },
    { icon: "✅", name: "Team Task & Workflow", desc: "Assign tasks per campaign, deadlines, completion tracking" },
    { icon: "🧾", name: "Invoice & Billing Tracker", desc: "Monthly client invoices, payment status, outstanding receivables" },
    { icon: "👤", name: "Client Approval Portal", desc: "Share creatives and reports for client sign-off — no email chains" },
    { icon: "🔗", name: "Analytics Integration", desc: "Auto-pull data from Meta, Google Ads, GA4 into one dashboard" },
    { icon: "🗺️", name: "Multi-Channel Tracker", desc: "Track campaigns across Meta, Google, LinkedIn, YouTube in one view" },
    { icon: "💬", name: "WhatsApp Client Communication", desc: "Monthly reports, approvals, update requests via WhatsApp" },
  ],
  "Legal / Compliance": [
    { icon: "⚖️", name: "Case & Matter Management", desc: "Active cases, hearings, milestones, documents — by client" },
    { icon: "👤", name: "Client Portal (Case Status)", desc: "Clients check updates, upload documents, view next hearing dates" },
    { icon: "📁", name: "Document & Contract Repository", desc: "Centralised storage — searchable, version-controlled, access-controlled" },
    { icon: "🔔", name: "Compliance Calendar & Deadlines", desc: "Statutory due dates, court dates, renewal deadlines — auto-alerts" },
    { icon: "⏱️", name: "Billing & Time Tracking", desc: "Log hours per matter, generate invoices, track receivables" },
    { icon: "✅", name: "Team Task Coordination", desc: "Delegate tasks to associates, track completion, status flags" },
    { icon: "📅", name: "Court Date Reminders", desc: "Auto WhatsApp/email reminders to clients and team before each hearing" },
    { icon: "🧾", name: "Invoice & Payment Management", desc: "Retainer billing, milestone invoices, payment follow-up automation" },
    { icon: "📊", name: "Revenue & Utilisation Reports", desc: "Revenue by practice area, client, associate — monthly analytics" },
    { icon: "💬", name: "WhatsApp Client Updates", desc: "Case status, document requests, court reminders via WhatsApp" },
  ],
};

// ─── Fallback modules ──────────────────────────────────────────────────────────
const DEFAULT_MODULES: Module[] = [
  { icon: "💼", name: "Lead Pipeline & CRM", desc: "Track leads, contacts, follow-ups, deal status in one place" },
  { icon: "🔔", name: "Follow-up Automation", desc: "Auto-reminders via WhatsApp/SMS so no lead slips through" },
  { icon: "📊", name: "Analytics Dashboard", desc: "Revenue, pipeline, and team performance reports in real time" },
  { icon: "👤", name: "Client Portal", desc: "Clients log in to see status, submit requests, download documents" },
  { icon: "🧾", name: "Invoice & Billing Module", desc: "GST invoices, payment tracking, overdue alerts" },
  { icon: "📱", name: "Mobile App for Field Team", desc: "Team updates on the go — orders, tasks, attendance via app" },
  { icon: "💬", name: "WhatsApp Integration", desc: "Automated messages, alerts, and updates through WhatsApp" },
  { icon: "🔐", name: "Role-Based Access Control", desc: "Each team member sees only what they need — secure and clean" },
  { icon: "📋", name: "Task & Workflow Management", desc: "Assign tasks, set deadlines, track completion across teams" },
  { icon: "☁️", name: "Cloud Hosting & Backups", desc: "99.9% uptime on AWS/GCP with daily automated backups" },
];

// ─── Pick best module for a pain point ────────────────────────────────────────
function findModuleForPain(pain: string, modules: Module[], exclude: Set<number>): { module: Module; idx: number } {
  const words = pain.toLowerCase().split(/[\s,.\-/()]+/).filter(w => w.length > 3);
  let bestIdx = -1;
  let bestScore = -1;

  modules.forEach((mod, i) => {
    if (exclude.has(i)) return;
    const text = (mod.name + " " + mod.desc).toLowerCase();
    const score = words.filter(w => text.includes(w)).length;
    if (score > bestScore) { bestScore = score; bestIdx = i; }
  });

  if (bestIdx === -1) {
    for (let i = 0; i < modules.length; i++) {
      if (!exclude.has(i)) { bestIdx = i; break; }
    }
  }
  const safe = bestIdx >= 0 ? bestIdx : 0;
  return { module: modules[safe], idx: safe };
}

// ─── Build solution name ──────────────────────────────────────────────────────
function getSolutionName(category: ServiceCategory, industry: Industry): string {
  const catLabel: Record<ServiceCategory, string> = {
    "Basic CRM":      "CRM System",
    "Custom App":     "Mobile Application",
    "CRM + Portal":   "CRM & Client Portal",
    "ERP Standard":   "ERP System",
    "Enterprise ERP": "Enterprise ERP Suite",
  };
  return `Custom ${industry} ${catLabel[category]}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function OurServicesPanel({ lead, pricing }: Props) {
  const theme = CAT_THEME[pricing.serviceCategory];
  const moduleCount = CATEGORY_MODULE_COUNT[pricing.serviceCategory];
  const timeline = CATEGORY_TIMELINE[pricing.serviceCategory];
  const deliverables = CATEGORY_DELIVERABLES[pricing.serviceCategory];
  const solutionName = getSolutionName(pricing.serviceCategory, lead.industry);

  // Get industry modules, fall back to defaults
  const allModules: Module[] = (INDUSTRY_MODULES[lead.industry] ?? DEFAULT_MODULES);

  // Map pain points to modules (no repeats)
  const used = new Set<number>();
  const r1 = findModuleForPain(lead.painPoint1, allModules, used);
  used.add(r1.idx);
  const r2 = findModuleForPain(lead.painPoint2, allModules, used);
  used.add(r2.idx);
  const r3 = findModuleForPain(lead.painPoint3, allModules, used);
  used.add(r3.idx);

  // Remaining modules for the "What We Build" grid (excluding pain-mapped ones)
  const featuredIdx = new Set([r1.idx, r2.idx, r3.idx]);
  const remaining = allModules.filter((_, i) => !featuredIdx.has(i)).slice(0, moduleCount - 3);

  return (
    <div className="space-y-5">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="rounded-xl p-5 text-white" style={{ background: "var(--navy)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: theme.border }}>
              Tailored for {lead.companyName}
            </div>
            <h2 className="text-xl font-bold leading-tight">{solutionName}</h2>
            <p className="text-white/60 text-xs mt-1">
              {lead.employees} employees · {lead.industry} · {lead.city}
            </p>
          </div>
          <div
            className="text-xs font-bold px-3 py-1.5 rounded-full shrink-0"
            style={{ background: theme.bg, color: theme.color }}
          >
            {pricing.serviceCategory}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-4 border-t border-white/10">
          <div>
            <div className="text-white/50 text-xs mb-0.5">One-time Build</div>
            <div className="text-lg font-bold" style={{ color: theme.border }}>
              ₹{pricing.projectPrice.toLocaleString("en-IN")}
            </div>
          </div>
          <div>
            <div className="text-white/50 text-xs mb-0.5">Monthly Support</div>
            <div className="text-lg font-bold" style={{ color: theme.border }}>
              ₹{pricing.monthlyPrice.toLocaleString("en-IN")}/mo
            </div>
          </div>
          <div>
            <div className="text-white/50 text-xs mb-0.5">Annual Plan</div>
            <div className="text-lg font-bold" style={{ color: theme.border }}>
              ₹{pricing.annualPrice.toLocaleString("en-IN")}/yr
              <span className="text-xs font-normal text-white/40 ml-1">(2 months free)</span>
            </div>
          </div>
          <div>
            <div className="text-white/50 text-xs mb-0.5">Delivery</div>
            <div className="text-lg font-bold text-white">{timeline.total}</div>
          </div>
        </div>
      </div>

      {/* ── Why Now ──────────────────────────────────────────────────────────── */}
      <div className="rounded-xl border-2 p-4 flex gap-3 items-start"
        style={{ borderColor: theme.border, background: theme.bg }}>
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.color }} />
        <div>
          <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: theme.color }}>
            Why {lead.companyName} Needs This Now
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{lead.buyingTrigger}</p>
        </div>
      </div>

      {/* ── Pain → Feature Cards ─────────────────────────────────────────────── */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          How We Solve {lead.companyName}&apos;s 3 Core Problems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { pain: lead.painPoint1, res: r1 },
            { pain: lead.painPoint2, res: r2 },
            { pain: lead.painPoint3, res: r3 },
          ].map(({ pain, res }, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
              <div className="rounded-lg p-2.5" style={{ background: theme.light }}>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Problem {i + 1}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{pain}</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: theme.color }} />
                <div>
                  <div className="text-sm font-bold text-gray-800">{res.module.icon} {res.module.name}</div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{res.module.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full Module Grid ──────────────────────────────────────────────────── */}
      {remaining.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            Everything Else We Build In
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {remaining.map((mod, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 flex gap-2 items-start">
                <span className="text-xl leading-none shrink-0">{mod.icon}</span>
                <div>
                  <div className="text-xs font-bold text-gray-800">{mod.name}</div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Deliverables ─────────────────────────────────────────────────────── */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          What {lead.companyName} Gets at Launch
        </h3>
        <div className="flex flex-wrap gap-2">
          {deliverables.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-green-800 bg-white border border-green-200 rounded-full px-3 py-1">
              <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
              {d}
            </div>
          ))}
        </div>
      </div>

      {/* ── Timeline ─────────────────────────────────────────────────────────── */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Delivery Timeline · {timeline.total}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {timeline.phases.map((phase, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white shrink-0"
                    style={{ background: theme.color }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm font-bold text-gray-800">{phase.name}</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0 ml-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />{phase.weeks}
                </span>
              </div>
              <div className="space-y-1 pl-8">
                {phase.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: theme.color }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Investment ───────────────────────────────────────────────────────── */}
      <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: theme.border }}>
        <div className="px-4 py-3 font-bold text-sm text-white" style={{ background: theme.color }}>
          Investment Breakdown — {lead.companyName}
        </div>
        <div className="grid grid-cols-3 divide-x text-center bg-white">
          <div className="p-4">
            <div className="text-xs text-gray-400 mb-1">Project Build</div>
            <div className="text-lg font-bold" style={{ color: theme.color }}>
              ₹{pricing.projectPrice.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-gray-400 mt-1">one-time</div>
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-400 mb-1">Monthly Support</div>
            <div className="text-lg font-bold" style={{ color: theme.color }}>
              ₹{pricing.monthlyPrice.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-gray-400 mt-1">hosting + updates + bugs</div>
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-400 mb-1">Annual Plan</div>
            <div className="text-lg font-bold" style={{ color: theme.color }}>
              ₹{pricing.annualPrice.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-gray-400 mt-1">2 months free</div>
          </div>
        </div>
        <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t border-gray-100">
          Floor price: ₹{pricing.floorPrice.toLocaleString("en-IN")} minimum · Source code ownership included · NDA signed before start
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <div className="rounded-xl p-4" style={{ background: "var(--navy)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-bold text-white">Opening Line for {lead.companyName}</span>
        </div>
        <p className="text-white/70 text-xs leading-relaxed italic">
          &quot;{pricing.openingOffer}&quot;
        </p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-400">Annual Pitch</span>
          </div>
          <p className="text-white/60 text-xs leading-relaxed italic">&quot;{pricing.annualPitch}&quot;</p>
        </div>
      </div>

    </div>
  );
}
