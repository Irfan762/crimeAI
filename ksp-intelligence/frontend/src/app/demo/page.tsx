"use client";

import React, { useState, useEffect } from "react";

export default function DemoPage() {
  const [demoData, setDemoData] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/demo/workflow")
      .then((res) => res.json())
      .then((data) => setDemoData(data.demo_data));
  }, []);

  const handleMicClick = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setStep(1); // Move to voice copilot result
    }, 2000);
  };

  if (!demoData) return <div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-white">Loading Demo Modules...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 p-8 font-sans overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="mb-12 text-center relative z-10">
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">
          KSP AI Intelligence - Demo
        </h1>
        <p className="text-gray-400 text-lg">Integrated Hackathon Workflow (3 Minutes)</p>
      </header>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Step Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          {["Copilot", "Timeline", "Network", "Forecast", "Summary"].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setStep(idx)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                step >= idx ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Step {idx + 1}: {label}
            </button>
          ))}
        </div>

        {/* STEP 1: Voice Copilot */}
        {step === 0 && (
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              🎙️ Voice Investigation Copilot
            </h2>
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-700 rounded-2xl bg-black/40">
              <button 
                onClick={handleMicClick}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? "bg-red-500 animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.6)] scale-110" : "bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]"}`}
              >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              </button>
              <p className="mt-6 text-xl text-gray-300 font-light tracking-wide">
                {isRecording ? "Listening to investigation notes..." : "Click to speak an investigation note"}
              </p>
            </div>
          </div>
        )}

        {/* STEP 1b: Voice Result & Entities */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="bg-gray-900/60 backdrop-blur-xl border border-indigo-500/30 p-8 rounded-3xl shadow-[0_0_30px_rgba(79,70,229,0.15)]">
              <h3 className="text-xl font-semibold text-indigo-400 mb-4">Transcription & AI Response</h3>
              <div className="bg-black/50 p-6 rounded-2xl border border-gray-800 mb-4 text-gray-200 text-lg leading-relaxed italic">
                "{demoData.voice_copilot.transcript}"
              </div>
              <div className="bg-indigo-900/20 p-6 rounded-2xl border border-indigo-800/50 text-indigo-200">
                <span className="font-bold">AI Assistant:</span> {demoData.voice_copilot.ai_response}
              </div>
              <button className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-colors w-full" onClick={() => setStep(2)}>
                Generate Timeline &rarr;
              </button>
            </div>
            
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Extracted Entities (Memory)</h3>
              <div className="space-y-4">
                {demoData.voice_copilot.extracted_entities.map((e: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-900/50 text-blue-400 px-3 py-1 rounded-lg text-sm font-medium">{e.type}</div>
                      <span className="text-lg font-medium">{e.entity}</span>
                    </div>
                    <div className="text-green-400 font-mono text-sm">{(e.confidence * 100).toFixed(0)}% Conf</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Timeline Generator */}
        {step === 2 && (
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl animate-in slide-in-from-right-8 fade-in duration-500">
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              ⏳ Investigation Timeline Generator
            </h2>
            <div className="relative border-l-2 border-indigo-600 ml-6 space-y-12 pb-4">
              {demoData.timeline.map((item: any, idx: number) => (
                <div key={idx} className="relative pl-10 group">
                  <div className="absolute -left-[11px] top-1 w-5 h-5 bg-black border-2 border-indigo-500 rounded-full group-hover:bg-indigo-500 transition-colors shadow-[0_0_10px_rgba(79,70,229,0.8)]"></div>
                  <div className="text-sm font-mono text-indigo-400 mb-1">{item.time}</div>
                  <div className="bg-black/50 p-5 rounded-2xl border border-gray-800 group-hover:border-indigo-500/50 transition-all text-lg font-medium text-gray-200">
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors" onClick={() => setStep(3)}>
                Run Network Analysis &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Network Intelligence & Explainable AI */}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in zoom-in-95 fade-in duration-500">
            <div className="lg:col-span-2 bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl">
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                🕸️ Criminal Network Intelligence
              </h2>
              <div className="h-[400px] bg-black/60 rounded-2xl border border-gray-800 flex items-center justify-center relative overflow-hidden">
                {/* Mocked Graph Visualization */}
                <div className="absolute top-10 left-10 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)]">Suspect A</div>
                <div className="absolute top-10 right-10 p-4 bg-green-900/30 border border-green-500/50 rounded-xl text-green-200 font-bold">Phone Z</div>
                <div className="absolute bottom-10 left-[40%] p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl text-blue-200 font-bold">Vehicle Y (Scooter)</div>
                <div className="absolute top-[40%] right-10 p-4 bg-purple-900/30 border border-purple-500/50 rounded-xl text-purple-200 font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)]">Gang X</div>
                
                {/* Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 0}}>
                  <line x1="15%" y1="20%" x2="45%" y2="80%" stroke="#4f46e5" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                  <line x1="55%" y1="80%" x2="85%" y2="45%" stroke="#ef4444" strokeWidth="2" />
                  <line x1="15%" y1="15%" x2="80%" y2="15%" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            <div className="bg-gray-900/60 backdrop-blur-xl border border-blue-500/30 p-8 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Explainable AI (XAI)
              </h3>
              <div className="bg-blue-900/20 p-6 rounded-2xl border border-blue-800/50 text-blue-100 flex-grow text-lg leading-relaxed">
                {demoData.network_intelligence.ai_explanation}
              </div>
              <button className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition-colors" onClick={() => setStep(4)}>
                Generate Forecast &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Forecast & Summary */}
        {step === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="bg-gray-900/60 backdrop-blur-xl border border-red-500/30 p-8 rounded-3xl shadow-[0_0_40px_rgba(239,68,68,0.15)]">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                🔥 Crime Hotspot Forecasting
              </h2>
              <div className="space-y-4">
                <div className="bg-black/40 p-4 rounded-xl border border-gray-800">
                  <p className="text-gray-400 text-sm mb-1">Predicted Hotspot</p>
                  <p className="text-2xl font-bold text-white">{demoData.crime_forecast.hotspot}</p>
                </div>
                <div className="bg-red-900/30 p-4 rounded-xl border border-red-800/50 flex justify-between items-center">
                  <span className="text-red-200 font-medium">Risk Level</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-md font-bold">{demoData.crime_forecast.risk_level}</span>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">Explainable Reasoning</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {demoData.crime_forecast.explainable_reasoning.map((r: string, i: number) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  📄 AI Case Summary
                </h2>
                <div className="bg-black/50 p-6 rounded-2xl border border-gray-700 text-gray-200 leading-relaxed mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">{demoData.case_summary.title}</h3>
                  <p>{demoData.case_summary.content}</p>
                </div>
                
                <div className="bg-indigo-900/20 p-5 rounded-2xl border border-indigo-800/50">
                  <p className="text-indigo-300 text-sm font-medium mb-2">Sociological Insights</p>
                  <p className="text-gray-300 text-sm italic">"{demoData.sociological_insights.policy_recommendation}"</p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all hover:scale-105">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  Export Commissioner PDF Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
