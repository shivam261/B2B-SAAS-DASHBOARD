"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  up?: boolean;
  gradientColors: string; 
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
      
      <div className={`absolute inset-0 opacity-0 rounded-2xl bg-linear-to-br ${gradientColors} transition-opacity duration-500 group-hover:opacity-[0.07]`} />

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          
          {/* 
            FIX: Layered Architecture 
            z-10 ensures the shadows stay above the card background.
          */}
          <div className="absolute -top-6 -left-1 z-10 translate-y-[-20%]">
            
            {/* 1. SCALE LAYER: Only handles the zoom. GPU handles this effortlessly. */}
            <div className={`relative rounded-xl transform-gpu transition-transform duration-300 group-hover:scale-110 ${iconStyle}`}>
              
              {/* 2. BASE SHADOW: Placed behind the background (-z-10) */}
              <div className="absolute inset-0 -z-10 rounded-xl shadow-xl shadow-current/20" />
              
              {/* 3. HOVER SHADOW: Fades in via opacity. Zero repaint lag. */}
              <div className="absolute inset-0 -z-10 rounded-xl shadow-xl shadow-current/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* 4. CONTENT LAYER */}
              <div className="relative z-10 p-3.5 drop-shadow-md transition-[filter] duration-300 group-hover:saturate-150">
                {icon}
              </div>
            </div>
          </div>

          <div className="w-12 h-10" />

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
      
      <div className={`absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl bg-linear-to-r ${gradientColors} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </div>
  );
}