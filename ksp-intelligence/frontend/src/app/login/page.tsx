"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role || "Investigator");
      router.push("/");
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary/10 p-8 flex flex-col items-center justify-center border-b border-border">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <ShieldAlert className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">KSP Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">Authorized Personnel Only</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="p-3 text-sm bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Badge Number or Username"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Authenticate
          </button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Unauthorized access is strictly prohibited and monitored.
          </p>
        </form>
      </div>
    </div>
  );
}
