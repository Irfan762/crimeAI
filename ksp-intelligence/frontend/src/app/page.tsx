import { Activity, MapPin, AlertTriangle, Crosshair, Map as MapIcon, Siren } from "lucide-react";

export default function CommandCenter() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-red-500 flex items-center gap-2">
            <Siren className="w-8 h-8 animate-pulse" /> Karnataka Intelligence Command Center
          </h1>
          <p className="text-muted-foreground mt-1">Live active intelligence and predictive alerts grid.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-destructive/90 transition-colors animate-pulse border border-red-400">
            Acknowledge 3 Priority Alerts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Command Center Stats */}
        {[
          { label: "Active Operations", value: "24", sub: "8 High Risk", icon: Crosshair, color: "text-red-500", border: "border-red-500/50" },
          { label: "Predicted Hotspots", value: "6", sub: "Next 48 Hours", icon: MapPin, color: "text-orange-500", border: "border-orange-500/50" },
          { label: "Network Anomalies", value: "112", sub: "Hidden links found", icon: Activity, color: "text-purple-500", border: "border-purple-500/50" },
          { label: "Critical Alerts", value: "3", sub: "Require immediate action", icon: AlertTriangle, color: "text-red-500", border: "border-red-500/50 animate-pulse" },
        ].map((stat, i) => (
          <div key={i} className={`bg-card border-2 ${stat.border} rounded-xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] shadow-${stat.color.split('-')[1]}-500/20`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">{stat.label}</p>
                <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg bg-background border border-border ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 text-sm font-medium text-muted-foreground">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Command Feed */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-border rounded-xl p-0 h-[500px] flex flex-col relative overflow-hidden shadow-lg">
           <div className="absolute top-4 left-4 z-10 bg-background/90 p-3 rounded-lg border border-border backdrop-blur-md">
             <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider mb-2">Live Map Filters</h4>
             <div className="space-y-2 text-sm">
               <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Patrol Units</label>
               <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-red-500" /> Active Incidents</label>
               <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-orange-500" /> Predicted Zones</label>
             </div>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center relative">
             {/* Map Placeholder Graphic */}
             <MapIcon className="w-32 h-32 text-primary/20 absolute" />
             <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 absolute pointer-events-none"></div>
             
             {/* Pulsing Hotspots */}
             <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-red-500/20 rounded-full animate-ping"></div>
             <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>

             <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-orange-500/20 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
             <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_10px_orange]"></div>

             <div className="z-10 bg-background/80 px-4 py-2 rounded-md border border-border mt-32 backdrop-blur">
               Map rendering isolated. Waiting for geospatial stream...
             </div>
           </div>
        </div>

        {/* AI Predictive Alerts Feed */}
        <div className="bg-card border border-border rounded-xl flex flex-col shadow-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-destructive/10">
            <h3 className="font-bold text-destructive flex items-center gap-2"><Activity className="w-5 h-5"/> Predictive Threat Intel</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Alert 1 */}
            <div className="bg-background border border-red-500/30 rounded-lg p-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded uppercase">High Risk</span>
                <span className="text-xs text-muted-foreground">83% Probability</span>
              </div>
              <h4 className="font-bold text-sm mb-1">Vehicle Theft Spree Predicted</h4>
              <p className="text-xs text-muted-foreground mb-3">Electronic City Sector 3</p>
              <div className="text-xs bg-muted p-2 rounded border border-border">
                <span className="font-semibold text-primary">AI Reasoning:</span> Historical pattern matching indicates gang movement into this sector combined with seasonal spikes.
              </div>
            </div>

            {/* Alert 2 */}
            <div className="bg-background border border-orange-500/30 rounded-lg p-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold bg-orange-500 text-white px-2 py-0.5 rounded uppercase">Elevated Risk</span>
                <span className="text-xs text-muted-foreground">71% Probability</span>
              </div>
              <h4 className="font-bold text-sm mb-1">Organized Burglary Ring</h4>
              <p className="text-xs text-muted-foreground mb-3">Indiranagar Area</p>
              <div className="text-xs bg-muted p-2 rounded border border-border">
                <span className="font-semibold text-primary">AI Reasoning:</span> Modus Operandi matches 3 recent FIRs. Potential scouts observed via CCTV analysis logic.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
