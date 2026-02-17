import { LucideIcon } from "lucide-react";

type AirStatus = "normal" | "warning" | "critical";

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  status?: AirStatus;
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  unit,
  icon: Icon,
  trend = "stable",
  trendValue = "",
  status = "normal",
  className = "",
}: MetricCardProps) => {

  /* ------------------------------
     Status Color Mapping
  ------------------------------ */
  const statusColor = {
    normal: "text-green-400",
    warning: "text-yellow-400",
    critical: "text-red-400",
  }[status];

  const borderColor = {
    normal: "border-green-500/30",
    warning: "border-yellow-500/30",
    critical: "border-red-500/30",
  }[status];

  /* ------------------------------
     Trend Indicator
  ------------------------------ */
  const trendSymbol = {
    up: "↑",
    down: "↓",
    stable: "→",
  }[trend];

  /* ------------------------------
     Render
  ------------------------------ */
  return (
    <div
      className={`rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md ${borderColor} ${className}`}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          {title}
        </h3>

        <div className="rounded-lg bg-muted/30 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <span
          className={`text-3xl font-bold ${statusColor}`}
        >
          {value ?? 0}
        </span>

        <span className="text-sm text-muted-foreground">
          {unit}
        </span>
      </div>

      {/* Trend */}
      {trendValue && (
        <p className="mt-2 text-xs text-muted-foreground">
          {trendSymbol} {trendValue}
        </p>
      )}
    </div>
  );
};
