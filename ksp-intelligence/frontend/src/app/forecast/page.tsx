"use client";

import { useState } from "react";
import { TrendingUp, Map, BellRing, Filter, CalendarDays } from "lucide-react";

export default function ForecastPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("Bengaluru Central");

  return (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crime Forecasting & Early Warning</h1>
          <p className="text-muted-foreground mt-1">Predictive AI Models & Hotspot Forecasting</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-card border border-border text-foreground px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm">
            <BellRing className="w-4 h-4" /> Configure Alerts
          </button>
        </div>
      </div>

      {/* District Selector & Timeframe */}
      <div className="flex gap-4 items-center bg-card border border-border p-3 rounded-xl shadow-sm">
        <span className="text-sm font-medium ml-2">Prediction Scope:</span>
        <select 
          className="bg-background border border-border text-sm rounded-md px-3 py-2 outline-none focus:border-primary"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option>Bengaluru Central</option>
          <option>Bengaluru South</option>
          <option>Mysuru City</option>
          <option>Mangaluru</option>
        </select>
        <select className="bg-background border border-border text-sm rounded-md px-3 py-2 outline-none focus:border-primary">
          <option>Next 7 Days</option>
          <option>Next 30 Days</option>
          <option>Next Quarter</option>
        </select>
        <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1 mr-2">
          <CalendarDays className="w-4 h-4" /> Model Last Trained: Today 04:00 AM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        {/* Predictive Map */}
        <div className="col-span-2 bg-card border border-border rounded-xl shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-md border border-border shadow-sm text-xs font-medium flex items-center gap-2">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-destructive opacity-80"></div> High Risk</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500 opacity-80"></div> Med Risk</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-primary opacity-80"></div> Low Risk</div>
          </div>
          <div className="flex-1 bg-muted/20 flex items-center justify-center">
            <p className="text-muted-foreground flex flex-col items-center">
              <Map className="w-12 h-12 mb-2 opacity-50" />
              GIS Predictive Heatmap (Leaflet integration pending)
            </p>
          </div>
        </div>

        {/* Forecast Alerts & Drivers */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl shadow-sm p-4 flex-1">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Projected Increases
            </h3>
            <div className="space-y-4">
              <div className="p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm text-foreground">Vehicle Theft</span>
                  <span className="text-xs font-bold text-destructive">+18%</span>
                </div>
                <p className="text-xs text-muted-foreground">Confidence: 89%</p>
                <p className="text-xs mt-2 text-foreground/80">
                  Driven by historical seasonal patterns (summer holidays) and recent spikes in neighboring zones.
                </p>
              </div>

              <div className="p-3 border border-amber-500/20 bg-amber-500/5 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm text-foreground">Cyber Fraud</span>
                  <span className="text-xs font-bold text-amber-500">+8%</span>
                </div>
                <p className="text-xs text-muted-foreground">Confidence: 74%</p>
                <p className="text-xs mt-2 text-foreground/80">
                  Correlated with upcoming local festivals and increased online shopping activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
