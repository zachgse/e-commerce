import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Cart,CartItem,CartOperations } from "../features/cart/cartType"

const initialState : Cart = {
    cart : [],
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers: { 
        setInitialCart: (state,action) => {
            state.cart = action.payload;
        },
        addToCart: (state,action : PayloadAction<CartItem>) => {
            const cartItem = action.payload;
            const existing = state.cart.find((c) => c.slug === cartItem.slug);

            if (existing) {
                existing.quantity = existing.quantity + cartItem.quantity;
            } else {
                state.cart.push(cartItem);
            }
        },
        updateQuantity: (state,action : PayloadAction<CartOperations>) => {
            const cartItem = action.payload.cartItem;
            const product = action.payload.product;
            const operation = action.payload.operation;

            const existing = state.cart.find((c:CartItem) => c.slug === cartItem.slug);

            if (existing){
                switch (operation) {
                    case "add":
                        if (existing.quantity <= (product?.stock ?? 0)){
                            existing.quantity += 1;
                        }           
                        break;
                    case "remove":
                        existing.quantity -= 1
                        if (existing.quantity == 0) {
                            state.cart = state.cart.filter((c:CartItem) => c.slug !== cartItem.slug);
                        }
                        break;
                    default: 
                        break;
                }
            }
        },
    }
})

export const { setInitialCart,addToCart,updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;