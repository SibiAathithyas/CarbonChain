import { Leaf, Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background bg-success" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-gradient">Carbon</span>
              <span className="text-foreground">Chain</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Environmental Monitoring System
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            History
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Verification
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
        </nav>

        <button className="rounded-lg bg-secondary p-2 transition-colors hover:bg-secondary/80 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
