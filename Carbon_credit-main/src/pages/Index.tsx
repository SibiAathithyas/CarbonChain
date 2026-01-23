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

// Mock real-time data
const mockData = {
  gasConcentration: 187,
  pm25: 35,
  pm10: 52,
  temperature: 24.5,
  status: "normal" as const,
  trustScore: 87,
  lastUpdate: "2 seconds ago",
  isOnline: true,
  blockchain: {
    transactionHash:
      "0x8f7d3c2a1e9b4f6a5d0c8e7f3b2a1d4e9c6f8a7b3e2d1c0f9a8b7c6d5e4f3a2b1",
    blockNumber: 4892156,
    timestamp: "2024-01-15 14:32:18 UTC",
    network: "Sepolia",
  },
  emissionId: "EM-2024-0847",
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Title & Network Status */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Live Emission Dashboard
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time pollution monitoring with blockchain verification
            </p>
          </div>
          <NetworkStatus
            isOnline={mockData.isOnline}
            lastUpdate={mockData.lastUpdate}
          />
        </div>

        {/* Alert Messages */}
        <div className="mb-6 space-y-2">
          <AlertMessage
            type="success"
            message="Data successfully logged on blockchain"
            timestamp="Just now"
          />
        </div>

        {/* Status & Trust Score Row */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusIndicator status={mockData.status} className="lg:col-span-2" />
          <TrustScore score={mockData.trustScore} className="lg:col-span-2" />
        </div>

        {/* Metric Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Gas Concentration"
            value={mockData.gasConcentration}
            unit="ppm"
            icon={Wind}
            trend="down"
            trendValue="5%"
            status="normal"
          />
          <MetricCard
            title="PM2.5"
            value={mockData.pm25}
            unit="µg/m³"
            icon={Droplets}
            trend="stable"
            trendValue="0%"
            status="normal"
          />
          <MetricCard
            title="PM10"
            value={mockData.pm10}
            unit="µg/m³"
            icon={Gauge}
            trend="up"
            trendValue="3%"
            status="warning"
          />
          <MetricCard
            title="Temperature"
            value={mockData.temperature}
            unit="°C"
            icon={Thermometer}
            trend="stable"
            trendValue="0%"
            status="normal"
          />
        </div>

        {/* Chart & Verification Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <EmissionChart className="lg:col-span-2" />

          <div className="space-y-6">
            <BlockchainRecord
              transactionHash={mockData.blockchain.transactionHash}
              blockNumber={mockData.blockchain.blockNumber}
              timestamp={mockData.blockchain.timestamp}
              network={mockData.blockchain.network}
            />
            <QRVerification
              emissionId={mockData.emissionId}
              transactionHash={mockData.blockchain.transactionHash}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              © 2024 CarbonChain. Environmental Monitoring System with
              Blockchain Verification.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                System Operational
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
