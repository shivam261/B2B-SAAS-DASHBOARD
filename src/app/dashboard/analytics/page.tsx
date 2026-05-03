"use client";

import React from "react";

import { useState, useMemo } from "react";
import { 
  Users, 
  Activity, 
  DollarSign, 
  TrendingUp, 
  Filter, 
  Download,
  Calendar as CalendarIcon
} from "lucide-react";
import dynamic from 'next/dynamic';
// Assuming these are your separate component files
import {  Bell, BellOff } from "lucide-react";
import { useNotifications } from "@/hooks/notification";
import { StatCard } from "@/components/custom/stat-card";
const InventoryIntelligence = dynamic(
  () => import("@/components/custom/inventory-intelligence").then((mod) => mod.InventoryIntelligence),
  { 
    ssr: false, 
    loading: () => <div className="w-full h-112.5 bg-slate-50 animate-pulse rounded-3xl border border-slate-100" /> 
  }
);
// 1. Lazy load ComplaintsDonut
const ComplaintsDonut = dynamic(
  () => import("@/components/custom/complaints-polar").then((mod) => mod.ComplaintsDonut),
  { 
    ssr: false, 
    loading: () => <div className="w-full h-112.5 bg-slate-50 animate-pulse rounded-3xl border border-slate-100" /> 
  }
);

const OperationalThroughput = dynamic(
  () => import("@/components/custom/operational-throughput").then((mod) => mod.OperationalThroughput),
  { 
    ssr: false, 
    loading: () => <div className="w-full h-87.5 bg-slate-50 animate-pulse rounded-3xl border border-slate-100" /> 
  }
);
/**
 * A reusable skeleton loader to maintain layout stability 
 * while the heavy JS for Recharts is downloading.
 */
function ChartPlaceholder({ height }: { height: string }) {
  return (
    <div className={`w-full ${height} bg-slate-50/50 animate-pulse rounded-3xl flex items-center justify-center border border-slate-100`}>
      <div className="flex flex-col items-center gap-2">
        <div className="size-8 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading Analytics...</span>
      </div>
    </div>
  );
}
const DATA_SETS = {
  "7D": {
    // Weekly patient volume: Peaks mid-week, dips Sunday
    chart: [
      { label: "Mon", value: 52 }, { label: "Tue", value: 58 }, { label: "Wed", value: 62 }, 
      { label: "Thu", value: 55 }, { label: "Fri", value: 48 }, { label: "Sat", value: 32 }, { label: "Sun", value: 18 },
    ],
    complaints: [
      { name: "ER", value: 24 }, { name: "OPD", value: 45 }, { name: "ICU", value: 8 },
    ],
    radar: [
      { department: "Cardiology", patients: 65, fullMark: 100 },
      { department: "Emergency", patients: 88, fullMark: 100 },
      { department: "Radiology", patients: 42, fullMark: 100 },
    ],
    // 7-Day Financials: Daily view
    throughput: [
      { label: "Mon", revenue: 12000, shops: 1500, salary: 8000, maintenance: 1200 },
      { label: "Tue", revenue: 13500, shops: 1500, salary: 8000, maintenance: 900 },
      { label: "Wed", revenue: 14200, shops: 1500, salary: 8000, maintenance: 1100 },
      { label: "Thu", revenue: 12800, shops: 1500, salary: 8000, maintenance: 1300 },
      { label: "Fri", revenue: 11500, shops: 1500, salary: 8000, maintenance: 1000 },
      { label: "Sat", revenue: 7500,  shops: 2200, salary: 8000, maintenance: 800 },
      { label: "Sun", revenue: 4200,  shops: 2200, salary: 8000, maintenance: 750 },
    ]
  },
  "30D": {
    // Monthly volume: ~1,500 total patients
    chart: [
      { label: "Week 1", value: 380 }, { label: "Week 2", value: 420 },
      { label: "Week 3", value: 395 }, { label: "Week 4", value: 415 },
    ],
    complaints: [
      { name: "ER", value: 110 }, { name: "OPD", value: 240 }, { name: "ICU", value: 45 },
    ],
    radar: [
      { department: "Cardiology", patients: 280, fullMark: 400 },
      { department: "Emergency", patients: 350, fullMark: 400 },
      { department: "Radiology", patients: 190, fullMark: 400 },
    ],
    // 30-Day Financials: Scaled to ~4x Weekly
    throughput: [
      { label: "Week 1", revenue: 82000,  shops: 8500,  salary: 32000, maintenance: 6500 },
      { label: "Week 2", revenue: 95000,  shops: 8500,  salary: 32000, maintenance: 7200 },
      { label: "Week 3", revenue: 88000,  shops: 8500,  salary: 32000, maintenance: 6800 },
      { label: "Week 4", revenue: 104000, shops: 8500,  salary: 32000, maintenance: 9500 },
    ],
  },
  "1Y": {
    // Annual volume: Growth trend toward year-end
    chart: [
      { label: "Q1", value: 4200 }, { label: "Q2", value: 4800 }, 
      { label: "Q3", value: 5100 }, { label: "Q4", value: 5900 },
    ],
    complaints: [
      { name: "ER", value: 1400 }, { name: "OPD", value: 3200 }, { name: "ICU", value: 600 },
    ],
    radar: [
      { department: "Cardiology", patients: 3200, fullMark: 5000 },
      { department: "Emergency", patients: 4500, fullMark: 5000 },
      { department: "Radiology", patients: 2100, fullMark: 5000 },
    ],
    // 1-Year Financials: Multi-million scale
    throughput: [
      { label: "Jan-Mar", revenue: 280000, shops: 25000, salary: 110000, maintenance: 24000 },
      { label: "Apr-Jun", revenue: 310000, shops: 25000, salary: 110000, maintenance: 28000 },
      { label: "Jul-Sep", revenue: 345000, shops: 25000, salary: 125000, maintenance: 31000 },
      { label: "Oct-Dec", revenue: 410000, shops: 25000, salary: 125000, maintenance: 35000 },
    ]
  }
};

type TimeRange = "7D" | "30D" | "1Y";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30D");
const { initNotifications, isEnabled } = useNotifications();
  // Dynamically switch data based on state
  const activeData = useMemo(() => DATA_SETS[timeRange], [timeRange]);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-slate-50/50">
      
      {/* 1. HEADER & INTERACTIVE FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Health Analytics</h1>
          <p className="text-sm text-slate-500">Showing data for {timeRange === "7D" ? "Last Week" : timeRange === "30D" ? "Last Month" : "Past Year"}</p>
          <button 
        onClick={initNotifications}
        title={isEnabled ? "Alerts are active" : "Enable Stock Alerts"}
        className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${
          isEnabled 
          ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" 
          : "text-slate-500 hover:bg-white animate-pulse"
        }`}
      >
        {isEnabled ? (
          <Bell className="size-4 fill-current" />
        ) : (
          <BellOff className="size-4" />
        )}
      </button>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(["7D", "30D", "1Y"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                timeRange === range 
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200" 
                : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {range}
            </button>
          ))}
          <div className="w-px h-4 bg-slate-300 mx-1" />
          <button className="p-1.5 text-slate-500 hover:bg-white rounded-lg transition-colors">
            <Download className="size-4" />
          </button>
        </div>
      </div>

      {/* 2. KPI ROW (Remains static or can be scaled if needed) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Revenue Recovery" 
          value={timeRange === "1Y" ? "$1.2M" : "$92,400"}
          icon={<DollarSign className="size-5" />} 
          trend="+8.2%" 
          up 
          iconStyle="bg-emerald-100 text-emerald-600"
          gradientColors="from-emerald-400 to-teal-500" 
        />
        <StatCard 
          title="Avg. Wait Time" 
          value="18m" 
          icon={<Activity className="size-5" />} 
          trend="-14%" 
          up 
          iconStyle="bg-blue-100 text-blue-600"
          gradientColors="from-blue-400 to-indigo-500" 
        />
        <StatCard 
          title="Claim Denials" 
          value="4.2%" 
          icon={<TrendingUp className="size-5" />} 
          trend="+1.2%" 
          iconStyle="bg-rose-100 text-rose-600"
          gradientColors="from-rose-400 to-red-500" 
        />
        <StatCard 
          title="Patient Growth" 
          value={timeRange === "1Y" ? "+2,140" : "+248"} 
          icon={<Users className="size-5" />} 
          trend="+18%" 
          up 
          iconStyle="bg-purple-100 text-purple-600"
          gradientColors="from-purple-400 to-violet-500" 
        />
      </div>

      {/* 3. MAIN TRENDS (Uses activeData.chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Operational Throughput</h3>
        <div className="h-87.5 w-full">
    <OperationalThroughput data={activeData.throughput} /> 
  </div>
        </div>

<div className="lg:col-span-1">
  <InventoryIntelligence />
</div>
      </div>

      {/* 4. RESOURCE ALLOCATION (Uses activeData.radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="font-bold text-lg text-slate-800">Department Performance</h3>
      <p className="text-xs text-slate-400">Resource load vs. Patient satisfaction</p>
    </div>
    <div className="text-right">
      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
        Live Feed
      </span>
    </div>
  </div>

  <div className="space-y-6">
    {/* 1. DEPARTMENT LOAD PERCENTAGE (Horizontal Progress) */}
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Department Load</p>
        <p className="text-xs font-medium text-slate-400">Capacity used</p>
      </div>
      {activeData.radar.map((dept: any) => (
        <div key={dept.department} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-slate-700">{dept.department}</span>
            <span className="font-bold text-slate-900">{Math.round((dept.patients / dept.fullMark) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                (dept.patients / dept.fullMark) > 0.8 ? 'bg-rose-500' : 'bg-blue-500'
              }`}
              style={{ width: `${(dept.patients / dept.fullMark) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-4">
      {/* 2. UNIQUE PATIENTS MINI-CARD */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Unique Patients</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h4 className="text-xl font-black text-slate-900">842</h4>
          <span className="text-[10px] font-bold text-emerald-600">+5.2%</span>
        </div>
      </div>

      {/* 3. AVG REVIEW MINI-CARD */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-amber-200 transition-colors">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Avg. Review</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h4 className="text-xl font-black text-slate-900">4.8</h4>
          <div className="flex text-amber-400 text-[10px]">★★★★★</div>
        </div>
      </div>
    </div>

    {/* 4. MOST BUSY DOCTORS (Ranked List) */}
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Top Performing Doctors</p>
      <div className="space-y-3">
        {[
          { name: "Dr. Aditya Verma", cases: 42, color: "bg-indigo-500" },
          { name: "Dr. Saanvi Reddy", cases: 38, color: "bg-emerald-500" },
          { name: "Dr. Rohan Deshmukh", cases: 35, color: "bg-blue-500" }
        ].map((doc, i) => (
          <div key={doc.name} className="flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3">
              <div className={`size-8 rounded-full ${doc.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                {doc.name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{doc.name}</p>
            </div>
            <p className="text-xs font-bold text-slate-400">{doc.cases} Patients</p>
          </div>
        ))}
      </div>
    </div>

    {/* 5. MOST USED RESOURCES */}
    <div className="pt-2">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Resource Demand</p>
      <div className="flex flex-wrap gap-2">
        {['Oxygen (ICU)', 'MRI Slot 2', 'Dialysis Kit', 'Ventilator B4'].map(tag => (
          <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-full shadow-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>

        {/* AI Insight Card */}
<div className="grid grid-cols-1 gap-6">
  {/* ROW 1: PENDING PAYMENTS (Financial Insight) */}
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
          Financial Alert
        </span>
        <h3 className="text-xl font-bold text-slate-800 mt-3">Pending Payments</h3>
      </div>
      <div className="text-right">
        <p className="text-2xl font-black text-slate-900">$12,450</p>
        <p className="text-[10px] text-slate-400 font-bold">14 UNSETTLED INVOICES</p>
      </div>
    </div>
    
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500">Insurance Claims</span>
        <span className="font-bold text-slate-700">$8,200</span>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div className="bg-rose-500 h-full w-[65%]" />
      </div>
      <p className="text-xs text-slate-400 italic">
        * 3 claims from <span className="text-rose-600 font-semibold text-bold">HDFC ERGO</span> are pending for 15+ days.
      </p>
    </div>
    
    <button className="w-full mt-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors">
      View Aging Report
    </button>
  </div>

  {/* ROW 2: RESOURCE OCCUPANCY (Operational Insight) */}
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
          Live Status
        </span>
        <h3 className="text-xl font-bold text-slate-800 mt-3">Resource Occupancy</h3>
      </div>
      <div className="text-right">
        <p className="text-2xl font-black text-blue-600">82%</p>
        <p className="text-[10px] text-slate-400 font-bold">CRITICAL THRESHOLD</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase">ICU Beds</p>
        <p className="text-lg font-bold text-slate-700">08/10</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Ventilators</p>
        <p className="text-lg font-bold text-slate-700">04/06</p>
      </div>
    </div>

    <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 border-dashed">
      <p className="text-xs text-amber-700 font-medium">
        <strong>Insight:</strong> Pediatric ward is at <span className="font-bold underline">95% capacity</span>. Consider diverting new non-emergency admissions.
      </p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}