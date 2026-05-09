"use client";

import React from "react";
import Link from "next/link";
import {
  Pill,
  ArrowRight,
  Package,
  ArrowLeftRight,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
  { icon: Package, title: "Smart Inventory", description: "Batch tracking, FEFO, and automated reorder alerts." },
  { icon: ArrowLeftRight, title: "Transfer Workflows", description: "Directional transfer rules with digital approvals." },
  { icon: BarChart3, title: "Live Analytics", description: "Executive dashboards and exportable reports." },
  { icon: ShieldCheck, title: "Role-Based Access", description: "Granular permissions for every team member." },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[15%] w-[50%] h-[50%] rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 h-16">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-[hsl(262,52%,47%)] flex items-center justify-center glow-primary">
            <Pill className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">PharmFlow</span>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-lg glow-primary hover:brightness-110 transition-all duration-200"
        >
          Enter App
          <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="animate-in-up max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-8 border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            NHIA Pharmacy Unit — FMC Abeokuta
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
            Pharmacy inventory,
            <br />
            <span className="text-gradient">reimagined.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Digitize drug transfers, monitor stock in real-time, and eliminate
            paperwork across every department — all from one elegant platform.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-xl glow-primary hover:brightness-110 transition-all duration-200"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/inventory"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors"
            >
              View Inventory
            </Link>
          </div>
        </div>

        {/* Features */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-24 max-w-5xl w-full animate-in-up"
          style={{ animationDelay: "200ms" }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              className="surface-interactive p-5 text-left"
              style={{ animationDelay: `${300 + i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-xs text-muted-foreground">
        © 2026 PharmFlow — FMC Abeokuta NHIA Pharmacy Unit
      </footer>
    </div>
  );
}
