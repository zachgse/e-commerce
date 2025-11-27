import { axiosClient } from "./axiosClient"
import type { Cart,CartItem } from "../features/cart/cartType";

export const fetchUserCart = async(token:string) : Promise<Cart[]> => {
    const response = await axiosClient.get('/cart',{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.data.data == null) return [];
    return response.data.data.contents;
}

export const updateUserCart = async(cart:CartItem[],token:string) : Promise<Cart> => {
    const response = await axiosClient.post('/cart/update',{cart:cart},{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data.data;
}