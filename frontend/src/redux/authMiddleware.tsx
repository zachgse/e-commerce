import type { Middleware } from "@reduxjs/toolkit"
import { addToCart,setInitialCart,updateQuantity } from "./cartSlice"

const cartActions = [
    addToCart.type,setInitialCart.type,updateQuantity.type,
];

export const authMiddleware:Middleware = (store) => (next) => (action:any) => 
{
    const isActionInUpcoming = cartActions.includes(action.type);

    if (isActionInUpcoming) {
        const state = store.getState();
        const isAuth = !!state.auth.auth.token;
        
        if (!isAuth) {
            console.log("User is not logged in");
            return "Unauthorized";
        }
    }

    return next(action);
}