"use client";
import { 
  Users, 
  Activity, 
  DollarSign, 
  Calendar,
} from "lucide-react";
import dynamic from 'next/dynamic';
import {useNotifications} from "@/hooks/notification";
import { StatCard } from "@/components/custom/stat-card";
import CampaignChart from "@/components/custom/card-chart"; 
import { COMPLAINT_DATA, DUMMY_DAYS, DUMMY_MONTHS, DUMMY_YEARS, DEPT_DATA} from "@/data/dashbaord";
import LineChart from "@/components/custom/card-chart-line";
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

// Data constants
const OCCUPANCY_DATA = [{ day: "M", value: 45 }, { day: "T", value: 52 }, { day: "W", value: 48 }, { day: "T", value: 61 }, { day: "F", value: 55 }, { day: "S", value: 40 }, { day: "S", value: 38 }];
const SATISFACTION_DATA = [{ day: "M", value: 35 }, { day: "T", value: 88 }, { day: "W", value: 55 }, { day: "T", value: 90 }, { day: "F", value: 45 }, { day: "S", value: 82 }, { day: "S", value: 95 }];
const LAB_DATA = [{ day: "M", value: 12 }, { day: "T", value: 18 }, { day: "W", value: 14 }, { day: "T", value: 10 }, { day: "F", value: 22 }, { day: "S", value: 15 }, { day: "S", value: 11 }];

export default function HealthcareDashboard() {
  useNotifications();
  return (
    <div className="p-6 space-y-10 min-h-screen w-full bg-linear-to-tr from-gray-50 via-white to-indigo-50/30">
      
      {/* 1. TOP METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value="1,284" icon={<Users className="size-5" />} trend="+12%" up iconStyle="bg-emerald-100 text-emerald-600" gradientColors="from-emerald-400 to-teal-500" />
        <StatCard title="Active Admissions" value="42" icon={<Activity className="size-5" />} trend="+3%" up iconStyle="bg-blue-100 text-blue-600" gradientColors="from-blue-400 to-indigo-500" />
        <StatCard title="Revenue (MTD)" value="$42,500" icon={<DollarSign className="size-5" />} trend="-2%" iconStyle="bg-amber-100 text-amber-600" gradientColors="from-amber-400 to-orange-500" />
        <StatCard title="Consultations" value="156" icon={<Calendar className="size-5" />} trend="+18%" up iconStyle="bg-purple-100 text-purple-600" gradientColors="from-purple-400 to-violet-500" />
      </div>

      {/* 2. THE THREE CAMPAIGN CARDS IN ONE ROW */}
      {/* We use a grid here to ensure they stay perfectly aligned in a single row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CampaignChart 
            data={OCCUPANCY_DATA}
            color="blue"
            title="Bed Occupancy"
            subtitle="Current In-patient capacity"
            footerText="Updated 5 mins ago"
          />
          <LineChart 
            data={SATISFACTION_DATA}
            color="pink"
            title="Patient Satisfaction"
            subtitle="Avg. discharge survey score"
            footerText="Last survey 1 hour ago"
          />
          <CampaignChart 
            data={LAB_DATA}
            color="orange"
            title="Lab TAT (Hours)"
            subtitle="Avg. test processing time"
            footerText="System sync 12 mins ago"
          />

      </div>

      {/* 3. LOWER ANALYTICS SECTION */}
      <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <PatientChart dayData={DUMMY_DAYS} monthData={DUMMY_MONTHS} yearData={DUMMY_YEARS} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <DepartmentRadar data={DEPT_DATA} />
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <ComplaintsDonut data={COMPLAINT_DATA} />
              </div>
          </div>
      </div>

    </div>
  );
}