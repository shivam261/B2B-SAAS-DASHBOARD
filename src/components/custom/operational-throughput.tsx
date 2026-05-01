"use client"

import React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface ThroughputProps {
  data: any[]
}

export function OperationalThroughput({ data }: ThroughputProps) {
  return (
    <div className="w-full h-full min-h-87.5">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="label" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" height={40}/>

          {/* Revenue Source 1: Patients */}
          <Area
            type="monotone"
            dataKey="revenue"
            name="Patient Revenue"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorRevenue)"
            strokeWidth={3}
            stackId="1"
          />

          {/* Revenue Source 2: Shops/Lease */}
          <Area
            type="monotone"
            dataKey="shops"
            name="Shop Rental"
            stroke="#10b981"
            fillOpacity={0.2}
            fill="#10b981"
            strokeWidth={2}
            stackId="1"
          />

          {/* Expense 1: Salaries (Stacked separately or together) */}
          <Area
            type="monotone"
            dataKey="salary"
            name="Staff Salary"
            stroke="#f43f5e"
            fillOpacity={1}
            fill="url(#colorSalary)"
            strokeWidth={2}
          />

          {/* Expense 2: Maintenance */}
          <Area
            type="monotone"
            dataKey="maintenance"
            name="Maintenance"
            stroke="#f59e0b"
            fillOpacity={0.1}
            fill="#f59e0b"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}