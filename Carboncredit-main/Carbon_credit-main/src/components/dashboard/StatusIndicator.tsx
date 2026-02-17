import { cn } from "@/lib/utils";

type StatusType = "normal" | "warning" | "critical";

interface StatusIndicatorProps {
  status?: StatusType;
  className?: string;
}

const statusConfig = {
  normal: {
    label: "Normal",
    description: "Within safe limits",
    bgClass: "bg-success/20",
    borderClass: "border-success/50",
    textClass: "text-success",
    dotClass: "bg-success",
  },
  warning: {
    label: "Warning",
    description: "Approaching threshold",
    bgClass: "bg-warning/20",
    borderClass: "border-warning/50",
    textClass: "text-warning",
    dotClass: "bg-warning",
  },
  critical: {
    label: "Critical",
    description: "Emission limit exceeded",
    bgClass: "bg-destructive/20",
    borderClass: "border-destructive/50",
    textClass: "text-destructive",
    dotClass: "bg-destructive",
  },
} as const;

export const StatusIndicator = ({
  status = "normal",
  className,
}: StatusIndicatorProps) => {
  const config = statusConfig[status] ?? statusConfig.normal;

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-300",
        config.bgClass,
        config.borderClass,
        className
      )}
    >
      <div className="relative">
        <div className={cn("h-3 w-3 rounded-full", config.dotClass)} />
        <div
          className={cn(
            "absolute inset-0 h-3 w-3 rounded-full animate-ping opacity-75",
            config.dotClass
          )}
        />
      </div>

      <div>
        <p className={cn("font-semibold text-sm", config.textClass)}>
          {config.label}
        </p>
        <p className="text-xs text-muted-foreground">
          {config.description}
        </p>
      </div>
    </div>
  );
};
