"use client";

import { Activity, CreditCard, Network, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Crime Analysis</h1>
          <p className="text-muted-foreground mt-1">Transaction Tracking, Money Trails & Suspicious Activity Detection</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
          Import Bank Records (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-start text-muted-foreground mb-2">
            <span className="font-medium text-sm">Suspicious Transactions</span>
            <AlertCircle className="w-4 h-4 text-destructive" />
          </div>
          <div className="text-3xl font-bold">142</div>
          <div className="text-xs text-destructive flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +12% from last week
          </div>
        </div>

        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-start text-muted-foreground mb-2">
            <span className="font-medium text-sm">Flagged Accounts</span>
            <CreditCard className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">38</div>
          <div className="text-xs text-muted-foreground mt-1">Pending verification</div>
        </div>

        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-start text-muted-foreground mb-2">
            <span className="font-medium text-sm">Total Volume Tracked</span>
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">₹4.2 Cr</div>
          <div className="text-xs text-primary flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-1" /> ₹1.1 Cr in last 30 days
          </div>
        </div>

        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-start text-muted-foreground mb-2">
            <span className="font-medium text-sm">Active Networks</span>
            <Network className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold">7</div>
          <div className="text-xs text-muted-foreground mt-1">Money laundering rings</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        {/* Transaction Graph Placeholder */}
        <div className="col-span-2 bg-card border border-border rounded-xl shadow-sm p-4 flex flex-col">
          <h3 className="font-semibold mb-4">Transaction Network Visualization</h3>
          <div className="flex-1 bg-muted/30 rounded-lg border border-dashed border-border flex items-center justify-center">
            <p className="text-muted-foreground flex flex-col items-center">
              <Network className="w-12 h-12 mb-2 opacity-50" />
              Interactive Neo4j Cytoscape Graph loading...
            </p>
          </div>
        </div>

        {/* Suspicious Activity Feed */}
        <div className="col-span-1 bg-card border border-border rounded-xl shadow-sm p-4 flex flex-col">
          <h3 className="font-semibold mb-4">Latest Alerts</h3>
          <div className="flex-1 overflow-y-auto space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 border border-border rounded-lg bg-background hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm truncate w-32">Acc: XXXXXX{430+i}</span>
                  <span className="text-xs font-bold text-destructive">₹{50+i*10},000</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Multiple small deposits detected across 3 branches. Structuring suspected.</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
