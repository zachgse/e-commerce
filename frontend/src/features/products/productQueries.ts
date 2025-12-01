import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce"
import { fetchAllProducts,fetchSingleProduct,fetchKeywordSearchProducts,fetchFullSearchProducts,fetchAdminProducts } from "../../api/productApi";
import type { Product,ProductAdminSearch,ProductDetail,ProductFullSearch } from "./productType";

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
        }
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
    select: (p:any) => {
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