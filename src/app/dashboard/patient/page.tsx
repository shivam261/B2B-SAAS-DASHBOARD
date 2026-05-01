"use client";

import React, { useState } from "react";
import { LayoutGrid, List, User, Calendar, Activity, ChevronRight } from "lucide-react";
import { Patient, PatientCard } from "@/components/custom/patient-card";
// Sample Data
export const PATIENTS: Patient[] = [
  { id: "1", name: "Aarav Sharma", age: 45, status: "Stable", lastVisit: "2026-04-28", condition: "Hypertension" },
  { id: "2", name: "Priya Patel", age: 32, status: "Critical", lastVisit: "2026-05-01", condition: "Post-Op Recovery" },
  { id: "3", name: "Vikram Malhotra", age: 58, status: "Stable", lastVisit: "2026-04-15", condition: "Diabetes Type 2" },
  { id: "4", name: "Ananya Iyer", age: 29, status: "Stable", lastVisit: "2026-04-30", condition: "Routine Checkup" },
  { id: "5", name: "Ishaan Verma", age: 67, status: "Critical", lastVisit: "2026-05-02", condition: "Cardiac Arrest Recovery" },
  { id: "6", name: "Meera Deshmukh", age: 41, status: "Stable", lastVisit: "2026-04-25", condition: "Thyroid Management" },
  { id: "7", name: "Arjun Rao", age: 35, status: "Stable", lastVisit: "2026-05-01", condition: "Physiotherapy" },
  { id: "8", name: "Saanvi Kulkarni", age: 22, status: "Stable", lastVisit: "2026-04-29", condition: "Viral Fever" },
  { id: "9", name: "Kabir Singh", age: 52, status: "Critical", lastVisit: "2026-05-02", condition: "Respiratory Distress" },
  { id: "10", name: "Riya Kapoor", age: 12, status: "Stable", lastVisit: "2026-04-20", condition: "Pediatric Consultation" },
  { id: "11", name: "Aditya Joshi", age: 74, status: "Stable", lastVisit: "2026-04-18", condition: "Arthritis" },
  { id: "12", name: "Zara Sheikh", age: 31, status: "Stable", lastVisit: "2026-05-01", condition: "Antenatal Care" },
];

export default function PatientPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <div className="p-6 space-y-6">
      {/* Header with View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Directory</h1>
          <p className="text-sm text-slate-500">Manage and monitor current patient records</p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <List className="size-4" /> List
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <LayoutGrid className="size-4" /> Grid
          </button>
        </div>
      </div>

      {/* Conditional Rendering of Views */}
      {viewMode === "list" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Patient</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Condition</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Last Visit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PATIENTS.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {p.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-400">Age: {p.age}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{p.condition}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                      p.status === "Critical" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{p.lastVisit}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 group-hover:text-blue-600 transition-colors">
                      <ChevronRight className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATIENTS.map((p) => (
         <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      )}
    </div>
  );
}