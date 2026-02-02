import { Wind, Droplets, Thermometer, Gauge } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusIndicator } from "@/components/dashboard/StatusIndicator";
import { TrustScore } from "@/components/dashboard/TrustScore";
import { BlockchainRecord } from "@/components/dashboard/BlockchainRecord";
import { QRVerification } from "@/components/dashboard/QRVerification";
import { EmissionChart } from "@/components/dashboard/EmissionChart";
import { NetworkStatus } from "@/components/dashboard/NetworkStatus";
import { AlertMessage } from "@/components/dashboard/AlertMessage";
import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:5000/api/latest";

type AirStatus = "normal" | "warning" | "critical";

const Index = () => {
  const [data, setData] = useState<{
    gas: number;
    dust: number;
    status: AirStatus;
    lastUpdate: string;
    isOnline: boolean;
  }>({
    gas: 0,
    dust: 0,
    status: "normal",
    lastUpdate: "Waiting for data...",
    isOnline: false,
  });

  const fetchSensorData = async () => {
    try {
      const res = await fetch(BACKEND_URL);
      const json = await res.json();

      let status: AirStatus = "normal";
      if (json.gas > 400 || json.dust > 300) status = "critical";
      else if (json.gas > 250 || json.dust > 200) status = "warning";

      setData({
        gas: json.gas,
        dust: json.dust,
        status,
        lastUpdate: new Date(json.timestamp).toLocaleTimeString(),
        isOnline: true,
      });
    } catch (err) {
      console.error("Backend not reachable");
      setData((prev) => ({
        ...prev,
        isOnline: false,
        lastUpdate: "Backend Offline",
      }));
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Title & Network */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Live Emission Dashboard
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time IoT emission monitoring with blockchain verification
            </p>
          </div>

          <NetworkStatus
            isOnline={data.isOnline}
            lastUpdate={data.lastUpdate}
          />
        </div>

        {/* Alert */}
        <div className="mb-6 space-y-2">
          <AlertMessage
            type={data.status === "critical" ? "error" : "success"}
            message={
              data.status === "critical"
                ? "High emission levels detected!"
                : "Emission levels within acceptable limits"
            }
            timestamp={data.lastUpdate}
          />
        </div>

        {/* Status */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusIndicator status={data.status} className="lg:col-span-2" />
          <TrustScore score={88} className="lg:col-span-2" />
        </div>

        {/* Metrics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Gas Concentration"
            value={data.gas}
            unit="ppm"
            icon={Wind}
            trend="stable"
            trendValue="Live"
            status={data.status}
          />

          <MetricCard
            title="PM Dust"
            value={data.dust}
            unit="µg/m³"
            icon={Droplets}
            trend="stable"
            trendValue="Live"
            status={data.status}
          />

          <MetricCard
            title="PM10 (Estimated)"
            value={Math.round(data.dust * 1.2)}
            unit="µg/m³"
            icon={Gauge}
            trend="up"
            trendValue="Derived"
            status={data.status}
          />

          <MetricCard
            title="Temperature"
            value={26}
            unit="°C"
            icon={Thermometer}
            trend="stable"
            trendValue="Ambient"
            status="normal"
          />
        </div>

        {/* Chart + Blockchain */}
        <div className="grid gap-6 lg:grid-cols-3">
          <EmissionChart className="lg:col-span-2" />

          <div className="space-y-6">
            <BlockchainRecord
              transactionHash="0xDEMO_BLOCK_HASH"
              blockNumber={123456}
              timestamp={new Date().toISOString()}
              network="Ethereum Testnet"
            />
            <QRVerification
              emissionId="CARBON-EM-001"
              transactionHash="0xDEMO_BLOCK_HASH"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>© 2026 CarbonChain — Web3-enabled Emission Monitoring Platform</p>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              System Operational
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
