"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  Download,
  Plus,
  Package,
  AlertTriangle,
  Clock,
  ChevronDown,
  MoreHorizontal,
  ArrowUpDown,
} from "lucide-react";

const categories = ["All Items", "Analgesics", "Antibiotics", "Antivirals", "Cardiovascular", "Vitamins"];

const inventory = [
  { id: 1, name: "Paracetamol 500mg", generic: "Acetaminophen", cls: "Analgesics", batch: "PARA-001", expiry: "2028-12-31", qty: 4500, maxDose: "4g/day", side: "Nausea, Rash", status: "In Stock" },
  { id: 2, name: "Amoxicillin 500mg", generic: "Amoxicillin", cls: "Antibiotics", batch: "AMOX-001", expiry: "2027-06-30", qty: 180, maxDose: "3g/day", side: "Diarrhea, Allergy", status: "Low Stock" },
  { id: 3, name: "Metformin 850mg", generic: "Metformin HCl", cls: "Antidiabetics", batch: "MET-003", expiry: "2026-09-15", qty: 2200, maxDose: "2.55g/day", side: "GI upset", status: "In Stock" },
  { id: 4, name: "Lisinopril 10mg", generic: "Lisinopril", cls: "Cardiovascular", batch: "LIS-012", expiry: "2026-07-01", qty: 340, maxDose: "80mg/day", side: "Cough, Dizziness", status: "Expiring" },
  { id: 5, name: "Azithromycin 250mg", generic: "Azithromycin", cls: "Antibiotics", batch: "AZI-008", expiry: "2028-03-20", qty: 1100, maxDose: "500mg/day", side: "Nausea", status: "In Stock" },
  { id: 6, name: "Omeprazole 20mg", generic: "Omeprazole", cls: "Gastrointestinal", batch: "OME-015", expiry: "2027-11-10", qty: 65, maxDose: "40mg/day", side: "Headache", status: "Low Stock" },
  { id: 7, name: "Ciprofloxacin 500mg", generic: "Ciprofloxacin", cls: "Antibiotics", batch: "CIP-021", expiry: "2026-06-05", qty: 800, maxDose: "1.5g/day", side: "Tendonitis", status: "Expiring" },
  { id: 8, name: "Vitamin C 1000mg", generic: "Ascorbic Acid", cls: "Vitamins", batch: "VTC-042", expiry: "2029-01-15", qty: 5000, maxDose: "2g/day", side: "GI upset", status: "In Stock" },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold",
        status === "In Stock" && "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
        status === "Low Stock" && "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
        status === "Expiring" && "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
        status === "Out of Stock" && "bg-gray-100 text-gray-500 dark:bg-gray-500/10 dark:text-gray-400"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "In Stock" && "bg-emerald-500",
          status === "Low Stock" && "bg-amber-500",
          status === "Expiring" && "bg-red-500",
          status === "Out of Stock" && "bg-gray-400"
        )}
      />
      {status}
    </span>
  );
}

export default function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = inventory.filter((item) => {
    const matchesCategory = activeCategory === "All Items" || item.cls === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.generic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-in-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {inventory.length} items across all departments
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg glow-primary hover:brightness-110 transition-all">
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-in-up" style={{ animationDelay: "100ms" }}>
        {[
          { label: "Total Items", value: "12,847", icon: Package, color: "text-primary" },
          { label: "Low Stock", value: "23", icon: AlertTriangle, color: "text-amber-500" },
          { label: "Expiring < 90d", value: "8", icon: Clock, color: "text-red-500" },
          { label: "Categories", value: "12", icon: Filter, color: "text-violet-500" },
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

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-in-up" style={{ animationDelay: "200ms" }}>
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search drugs, batch numbers…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                activeCategory === cat
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-accent transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-medium hover:bg-accent transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="surface-elevated overflow-hidden animate-in-up" style={{ animationDelay: "300ms" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Drug Name", "Generic", "Class", "Batch", "Expiry", "Qty", "Max Dose", "Side Effects", "Status", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3"
                  >
                    <div className="flex items-center gap-1">
                      {h}
                      {h && <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-accent/50 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-medium">{item.name}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">
                    {item.generic}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground font-medium">
                      {item.cls}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">
                    {item.batch}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">
                    {item.expiry}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold">
                    {item.qty.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-muted-foreground">
                    {item.maxDose}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-muted-foreground max-w-[120px] truncate">
                    {item.side}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-accent transition-all">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filtered.length}</span> of {inventory.length} items
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-accent transition-colors">2</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-accent transition-colors">3</button>
          </div>
        </div>
      </div>
    </div>
  );
}
