import type { SortingState,ColumnFiltersState } from "@tanstack/react-table"
import type { Review } from "../reviews/reviewType"

export type Product = { //used for list of all products
    name: string
    slug: string
    price: number
    thumbnail_image?: string
    total_number_reviews: number
    average_reviews: number
}

export type ProductDetail = Product & { //used for single products
    name: string
    slug: string
    price: number
    thumbnail_image?: string
    description: string
    stock: number
    collection_images?: {
        file_path: string
    }[]
    reviews: Review[]
}

export type ProductKeywordSearch = {
    name : string
}

export type ProductFullSearch = {
    keyword: string
    sortBy: "asc" | "desc" | ""
}

export type ProductAdmin = {
    data: {
        name: string
        slug: string
        price: number
        stock: number
        total_sold: number
        status: string
    }[],
    meta: {
        total: number
    }
}

export type ProductAdminSearch = {
    page: number
    keyword: string | ""
    sortBy?: string
    sortOrder?: boolean
    filterBy?: string
    filterValue?: string | unknown
    // sortByPrice: "asc" | "desc" | null
    // status: "active" | "inactive" | null
}