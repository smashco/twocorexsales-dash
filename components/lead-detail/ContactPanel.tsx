"use client";

import { useState } from "react";
import type { Lead } from "@/types";
import contactsRaw from "@/data/lead_contacts.json";
import {
  Copy, Check, Globe, MessageCircle, Mail, Linkedin,
  Phone, MapPin, Building2, User, Send, ExternalLink, AlertCircle
} from "lucide-react";

interface ScrapedContact {
  id: string;
  phones: string[];
  emails: string[];
  scrapedFrom: string[];
}

const CONTACTS: Record<string, ScrapedContact> = Object.fromEntries(
  (contactsRaw as ScrapedContact[]).map(c => [c.id, c])
);

interface Props {
  lead: Lead;
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all"
      style={copied
        ? { background: "#D1FAE5", color: "#065F46", borderColor: "#6EE7B7" }
        : { background: "#F9FAFB", color: "#374151", borderColor: "#E5E7EB" }
      }
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

function PhoneRow({ phone }: { phone: string }) {
  // Normalise to dialable format
  const digits = phone.replace(/\D/g, "");
  const dialable = digits.startsWith("91") && digits.length === 12
    ? `+${digits}`
    : digits.startsWith("0")
    ? `+91${digits.slice(1)}`
    : `+91${digits}`;

  const whatsappUrl = `https://wa.me/${dialable.replace("+", "")}`;

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2">
        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="text-sm font-semibold text-gray-800 font-mono tracking-wide">{phone}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a href={`tel:${dialable}`}
          className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors">
          Call
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
          className="text-xs px-2.5 py-1 rounded-lg bg-green-50 text-green-700 border border-green-100 hover:bg-green-100 transition-colors">
          WhatsApp
        </a>
        <CopyButton text={phone} label="Copy" />
      </div>
    </div>
  );
}

function EmailRow({ email }: { email: string }) {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`;
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 min-w-0">
        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="text-sm font-semibold text-gray-800 truncate">{email}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a href={gmailUrl} target="_blank" rel="noopener noreferrer"
          className="text-xs px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors">
          Gmail
        </a>
        <CopyButton text={email} label="Copy" />
      </div>
    </div>
  );
}

export function ContactPanel({ lead }: Props) {
  const scraped = CONTACTS[lead.id];
  const hasPhone = scraped?.phones?.length > 0;
  const hasEmail = scraped?.emails?.length > 0;
  const hasAny = hasPhone || hasEmail;

  // Build URLs
  const linkedinSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
    `${lead.contact} ${lead.companyName}`
  )}`;
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${lead.contact} ${lead.companyName} ${lead.city} contact`
  )}`;

  const whatsappMsg = lead.outreachMessage;
  const whatsappBlastUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`;
  const emailSubject = `Custom Software for ${lead.companyName} — Quick Question`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="space-y-5">

      {/* ── Contact Card ───────────────────────────────────────────────────── */}
      <div className="rounded-xl overflow-hidden" style={{ background: "var(--navy)" }}>
        <div className="px-5 py-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-2xl font-bold text-white"
              style={{ background: "rgba(255,255,255,0.12)" }}>
              {lead.companyName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-white leading-tight">{lead.companyName}</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <User className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <span className="text-sm text-white/70">
                  Reach the <span className="text-white font-semibold">{lead.contact}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-white/60 bg-white/10 rounded-full px-3 py-1.5">
              <Building2 className="w-3 h-3" /> {lead.industry}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/60 bg-white/10 rounded-full px-3 py-1.5">
              <MapPin className="w-3 h-3" /> {lead.city}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/60 bg-white/10 rounded-full px-3 py-1.5">
              <User className="w-3 h-3" /> {lead.employees} employees
            </div>
            <a href={lead.website} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-blue-300 bg-white/10 rounded-full px-3 py-1.5 hover:bg-white/20 transition-colors">
              <Globe className="w-3 h-3" /> {lead.website.replace(/^https?:\/\//, "")}
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Scraped Phone Numbers ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" /> Phone Numbers
            {hasPhone && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                {scraped.phones.length} found
              </span>
            )}
          </h3>
        </div>
        {hasPhone ? (
          <div>
            {scraped.phones.map((p, i) => <PhoneRow key={i} phone={p} />)}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            No phone number found on website — use LinkedIn or Google to find direct contact
          </div>
        )}
      </div>

      {/* ── Scraped Email Addresses ───────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" /> Email Addresses
            {hasEmail && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                {scraped.emails.length} found
              </span>
            )}
          </h3>
        </div>
        {hasEmail ? (
          <div>
            {scraped.emails.map((e, i) => <EmailRow key={i} email={e} />)}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            No email found on website — try the Gmail compose button below
          </div>
        )}
      </div>

      {/* ── Find More ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Find the Decision Maker</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <a href={linkedinSearchUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#0077B5" }}>
              <Linkedin className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-900">LinkedIn</div>
              <div className="text-xs text-blue-600">{lead.contact} at {lead.companyName}</div>
            </div>
          </a>
          <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white border border-gray-200">
              <span className="text-base font-bold" style={{ color: "#4285F4" }}>G</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">Google Search</div>
              <div className="text-xs text-gray-500">{lead.contact} · {lead.city}</div>
            </div>
          </a>
          <a href={lead.website} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white border border-gray-200">
              <Globe className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">Website</div>
              <div className="text-xs text-gray-500 truncate">{lead.website.replace(/^https?:\/\//, "")}</div>
            </div>
          </a>
        </div>
      </div>

      {/* ── Outreach Message ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Outreach Message</h3>
          <CopyButton text={whatsappMsg} label="Copy Message" />
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100">
          {whatsappMsg}
        </div>
      </div>

      {/* ── Send Via ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Send Outreach Via</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a href={whatsappBlastUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-green-200 bg-green-50 hover:bg-green-100 transition-colors group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#25D366" }}>
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-green-900">WhatsApp</div>
              <div className="text-xs text-green-600">Message pre-filled + ready</div>
            </div>
            <Send className="w-3.5 h-3.5 text-green-400 group-hover:text-green-600 shrink-0" />
          </a>
          <a href={gmailUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-red-100 bg-red-50 hover:bg-red-100 transition-colors group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white border border-red-200">
              <Mail className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-red-900">Gmail</div>
              <div className="text-xs text-red-500">Draft with subject + body</div>
            </div>
            <Send className="w-3.5 h-3.5 text-red-300 group-hover:text-red-500 shrink-0" />
          </a>
          <a href={linkedinSearchUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#0077B5" }}>
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-blue-900">LinkedIn DM</div>
              <div className="text-xs text-blue-600">Find {lead.contact} on LinkedIn</div>
            </div>
            <Send className="w-3.5 h-3.5 text-blue-300 group-hover:text-blue-500 shrink-0" />
          </a>
        </div>
      </div>

      {/* ── Recommended Action ────────────────────────────────────────────── */}
      <div className="rounded-xl p-4 border-2 border-amber-200 bg-amber-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">Recommended Next Action</div>
            <p className="text-sm text-amber-900 leading-relaxed">{lead.action}</p>
          </div>
        </div>
      </div>

      {/* ── Source note ───────────────────────────────────────────────────── */}
      {scraped?.scrapedFrom?.length > 0 && (
        <p className="text-xs text-gray-400 text-center">
          Contact data scraped from: {scraped.scrapedFrom.map(u => u.replace(/^https?:\/\//, "")).join(" · ")}
        </p>
      )}
    </div>
  );
}
