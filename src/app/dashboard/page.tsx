"use client";
import { 
  Users, 
  Activity, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react";
import { PatientChart } from "@/components/custom/patient-chart";
import { DepartmentRadar } from "@/components/custom/department-radar";
import { ComplaintsDonut } from "@/components/custom/complaints-polar";

const INDIAN_PATIENTS = [
  { name: "Aarav Sharma", id: "PT-501", status: "Critical" },
  { name: "Ishani Patel", id: "PT-502", status: "Stable" },
  { name: "Vihaan Gupta", id: "PT-503", status: "Observation" },
  { name: "Ananya Iyer", id: "PT-504", status: "Stable" },
  { name: "Aditya Verma", id: "PT-505", status: "Critical" },
  { name: "Saanvi Reddy", id: "PT-506", status: "Stable" },
  { name: "Arjun Malhotra", id: "PT-507", status: "Observation" },
  { name: "Kavya Nair", id: "PT-508", status: "Stable" },
  { name: "Rohan Deshmukh", id: "PT-509", status: "Critical" },
  { name: "Zoya Khan", id: "PT-510", status: "Stable" },
  { name: "Shivam Tripathi", id: "PT-590", status: "Critical" },
];
const COMPLAINT_DATA = [
  { department: "Cardiology", count: 12 },
  { department: "Pediatrics", count: 45 },
  { department: "Radiology", count: 8 },
  { department: "Orthopedics", count: 22 },
  { department: "Emergency", count: 58 },
  { department: "Neurology", count: 15 },
]
const DUMMY_DAYS = [
  { label: "Mon", value: 40 },
  { label: "Tue", value: 30 },
  { label: "Wed", value: 65 },
  { label: "Thu", value: 45 },
  { label: "Fri", value: 90 },
]

const DUMMY_MONTHS = [
  { label: "Jan", value: 400 },
  { label: "Feb", value: 300 },
  { label: "Mar", value: 500 },
  { label: "Apr", value: 280 },
  { label: "May", value: 590 },
]

const DUMMY_YEARS = [
  { label: "2023", value: 4500 },
  { label: "2024", value: 5200 },
  { label: "2025", value: 6100 },
]
const DEPT_DATA = [
  { department: "Cardiology", patients: 120, fullMark: 150 },
  { department: "Pediatrics", patients: 98, fullMark: 150 },
  { department: "Radiology", patients: 86, fullMark: 150 },
  { department: "Orthopedics", patients: 99, fullMark: 150 },
  { department: "Emergency", patients: 145, fullMark: 150 },
  { department: "Neurology", patients: 40, fullMark: 150 },
]
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
          colorClass="bg-emerald-100 text-emerald-600" 
        />
        <StatCard 
          title="Active Admissions" 
          value="42" 
          icon={<Activity className="size-5" />} 
          trend="+3%" 
          up 
          colorClass="bg-blue-100 text-blue-600" 
        />
        <StatCard 
          title="Revenue (MTD)" 
          value="$42,500" 
          icon={<DollarSign className="size-5" />} 
          trend="-2%" 
          colorClass="bg-amber-100 text-amber-600" 
        />
        <StatCard 
          title="Consultations" 
          value="156" 
          icon={<Calendar className="size-5" />} 
          trend="+18%" 
          up 
          colorClass="bg-purple-100 text-purple-600" 
        />
      </div>

      {/* Rest of your Dashboard layout remains the same... */}
    {/* 2. MAIN ANALYTICS: 3/4 Width Chart, 1/4 Width Sidebar */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* Large Chart Area */}
<div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
<div className="flex justify-between items-center mb-6">
<h3 className="font-bold text-lg">Patient Flow Analysis</h3>

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

function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  up, 
  colorClass 
}: { 
  title: string, 
  value: string, 
  icon: any, 
  trend: string, 
  up?: boolean,
  colorClass: string // New prop for icon styling
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex justify-between items-start">
        {/* Icon with Dynamic Colors and Soft Shadow */}
        <div className={`p-3 rounded-xl transition-all duration-300 ${colorClass} shadow-lg shadow-current/20 group-hover:scale-110`}>
          {icon}
        </div>
        <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend} {up ? <ArrowUpRight className="size-3 ml-1" /> : <ArrowDownRight className="size-3 ml-1" />}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{title}</p>
        <h4 className="text-3xl font-bold text-slate-900 mt-1">{value}</h4>
      </div>
    </div>
  );
}
function PatientItem({ name, id, status }: { name: string, id: string, status: string }) {
  const statusColors: any = {
    Stable: "bg-green-100 text-green-700",
    Critical: "bg-red-100 text-red-700",
    Observation: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="flex items-center justify-between group cursor-pointer w-full p-2 rounded-xl transition-all hover:bg-slate-50">
      <div className="flex items-center gap-3">
        {/* Avatar stays blue-100, which is fine for the icon circle */}
        <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
            {name}
          </p>
          <p className="text-xs text-slate-400 font-medium">{id}</p>
        </div>
      </div>
      
      {/* Status Badge */}
      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
}