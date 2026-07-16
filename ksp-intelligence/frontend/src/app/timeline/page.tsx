"use client";

import { useState } from "react";
import { Clock, UploadCloud, FileText, CheckCircle2, ChevronDown, Video, PhoneCall } from "lucide-react";

export default function TimelinePage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowTimeline(true);
    }, 2000);
  };

  const timelineEvents = [
    { time: "14:30", date: "May 12", title: "Victim left workplace", desc: "Witness Statement (W-01) corroborates departure from tech park.", icon: FileText, color: "bg-blue-500" },
    { time: "15:15", date: "May 12", title: "CCTV Detection: White Omni", desc: "Camera CAM-84 detected target vehicle trailing victim's route.", icon: Video, color: "bg-purple-500" },
    { time: "15:42", date: "May 12", title: "Call Intercepted", desc: "Suspect A made a 12-second call to known Gang E burner phone.", icon: PhoneCall, color: "bg-orange-500" },
    { time: "16:05", date: "May 12", title: "Incident Occurs", desc: "Reported time of theft. Mobile device powered off immediately.", icon: Clock, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Clock className="w-8 h-8 text-primary" /> Timeline Reconstruction
        </h1>
        <p className="text-muted-foreground mt-1">Upload disparate evidence files and let the AI automatically reconstruct the sequence of events.</p>
      </div>

      {!showTimeline ? (
        <div className="bg-card border border-border rounded-xl shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <UploadCloud className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Drop Evidence Files Here</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Upload FIR PDFs, witness transcripts (TXT), and CCTV metadata (CSV/JSON). The AI will extract timestamps and entities to build a chronological timeline.
          </p>
          
          <button 
            onClick={handleUpload}
            disabled={analyzing}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-wait"
          >
            {analyzing ? "Parsing 4 Files..." : "Simulate Evidence Upload"}
          </button>

          {analyzing && (
            <div className="mt-8 w-full max-w-md text-left text-sm text-muted-foreground space-y-2">
              <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Parsed FIR_092.pdf (Found 2 timestamps)</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Parsed Witness_Log.txt (Found 1 timestamp)</p>
              <p className="flex items-center gap-2 animate-pulse text-primary"><Clock className="w-4 h-4" /> Correlating events...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex justify-between items-center bg-card border border-border p-4 rounded-xl shadow-sm">
            <div>
              <h3 className="font-bold">Reconstruction Complete</h3>
              <p className="text-sm text-muted-foreground">4 key events extracted from 3 documents.</p>
            </div>
            <button onClick={() => setShowTimeline(false)} className="text-sm text-muted-foreground hover:text-foreground underline">
              Upload More Evidence
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm relative">
            <div className="absolute left-[47px] top-8 bottom-8 w-0.5 bg-border"></div>
            
            <div className="space-y-8">
              {timelineEvents.map((event, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="w-24 text-right pt-1 flex-shrink-0">
                    <div className="font-bold text-foreground">{event.time}</div>
                    <div className="text-xs text-muted-foreground">{event.date}</div>
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full ${event.color} text-white flex items-center justify-center flex-shrink-0 relative z-10 border-4 border-card`}>
                    <event.icon className="w-4 h-4" />
                  </div>
                  
                  <div className="bg-background border border-border rounded-lg p-4 flex-1 shadow-sm">
                    <h4 className="font-bold text-lg mb-1">{event.title}</h4>
                    <p className="text-muted-foreground text-sm">{event.desc}</p>
                    <div className="mt-3 pt-3 border-t border-border flex gap-2">
                      <span className="text-[10px] uppercase font-bold bg-muted px-2 py-1 rounded text-muted-foreground">AI Extracted</span>
                      <span className="text-[10px] uppercase font-bold bg-primary/10 text-primary px-2 py-1 rounded cursor-pointer hover:bg-primary/20">View Source File</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
