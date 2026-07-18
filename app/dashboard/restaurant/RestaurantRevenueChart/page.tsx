// components/RestaurantRevenueChart.tsx
"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // এখানে "recharts" ইম্পোর্ট করা হয়েছে

const data = [
  { day: "Sat", revenue: 8200, orders: 24 },
  { day: "Sun", revenue: 9400, orders: 29 },
  { day: "Mon", revenue: 6800, orders: 19 },
  { day: "Tue", revenue: 7600, orders: 22 },
  { day: "Wed", revenue: 10200, orders: 31 },
  { day: "Thu", revenue: 11800, orders: 35 },
  { day: "Fri", revenue: 12450, orders: 38 },
];

interface TooltipPayload {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipPayload) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-neutral-400 mb-1">{label}</p>
      <p className="text-sm font-medium text-emerald-400">
        ৳{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function RestaurantRevenueChart() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-medium text-white">Revenue Trend</h2>
          <p className="text-xs text-neutral-500 mt-0.5">Last 7 days</p>
        </div>
        <span className="text-xs font-medium bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">
          +18% this week
        </span>
      </div>

      <div className="h-64 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: "#a3a3a3", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: "#a3a3a3", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `৳${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(16,185,129,0.3)" }} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}