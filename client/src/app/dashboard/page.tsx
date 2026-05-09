"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Package,
  AlertTriangle,
  Clock,
  ArrowLeftRight,
  Building2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Activity,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

/* ───── Animated Counter ───── */
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / end), 16);
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime));
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display.toLocaleString()}</>;
}

/* ───── Stat Card ───── */
function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  accent,
  delay,
}: {
  label: string;
  value: number;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: React.ElementType;
  accent: string;
  delay: number;
}) {
  return (
    <div
      className="surface-interactive p-5 group animate-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            accent
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
            changeType === "up" && "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10",
            changeType === "down" && "text-red-500 bg-red-50 dark:text-red-400 dark:bg-red-500/10",
            changeType === "neutral" && "text-muted-foreground bg-secondary"
          )}
        >
          {changeType === "up" ? (
            <TrendingUp className="w-3 h-3" />
          ) : changeType === "down" ? (
            <TrendingDown className="w-3 h-3" />
          ) : null}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold tracking-tight mb-1">
        <AnimatedNumber value={value} />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

/* ───── Activity Item ───── */
function ActivityItem({
  title,
  description,
  time,
  type,
}: {
  title: string;
  description: string;
  time: string;
  type: "transfer" | "alert" | "stock" | "system";
}) {
  const colors = {
    transfer: "bg-primary/10 text-primary",
    alert: "bg-amber-500/10 text-amber-500",
    stock: "bg-emerald-500/10 text-emerald-500",
    system: "bg-violet-500/10 text-violet-500",
  };
  const icons = {
    transfer: ArrowLeftRight,
    alert: AlertTriangle,
    stock: Package,
    system: ShieldCheck,
  };
  const Icon = icons[type];

  return (
    <div className="flex items-start gap-3 py-3 group">
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
          colors[type]
        )}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <span className="text-[11px] text-muted-foreground flex-shrink-0 pt-0.5">
        {time}
      </span>
    </div>
  );
}

/* ───── Quick Action ───── */
function QuickAction({
  label,
  icon: Icon,
  accent,
}: {
  label: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <button
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50",
        "hover:border-border hover:shadow-sm transition-all duration-200",
        "bg-card"
      )}
    >
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", accent)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </button>
  );
}

/* ───── Main Dashboard ───── */
export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <div className="animate-in-up">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Good evening, <span className="text-gradient">Admin</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s what&apos;s happening across your pharmacy network today.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
            <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Inventory" value={12847} change="+12.5%" changeType="up" icon={Package} accent="bg-gradient-to-br from-primary to-blue-600" delay={100} />
        <StatCard label="Low Stock Alerts" value={23} change="+3" changeType="down" icon={AlertTriangle} accent="bg-gradient-to-br from-amber-500 to-orange-500" delay={200} />
        <StatCard label="Expiring Soon" value={8} change="−2" changeType="up" icon={Clock} accent="bg-gradient-to-br from-red-500 to-rose-500" delay={300} />
        <StatCard label="Pending Transfers" value={14} change="5 new" changeType="neutral" icon={ArrowLeftRight} accent="bg-gradient-to-br from-violet-500 to-purple-600" delay={400} />
        <StatCard label="Active Facilities" value={3} change="100%" changeType="up" icon={Building2} accent="bg-gradient-to-br from-emerald-500 to-teal-500" delay={500} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area — 2 cols */}
        <div className="lg:col-span-2 surface-elevated p-6 animate-in-up" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold">Inventory Overview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Stock movement over the last 30 days</p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
              <button className="px-3 py-1 rounded-md text-xs font-medium bg-card shadow-sm">7D</button>
              <button className="px-3 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">30D</button>
              <button className="px-3 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">90D</button>
            </div>
          </div>

          {/* Chart placeholder — clean bars */}
          <div className="flex items-end gap-2 h-48">
            {[65, 45, 78, 52, 90, 68, 85, 72, 95, 60, 82, 55, 75, 88, 62, 70, 80, 58, 92, 74, 86, 50, 77, 69].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-primary/15 dark:bg-primary/20 relative group transition-all duration-300 hover:bg-primary/25" style={{ height: `${h}%` }}>
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t from-primary to-primary/70 transition-all duration-500"
                  style={{ height: `${h * 0.6}%`, animationDelay: `${i * 40}ms` }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-primary" /> Inbound
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-primary/20" /> Outbound
            </span>
          </div>
        </div>

        {/* Activity Feed — 1 col */}
        <div className="surface-elevated p-6 animate-in-up" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Recent Activity</h3>
            <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-border/50">
            <ActivityItem title="Transfer #TRF-0042 Approved" description="500 units of Paracetamol moved to Sub Store" time="2m ago" type="transfer" />
            <ActivityItem title="Low Stock: Amoxicillin 500mg" description="Current stock below reorder level (200)" time="15m ago" type="alert" />
            <ActivityItem title="New Batch Received" description="PARA-002 added to Main Store inventory" time="1h ago" type="stock" />
            <ActivityItem title="System Backup Complete" description="Daily database backup succeeded" time="3h ago" type="system" />
            <ActivityItem title="Transfer #TRF-0041 Delivered" description="Dispensary confirmed receipt of 100 units" time="5h ago" type="transfer" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="animate-in-up" style={{ animationDelay: "500ms" }}>
        <h3 className="text-base font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickAction label="New Transfer" icon={ArrowLeftRight} accent="bg-gradient-to-br from-primary to-blue-600" />
          <QuickAction label="Add Stock" icon={Package} accent="bg-gradient-to-br from-emerald-500 to-teal-500" />
          <QuickAction label="View Reports" icon={BarChart3} accent="bg-gradient-to-br from-violet-500 to-purple-600" />
          <QuickAction label="Manage Facilities" icon={Building2} accent="bg-gradient-to-br from-amber-500 to-orange-500" />
        </div>
      </div>
    </div>
  );
}
