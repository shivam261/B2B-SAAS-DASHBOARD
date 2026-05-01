"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

interface ChartData {
  label: string
  value: number
}

interface PatientChartProps {
  dayData: ChartData[]
  monthData: ChartData[]
  yearData: ChartData[]
}

export function PatientChart({ dayData, monthData, yearData }: PatientChartProps) {
  const [view, setView] = useState<"day" | "month" | "year">("month")

  const dataMap = {
    day: dayData,
    month: monthData,
    year: yearData,
  }

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Patient Volume</h3>
          <p className="text-sm text-slate-500">Total patient admissions over time</p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {(["day", "month", "year"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setView(type)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                view === type
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataMap[view]}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}