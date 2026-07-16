"use client";

import { useState } from "react";
import { BrainCircuit, Search, FileText, Bot, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function CopilotPage() {
  const [query, setQuery] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setAnalyzing(true);
    setResults(null);

    // Mock Palantir-style multi-document analysis
    setTimeout(() => {
      setAnalyzing(false);
      setResults({
        summary: "Analysis complete. I have cross-referenced your query against 14,203 historical FIRs, recent CCTV metadata, and active gang profiles.",
        findings: [
          "3 cases have matching modus operandi (Entry via roof tiles).",
          "Same vehicle type (White Omni) detected near 2 of 3 crime scenes.",
          "Geographic cluster identified in South East Division."
        ],
        confidence: 87,
        suspects: ["Alias 'Seena' (Gang ID: G-84)"],
        actions: [
          "Monitor hotspot locations identified in sector grid A4.",
          "Investigate known associates of 'Seena' in the area.",
          "Request ALPR (Automatic License Plate Recognition) logs for White Omni vans on Outer Ring Road between 2AM-4AM."
        ]
      });
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-primary" /> AI Investigation Copilot
        </h1>
        <p className="text-muted-foreground mt-1">Multi-document reasoning and advanced pattern recognition engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Column: Input and Evidence Select */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="font-semibold text-lg mb-2">Investigation Query</h3>
            <form onSubmit={handleAnalyze}>
              <textarea
                className="w-full bg-background border border-border rounded-lg p-3 text-sm outline-none focus:border-primary resize-none min-h-[120px]"
                placeholder="e.g., Analyze the last 10 vehicle theft cases in Bengaluru. Look for MO similarities and correlate with recent parolees."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={!query.trim() || analyzing}
                className="w-full mt-3 bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {analyzing ? <span className="animate-pulse">Processing Intelligence...</span> : <><Search className="w-4 h-4" /> Run Deep Analysis</>}
              </button>
            </form>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="font-semibold text-sm mb-3">Data Sources Included</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-primary" /> FIR Database (2010 - Present)</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-primary" /> Known Offender Profiles</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-primary" /> Interrogation Transcripts</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-primary" /> CCTV Metadata Logs</label>
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis Output */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-border rounded-xl shadow-lg flex flex-col overflow-hidden relative">
          <div className="p-4 border-b border-border bg-card/50 flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <span className="font-semibold">Copilot Intelligence Report</span>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {analyzing ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                <BrainCircuit className="w-16 h-16 text-primary animate-pulse" />
                <p className="text-lg">Correlating cross-district records...</p>
                <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/2 animate-[pulse_1s_ease-in-out_infinite] rounded-full"></div>
                </div>
              </div>
            ) : results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg text-primary">
                  <p>{results.summary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Findings */}
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-bold mb-3 border-b border-border pb-2 flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-500" /> Key Findings
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {results.findings.map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suspects & Confidence */}
                  <div className="bg-card border border-border rounded-lg p-4 flex flex-col">
                    <h4 className="font-bold mb-3 border-b border-border pb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" /> Probable Suspects
                    </h4>
                    <div className="flex-1">
                      {results.suspects.map((s: string, i: number) => (
                        <div key={i} className="bg-destructive/10 border border-destructive/20 text-destructive px-3 py-2 rounded text-sm font-medium">
                          {s}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-sm font-bold text-muted-foreground">AI Confidence Score</span>
                      <span className="text-2xl font-black text-green-500">{results.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Actions */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-bold mb-3 border-b border-border pb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Recommended Actions
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {results.actions.map((a: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 bg-muted/50 p-3 rounded border border-border/50">
                        <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">{i+1}</div>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Explainable AI block */}
                <div className="text-xs text-muted-foreground border border-border border-dashed p-3 rounded">
                  <span className="font-bold text-foreground">Explainable AI Trace:</span>{" "}
                  Prediction generated using XGBoost ensemble on historical temporal-spatial crime data, combined with LLM semantic similarity matching on FIR text narratives (Cosine Similarity {'>'}= 0.82).
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50 text-center p-8">
                <FileText className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">Awaiting Instructions</h3>
                <p className="max-w-md">Enter a complex query on the left. The Copilot will analyze thousands of documents to find patterns human analysts might miss.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
