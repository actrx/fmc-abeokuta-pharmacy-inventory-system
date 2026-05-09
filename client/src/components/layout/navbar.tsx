"use client";

import React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Search,
  Command,
  Bell,
  Sun,
  Moon,
  User,
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 glass glass-border border-b">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl bg-secondary/60 dark:bg-secondary/40 text-muted-foreground text-sm hover:bg-secondary transition-colors">
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search inventory, transfers…</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-background/80 border border-border text-[10px] font-mono text-muted-foreground">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
            aria-label="Toggle theme"
          >
            <Sun className={cn("w-[18px] h-[18px] transition-all", theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0")} style={{ position: theme === 'dark' ? 'absolute' : 'relative'}} />
            <Moon className={cn("w-[18px] h-[18px] transition-all", theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90")} style={{ position: theme !== 'dark' ? 'absolute' : 'relative'}} />
          </button>
        )}

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive ring-2 ring-card" />
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* Profile */}
        <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-accent transition-colors">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/80 to-[hsl(262,52%,47%)]/80 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs font-semibold leading-tight">System Admin</span>
            <span className="text-[10px] text-muted-foreground leading-tight">admin@nhia.gov.ng</span>
          </div>
          <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
