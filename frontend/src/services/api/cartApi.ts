import { axiosClient,apiAuth } from "@/hooks/axiosClient"
import type { Cart,CartItem } from "@/types/cartType";

export const fetchUserCart = async(token:string) : Promise<Cart[]> => {
    const response = await axiosClient.get('/cart',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.data.data == null) return [];
    return response.data.data.contents;
}

export const updateUserCart = async(cart:CartItem[]) : Promise<Cart> => {
    const response = await apiAuth.post('/cart/update',{cart:cart});
    return response.data.data;
}