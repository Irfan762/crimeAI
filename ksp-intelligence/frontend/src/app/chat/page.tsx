"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Languages, FileDown, PlusCircle, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Namaskara! I am the KSP Crime Intelligence Assistant. How can I assist with your investigation today?\n\nYou can ask me things like:\n- *Show me burglary hotspots in Koramangala.*\n- *Analyze the network of alias 'Seena'.*\n- *Predict crime trends for next month.*"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock API response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on the intelligence database, I have processed your query. **This is a mock response** since the FastAPI backend is not yet fully connected.\n\nHere are some key insights:\n1. Increase in property crimes reported at 2 AM.\n2. Primary modus operandi matches gang ID `G-84`.\n\nWould you like me to generate a detailed report?"
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className="flex h-full gap-6">
      {/* Sidebar for Chat History */}
      <div className="hidden lg:flex w-64 bg-card border border-border rounded-xl flex-col shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <button className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors">
            <PlusCircle className="w-4 h-4" /> New Investigation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground px-2 py-2">Today</div>
          <button className="w-full text-left px-3 py-2 text-sm text-foreground bg-muted/50 rounded-md truncate">
            Burglary Hotspots Koramangala
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-muted/30 rounded-md truncate">
            Gang ID G-84 Network
          </button>
          <div className="text-xs font-semibold text-muted-foreground px-2 py-2 mt-4">Previous 7 Days</div>
          <button className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-muted/30 rounded-md truncate">
            Vehicle Theft Trends Q2
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-card border border-border rounded-xl flex flex-col shadow-sm overflow-hidden relative">
        {/* Top Chat Toolbar */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-background/50">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">KSP Intelligence AI</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors tooltip" title="Toggle Kannada/English">
              <Languages className="w-4 h-4" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Export as PDF">
              <FileDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary/20 text-primary'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`px-4 py-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 border border-border text-foreground'}`}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap m-0">{msg.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 max-w-3xl">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="px-4 py-3 rounded-lg bg-muted/50 border border-border flex items-center gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background/50 border-t border-border">
          <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex items-end gap-2">
            <div className="relative flex-1 bg-muted/50 border border-border rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the intelligence database..."
                className="w-full bg-transparent border-none outline-none resize-none p-4 min-h-[56px] max-h-32 text-sm pb-12"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <button type="button" className="p-2 text-muted-foreground hover:text-foreground bg-background rounded-md shadow-sm border border-border transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                <button type="submit" disabled={!input.trim()} className="p-2 bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
          <div className="text-center mt-2">
            <p className="text-[10px] text-muted-foreground">AI can make mistakes. All intelligence should be verified manually against standard police records.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
