"use client";

import { useState } from "react";
import { UserCircle, Shield, Bell, Globe, Moon, Lock, Check } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { icon: UserCircle, label: "Profile" },
    { icon: Shield, label: "Security & Roles" },
    { icon: Bell, label: "Notifications" },
    { icon: Globe, label: "Language" },
    { icon: Moon, label: "Appearance" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="space-y-1">
          {tabs.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-left rounded-md transition-colors ${
                activeTab === item.label ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-6">
          {activeTab === "Profile" && (
            <>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                    <input type="text" defaultValue="Admin User" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Badge Number</label>
                    <input type="text" defaultValue="KSP-AD-001" disabled className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm opacity-70 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                    <input type="email" defaultValue="admin@ksp.gov.in" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "Security & Roles" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-destructive">
                <Lock className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Change Password</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
                </div>
                <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-destructive/90 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div>
                    <span className="font-medium text-sm">Email Alerts</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Receive daily case summaries</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                </label>
                <label className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div>
                    <span className="font-medium text-sm">SMS Alerts</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Urgent high-risk offender movement</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                </label>
              </div>
            </div>
          )}

          {activeTab === "Language" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Interface Language</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-primary bg-primary/5 rounded-lg">
                  <span className="font-medium text-sm">English (Default)</span>
                  <Check className="w-4 h-4 text-primary" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-sm text-muted-foreground">ಕನ್ನಡ (Kannada)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "Appearance" && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border border-primary bg-primary/5 rounded-lg flex flex-col items-center gap-2">
                  <Moon className="w-6 h-6 text-primary" />
                  <span className="font-medium text-sm">Dark Theme</span>
                </button>
                <button className="p-4 border border-border rounded-lg flex flex-col items-center gap-2 hover:bg-muted/50 transition-colors">
                  <Globe className="w-6 h-6 text-muted-foreground" />
                  <span className="font-medium text-sm text-muted-foreground">Light Theme</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
