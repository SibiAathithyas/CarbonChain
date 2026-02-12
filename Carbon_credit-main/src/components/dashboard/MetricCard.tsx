import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  status?: "normal" | "warning" | "violation";
  className?: string;
}

const statusColors = {
  normal: "text-success",
  warning: "text-warning",
  violation: "text-destructive",
};

export const MetricCard = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  status = "normal",
  className,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg",
        className
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="rounded-lg bg-secondary p-2">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span
            className={cn(
              "font-mono text-3xl font-bold tracking-tight",
              statusColors[status]
            )}
          >
            {value}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>

        {trend && trendValue && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span
              className={cn(
                trend === "up" && "text-destructive",
                trend === "down" && "text-success",
                trend === "stable" && "text-muted-foreground"
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "stable" && "→"}
              {trendValue}
            </span>
            <span className="text-muted-foreground">vs last hour</span>
          </div>
        )}
      </div>
    </div>
  );
};
