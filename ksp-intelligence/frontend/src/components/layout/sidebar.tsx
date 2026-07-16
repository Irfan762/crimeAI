"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BrainCircuit,
  Clock,
  BarChart3,
  Share2,
  FileText,
  Settings,
  ShieldAlert,
  Zap,
} from "lucide-react";

const navItems = [
  { name: "Command Center", href: "/", icon: LayoutDashboard },
  { name: "AI Crime Assistant", href: "/chat", icon: BrainCircuit },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Network Intelligence", href: "/network", icon: Share2 },
  { name: "Offender Profiling", href: "/profiling", icon: ShieldAlert },
  { name: "Financial Crime", href: "/finance", icon: LayoutDashboard },
  { name: "Crime Forecasting", href: "/forecast", icon: Clock },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Hackathon Demo", href: "/demo", icon: Zap },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border h-screen flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-base text-sidebar-foreground leading-tight">KSP Intel</h1>
          <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-wider">Karnataka State Police</p>
        </div>
      </div>

      {/* Live Status */}
      <div className="mx-4 mt-4 px-3 py-2 rounded-md bg-green-500/10 border border-green-500/20 flex items-center gap-2">
        <Zap className="w-3 h-3 text-green-500" />
        <span className="text-xs text-green-500 font-medium">AI Copilot Online</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto mt-4">
        <div className="text-[10px] font-semibold text-sidebar-foreground/40 mb-2 px-2 uppercase tracking-widest">
          Investigation
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "" : ""}`} />
              <span className="text-sm font-medium">{item.name}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground/70"></span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Admin Officer</p>
            <p className="text-[10px] text-muted-foreground truncate">KSP Headquarters</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
