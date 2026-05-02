"use client";
import { 
  Users, 
  Activity, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react";
import dynamic from 'next/dynamic';
import { StatCard } from "@/components/custom/stat-card";
import { PatientItem } from "@/components/custom/patient-item";
import {INDIAN_PATIENTS, COMPLAINT_DATA, DUMMY_DAYS, DUMMY_MONTHS, DUMMY_YEARS, DEPT_DATA} from "@/data/dashbaord";

const PatientChart = dynamic(() => import("@/components/custom/patient-chart").then(mod => mod.PatientChart), { 
  ssr: false,
  loading: () => <div className="h-75 bg-slate-100 animate-pulse rounded-xl" /> 
});
const DepartmentRadar = dynamic(() => import("@/components/custom/department-radar").then(mod => mod.DepartmentRadar), { 
  ssr: false,
  loading: () => <div className="h-75 bg-slate-100 animate-pulse rounded-xl" /> 
});
const ComplaintsDonut = dynamic(() => import("@/components/custom/complaints-polar").then(mod => mod.ComplaintsDonut), { 
  ssr: false,
  loading: () => <div className="h-75 bg-slate-100 animate-pulse rounded-xl" /> 
});



export default function HealthcareDashboard() {
  return (
    <div className="p-6 space-y-6 min-h-screen w-full bg-linear-to-tr from-gray-50 via-white to-indigo-50/30">
      
      {/* 1. TOP METRICS with Colored Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<StatCard 
    title="Total Patients" 
    value="1,284" 
    icon={<Users className="size-5" />} 
    trend="+12%" 
    up 
    iconStyle="bg-emerald-100 text-emerald-600"
    gradientColors="from-emerald-400 to-teal-500" 
  />

  {/* 2. Active Admissions - Blue/Indigo Theme */}
  <StatCard 
    title="Active Admissions" 
    value="42" 
    icon={<Activity className="size-5" />} 
    trend="+3%" 
    up 
    iconStyle="bg-blue-100 text-blue-600"
    gradientColors="from-blue-400 to-indigo-500" 
  />

  {/* 3. Revenue (MTD) - Amber/Orange Theme */}
  <StatCard 
    title="Revenue (MTD)" 
    value="$42,500" 
    icon={<DollarSign className="size-5" />} 
    trend="-2%" 
    iconStyle="bg-amber-100 text-amber-600"
    gradientColors="from-amber-400 to-orange-500" 
  />

  {/* 4. Consultations - Purple/Violet Theme */}
  <StatCard 
    title="Consultations" 
    value="156" 
    icon={<Calendar className="size-5" />} 
    trend="+18%" 
    up 
    iconStyle="bg-purple-100 text-purple-600"
    gradientColors="from-purple-400 to-violet-500" 
  />
      </div>

      {/* Rest of your Dashboard layout remains the same... */}
    {/* 2. MAIN ANALYTICS: 3/4 Width Chart, 1/4 Width Sidebar */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* Large Chart Area */}
<div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
<div className="flex justify-between items-center mb-6">


</div>
{/* Placeholder for your actual Chart (e.g., Recharts or Chart.js) */}
<div className="flex flex-col gap-6">
  {/* ROW 1: Patient Chart (Full Width) */}
  <div className="w-full">
    <PatientChart 
      dayData={DUMMY_DAYS} 
      monthData={DUMMY_MONTHS} 
      yearData={DUMMY_YEARS} 
    />
  </div>

  {/* ROW 2: Other two charts side-by-side */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
    <div className="flex w-full">
      <DepartmentRadar data={DEPT_DATA} />
    </div>
    
    <div className="flex w-full">
      <ComplaintsDonut data={COMPLAINT_DATA} />
    </div>
  </div>
</div>
    </div>

{/* Recent Patients Sidebar */}
<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
<h3 className="font-bold text-lg mb-4">Recent Admissions</h3>
<div className="space-y-4">
  {INDIAN_PATIENTS.map((patient) => (
    <PatientItem 
      key={patient.id} 
      name={patient.name} 
      id={patient.id} 
      status={patient.status} 
    />
  ))}
</div>
<button className="w-full mt-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
View All Records
</button>
</div>

</div>
</div>
);
}
// --- SUB-COMPONENTS FOR CLEANER CODE ---

