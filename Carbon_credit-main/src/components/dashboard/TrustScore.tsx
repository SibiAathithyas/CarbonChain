import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

interface TrustScoreProps {
  score: number;
  className?: string;
}

export const TrustScore = ({ score, className }: TrustScoreProps) => {
  const getScoreConfig = (score: number) => {
    if (score >= 80) {
      return {
        label: "Compliant",
        color: "text-success",
        bgColor: "bg-success",
        icon: ShieldCheck,
        description: "All emissions within acceptable limits",
      };
    } else if (score >= 50) {
      return {
        label: "Moderate Risk",
        color: "text-warning",
        bgColor: "bg-warning",
        icon: Shield,
        description: "Some readings near threshold levels",
      };
    } else {
      return {
        label: "Non-Compliant",
        color: "text-destructive",
        bgColor: "bg-destructive",
        icon: ShieldAlert,
        description: "Multiple threshold violations detected",
      };
    }
  };

  const config = getScoreConfig(score);
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/50 bg-card p-6",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Trust Score
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={cn("font-mono text-4xl font-bold", config.color)}>
              {score}%
            </span>
          </div>
          <p className={cn("mt-1 text-sm font-semibold", config.color)}>
            {config.label}
          </p>
        </div>
        <div
          className={cn(
            "rounded-full p-3",
            score >= 80
              ? "bg-success/20"
              : score >= 50
              ? "bg-warning/20"
              : "bg-destructive/20"
          )}
        >
          <Icon className={cn("h-8 w-8", config.color)} />
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{config.description}</p>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              config.bgColor
            )}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
};
