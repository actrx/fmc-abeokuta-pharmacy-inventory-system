"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Building2,
  MapPin,
  Phone,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  Activity,
} from "lucide-react";

const facilities = [
  {
    name: "Main Store",
    type: "Main Store",
    location: "FMC Abeokuta, Block A",
    phone: "+234 803 123 4567",
    healthScore: 96,
    totalItems: 8200,
    lowStock: 5,
    staff: 4,
    status: "Active",
  },
  {
    name: "Sub Store",
    type: "Sub Store",
    location: "FMC Abeokuta, Block C",
    phone: "+234 803 234 5678",
    healthScore: 82,
    totalItems: 3100,
    lowStock: 12,
    staff: 3,
    status: "Active",
  },
  {
    name: "Outpatient Dispensary",
    type: "Dispensary",
    location: "FMC Abeokuta, Outpatient Wing",
    phone: "+234 803 345 6789",
    healthScore: 74,
    totalItems: 1547,
    lowStock: 6,
    staff: 5,
    status: "Active",
  },
];

function HealthScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 90
      ? "text-emerald-500"
      : score >= 75
        ? "text-amber-500"
        : "text-red-500";

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          className="stroke-border"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          className={cn("transition-all duration-1000", color)}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("text-base font-bold", color)}>{score}</span>
      </div>
    </div>
  );
}

export default function FacilitiesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-in-up">
        <h1 className="text-2xl font-bold tracking-tight">Facilities</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Monitor department health and capacity
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-in-up" style={{ animationDelay: "100ms" }}>
        {[
          { label: "Total Departments", value: "3", icon: Building2, color: "text-primary" },
          { label: "Total Staff", value: "12", icon: Users, color: "text-violet-500" },
          { label: "Average Health", value: "84%", icon: Activity, color: "text-emerald-500" },
          { label: "Low Stock Items", value: "23", icon: AlertTriangle, color: "text-amber-500" },
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

      {/* Facility Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {facilities.map((facility, i) => (
          <div
            key={facility.name}
            className="surface-interactive p-6 animate-in-up"
            style={{ animationDelay: `${200 + i * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    {facility.type}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {facility.status}
                  </span>
                </div>
                <h3 className="text-base font-bold">{facility.name}</h3>
              </div>
              <HealthScoreRing score={facility.healthScore} />
            </div>

            {/* Details */}
            <div className="space-y-2.5 mb-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {facility.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-3.5 h-3.5" />
                {facility.phone}
              </div>
            </div>

            {/* Capacity indicators */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
              <div className="text-center">
                <Package className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm font-bold">{facility.totalItems.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">Items</p>
              </div>
              <div className="text-center">
                <AlertTriangle className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                <p className="text-sm font-bold">{facility.lowStock}</p>
                <p className="text-[10px] text-muted-foreground">Low Stock</p>
              </div>
              <div className="text-center">
                <Users className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm font-bold">{facility.staff}</p>
                <p className="text-[10px] text-muted-foreground">Staff</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
