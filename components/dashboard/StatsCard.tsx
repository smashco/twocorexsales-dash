import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  color?: "red" | "amber" | "green" | "blue" | "navy" | "default";
}

const colorMap = {
  red:     { bg: "var(--hot-fill)",    icon: "var(--hot-red)",      text: "var(--hot-red)" },
  amber:   { bg: "var(--warm-fill)",   icon: "var(--warm-amber)",   text: "var(--warm-amber)" },
  green:   { bg: "var(--green-fill)",  icon: "var(--green-hv)",     text: "var(--green-hv)" },
  blue:    { bg: "var(--nurture-fill)",icon: "var(--nurture-blue)", text: "var(--nurture-blue)" },
  navy:    { bg: "#EEF0F5",            icon: "var(--navy)",         text: "var(--navy)" },
  default: { bg: "#F8F9FA",            icon: "#6B7280",             text: "#374151" },
};

export function StatsCard({ label, value, sub, icon: Icon, color = "default" }: StatsCardProps) {
  const c = colorMap[color];
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: c.text }}>{value}</p>
            {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
               style={{ background: c.bg }}>
            <Icon className="w-5 h-5" style={{ color: c.icon }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
