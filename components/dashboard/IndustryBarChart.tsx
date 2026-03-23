"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: { industry: string; count: number; hot: number; avgScore: number }[];
}

export function IndustryBarChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.count - a.count);
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-700">Leads by Industry</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sorted} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis
              type="category" dataKey="industry" width={130}
              tick={{ fontSize: 11, fill: "#374151" }} axisLine={false} tickLine={false}
            />
            <Tooltip
              formatter={(val, name) => [val, name === "hot" ? "HOT" : "Total"]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20}>
              {sorted.map((d) => (
                <Cell key={d.industry}
                  fill={d.avgScore >= 8 ? "#1E8449" : d.avgScore >= 7 ? "#E67E22" : "#C0392B"}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
