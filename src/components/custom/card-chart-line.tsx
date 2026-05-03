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

export default function LineChart({
  data = [],
  color = "pink",
  title = "Chart Title",
  subtitle = "Performance Metrics",
  footerText = "updated just now",
}: CampaignChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.value)) : 60;
  const maxScale = Math.ceil(maxValue / 10) * 10;

  const width = 100;
  const height = 100;

  const generatePath = () => {
    if (data.length < 2) return "";
    return data
      .map((item, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (item.value / maxScale) * height;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 pt-0 mt-12 max-w-sm font-sans border border-slate-100">
      <div className={`relative bg-linear-to-tr ${colorMap[color]} rounded-xl shadow-lg p-4 -translate-y-8 mb-[-1.5rem]`}>
        
        <div className="flex h-40 relative">
          <div className="flex flex-col justify-between text-white/90 text-[13px] py-1 pr-3 font-medium">
            <span>{maxScale}</span>
            <span>{maxScale / 2}</span>
            <span>0</span>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(3)].map((_, i) => (
                <div key={`h-line-${i}`} className="border-t border-dashed border-white/20 w-full h-0" />
              ))}
            </div>

            <div className="absolute inset-0 pt-2 pb-1">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <path
                  d={generatePath()}
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ vectorEffect: "non-scaling-stroke" }} // Keeps line consistent
                />

                {data.map((item, i) => {
                  const x = (i / (data.length - 1)) * width;
                  const y = height - (item.value / maxScale) * height;
                  return (
                    <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                      <circle cx={x} cy={y} r="8" fill="transparent" className="cursor-pointer" />
                      
                      <circle
                        cx={x}
                        cy={y}
                        r="1.5"
                        className="fill-white transition-all duration-200"
                        style={{ r: hoveredIndex === i ? 2.5 : 1.5 }}
                      />

                      {hoveredIndex === i && (
                        /* 
                           We use a large width for foreignObject and center the content 
                           to prevent the "stretched" text look.
                        */
                        <foreignObject 
                          x={x - 25} 
                          y={y - 35} 
                          width="50" 
                          height="30" 
                          className="overflow-visible"
                        >
                          <div className="flex justify-center items-center h-full w-full">
                            <div 
                              className="bg-white text-slate-800 text-[11px] font-bold px-2 py-1 rounded shadow-xl border border-slate-100 whitespace-nowrap animate-in fade-in zoom-in duration-150"
                              style={{ transform: 'scaleX(1)' }} // Counteract potential stretching
                            >
                              {item.value}
                            </div>
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-white/90 text-[13px] mt-3 pl-8 pr-1 font-medium">
          {data.map((item, index) => (
            <span key={`x-label-${index}`} className="text-center">
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