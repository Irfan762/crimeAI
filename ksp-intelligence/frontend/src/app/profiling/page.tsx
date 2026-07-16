"use client";

import { useState } from "react";
import { Search, ShieldAlert, UserCheck, Activity, BarChart3, AlertTriangle } from "lucide-react";

export default function ProfilingPage() {
  const [searchQuery, setSearchQuery] = useState("Seena");

  return (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Offender Profiling</h1>
          <p className="text-muted-foreground mt-1">Criminology-Based Risk Scoring & Behavioral Analysis</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by Name, Alias, or Criminal ID..." 
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground focus:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Analyze Profile
        </button>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center border-2 border-primary/20">
              <UserCheck className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Ravi Kumar</h2>
              <p className="text-muted-foreground">Alias: "Seena"</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive mt-2">
                High Risk Offender
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Criminal ID</span>
              <span className="font-medium">KSP-CR-9842</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Primary M.O.</span>
              <span className="font-medium">Night Burglary</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Gang Affiliation</span>
              <span className="font-medium">G-84 (Suspected)</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Total Arrests</span>
              <span className="font-medium">4</span>
            </div>
          </div>
        </div>

        {/* Risk Scores */}
        <div className="col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> AI Risk Assessment
          </h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 border border-border rounded-lg bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Repeat Offense Probability</span>
                <span className="text-2xl font-bold text-destructive">87%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-destructive h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <AlertTriangle className="inline w-3 h-3 mr-1" />
                Based on escalation pattern in recent 6 months.
              </p>
            </div>
            
            <div className="p-4 border border-border rounded-lg bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Flight Risk Score</span>
                <span className="text-2xl font-bold text-amber-500">45%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Moderate risk due to known interstate associates.</p>
            </div>

            <div className="p-4 border border-border rounded-lg bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Violence Escalation</span>
                <span className="text-2xl font-bold text-primary">22%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '22%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Offender typically avoids confrontation.</p>
            </div>

            <div className="p-4 border border-border rounded-lg bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Network Influence</span>
                <span className="text-2xl font-bold text-destructive">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-destructive h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Identified as a key node connecting 3 distinct groups.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Behavioral Analysis & Explainability */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex-1">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-primary" /> Explainable AI Insights
        </h3>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            <strong>Reasoning Path:</strong> The AI model flags <em>Ravi Kumar</em> as a High-Risk Offender due to a converging pattern of property crimes located near transportation hubs.
          </p>
          <ul>
            <li><strong>Evidence 1:</strong> Modus Operandi matches exact tool marks found in FIR-2026-041 (Confidence: 94%).</li>
            <li><strong>Evidence 2:</strong> Financial transactions indicate sudden influx of cash correlated with the date of FIR-2026-033.</li>
            <li><strong>Actionable Lead:</strong> Monitor known associate "Kiran" who acts as the primary fence for stolen goods in the Majestic area.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
