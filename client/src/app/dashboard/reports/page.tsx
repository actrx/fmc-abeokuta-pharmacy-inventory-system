"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Package,
  ArrowLeftRight,
  AlertTriangle,
  FileText,
  ChevronDown,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", inbound: 4200, outbound: 3100 },
  { month: "Feb", inbound: 3800, outbound: 2900 },
  { month: "Mar", inbound: 5100, outbound: 4200 },
  { month: "Apr", inbound: 4600, outbound: 3800 },
  { month: "May", inbound: 5800, outbound: 4100 },
  { month: "Jun", inbound: 6200, outbound: 5400 },
];

const topDrugs = [
  { name: "Paracetamol 500mg", moved: 12400, pct: 95 },
  { name: "Amoxicillin 500mg", moved: 8900, pct: 72 },
  { name: "Metformin 850mg", moved: 7200, pct: 58 },
  { name: "Azithromycin 250mg", moved: 5100, pct: 41 },
  { name: "Vitamin C 1000mg", moved: 4800, pct: 39 },
];

const reportTypes = [
  { name: "Stock Summary Report", description: "Current stock levels across all departments", icon: Package, type: "PDF" },
  { name: "Transfer History", description: "All transfers with approval status and timeline", icon: ArrowLeftRight, type: "XLSX" },
  { name: "Expiry Forecast", description: "Drugs expiring within the next 90 days", icon: AlertTriangle, type: "PDF" },
  { name: "Consumption Report", description: "Drug consumption patterns and trend analysis", icon: TrendingUp, type: "CSV" },
];

export default function ReportsPage() {
  const [activePeriod, setActivePeriod] = useState("6M");

  const maxValue = Math.max(...monthlyData.map((d) => Math.max(d.inbound, d.outbound)));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-in-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Executive insights into your pharmacy operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-accent transition-colors">
            <Calendar className="w-3.5 h-3.5" />
            Last 6 months
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:brightness-110 transition-all">
            <Download className="w-3.5 h-3.5" />
            Export All
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-in-up" style={{ animationDelay: "100ms" }}>
        {[
          { label: "Total Inbound", value: "29,700", change: "+18.2%", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Total Outbound", value: "23,500", change: "+12.4%", icon: BarChart3, color: "text-primary" },
          { label: "Transfer Success", value: "94.3%", change: "+2.1%", icon: ArrowLeftRight, color: "text-violet-500" },
          { label: "Drugs Near Expiry", value: "8", change: "−3", icon: AlertTriangle, color: "text-amber-500" },
        ].map((kpi) => (
          <div key={kpi.label} className="surface-elevated p-4">
            <div className="flex items-center justify-between mb-2">
              <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold tracking-tight">{kpi.value}</p>
            <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart — 2 cols */}
        <div className="lg:col-span-2 surface-elevated p-6 animate-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold">Inventory Flow</h3>
              <p className="text-xs text-muted-foreground">Inbound vs outbound stock movement</p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
              {["1M", "3M", "6M", "1Y"].map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-medium transition-all",
                    activePeriod === p
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-4 h-56">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end gap-1 h-48">
                  <div
                    className="flex-1 rounded-t-md bg-primary/80 transition-all duration-500 hover:bg-primary"
                    style={{ height: `${(d.inbound / maxValue) * 100}%` }}
                  />
                  <div
                    className="flex-1 rounded-t-md bg-primary/20 transition-all duration-500 hover:bg-primary/30"
                    style={{ height: `${(d.outbound / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{d.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary/80" /> Inbound</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary/20" /> Outbound</span>
          </div>
        </div>

        {/* Top Drugs — 1 col */}
        <div className="surface-elevated p-6 animate-in-up" style={{ animationDelay: "300ms" }}>
          <h3 className="text-base font-semibold mb-4">Top Moving Drugs</h3>
          <div className="space-y-4">
            {topDrugs.map((drug, i) => (
              <div key={drug.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{drug.name}</span>
                  <span className="text-xs text-muted-foreground">{drug.moved.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-700"
                    style={{ width: `${drug.pct}%`, transitionDelay: `${i * 100}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Downloads */}
      <div className="animate-in-up" style={{ animationDelay: "400ms" }}>
        <h3 className="text-base font-semibold mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reportTypes.map((report) => (
            <div key={report.name} className="surface-interactive p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <report.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{report.name}</p>
                <p className="text-xs text-muted-foreground truncate">{report.description}</p>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-[11px] font-medium hover:bg-accent transition-colors flex-shrink-0">
                <Download className="w-3 h-3" />
                {report.type}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
