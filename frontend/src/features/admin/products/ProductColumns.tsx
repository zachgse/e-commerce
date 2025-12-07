import type { ColumnDef } from "@tanstack/react-table"
import type { ProductAdmin } from "@/features/products/productType"
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

export const getProductColumns = (
    onEdit: (slug:string) => void,
    onUpdateStatus: (slug:string) => void
): ColumnDef<ProductAdmin>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => {
        return (
            <div className="capitalize">{column.id}</div>
        )
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "slug",
        header: ({ column }) => {
        return (
            <div className="capitalize">{column.id}</div>
        )
        },
        cell: ({ row }) => <div>{row.getValue("slug")}</div>,
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
        return (
            <Button
            className="text-left capitalize"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            {column.id}
            {!column.getIsSorted() ? <ArrowUpDown /> : (
                column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
            )}
            </Button>
        )
        },
        cell: ({ row }) => <div>{money_format(row.getValue("price"))}</div>,
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
        return (
            <Button
            className="text-left capitalize"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            {column.id}
            {!column.getIsSorted() ? <ArrowUpDown /> : (
                column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
            )}
            </Button>
        )
        },
        cell: ({ row }) => <div>{row.getValue("stock")}</div>,
    },
    {
        accessorKey: "total_sold",
        header: ({ column }) => {
        return (
            <Button
            className="text-left capitalize"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            {column.id.replace("_"," ")}
            {!column.getIsSorted() ? <ArrowUpDown /> : (
                column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
            )}
            </Button>
        )
        },
        cell: ({ row }) => <div>{row.getValue("total_sold")}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
        return (
            <div className="capitalize">{column.id}</div>
        )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
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
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-center">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer"
                                    onClick={() => onEdit(row.original.slug)}>
                    <p className="mx-auto">
                        Edit
                    </p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer"
                                    onClick={() => onUpdateStatus(row.original.slug)}>
                    <p className="mx-auto">
                        {row.original.status == "active" ? "Deactivate" : "Activate"}
                    </p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
        },
    }
]