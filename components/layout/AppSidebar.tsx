"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Zap, X, TrendingUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads",     label: "All Leads",  icon: Users },
  { href: "/battle-cards", label: "Battle Cards", icon: Zap },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo / Brand header */}
      <div className="px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
            <Image
              src="/logo.png"
              alt="TwoCoreX Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <div className="min-w-0">
            <div className="text-white font-bold text-sm leading-tight truncate">TwoCoreX</div>
            <div className="text-white/50 text-xs leading-tight">Sales Intelligence</div>
          </div>
          {/* Close button only on mobile */}
          <button
            className="ml-auto lg:hidden text-white/60 hover:text-white p-1 rounded"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 rounded-lg text-sm font-medium transition-all",
                "min-h-[44px]",
                active
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/65 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10 space-y-1">
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <TrendingUp className="w-3 h-3 shrink-0" />
          <span>127 leads · 17 industries</span>
        </div>
        <div className="text-white/25 text-xs">Mumbai · Pune · Navi Mumbai</div>
        <div className="text-white/20 text-[10px] pt-1 leading-tight">
          Powered by TwoCoreX (OPC) Pvt Ltd
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — sticky, always visible on lg+ */}
      <aside
        className="hidden lg:flex flex-col w-[220px] shrink-0 h-screen sticky top-0"
        style={{ background: "var(--navy)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile: backdrop overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile: slide-over drawer */}
      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "var(--navy)" }}
        aria-label="Mobile navigation"
      >
        <SidebarContent />
      </aside>

      {/* Mobile hamburger trigger — rendered here so TopBar can use a prop instead */}
      {/* The TopBar controls the hamburger button; we expose a setter via a custom event */}
      {/* We mount a hidden button with id for TopBar to call */}
      <button
        id="sidebar-open-btn"
        className="sr-only"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        tabIndex={-1}
      />
    </>
  );
}

// Helper hook / function for TopBar to open the sidebar
export function openSidebar() {
  const btn = document.getElementById("sidebar-open-btn");
  if (btn) btn.click();
}
