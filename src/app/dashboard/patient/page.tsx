"use client";

import React, { useState, useMemo } from "react";
import { 
  LayoutGrid, 
  List, 
  Search, 
  ArrowUpNarrowWide, 
  ArrowDownWideNarrow, 
  Users, 
  Activity, 
  Calendar, 
  AlertCircle 
} from "lucide-react";
import { PATIENTS } from "@/data/patient";
import { columns } from "@/components/custom/tables/patients/columns";
import { DataTable } from "@/components/custom/tables/patients/data-table";
import { PatientGridView } from "@/components/custom/PatientGridView";
import { StatCard } from "@/components/custom/stat-card"; // Assuming this is the path
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PatientPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // --- Analytics Logic ---
  const stats = useMemo(() => {
    const total = PATIENTS.length;
    
    // Average Age
    const avgAge = total > 0 
      ? Math.round(PATIENTS.reduce((acc, curr) => acc + curr.age, 0) / total) 
      : 0;

    // Critical Patients
    const criticalCount = PATIENTS.filter(p => p.status === "Critical").length;

    // Visits in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentVisits = PATIENTS.filter(p => new Date(p.lastVisit) >= sevenDaysAgo).length;

    return { total, avgAge, criticalCount, recentVisits };
  }, []);

  // --- Filtering & Sorting Logic ---
  const processedPatients = useMemo(() => {
    let filtered = PATIENTS.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "age") {
        comparison = a.age - b.age;
      } else if (sortBy === "lastVisit") {
        comparison = new Date(a.lastVisit).getTime() - new Date(b.lastVisit).getTime();
      } else {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [searchQuery, sortBy, sortOrder]);

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* 1. Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={stats.total.toString()}
          trend="+4% from last month"
          up={true}
          icon={<Users className="size-5" />}
          gradientColors="from-blue-500 to-indigo-600"
          iconStyle="text-blue-600 bg-blue-100"
        />
        <StatCard
          title="Average Age"
          value={`${stats.avgAge} yrs`}
          trend="Stable"
          up={true}
          icon={<Activity className="size-5" />}
          gradientColors="from-emerald-500 to-teal-600"
          iconStyle="text-emerald-600 bg-emerald-100"
        />
        <StatCard
          title="Recent Visits"
          value={stats.recentVisits.toString()}
          trend="Last 7 days"
          up={true}
          icon={<Calendar className="size-5" />}
          gradientColors="from-amber-500 to-orange-600"
          iconStyle="text-amber-600 bg-amber-100"
        />
        <StatCard
          title="Critical Cases"
          value={stats.criticalCount.toString()}
          trend="+2 since yesterday"
          up={false}
          icon={<AlertCircle className="size-5" />}
          gradientColors="from-rose-500 to-red-600"
          iconStyle="text-rose-600 bg-rose-100"
        />
      </div>

      {/* 2. Header & Controls Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Directory</h1>
          <p className="text-sm text-slate-500">Manage and monitor records</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-slate-200 shadow-sm focus-visible:ring-blue-500"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 bg-white shadow-sm border-slate-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="age">Age</SelectItem>
              <SelectItem value="lastVisit">Last Visit</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="bg-white border-slate-200 text-slate-600 cursor-pointer shadow-sm hover:text-blue-600"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? <ArrowUpNarrowWide className="size-4" /> : <ArrowDownWideNarrow className="size-4" />}
          </Button>

          <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-200 shadow-inner">
             <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <List className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Content Section */}
      <div className="transition-all duration-500">
        {viewMode === "list" ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <DataTable columns={columns} data={processedPatients} />
          </div>
        ) : (
          <PatientGridView data={processedPatients} itemsPerPage={8} />
        )}
      </div>
    </div>
  );
}