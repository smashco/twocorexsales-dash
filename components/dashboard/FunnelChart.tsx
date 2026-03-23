"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props { hot: number; warm: number; highValue: number; nurture: number; }

export function FunnelChart({ hot, warm, highValue, nurture }: Props) {
  const qualData = [
    { name: "HOT", value: hot, color: "#C0392B" },
    { name: "WARM", value: warm, color: "#E67E22" },
  ];
  const catData = [
    { name: "HIGH VALUE", value: highValue, color: "#1E8449" },
    { name: "NURTURE", value: nurture, color: "#2471A3" },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-700">Lead Qualification Split</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {[{ title: "Qualification", data: qualData }, { title: "Category", data: catData }].map(({ title, data }) => (
            <div key={title}>
              <p className="text-xs text-gray-400 text-center mb-2">{title}</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                       paddingAngle={3} dataKey="value">
                    {data.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [val, ""]}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                  />
                  <Legend iconType="circle" iconSize={8}
                    formatter={(val) => <span style={{ fontSize: 11, color: "#374151" }}>{val}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
