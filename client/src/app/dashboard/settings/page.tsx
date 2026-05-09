"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  User,
  Palette,
  Shield,
  Bell as BellIcon,
  Building2,
  Sun,
  Moon,
  Monitor,
  Check,
} from "lucide-react";

const tabs = [
  { name: "Profile", icon: User },
  { name: "Appearance", icon: Palette },
  { name: "Notifications", icon: BellIcon },
  { name: "Security", icon: Shield },
  { name: "Organization", icon: Building2 },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Appearance");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account and application preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-52 flex-shrink-0 animate-in-up" style={{ animationDelay: "100ms" }}>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible p-1 lg:p-0 rounded-xl lg:rounded-none bg-secondary lg:bg-transparent">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                  activeTab === tab.name
                    ? "bg-card lg:bg-primary/10 text-foreground lg:text-primary shadow-sm lg:shadow-none"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 animate-in-up" style={{ animationDelay: "200ms" }}>
          {activeTab === "Appearance" && mounted && (
            <div className="surface-elevated p-6 space-y-8">
              <div>
                <h3 className="text-base font-semibold mb-1">Theme</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Select your preferred color scheme
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "light", label: "Light", icon: Sun, preview: "bg-white border-gray-200" },
                    { value: "dark", label: "Dark", icon: Moon, preview: "bg-gray-900 border-gray-700" },
                    { value: "system", label: "System", icon: Monitor, preview: "bg-gradient-to-br from-white to-gray-900 border-gray-400" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTheme(opt.value)}
                      className={cn(
                        "relative p-4 rounded-xl border-2 transition-all duration-200",
                        theme === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/80 hover:bg-accent"
                      )}
                    >
                      {theme === opt.value && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className={cn("w-full h-12 rounded-lg border mb-3", opt.preview)} />
                      <div className="flex items-center gap-2">
                        <opt.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/50 pt-6">
                <h3 className="text-base font-semibold mb-1">Accent Color</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Choose your brand accent
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { color: "bg-blue-500", name: "Royal Blue" },
                    { color: "bg-violet-500", name: "Violet" },
                    { color: "bg-emerald-500", name: "Emerald" },
                    { color: "bg-rose-500", name: "Rose" },
                    { color: "bg-amber-500", name: "Amber" },
                    { color: "bg-cyan-500", name: "Cyan" },
                  ].map((c, i) => (
                    <button
                      key={c.name}
                      className={cn(
                        "w-8 h-8 rounded-full transition-all duration-200 hover:scale-110",
                        c.color,
                        i === 0 && "ring-2 ring-offset-2 ring-offset-background ring-primary"
                      )}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Profile" && (
            <div className="surface-elevated p-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Full Name</label>
                    <input defaultValue="System Admin" className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Email</label>
                    <input defaultValue="admin@nhia.gov.ng" className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Role</label>
                    <input defaultValue="Admin" disabled className="w-full px-3 py-2 rounded-xl border border-border bg-secondary text-sm text-muted-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Department</label>
                    <input defaultValue="Main Store" disabled className="w-full px-3 py-2 rounded-xl border border-border bg-secondary text-sm text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab !== "Appearance" && activeTab !== "Profile" && (
            <div className="surface-elevated p-6 flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                  {tabs.find((t) => t.name === activeTab)?.icon && (
                    <div className="w-6 h-6 text-muted-foreground">
                      {React.createElement(tabs.find((t) => t.name === activeTab)!.icon, { className: "w-6 h-6" })}
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium">{activeTab} Settings</p>
                <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
