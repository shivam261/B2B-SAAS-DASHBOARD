"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PatientCard } from "@/components/custom/patient-card";
import { Button } from "@/components/ui/button";
import { Patient } from "@/components/custom/tables/patients/columns";

interface PatientGridViewProps {
  data: Patient[];
  itemsPerPage?: number;
}

export function PatientGridView({ data, itemsPerPage = 8 }: PatientGridViewProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  if (data.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
        No patients found matching your criteria.
      </div>
    );
  }

  return (
    /* 
       Using min-h-[650px] (adjust based on your card height) 
       and flex-col to keep pagination at the bottom 
    */
    <div className="flex flex-col min-h-150 justify-between space-y-6">
      
      {/* Grid Container - flex-grow ensures this takes up available space */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 content-start grow">
        {paginatedData.map((p) => (
          <PatientCard key={p.id} patient={p} />
        ))}
      </div>

      {/* Pagination Controls - Pushed to bottom by flex-grow above */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between py-4 border-t border-slate-100 mt-auto">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{startIndex + 1}</span> to{" "}
            <span className="text-slate-900 font-bold">
              {Math.min(startIndex + itemsPerPage, data.length)}
            </span> of <span className="text-slate-900 font-bold">{data.length}</span>
          </p>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-sm font-bold text-slate-900 shadow-sm">
              {currentPage}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}