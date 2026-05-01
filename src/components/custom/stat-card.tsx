"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  up?: boolean;
  /**
   * Expects Tailwind gradient classes, 
   * e.g., "from-emerald-500 to-emerald-600" or "from-blue-500 to-indigo-600"
   */
  gradientColors: string; 
  /**
   * The text/bg color for the icon container
   * e.g., "text-emerald-600 bg-emerald-100"
   */
  iconStyle: string; 
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  up,
  gradientColors,
  iconStyle,
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden group p-5 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default bg-white">
      
      {/* 1. Background Gradient Layer (Very subtle 10% opacity) */}
      <div className={`absolute inset-0 opacity-5 bg-linear-to-r ${gradientColors} transition-opacity group-hover:opacity-10`} />

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          {/* Icon Wrapper */}
          <div 
            className={`p-3 rounded-xl transition-all duration-300 ${iconStyle} shadow-lg shadow-current/10 group-hover:scale-110 group-hover:shadow-current/20`}
          >
            {icon}
          </div>

          {/* Trend Pill */}
          <div 
            className={`flex items-center text-xs font-bold px-2 py-1 rounded-full backdrop-blur-md ${
              up 
                ? "bg-green-100/50 text-green-700 border border-green-200" 
                : "bg-red-100/50 text-red-700 border border-red-200"
            }`}
          >
            {trend} 
            {up ? (
              <ArrowUpRight className="size-3 ml-1" />
            ) : (
              <ArrowDownRight className="size-3 ml-1" />
            )}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest opacity-80">
            {title}
          </p>
          <h4 className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {value}
          </h4>
        </div>
      </div>
      
      {/* 2. Bottom Decorative Gradient Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientColors} opacity-0 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
}