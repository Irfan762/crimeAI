"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { Filter, AlertTriangle } from "lucide-react";

const trendData = [
  { month: 'Jan', violent: 120, property: 340, cyber: 45 },
  { month: 'Feb', violent: 110, property: 310, cyber: 55 },
  { month: 'Mar', violent: 130, property: 360, cyber: 60 },
  { month: 'Apr', violent: 140, property: 320, cyber: 80 },
  { month: 'May', violent: 115, property: 290, cyber: 110 },
  { month: 'Jun', violent: 125, property: 330, cyber: 145 },
];

const districtData = [
  { name: 'Bengaluru', cases: 1450 },
  { name: 'Mysuru', cases: 820 },
  { name: 'Hubballi', cases: 610 },
  { name: 'Mangaluru', cases: 540 },
  { name: 'Belagavi', cases: 480 },
];

const categoryData = [
  { name: 'Theft', value: 400 },
  { name: 'Assault', value: 300 },
  { name: 'Cyber Fraud', value: 300 },
  { name: 'Narcotics', value: 200 },
];
const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch for Recharts

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crime Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Statewide predictive analysis and historic trends.</p>
        </div>
        <button className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Line Chart */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Crime Trend Analysis (2026)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViolent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProperty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="violent" stroke="#ef4444" fillOpacity={1} fill="url(#colorViolent)" />
                <Area type="monotone" dataKey="property" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProperty)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Bar Chart */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Top Districts by Crime Volume</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                <Tooltip cursor={{fill: '#333'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="cases" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Crime Breakdown</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-4 right-4 z-10 bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-red-500/30">
            <AlertTriangle className="w-3 h-3" /> Live Hotspots
          </div>
          <h3 className="text-lg font-semibold mb-6">Geospatial Heatmap</h3>
          <div className="flex-1 bg-muted/30 rounded-lg border border-border flex items-center justify-center p-8 text-center">
            <div className="max-w-xs">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <GlobeIcon className="w-10 h-10 text-primary" />
              </div>
              <p className="text-muted-foreground">Map rendering is currently running in an isolated layer. Connect to Mapbox API to view active layer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  )
}
