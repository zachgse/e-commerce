import { apiAuth } from "@/hooks/axiosClient"
import type { Cart,CartItem } from "@/types/cartType";

export const fetchUserCart = async() : Promise<Cart[]> => {
    const response = await apiAuth.get('/cart');
    if (response.data.data == null) return [];
    return response.data.data.contents;
}

export const updateUserCart = async(cart:CartItem[]) : Promise<Cart> => {
    const response = await apiAuth.post('/cart/update',{cart:cart});

    return response.data.data;
}