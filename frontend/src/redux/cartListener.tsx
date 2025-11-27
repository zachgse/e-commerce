import { createListenerMiddleware,isAnyOf } from "@reduxjs/toolkit"
import { addToCart,updateQuantity } from "./cartSlice"
import { updateUserCart } from "../api/cartApi"
import type { RootState } from "./store";

const listenerMiddleware = createListenerMiddleware();
let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

listenerMiddleware.startListening({
    matcher: isAnyOf(addToCart,updateQuantity),
    effect: async (action,listenerApi) => {
        if (inactivityTimer) clearTimeout(inactivityTimer);

        inactivityTimer = setTimeout(async () =>{
            const cart = (listenerApi.getState() as RootState).cart.cart;
            const token = (listenerApi.getState() as RootState).auth.auth?.token;

            try {
                await updateUserCart(cart,token ?? "");
            } catch (error) {
                console.log(error);
            }
        },30_000)
    }
    
});

export default listenerMiddleware;
