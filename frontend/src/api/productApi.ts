import { axiosClient,apiAuth } from "./axiosClient"
import type { ProductDetail,ProductKeywordSearch,ProductFullSearch,ProductAdmin,ProductAdminSearch, ProductAdminUpdate, ProductCreatePayload } from "../features/products/productType"
import type { PaginatedResponse } from "@/types/generalTypes";

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

export const fetchAdminProducts = async({page,keyword,sortBy,sortOrder,filterBy,filterValue}:ProductAdminSearch):Promise<PaginatedResponse<ProductAdmin>> => {
  const response = await apiAuth.get("/admin/products", {
    params: {
      page,
      keyword,
      sortBy,
      sortOrder,
      filterBy,
      filterValue
    },
  });
  return response.data;
}
//
export const updateAdminProductInfo = async({slug,payload}:ProductAdminUpdate) => {
  const formData = new FormData();
  formData.append("name",payload.name);
  formData.append("description",payload.description);
  formData.append("price",payload.price.toString());
  formData.append("stock",payload.stock.toString());
  if (payload.image) {
    const file = payload.image instanceof FileList ? payload.image[0] : payload.image;
    formData.append("image", file);
  }
  const response = await apiAuth.post(`products/${slug}`,formData);
  return response.data.data;
}

export const updateAdminProductStatus = async(slug:string) => {
  const response = await apiAuth.patch(`products/${slug}`);
  return response.data.data;
}

export const createProduct = async(payload:ProductCreatePayload) => {
  const formData = new FormData();
  formData.append("image", payload.image);
  formData.append("name",payload.name);
  formData.append("description",payload.description);
  formData.append("price",payload.price.toString());
  formData.append("stock",payload.stock.toString());

  const response = await apiAuth.post('/products',formData);
  return response.data.data;
}