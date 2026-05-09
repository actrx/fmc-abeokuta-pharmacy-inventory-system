"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  ArrowLeftRight,
  Package,
  Clock,
  ShieldCheck,
  X,
} from "lucide-react";

type Priority = "critical" | "warning" | "info" | "success";

const notifications = [
  { id: 1, title: "Critical: Stock Depleted", description: "Amoxicillin 500mg has reached 0 units in Sub Store.", time: "2 min ago", priority: "critical" as Priority, read: false },
  { id: 2, title: "Transfer #TRF-0042 Awaiting Approval", description: "500 units of Paracetamol from Main Store to Sub Store needs your approval.", time: "15 min ago", priority: "warning" as Priority, read: false },
  { id: 3, title: "Batch PARA-002 Received", description: "New batch of 3000 units added to Main Store inventory.", time: "1 hour ago", priority: "success" as Priority, read: false },
  { id: 4, title: "Expiry Alert: Lisinopril 10mg", description: "Batch LIS-012 expires on 2026-07-01. 340 units remaining.", time: "3 hours ago", priority: "warning" as Priority, read: true },
  { id: 5, title: "Transfer #TRF-0041 Delivered", description: "Outpatient Dispensary confirmed receipt of 200 units.", time: "5 hours ago", priority: "info" as Priority, read: true },
  { id: 6, title: "System Maintenance Complete", description: "Database backup and optimization completed successfully.", time: "8 hours ago", priority: "info" as Priority, read: true },
  { id: 7, title: "New User Added", description: "Dr. Okafor has been added as Sub Store Officer.", time: "1 day ago", priority: "success" as Priority, read: true },
];

const priorityConfig = {
  critical: { color: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10", icon: AlertTriangle, border: "border-l-red-500" },
  warning: { color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10", icon: Clock, border: "border-l-amber-500" },
  info: { color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10", icon: Bell, border: "border-l-blue-500" },
  success: { color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10", icon: CheckCircle2, border: "border-l-emerald-500" },
};

const filterTabs = ["All", "Unread", "Critical", "Warnings", "Info"];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = notifications.filter((n) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return !n.read;
    if (activeFilter === "Critical") return n.priority === "critical";
    if (activeFilter === "Warnings") return n.priority === "warning";
    if (activeFilter === "Info") return n.priority === "info" || n.priority === "success";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-in-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unreadCount} unread notifications
          </p>
        </div>
        <button className="text-xs text-primary font-medium hover:underline">
          Mark all as read
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary w-fit animate-in-up" style={{ animationDelay: "100ms" }}>
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
            {tab === "Unread" && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div className="space-y-2 animate-in-up" style={{ animationDelay: "200ms" }}>
        {filtered.map((notification) => {
          const config = priorityConfig[notification.priority];
          const Icon = config.icon;

          return (
            <div
              key={notification.id}
              className={cn(
                "surface-interactive p-4 flex items-start gap-3 border-l-[3px]",
                config.border,
                !notification.read && "bg-primary/[0.02] dark:bg-primary/[0.03]"
              )}
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", config.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("text-sm font-semibold", !notification.read && "text-foreground")}>
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {notification.description}
                </p>
                <span className="text-[11px] text-muted-foreground/60 mt-1.5 block">
                  {notification.time}
                </span>
              </div>
              <button className="p-1 rounded-md text-muted-foreground/40 hover:text-muted-foreground hover:bg-accent transition-all opacity-0 group-hover:opacity-100">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
