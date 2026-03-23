"use client";
import { useState, useEffect } from "react";
import { MessageCircle, Linkedin, AlertCircle, Check } from "lucide-react";

const WHATSAPP_CHAR_LIMIT = 4096;

interface WhatsAppButtonProps {
  outreachMessage: string;
  /** LinkedIn company page URL or search query (optional) */
  companyName?: string;
  linkedinUrl?: string;
}

export function WhatsAppButton({ outreachMessage, companyName, linkedinUrl }: WhatsAppButtonProps) {
  const [crmMessage, setCrmMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Try to pull custom outreach message from localStorage (set by OutreachCustomizer)
  useEffect(() => {
    if (typeof window === "undefined") return;
    // The OutreachCustomizer stores custom messages by key; we just use the prop here
    // but allow override via window-level detection if available
    const raw = localStorage.getItem("b2b_crm_store");
    if (raw) {
      // We can't easily map here without leadId; just use the prop
    }
    setCrmMessage(null);
  }, [outreachMessage]);

  const message = crmMessage ?? outreachMessage;
  const charCount = message.length;
  const overLimit = charCount > WHATSAPP_CHAR_LIMIT;
  const pct = Math.min((charCount / WHATSAPP_CHAR_LIMIT) * 100, 100);

  const charBarColor = overLimit
    ? "bg-red-500"
    : pct > 80
    ? "bg-amber-400"
    : "bg-green-500";

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const handleLinkedIn = () => {
    if (linkedinUrl) {
      window.open(linkedinUrl, "_blank", "noopener,noreferrer");
    } else if (companyName) {
      const query = encodeURIComponent(companyName);
      window.open(
        `https://www.linkedin.com/search/results/companies/?keywords=${query}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Character count bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Message length</span>
          <span
            className={`text-xs font-medium ${
              overLimit ? "text-red-600" : pct > 80 ? "text-amber-600" : "text-gray-600"
            }`}
          >
            {charCount.toLocaleString()} / {WHATSAPP_CHAR_LIMIT.toLocaleString()} chars
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all ${charBarColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {overLimit && (
          <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
            <AlertCircle className="w-3 h-3" />
            Message exceeds WhatsApp limit by {(charCount - WHATSAPP_CHAR_LIMIT).toLocaleString()} chars
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "#25D366" }}
        >
          <MessageCircle className="w-4 h-4" />
          Open in WhatsApp
        </button>

        <button
          onClick={handleLinkedIn}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "#0A66C2" }}
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn Search
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span> Copy Message
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-gray-400">
        WhatsApp link opens a new chat with the message pre-filled. LinkedIn opens the company search page.
      </p>
    </div>
  );
}
