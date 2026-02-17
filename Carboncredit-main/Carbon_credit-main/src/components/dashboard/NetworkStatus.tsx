import { cn } from "@/lib/utils";
import { Wifi, WifiOff, Clock, Activity } from "lucide-react";

interface NetworkStatusProps {
  isOnline: boolean;
  lastUpdate: string;
  className?: string;
}

export const NetworkStatus = ({
  isOnline,
  lastUpdate,
  className,
}: NetworkStatusProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 px-4 py-2",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {isOnline ? (
          <>
            <div className="relative">
              <Wifi className="h-4 w-4 text-success" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-success animate-pulse" />
            </div>
            <span className="text-sm text-success">IoT Online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive">IoT Offline</span>
          </>
        )}
      </div>

      <div className="h-4 w-px bg-border" />

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Last update: {lastUpdate}</span>
      </div>

      <div className="h-4 w-px bg-border" />

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Activity className="h-4 w-4 text-accent" />
        <span className="font-mono text-accent">Live</span>
      </div>
    </div>
  );
};
