import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";

interface EmissionChartProps {
  className?: string;
}

const generateMockData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    return {
      time: time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      gas: Math.floor(Math.random() * 150) + 100,
      pm25: Math.floor(Math.random() * 50) + 20,
      pm10: Math.floor(Math.random() * 80) + 30,
    };
  });
};

const data = generateMockData();

export const EmissionChart = ({ className }: EmissionChartProps) => {
  const [activeMetric, setActiveMetric] = useState<"gas" | "pm25" | "pm10">(
    "gas"
  );

  const metrics = [
    { key: "gas" as const, label: "Gas (ppm)", color: "hsl(160, 84%, 39%)" },
    { key: "pm25" as const, label: "PM2.5", color: "hsl(187, 92%, 45%)" },
    { key: "pm10" as const, label: "PM10", color: "hsl(38, 92%, 50%)" },
  ];

  const activeColor = metrics.find((m) => m.key === activeMetric)?.color;

  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card p-6",
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/20 p-2">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Emission History</h3>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </div>
        </div>

        <div className="flex gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                activeMetric === metric.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={activeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(217, 33%, 20%)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="hsl(215, 20%, 55%)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(215, 20%, 55%)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 8%)",
                border: "1px solid hsl(217, 33%, 20%)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "hsl(210, 40%, 96%)" }}
              itemStyle={{ color: activeColor }}
            />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={activeColor}
              strokeWidth={2}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
