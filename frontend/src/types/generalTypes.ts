export type PaginatedResponse<T> = {
    data : T[]
    meta : {
        total: number
    }
}