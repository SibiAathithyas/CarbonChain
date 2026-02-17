import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";
import { QrCode, Download, Share2 } from "lucide-react";

interface QRVerificationProps {
  emissionId: string;
  transactionHash: string;
  className?: string;
}

export const QRVerification = ({
  emissionId,
  transactionHash,
  className,
}: QRVerificationProps) => {
  const verificationUrl = `https://carbonchain.verify/${emissionId}?tx=${transactionHash}`;

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `carbonchain-${emissionId}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  const shareQR = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "CarbonChain Verification",
        text: "Verify emission data on blockchain",
        url: verificationUrl,
      });
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card p-6",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-primary/20 p-2">
          <QrCode className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">QR Verification</h3>
          <p className="text-xs text-muted-foreground">
            Scan to verify on blockchain
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="rounded-xl bg-white p-4">
          <QRCodeSVG
            id="qr-code"
            value={verificationUrl}
            size={140}
            level="H"
            includeMargin={false}
            fgColor="#0d1117"
            bgColor="#ffffff"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={downloadQR}
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
        <button
          onClick={shareQR}
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Emission ID: <span className="font-mono text-accent">{emissionId}</span>
      </p>
    </div>
  );
};
