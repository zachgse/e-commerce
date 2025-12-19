import type { Review } from "./reviewType"

export type Product = { 
    name: string
    slug: string
    price: number
    thumbnail_image?: string
    total_number_reviews: number
    average_reviews: number
}

export type ProductDetail = Product & { 
    name: string
    slug: string
    price: number
    thumbnail_image?: string
    description: string
    stock: number
    collection_images?: {
        file_path: string
    }[]
    reviews?: Review[]
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
    },
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
}

export type ProductAdminUpdate = {
    slug: string
    payload: {
        image: File | undefined
        name: string
        description: string
        price: number
        stock: number
    }
}

export type ProductCreatePayload = {
    image: File | string
    name: string
    description: string
    price: number
    stock: number   
}