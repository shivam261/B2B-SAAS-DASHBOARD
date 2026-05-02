"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge" // Or your own custom Badge component
import { Activity, ArrowUpDown, Calendar, Hash, ShieldAlert, User } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
export type Patient = {
    id: string
    name: string
    age: number
    status: "Stable" | "Critical"
    lastVisit: string
    condition: string
}

export const columns: ColumnDef<Patient>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="flex cursor-pointer items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
                <User className="size-4 text-blue-500" />
                <span>Patient Name</span>
                <ArrowUpDown className="size-3 text-slate-400" />
            </button>
        ),
        cell: ({ row }) => (
            <span className="font-semibold text-slate-900 block">
                {row.getValue("name")}
            </span>
        )
    },
    {
        accessorKey: "age",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="flex cursor-pointer items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
                <Hash className="size-4 text-slate-400" />
                <span>Age</span>
                <ArrowUpDown className="size-3 text-slate-400" />
            </button>
        ),
        cell: ({ row }) => <div className="text-slate-600 font-medium">{row.getValue("age")}</div>,
        filterFn: "equals",
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <div className="flex justify-center w-full">
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex cursor-pointer items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors"
                >
                    <ShieldAlert className="size-4" />
                    <span>Status</span>
                    <ArrowUpDown className="size-3 text-slate-400" />
                </button>
            </div>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <div className="flex justify-center">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-sm ${
                        status === "Critical" 
                            ? "bg-red-50 text-red-700 border-red-200" 
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}>
                        <span className={`mr-1.5 h-1.5 w-1.5 rounded-full animate-pulse ${
                            status === "Critical" ? "bg-red-600" : "bg-emerald-600"
                        }`} />
                        {status.toUpperCase()}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "condition",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="flex cursor-pointer items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
                <Activity className="size-4 text-orange-500" />
                <span>Condition</span>
                <ArrowUpDown className="size-3 text-slate-400" />
            </button>
        ),
        cell: ({ row }) => (
            <span className="text-slate-500 font-medium italic">
                {row.getValue("condition")}
            </span>
        )
    },
    {
        accessorKey: "lastVisit",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="flex cursor-pointer items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
                <Calendar className="size-4 text-slate-400" />
                <span>Last Visit</span>
                <ArrowUpDown className="size-3 text-slate-400" />
            </button>
        ),
        cell: ({ row }) => (
            <div className="text-slate-600 tabular-nums font-medium">
                {row.getValue("lastVisit")}
            </div>
        )
    },
    {
        id: "actions",
        header: () => <div className="sr-only">Actions</div>, // Keep actions non-sortable
        cell: ({ row }) => {
            const patient = row.original
            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4 text-slate-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => navigator.clipboard.writeText(patient.id)}
                            >
                                Copy Patient ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">View Patient</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]