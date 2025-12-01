import { axiosClient,apiAuth } from "./axiosClient"
import type { ProductDetail,ProductKeywordSearch,ProductFullSearch,ProductAdmin } from "../features/products/productType"

export const fetchAllProducts = async () => {
    const response = await axiosClient.get('/products');
    return response.data.data;  
}

export const fetchSingleProduct = async(slug:string):Promise<ProductDetail> => { 
    const response = await axiosClient.get(`/products/${slug}`);
    return response.data.data;
}

export const fetchKeywordSearchProducts = async(keyword:string):Promise<ProductKeywordSearch[]> => { 
    const response = await 
        axiosClient.get(`/products/search?keyword=${keyword}`);
    return response.data.data;
}

export const fetchFullSearchProducts = async({keyword,sortBy}:ProductFullSearch) => { 
    const response = await 
        axiosClient.get(`/products/search?keyword=${keyword}&mode=full&sortBy=${sortBy}`);
    return response.data.data;
}

export const fetchAdminProducts = async(page:number):Promise<ProductAdmin[]> => {
    const response = await apiAuth(`/admin/products?page=${page}`);
    return response.data;
}