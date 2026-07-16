"use client";

import React, { useState } from 'react';
import { Mic, Search, Bot, X, FileText } from 'lucide-react';

export function CopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<{answer: string, sources: string[]} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8000/copilot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, case_id: null }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ answer: "Sorry, I couldn't reach the Copilot service.", sources: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBriefing = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8000/copilot/briefing', { method: 'POST' });
      const data = await res.json();
      setResponse({ answer: data.briefing, sources: ["AIReport"] });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center group z-50"
      >
        <Bot size={28} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap group-hover:ml-3 font-semibold">
          Copilot
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white dark:bg-slate-900 border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-semibold">
          <Bot size={20} />
          Voice Investigation Copilot
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto max-h-[400px] bg-slate-50 dark:bg-slate-950 flex flex-col gap-4">
        {response ? (
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border text-sm">
            <div className="whitespace-pre-wrap">{response.answer}</div>
            {response.sources && response.sources.length > 0 && (
              <div className="mt-2 pt-2 border-t text-xs text-slate-500">
                Sources: {response.sources.join(', ')}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-slate-500 text-sm mt-10">
            <Bot size={48} className="mx-auto mb-4 text-slate-300" />
            <p>Ask me anything about your cases, suspects, or evidence.</p>
          </div>
        )}
        
        {isLoading && (
          <div className="text-center text-slate-500 text-sm animate-pulse">
            Thinking...
          </div>
        )}
      </div>

      <div className="p-3 border-t bg-white dark:bg-slate-900">
        <div className="flex gap-2 mb-2">
          <button 
            onClick={handleBriefing}
            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium py-2 rounded flex items-center justify-center gap-1 transition"
          >
            <FileText size={14} />
            Daily Briefing
          </button>
        </div>
        <form onSubmit={handleQuery} className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Copilot..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-sm"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
            <Search size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
