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
    <div className="relative group p-5 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-default bg-white">
      
      {/* Increased opacity on hover for a clearer "glow" effect */}
      <div className={`absolute inset-0 opacity-0 rounded-2xl bg-linear-to-br ${gradientColors} transition-opacity duration-500 group-hover:opacity-[0.07]`} />

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          
          <div 
            className={`absolute -top-6 -left-1 p-3.5 rounded-xl transition-all duration-300 
            ${iconStyle} 
            /* Using shadow-xl with a slight color tint makes it look more vibrant */
            shadow-xl shadow-current/20 translate-y-[-20%]
            group-hover:scale-110 group-hover:shadow-current/40 group-hover:saturate-150`}
          >
            {/* The icon itself */}
            <div className="drop-shadow-md">
              {icon}
            </div>
          </div>

          <div className="w-12 h-10" />

          {/* Trend Pill - Made colors more vivid */}
          <div 
            className={`flex items-center text-xs font-black px-2.5 py-1 rounded-full border ${
              up 
                ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                : "bg-rose-50 text-rose-600 border-rose-200"
            }`}
          >
            {trend} 
            {up ? <ArrowUpRight className="size-3.5 ml-1 stroke-[3px]" /> : <ArrowDownRight className="size-3.5 ml-1 stroke-[3px]" />}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">
            {title}
          </p>
          <h4 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            {value}
          </h4>
        </div>
      </div>
      
      {/* Bottom line made slightly thicker for more color presence */}
      <div className={`absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl bg-linear-to-r ${gradientColors} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </div>
  );
}