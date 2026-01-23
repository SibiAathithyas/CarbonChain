import { cn } from "@/lib/utils";
import { ExternalLink, Copy, Check, Blocks, Clock, Hash } from "lucide-react";
import { useState } from "react";

interface BlockchainRecordProps {
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  network: string;
  className?: string;
}

export const BlockchainRecord = ({
  transactionHash,
  blockNumber,
  timestamp,
  network,
  className,
}: BlockchainRecordProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const explorerUrl =
    network === "Sepolia"
      ? `https://sepolia.etherscan.io/tx/${transactionHash}`
      : `https://polygonscan.com/tx/${transactionHash}`;

  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card p-6",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-accent/20 p-2">
          <Blocks className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Blockchain Record</h3>
          <p className="text-xs text-muted-foreground">
            Immutable on-chain verification
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Transaction Hash */}
        <div className="group">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Hash className="h-3 w-3" />
            <span>Transaction Hash</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <code className="font-mono text-sm text-accent">
              {truncateHash(transactionHash)}
            </code>
            <button
              onClick={copyToClipboard}
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {copied ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Block Number & Network */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Blocks className="h-3 w-3" />
              <span>Block</span>
            </div>
            <p className="mt-1 font-mono text-sm text-foreground">
              #{blockNumber.toLocaleString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-3 w-3 rounded-full bg-accent" />
              <span>Network</span>
            </div>
            <p className="mt-1 text-sm text-foreground">{network}</p>
          </div>
        </div>

        {/* Timestamp */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Timestamp</span>
          </div>
          <p className="mt-1 font-mono text-sm text-foreground">{timestamp}</p>
        </div>
      </div>

      {/* Verification badge */}
      <div className="mt-6 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2">
        <Check className="h-4 w-4 text-success" />
        <span className="text-sm text-success">Verified on blockchain</span>
      </div>
    </div>
  );
};
