"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";

interface ChartData {
  day: string;
  value: number;
}

interface CampaignChartProps {
  data?: ChartData[];
  color?: "pink" | "blue" | "green" | "orange" | "dark";
  title?: string;
  subtitle?: string;
  footerText?: string;
}

const colorMap = {
  pink: "from-pink-600 to-pink-400 shadow-pink-500/40",
  blue: "from-blue-600 to-blue-400 shadow-blue-500/40",
  green: "from-emerald-600 to-emerald-400 shadow-emerald-500/40",
  orange: "from-orange-600 to-orange-400 shadow-orange-500/40",
  dark: "from-slate-800 to-slate-700 shadow-slate-900/40",
};

export default function CampaignChart({
  data = [],
  color = "pink",
  title = "Chart Title",
  subtitle = "Performance Metrics",
  footerText = "campaign sent 2 days ago",
}: CampaignChartProps) {
  // Track hovered index to show value
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.value)) : 60;
  const maxScale = Math.ceil(maxValue / 10) * 10;

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 pt-0 mt-12 max-w-sm font-sans border border-slate-100">
      
      <div className={`relative bg-linear-to-tr ${colorMap[color]} rounded-xl shadow-lg p-4 -translate-y-8 mb-[-1.5rem]`}>
        
        <div className="flex h-40 relative">
          {/* Y-Axis Labels */}
          <div className="flex flex-col justify-between text-white/90 text-[13px] py-1 pr-3 font-medium">
            <span>{maxScale}</span>
            <span>{maxScale / 2}</span>
            <span>0</span>
          </div>

          <div className="flex-1 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(3)].map((_, i) => (
                <div key={`h-line-${i}`} className="border-t border-dashed border-white/30 w-full h-0" />
              ))}
            </div>

            {/* Data Bars */}
            <div className="absolute inset-0 flex justify-around items-end">
              {data.map((item, index) => (
                <div 
                  key={index} 
                  className="group relative flex flex-col items-center"
                  style={{ height: `${(item.value / maxScale) * 100}%` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip Value */}
                  {hoveredIndex === index && (
                    <div className="absolute -top-8 bg-white text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-in fade-in zoom-in duration-200 z-50">
                      {item.value}
                    </div>
                  )}

                  {/* The Bar */}
                  <div 
                    className="w-1.5 h-full bg-white rounded-full relative z-10 shadow-sm transition-all duration-300 group-hover:scale-x-150 group-hover:bg-white/90 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* X-Axis Labels */}
        <div className="flex justify-around text-white/90 text-[13px] mt-3 pl-8 font-medium">
          {data.map((item, index) => (
            <span key={`x-label-${index}`} className="w-1.5 text-center flex justify-center">
              {item.day}
            </span>
          ))}
        </div>
      </div>

      <div className="px-2 pb-4">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-500 font-medium mt-1">{subtitle}</p>
      </div>

      <hr className="border-slate-100" />

      <div className="px-2 pt-4 pb-2 flex items-center text-slate-400 text-sm font-medium">
        <Clock className="size-4 mr-1.5 text-slate-400" />
        {footerText}
      </div>
    </div>
  );
}