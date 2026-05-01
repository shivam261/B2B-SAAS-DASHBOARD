"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"

export function DepartmentRadar({ data }: { data: any[] }) {
  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[450px]">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">Department Load</h3>
        <p className="text-sm text-slate-500">Distribution of active cases</p>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="85%" data={data}>
            {/* GRADIENT DEFINITION */}
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis
              dataKey="department"
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
            />
            <Radar
              name="Patients"
              dataKey="patients"
              stroke="#db2777"   // Deep Pink Stroke
              strokeWidth={3}
              fill="url(#radarGradient)" // Apply the gradient here
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
          Live Workload
        </div>
      </div>
    </div>
  )
}