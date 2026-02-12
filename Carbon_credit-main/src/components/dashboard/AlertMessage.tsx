import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { useState } from "react";

interface AlertMessageProps {
  type: "success" | "warning" | "error" | "info";
  message: string;
  timestamp?: string;
  dismissible?: boolean;
  className?: string;
}

const alertConfig = {
  success: {
    icon: CheckCircle2,
    bgClass: "bg-success/10 border-success/30",
    iconClass: "text-success",
    textClass: "text-success",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-warning/10 border-warning/30",
    iconClass: "text-warning",
    textClass: "text-warning",
  },
  error: {
    icon: AlertTriangle,
    bgClass: "bg-destructive/10 border-destructive/30",
    iconClass: "text-destructive",
    textClass: "text-destructive",
  },
  info: {
    icon: Info,
    bgClass: "bg-accent/10 border-accent/30",
    iconClass: "text-accent",
    textClass: "text-accent",
  },
};

export const AlertMessage = ({
  type,
  message,
  timestamp,
  dismissible = true,
  className,
}: AlertMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const config = alertConfig[type];
  const Icon = config.icon;

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3 animate-fade-in",
        config.bgClass,
        className
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", config.iconClass)} />
      <div className="flex-1">
        <p className={cn("text-sm font-medium", config.textClass)}>{message}</p>
        {timestamp && (
          <p className="mt-0.5 text-xs text-muted-foreground">{timestamp}</p>
        )}
      </div>
      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
