"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Command, Menu } from "lucide-react";
import { LEADS } from "@/data/leads";
import { Badge } from "@/components/ui/badge";
import { openSidebar } from "@/components/layout/AppSidebar";

export function TopBar({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = query.length > 1
    ? LEADS.filter(l =>
        l.companyName.toLowerCase().includes(query.toLowerCase()) ||
        l.id.toLowerCase().includes(query.toLowerCase()) ||
        l.industry.toLowerCase().includes(query.toLowerCase()) ||
        l.city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleKey = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(true);
      setQuery("");
    }
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <>
      <header className="h-14 border-b bg-white flex items-center gap-3 px-3 lg:px-6 sticky top-0 z-30 shadow-sm relative">
        {/* Hamburger — mobile only */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
          onClick={() => openSidebar()}
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* TwoCoreX logo — mobile only, small */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-[var(--navy)] flex items-center justify-center overflow-hidden">
            <Image
              src="/logo.png"
              alt="TwoCoreX"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Page title — centered on mobile via absolute, normal flex on desktop */}
        <h1 className="font-semibold text-gray-800 text-base truncate absolute inset-x-0 text-center pointer-events-none px-28 lg:static lg:flex-1 lg:min-w-0 lg:text-left lg:pointer-events-auto lg:px-0">
          <span className="hidden lg:inline">TwoCoreX Sales — </span>
          {title}
        </h1>

        {/* Spacer — keeps search button right-aligned on mobile when title is absolute */}
        <div className="flex-1 lg:hidden" aria-hidden="true" />

        {/* Search button */}
        <button
          onClick={() => { setOpen(true); setQuery(""); }}
          className="flex items-center gap-2 px-3 h-9 text-sm text-gray-400 border rounded-lg hover:border-gray-300 hover:text-gray-600 transition-colors shrink-0"
          aria-label="Search leads (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search leads...</span>
          <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-xs bg-gray-100 rounded ml-1">
            <Command className="w-3 h-3" />K
          </kbd>
        </button>
      </header>

      {/* Search modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                autoFocus
                className="flex-1 text-sm outline-none placeholder:text-gray-400 min-h-[44px] bg-transparent"
                placeholder="Search by company, industry, city, ID..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 && query.length > 1 && (
                <div className="px-4 py-8 text-center text-sm text-gray-400">No leads found</div>
              )}
              {results.length === 0 && query.length <= 1 && (
                <div className="px-4 py-6 text-center text-sm text-gray-400">
                  Start typing to search 127 leads...
                </div>
              )}
              {results.map(lead => (
                <button
                  key={lead.id}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors min-h-[52px]"
                  onClick={() => { router.push(`/leads/${lead.id}`); setOpen(false); }}
                >
                  <span className="text-xs font-mono text-gray-400 w-10 shrink-0">{lead.id}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{lead.companyName}</div>
                    <div className="text-xs text-gray-400">{lead.city} · {lead.industry}</div>
                  </div>
                  <Badge
                    className="text-xs shrink-0"
                    style={{
                      background: lead.qualification === "HOT" ? "var(--hot-fill)" : "var(--warm-fill)",
                      color: lead.qualification === "HOT" ? "var(--hot-red)" : "var(--warm-amber)",
                      border: "none"
                    }}
                  >
                    {lead.qualification}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
