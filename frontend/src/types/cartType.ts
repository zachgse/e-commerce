import type { ProductDetail } from "./productType";

export type Cart = { //used for retrieving the cart of the user
    cart: CartItem[] 
}

export type CartItem = { //used for individual cart items inside the cart
    slug: string;
    quantity: number;
}

export type CartOperations = { //used for +/- in cart of user
  cartItem: CartItem;
  product: ProductDetail;
  operation: "add" | "remove";
}

export type Checkout = { //used for checkout products
  product_description : {
    name:string;
    slug:string;
    image:string;
  },
  quantity:number;
  subtotal:number;
}

