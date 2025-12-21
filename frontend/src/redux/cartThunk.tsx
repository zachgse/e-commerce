import { createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import type { CartItem } from "@/types/cartType"
import type { ProductDetail } from "../types/productType"
import { addToCart } from "./cartSlice"

type AddToCartType = {
    cartItem : CartItem;
    product: ProductDetail;
}

export const tryAddToCart = createAsyncThunk<
    string,
    AddToCartType,
    { state: RootState}
    >(
    "cart/tryAddToCart",
    async (payload,{getState,dispatch}) => {
        const state = getState();
        const cart: CartItem[] = state.cart.cart;

        const product = payload.product;
        const cartItem = payload.cartItem;

        const existing = cart.find((c:CartItem) => c.slug === cartItem.slug);

        if (existing && 
            (existing.quantity + cartItem.quantity) 
            > (product?.stock ?? 0)){ 
            console.log("error exceed stock");
            return "exceeds_stock";
        }
        
        dispatch(addToCart(cartItem));
        return "added_to_cart";
    }
)

