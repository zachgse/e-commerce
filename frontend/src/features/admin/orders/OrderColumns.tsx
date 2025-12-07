import type { ColumnDef } from "@tanstack/react-table"
import type { OrderAdmin } from "@/types/adminTypes"
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
import { money_format } from "@/helpers/helper"

export const getOrderColumns = (
    onView: (referenceNumber:string) => void,
    onUpdate: (referenceNumber:string) => void
):ColumnDef<OrderAdmin>[] => [
    {
        accessorKey:"reference_number",
        header:({column}) => {
            return <div>Reference #</div>
        },
        cell: ({row}) => <div>{row.getValue("reference_number")}</div>,
    },
    {
        accessorKey:"customer",
        header:({column}) => {
            return <div>Column</div>
        },
        cell: ({row}) => <div>{row.getValue("customer")}</div>,
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
        accessorKey:"order_status",
        header: ({column}) => {
            return <div>Order Status</div>
        },
        cell: ({row}) => {
            const orderStatus:string = row.getValue("order_status");
            return (
                <div className="capitalize">{orderStatus.replace("_"," ")}</div>
            )
        }
    },
    {
        accessorKey:"payment_status",
        header: ({column}) => {
            return <div>Payment Status</div>
        },
        cell: ({row}) => {
            return (
                <div className="capitalize">{row.getValue("payment_status")}</div>
            )
        }
    },
    {
        accessorKey:"order_placed_at",
        header:({column}) => {
            return (
                <Button
                    className="text-left capitalize"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Date ordered
                    {!column.getIsSorted() ? <ArrowUpDown /> : (
                        column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
                    )}
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <div><p>{row.getValue("order_placed_at")}</p></div>
            )
        }
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
                    {row.original.order_status == "order placed" && (
                        <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdate(row.original.reference_number)}>
                            <p className="mx-auto">
                                Ship order
                            </p>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        )
        },
    }
]