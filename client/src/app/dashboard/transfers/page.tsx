"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  XCircle,
  Truck,
  Package,
  Building2,
  ArrowLeftRight,
  Filter,
} from "lucide-react";

const statusConfig = {
  Pending: { color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10", dot: "bg-amber-500", icon: Clock },
  Approved: { color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10", dot: "bg-blue-500", icon: CheckCircle2 },
  "In Transit": { color: "text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-500/10", dot: "bg-violet-500", icon: Truck },
  Delivered: { color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10", dot: "bg-emerald-500", icon: CheckCircle2 },
  Rejected: { color: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10", dot: "bg-red-500", icon: XCircle },
};

type TransferStatus = keyof typeof statusConfig;

const transfers = [
  { id: "TRF-0042", from: "Main Store", to: "Sub Store", items: 3, units: 500, status: "Pending" as TransferStatus, date: "2026-05-09", by: "John Doe" },
  { id: "TRF-0041", from: "Sub Store", to: "Outpatient Dispensary", items: 5, units: 200, status: "Delivered" as TransferStatus, date: "2026-05-08", by: "Jane Smith" },
  { id: "TRF-0040", from: "Main Store", to: "Sub Store", items: 2, units: 1000, status: "Approved" as TransferStatus, date: "2026-05-08", by: "John Doe" },
  { id: "TRF-0039", from: "Sub Store", to: "Outpatient Dispensary", items: 1, units: 50, status: "In Transit" as TransferStatus, date: "2026-05-07", by: "Jane Smith" },
  { id: "TRF-0038", from: "Main Store", to: "Sub Store", items: 4, units: 750, status: "Rejected" as TransferStatus, date: "2026-05-06", by: "John Doe" },
  { id: "TRF-0037", from: "Sub Store", to: "Outpatient Dispensary", items: 2, units: 120, status: "Delivered" as TransferStatus, date: "2026-05-05", by: "Alice Johnson" },
];

const filterTabs = ["All", "Pending", "Approved", "In Transit", "Delivered", "Rejected"];

/* ───── Transfer Stepper ───── */
function TransferStepper() {
  const steps = ["Select Items", "Choose Facility", "Review", "Submit"];
  const current = 0;

  return (
    <div className="surface-elevated p-6 animate-in-up">
      <h3 className="text-base font-semibold mb-6">New Transfer</h3>
      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  i <= current
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {i + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block",
                  i <= current ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-[2px] rounded-full transition-all",
                  i < current ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function TransfersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showNewTransfer, setShowNewTransfer] = useState(false);

  const filtered = transfers.filter(
    (t) => activeFilter === "All" || t.status === activeFilter
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-in-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transfers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage drug transfers between departments
          </p>
        </div>
        <button
          onClick={() => setShowNewTransfer(!showNewTransfer)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg glow-primary hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Transfer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 animate-in-up" style={{ animationDelay: "100ms" }}>
        {[
          { label: "Total Transfers", value: "142", icon: ArrowLeftRight, color: "text-primary" },
          { label: "Pending", value: "14", icon: Clock, color: "text-amber-500" },
          { label: "In Transit", value: "3", icon: Truck, color: "text-violet-500" },
          { label: "Delivered", value: "118", icon: CheckCircle2, color: "text-emerald-500" },
          { label: "Rejected", value: "7", icon: XCircle, color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="surface-elevated px-4 py-3 flex items-center gap-3">
            <s.icon className={cn("w-5 h-5", s.color)} />
            <div>
              <p className="text-lg font-bold tracking-tight">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stepper */}
      {showNewTransfer && <TransferStepper />}

      {/* Filters */}
      <div className="flex items-center gap-3 animate-in-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                activeFilter === tab
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-accent transition-colors">
          <Filter className="w-3.5 h-3.5" />
          More Filters
        </button>
      </div>

      {/* Transfer Cards */}
      <div className="space-y-3 animate-in-up" style={{ animationDelay: "300ms" }}>
        {filtered.map((transfer) => {
          const config = statusConfig[transfer.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={transfer.id}
              className="surface-interactive p-5 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center">
                    <ArrowLeftRight className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{transfer.id}</p>
                    <p className="text-xs text-muted-foreground">Initiated by {transfer.by}</p>
                  </div>
                </div>
                <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold", config.color)}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
                  {transfer.status}
                </span>
              </div>

              {/* Flow */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary flex-1">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium">{transfer.from}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary flex-1">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium">{transfer.to}</span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" />
                  {transfer.items} items · {transfer.units.toLocaleString()} units
                </span>
                <span>{transfer.date}</span>
                {transfer.status === "Pending" && (
                  <div className="ml-auto flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg bg-emerald-500 text-white text-[11px] font-semibold hover:bg-emerald-600 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 rounded-lg border border-border text-[11px] font-medium hover:bg-accent transition-colors">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
