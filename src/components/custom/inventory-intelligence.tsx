"use client";

import React from "react";
import { Package, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface InventoryItem {
  item: string;
  stock: number;
  minLevel: number;
  unit: string;
  daysRemaining: number;
}

const INVENTORY_DATA: InventoryItem[] = [
  { item: "Oxygen Cylinders", stock: 85, minLevel: 100, unit: "Units", daysRemaining: 3 },
  { item: "Surgical Gloves", stock: 1200, minLevel: 500, unit: "Pairs", daysRemaining: 14 },
  { item: "Insulin Vials", stock: 45, minLevel: 60, unit: "Vials", daysRemaining: 5 },
  { item: "Cardiac Stents", stock: 12, minLevel: 10, unit: "Units", daysRemaining: 8 },
];

export function InventoryIntelligence() {
  return (
    <div className="w-full bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-112.5">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-lg text-slate-800">Supply Chain Intelligence</h3>
          <p className="text-xs text-slate-400">Inventory levels & predictive restock</p>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg">
          <Package className="size-5 text-slate-400" />
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1 custom-scrollbar">
        {INVENTORY_DATA.map((item) => {
          const isCritical = item.stock < item.minLevel;
          const percentage = Math.min((item.stock / (item.minLevel * 1.5)) * 100, 100);

          return (
            <div key={item.item} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-slate-700">{item.item}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {isCritical ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                        <AlertTriangle className="size-3" /> Low Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                        <CheckCircle className="size-3" /> Healthy
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-medium italic">
                      Exp. in {item.daysRemaining} days
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{item.stock}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{item.unit}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${isCritical ? 'bg-rose-500' : 'bg-blue-500'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Predictive Action Footer */}
      <div className="mt-6 p-3 bg-indigo-50 rounded-2xl border border-indigo-100 border-dashed">
        <div className="flex gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
            <Clock className="size-4 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">AI Procurement Suggestion</p>
            <p className="text-[11px] text-indigo-700 mt-1 leading-relaxed">
              Order <strong>50 Oxygen Cylinders</strong> today to avoid a weekend shortage due to increased ER demand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}