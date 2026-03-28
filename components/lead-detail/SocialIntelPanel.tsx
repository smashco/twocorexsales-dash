"use client";

import { useState, useEffect } from "react";
import {
  Globe, Linkedin, Instagram, Facebook, Twitter, Youtube,
  RefreshCw, Loader2, ExternalLink, Star, MessageSquare,
  TrendingUp, AlertTriangle, Users, Zap, Eye, Share2
} from "lucide-react";
import type { Lead, SocialIntelData } from "@/types";

interface Props { lead: Lead; }

const PRESENCE_COLORS: Record<string, string> = {
  Excellent: "text-green-600 bg-green-50 border-green-200",
  Good: "text-blue-600 bg-blue-50 border-blue-200",
  Moderate: "text-amber-600 bg-amber-50 border-amber-200",
  Weak: "text-orange-600 bg-orange-50 border-orange-200",
  Minimal: "text-red-600 bg-red-50 border-red-200",
};

const ENGAGE_COLORS: Record<string, string> = {
  High: "text-green-700 bg-green-100",
  Medium: "text-blue-700 bg-blue-100",
  Low: "text-amber-700 bg-amber-100",
  None: "text-gray-500 bg-gray-100",
};

export function SocialIntelPanel({ lead }: Props) {
  const [data, setData] = useState<SocialIntelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/social-intel/${lead.id}`)
      .then(r => r.json())
      .then(j => { if (j.success && j.data) setData(j.data); })
      .catch(() => {});
  }, [lead.id]);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/social-intel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setData(json.data);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  const socialIcons: Record<string, React.ReactNode> = {
    linkedin: <Linkedin className="w-4 h-4" />,
    instagram: <Instagram className="w-4 h-4" />,
    facebook: <Facebook className="w-4 h-4" />,
    twitter: <Twitter className="w-4 h-4" />,
    youtube: <Youtube className="w-4 h-4" />,
  };

  const socialColors: Record<string, string> = {
    linkedin: "bg-blue-600 hover:bg-blue-700",
    instagram: "bg-pink-600 hover:bg-pink-700",
    facebook: "bg-blue-800 hover:bg-blue-900",
    twitter: "bg-slate-800 hover:bg-slate-900",
    youtube: "bg-red-600 hover:bg-red-700",
  };

  if (!data && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
          <Share2 className="w-7 h-7 text-purple-500" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Social & Web Intelligence</p>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">AI scrapes their website, infers social profiles, recent posts, digital presence + conversation starters</p>
        </div>
        {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        <button
          onClick={generate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-all"
        >
          <Globe className="w-4 h-4" /> Research This Company
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        <p className="text-sm text-gray-500">Scraping website + researching social presence...</p>
        <p className="text-xs text-gray-400">Takes 10–15 seconds</p>
      </div>
    );
  }

  if (!data) return null;

  const socialEntries = Object.entries(data.socialProfiles).filter(([, v]) => v);
  const missingSocials = Object.entries(data.socialProfiles).filter(([, v]) => !v).map(([k]) => k);

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Social & Web Intelligence</h3>
            <p className="text-xs text-gray-400">{lead.companyName} · {lead.website}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${PRESENCE_COLORS[data.onlinePresenceLabel] ?? "text-gray-600 bg-gray-50"}`}>
            Presence: {data.onlinePresenceLabel} ({data.onlinePresenceScore}/10)
          </span>
          <button onClick={generate} disabled={loading} className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Social profiles + company snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Social Profiles */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Social Profiles</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ENGAGE_COLORS[data.socialEngagementLevel] ?? ""}`}>
              {data.socialEngagementLevel} engagement
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {socialEntries.map(([platform, url]) => (
              <a
                key={platform}
                href={url!}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-all ${socialColors[platform] ?? "bg-gray-600"}`}
              >
                {socialIcons[platform]}
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            ))}
            {missingSocials.map((platform) => (
              <span key={platform} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 bg-gray-100 text-xs font-medium">
                {socialIcons[platform]}
                {platform.charAt(0).toUpperCase() + platform.slice(1)} — not found
              </span>
            ))}
          </div>
          <div className="pt-1">
            <a href={lead.website} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline">
              <Globe className="w-3.5 h-3.5" /> {lead.website} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Company Snapshot */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Company Snapshot</p>
          {[
            ["Est. Founded", data.companySnapshot.estimatedFounded],
            ["Leader / Founder", data.companySnapshot.founderOrLeader],
            ["Business Type", data.companySnapshot.businessType],
            ["Primary Market", data.companySnapshot.primaryMarket],
            ["Est. Monthly Revenue", data.companySnapshot.estimatedMonthlyRevenue],
            ["Staff Expansion", data.companySnapshot.staffExpansion],
          ].map(([label, value]) => (
            <div key={label} className="flex items-start gap-2 text-xs">
              <span className="text-gray-400 shrink-0 w-32">{label}</span>
              <span className="text-gray-700 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Website + Google Business Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <p className="text-xs font-semibold text-gray-700">Website Analysis</p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{data.websiteAnalysis}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-500" />
            <p className="text-xs font-semibold text-gray-700">Google Business Signals</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-600"><span className="font-medium text-gray-700">Rating: </span>{data.googleBusinessInsights.estimatedRating}</p>
            <p className="text-xs text-gray-600"><span className="font-medium text-gray-700">Reviews: </span>{data.googleBusinessInsights.reviewActivity}</p>
            <p className="text-xs text-gray-600"><span className="font-medium text-gray-700">Hours: </span>{data.googleBusinessInsights.businessHours}</p>
          </div>
        </div>
      </div>

      {/* Content Strategy + Brand Voice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-purple-500" />
            <p className="text-xs font-semibold text-gray-700">Content Strategy</p>
          </div>
          <p className="text-sm text-gray-600">{data.contentStrategy}</p>
          <div className="mt-2 pt-2 border-t">
            <span className="text-xs text-gray-400">Brand Voice: </span>
            <span className="text-xs font-medium text-gray-700">{data.brandVoice}</span>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-500" />
            <p className="text-xs font-semibold text-gray-700">Key People Online</p>
          </div>
          <ul className="space-y-1">
            {data.keyPersonnelOnline.map((person, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                <span className="text-purple-400 font-bold shrink-0">·</span>{person}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Online Activity */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Recent Online Activity (Inferred)</p>
        </div>
        <div className="space-y-2">
          {data.recentOnlineActivity.map((activity, i) => (
            <div key={i} className="flex items-start gap-2 p-2 bg-green-50 rounded-lg text-xs text-gray-700">
              <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
              {activity}
            </div>
          ))}
        </div>
      </div>

      {/* Outreach Conversation Starters */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-purple-600" />
          <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Conversation Starters (Based on Their Online Presence)</p>
        </div>
        <div className="space-y-2">
          {data.outreachConversationStarters.map((starter, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-purple-100 text-xs text-gray-700">
              <Zap className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              {starter}
            </div>
          ))}
        </div>
      </div>

      {/* Digital Presence Summary */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Digital Presence Summary</p>
        <p className="text-sm text-gray-700 leading-relaxed">{data.digitalPresenceSummary}</p>
      </div>

      {/* Red Flags */}
      {data.redFlags && data.redFlags.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">Red Flags</p>
          </div>
          <ul className="space-y-1">
            {data.redFlags.map((flag, i) => (
              <li key={i} className="text-xs text-red-700 flex items-start gap-1.5">
                <span className="font-bold shrink-0">!</span>{flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer timestamp */}
      <p className="text-xs text-gray-300 text-right">
        Generated {new Date(data.generatedAt).toLocaleString("en-IN")} · Cached 7 days
      </p>
    </div>
  );
}
