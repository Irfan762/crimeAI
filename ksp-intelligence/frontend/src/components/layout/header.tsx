"use client";

import { Bell, Search, UserCircle, Menu, Shield } from "lucide-react";

export function Header() {
  return (
    <header className="h-14 border-b border-border bg-background/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 w-full">
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted">
          <Menu className="w-5 h-5" />
        </button>

        {/* Search bar */}
        <div className="flex items-center bg-muted/60 rounded-lg px-3 py-1.5 w-full max-w-xs border border-border/50 focus-within:border-primary focus-within:bg-background transition-all">
          <Search className="w-4 h-4 text-muted-foreground mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search intelligence database..."
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground min-w-0"
          />
          <kbd className="hidden sm:block text-[10px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-mono border border-border ml-2 flex-shrink-0">⌘K</kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Threat level badge */}
        <div className="hidden sm:flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mr-2">
          <Shield className="w-3 h-3 text-orange-500" />
          <span className="text-[11px] font-semibold text-orange-500">ELEVATED ALERT</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-border ml-1">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold leading-tight">Admin Officer</p>
            <p className="text-[10px] text-muted-foreground">Headquarters</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <UserCircle className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
