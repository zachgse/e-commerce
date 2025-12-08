import type { ColumnDef } from "@tanstack/react-table"
import type { PaymentAdmin } from "@/types/adminTypes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ArrowUp,ArrowDown, MoreHorizontal } from "lucide-react"
import { money_format } from "@/utils/helper"
import { statusBadgePills } from "@/utils/styleHelper"

export const getPaymentColumns = (
    onView: (referenceNumber:string) => void 
):ColumnDef<PaymentAdmin>[] => [
    {
        accessorKey:"reference_number",
        header:({column}) => {
            return <div>Reference #</div>
        },
        cell: ({row}) => <div>{row.getValue("reference_number")}</div>,
    },
    {
        accessorKey:"order_amount",
        header:({column}) => {
            return (
                <Button
                    className="text-left capitalize"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Amount
                    {!column.getIsSorted() ? <ArrowUpDown /> : (
                        column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
                    )}
                </Button>
            )
        },
        cell: ({row}) => <div>{money_format(row.getValue("order_amount"))}</div>,
    },
    {
        accessorKey:"status",
        header:({column}) => {
            return <div>Status</div>
        },
        cell: ({row}) => <div className={statusBadgePills(row.getValue("status"))}>{row.getValue("status")}</div>,
    },
    {
        accessorKey:"created_at",
        header:({column}) => {
            return (
                <Button
                    className="text-left capitalize"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Payment Initiated
                    {!column.getIsSorted() ? <ArrowUpDown /> : (
                        column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
                    )}
                </Button>
            )
        },
        cell: ({row}) => <div>{row.getValue("created_at")}</div>,
    },
    {
        accessorKey:"updated_at",
        header:({column}) => {
            return (
                <Button
                    className="text-left capitalize"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Payment Updated
                    {!column.getIsSorted() ? <ArrowUpDown /> : (
                        column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
                    )}
                </Button>
            )
        },
        cell: ({row}) => <div>{row.getValue("updated_at")}</div>,
    },
    { 
        id: "actions",
        header: ({ column }) => {
        return (
            <div className="capitalize">{column.id}</div>
        )
        },
        cell: ({ row }:any) => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-center">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => onView(row.original.reference_number)}>
                    <p className="mx-auto">
                        View Details
                    </p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
        },
    }
]