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
  User,
  Building2,
} from "lucide-react";

const roles = [
  { value: "Admin", label: "Admin", description: "Full system access" },
  { value: "Pharmacist", label: "Pharmacist", description: "Inventory & dispensing" },
  { value: "Store Officer", label: "Store Officer", description: "Stock management" },
  { value: "Regional Officer", label: "Regional Officer", description: "Reports & oversight" },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left — Illustration */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-primary">
        <div className="absolute inset-0">
          <div className="absolute top-[15%] right-[10%] w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-teal-300/15 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">PharmFlow</span>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-bold tracking-tight leading-tight mb-4">
              Onboard your pharmacy in minutes.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Register your facility, set up departments, and start managing inventory immediately — no setup fees.
            </p>
          </div>

          <p className="text-xs text-white/40">
            © 2026 FMC Abeokuta — NHIA Pharmacy Unit
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[420px] animate-in-up">
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-primary flex items-center justify-center">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">PharmFlow</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight mb-1">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Register your facility to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tenant Name */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                Facility Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="FMC Abeokuta Pharmacy" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" required />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Dr. Adebayo" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="admin@nhia.gov.ng" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" required />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={cn(
                      "p-3 rounded-xl border-2 text-left transition-all duration-200",
                      selectedRole === role.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-border/80 hover:bg-accent"
                    )}
                  >
                    <p className="text-xs font-semibold">{role.label}</p>
                    <p className="text-[10px] text-muted-foreground">{role.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} placeholder="Min 8 characters" className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

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
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-8">
            Already registered?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
