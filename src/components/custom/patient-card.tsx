"use client";

import React from "react";
import { Activity, Calendar, MoreVertical, User } from "lucide-react";

// Define the shape of our patient data for type safety
export interface Patient {
  id: string;
  name: string;
  age: number;
  status: "Stable" | "Critical";
  lastVisit: string;
  condition: string;
}

interface PatientCardProps {
  patient: Patient;
  onClick?: (id: string) => void;
}

export function PatientCard({ patient, onClick }: PatientCardProps) {
  const isCritical = patient.status === "Critical";
  
  // Get initials for the avatar
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div 
      onClick={() => onClick?.(patient.id)}
      className="group bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
    >
      {/* Subtle background glow for critical patients */}
      {isCritical && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 blur-3xl rounded-full -mr-10 -mt-10" />
      )}

      <div className="flex justify-between items-start mb-4">
        <div className={`size-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner transition-colors ${
          isCritical ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
        }`}>
          {initials}
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-tight ${
            isCritical ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
          }`}>
            {patient.status}
          </span>
          <button className="text-slate-300 hover:text-slate-600 p-1">
            <MoreVertical className="size-4" />
          </button>
        </div>
      </div>

      <div className="space-y-1 mb-4">
        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
          {patient.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium truncate italic">
          {patient.condition}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-50 rounded-lg">
            <User className="size-3 text-slate-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Age</p>
            <p className="text-xs font-bold text-slate-700">{patient.age}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-50 rounded-lg">
            <Calendar className="size-3 text-slate-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Last Visit</p>
            <p className="text-xs font-bold text-slate-700">{patient.lastVisit.split('-').slice(1).join('/')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}