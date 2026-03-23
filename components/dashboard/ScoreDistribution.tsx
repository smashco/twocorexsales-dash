"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props { data: { score: number; count: number }[] }

const colors: Record<number, string> = { 7: "#E67E22", 8: "#1E8449", 9: "#1A2744", 10: "#0D4F5C" };

export function ScoreDistribution({ data }: Props) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-700">Score Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="score" tick={{ fontSize: 12, fill: "#374151" }} axisLine={false} tickLine={false}
                   tickFormatter={(v) => `Score ${v}`} />
            <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(val) => [`${val} leads`, "Count"]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {data.map((d) => <Cell key={d.score} fill={colors[d.score] ?? "#6B7280"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {data.filter(d => d.count > 0).map(d => (
            <div key={d.score} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: colors[d.score] ?? "#6B7280" }} />
              Score {d.score}: <span className="font-semibold text-gray-700">{d.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
