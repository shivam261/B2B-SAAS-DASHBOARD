"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface ComplaintData {
  department: string
  count: number
}

// Professional high-contrast palette (Amber, Rose, Violet, Sky, Emerald)
const COLORS = ["#f59e0b", "#rose-500", "#8b5cf6", "#0ea5e9", "#10b981", "#6366f1"]
// Fallback for hex if using standard tailwind colors in Recharts
const HEX_COLORS = ["#f59e0b", "#f43f5e", "#8b5cf6", "#0ea5e9", "#10b981", "#6366f1"]

export function ComplaintsDonut({ data }: { data: ComplaintData[] }) {
  const totalComplaints = data.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[450px]">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">Complaints Overview</h3>
        <p className="text-sm text-slate-500">Distribution by department</p>
      </div>

      <div className="flex-1 w-full relative">
        {/* Center Label for Total */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-slate-800">{totalComplaints}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70} // This makes it a donut
              outerRadius={100}
              paddingAngle={5}
              dataKey="count"
              nameKey="department"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={HEX_COLORS[index % HEX_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value) => <span className="text-xs font-medium text-slate-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-center">
         <div className="flex items-center gap-1.5 text-orange-600 text-[10px] font-bold uppercase tracking-widest">
          <div className="size-2 rounded-full bg-orange-500 animate-pulse" />
          High Priority Cases
        </div>
      </div>
    </div>
  )
}