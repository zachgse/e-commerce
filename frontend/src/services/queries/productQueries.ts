import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce"
import { fetchAllProducts,fetchSingleProduct,fetchKeywordSearchProducts,fetchFullSearchProducts,fetchAdminProducts, updateAdminProductInfo, updateAdminProductStatus, createProduct } from "../api/productApi";
import type { Product,ProductAdmin,ProductAdminSearch,ProductCreatePayload,ProductDetail,ProductFullSearch } from "@/types/productType";
import type { PaginatedResponse } from "@/types/generalTypes";

export const useProductsFetch = () => {
    return useQuery<
        Product[], //from api response
        unknown, //error
        { //return values 
            products:Product[],
            map: Record<string,ProductDetail>
        }>
        ({
        queryKey: ["products"],
        queryFn: () => fetchAllProducts(),
        select: (products) => {
            
            const map: Record<string, ProductDetail> = {}; 

            products.forEach((p:Product) => {
                map[p.slug] = p as ProductDetail;
            });
            
            return {
                products,
                map,
            };
        },
        staleTime: 1000 * 60 * 5
    });
}

export const useSingleProductFetch = (slug:string) => {
    return useQuery({
        queryKey: ["product",slug],
        queryFn: () => fetchSingleProduct(slug)
    });
}

export const useFetchKeywordSearchProducts = (keyword:string) => {
    const debouncedKeyword = useDebounce(keyword,200);
    return useQuery({
        queryKey: ["keywordSearch",keyword],
        queryFn: () => fetchKeywordSearchProducts(keyword),
        enabled: debouncedKeyword.length >= 1,
        staleTime: 30 * 1000 
    });
}

export const useFetchFullSearchProducts = ({keyword,sortBy}:ProductFullSearch) => {
    return useQuery({
        queryKey: ["fullSearch",keyword,sortBy],
        queryFn: () => fetchFullSearchProducts({keyword,sortBy}),
        staleTime: 0,
        retry: false
    });
}

export const queryFetchAdminProducts = (params:ProductAdminSearch) => ({
    queryKey: ["admin/products",params.page,params.keyword,params.sortBy,params.sortOrder,params.filterBy,params.filterValue],
    queryFn: () => fetchAdminProducts(params),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // cache fresh for 5 mins
    select: (p:PaginatedResponse<ProductAdmin>) => {
        const list = p.data
        const totalItems = p.meta.total
        return {
            list,
            totalItems
        }
    }
})

export const useFetchAdminProducts = (params:ProductAdminSearch) => {
    return useQuery(queryFetchAdminProducts(params));
}

export const useUpdateAdminProductInfo = (slug:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAdminProductInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["product",slug]})
        }
    });
};

export const useUpdateAdminProductStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({slug}:{slug:string}) => updateAdminProductStatus(slug),
        onSuccess: (_,variables) => {
            queryClient.invalidateQueries({queryKey:["product",variables.slug]})
        }
    })
}

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: (payload:ProductCreatePayload) => createProduct(payload)
    });
}