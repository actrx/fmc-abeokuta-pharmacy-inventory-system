"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Pill,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left — Illustration Panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-violet-600">
        {/* Mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[15%] right-[15%] w-96 h-96 rounded-full bg-violet-400/15 blur-3xl" />
          <div className="absolute top-[60%] left-[40%] w-64 h-64 rounded-full bg-blue-300/10 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">PharmFlow</span>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-bold tracking-tight leading-tight mb-4">
              Healthcare inventory management, elevated.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Secure access to real-time stock monitoring, digital transfer workflows, and actionable analytics.
            </p>

            {/* Floating card */}
            <div className="mt-10 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                <span className="text-sm font-semibold">NHIA Compliant</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Multi-tenant architecture with role-based access control, audit logging, and end-to-end data encryption.
              </p>
            </div>
          </div>

          <p className="text-xs text-white/40">
            © 2026 FMC Abeokuta — NHIA Pharmacy Unit
          </p>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[400px] animate-in-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center glow-primary">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">PharmFlow</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Sign in to access your pharmacy dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nhia.gov.ng"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Password
                </label>
                <button type="button" className="text-xs text-primary font-medium hover:underline">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold",
                "bg-primary text-primary-foreground shadow-lg glow-primary",
                "hover:brightness-110 transition-all duration-200",
                "disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-8">
            New facility?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Register your pharmacy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
