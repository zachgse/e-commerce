import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useAppSelector,useAppDispatch } from "../hooks/hooks"
import { useProductsFetch } from "../features/products/productQueries"
import type { CartItem,CartOperations } from "../features/cart/cartType"
import { updateQuantity } from "../redux/cartSlice"
import Box from "../components/reusable/Box"
import Button from "../components/reusable/Button"
import Modal from "../components/reusable/Modal"
import ErrorComponent from "../components/reusable/ErrorComponent"
import { money_format } from "../helpers/helper"

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart.cart);
  const userInfo = useAppSelector((state) => state.auth.auth?.user);
  const { data } = useProductsFetch();
  const productMap = data?.map ?? {};
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
  const [cartProductRemove,setCartProductRemove] = useState<CartItem>();
  const [cartSelected,setCartSelected] = useState<string[]>([]); 
  const isAllProductSelected = cart.length > 0 && cart.every(c => cartSelected.includes(c.slug));
  const subTotal = cartSelected.reduce((sum,c) => {
    const item = cart.find((cartItem) => cartItem.slug === c);
    if (!item) return sum;
    const product = productMap[c];
    return sum + (item.quantity * product.price)
  },0)

  const updateProductQuantity = ({cartItem,product,operation}:CartOperations) => {
    const payload = {
      "cartItem" : cartItem,
      "product" : product,
      "operation" : operation
    }

    switch(operation) {
      case "add":
        if (cartItem.quantity < product.stock){
          dispatch(updateQuantity(payload));
        } else {
          toast.error("The product in your cart exceeds the maximum stock of this product.");
        }
        break;
      case "remove":
        if (cartItem.quantity > 1) {
          dispatch(updateQuantity(payload))
        } else {
          setCartProductRemove(cartItem);
          setIsModalOpen(true);
        }
    }
  }
  
  const confirmRemove = ({cartItem,product,operation}:CartOperations) => {
    dispatch(updateQuantity({cartItem,product,operation}));
    toast.success("Product removed from your cart")
    setIsModalOpen(false);
    setCartProductRemove(undefined);
  }

  const toggleSelectAll = () => {
    setCartSelected(isAllProductSelected ? [] : cart.map(c => c.slug));
  }

  const toggleSelectProducts = (slug:string) => {
    setCartSelected((prev) => 
        prev.includes(slug) 
          ? prev.filter(p => p !== slug)
          : [...prev,slug]
      );
  }

  const handleCheckout = () => {
    const checkoutProducts = cartSelected.map(cs => {
      const cartItem = cart.find(c => c.slug === cs);
      const product = productMap[cartItem?.slug ?? '']
      if (!product) return;

      return {
        product_description : {
          name:product.name,
          slug:product.slug,
          image:product.thumbnail_image,
        }, 
        quantity: cartItem?.quantity,
        subtotal: (cartItem?.quantity ?? 0) * product.price
      }
    })

    navigate("/checkout", {
      state : {
        checkoutProducts
      }
    });  
  }

  if (!userInfo){
    return <ErrorComponent message="Unauthorized action. Please login first"/>
  }

  return (
    <>
      <div className="md:px-20 px-8 mt-8 mb-40">
        {cart && cart.length > 0 
          ?
          (<table className="table-auto mx-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="w-1/8"></th>
                <th className="w-1/2">Product</th>
                <th className="w-1/3">Quantity</th>
                <th className="w-1/3">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem,index)=> {
                const product = productMap[cartItem.slug];
                return (
                  <tr key={index} className="border-b border-gray-300 ">
                    <td className="py-8">
                      <input type="checkbox"
                        onChange={() => toggleSelectProducts(cartItem.slug)}
                        checked={cartSelected.includes(cartItem.slug)}/>
                    </td>
                    <td className="py-8">
                      <div className="flex items-center gap-4">
                        {product?.thumbnail_image ?
                          <img className="w-24 h-24" src={product?.thumbnail_image}/>
                          : <Box class="w-24 h-24"/>}
                          {product?.name}
                      </div>
                    </td>
                    <td className="py-8">
                      <div className="flex items-center">
                        <Button name="-" class="cursor-pointer hover:opacity-80" 
                          onClick={() => updateProductQuantity({cartItem,product,operation:"remove"})}/>
                        <input type="text" className="bg-white border-1 border-gray-300 text-center w-12"
                        value={cartItem.quantity} onChange={() => cartItem.quantity}/>
                        <Button name="+" class={cartItem.quantity == product?.stock 
                          ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-80"}
                          onClick={() => updateProductQuantity({cartItem,product,operation:"add"})}/>
                      </div>
                    </td>
                    <td className="py-8">{money_format(cartItem.quantity * product?.price)}</td>
                  </tr> 
                )
              })}
            </tbody>
          </table>)
          : 
          <div className="text-center text-xs font-semibold text-gray-500">
            No products in your shopping cart yet.
          </div>
        }
      </div>

      {cart && cart.length > 0 
        ?
          (<div className="bg-white w-full fixed bottom-0 border-t border-gray-300 flex items-center gap-12 md:px-20 px-8 py-6">
            <div className="flex items-center gap-2 me-auto">
              <input type="checkbox" onChange={() => toggleSelectAll()}
                checked={isAllProductSelected}/>
              All
            </div>
            <b className="text-2xl">{money_format(subTotal ?? 0)}</b>
            <Button onClick={handleCheckout} name="Proceed to payment" 
              class={"px-8 py-2 " + (cartSelected.length > 0 ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed opacity-70")}
              disabled={cartSelected.length > 0 ? false : true}/>
          </div>)  
        : ""
      }

      {cartProductRemove ? 
        (<Modal isOpen={isModalOpen} message="Remove this product from your cart?" confirmTitle="Remove"
          onConfirm={() => 
                confirmRemove({
                  cartItem:cartProductRemove,
                  product:productMap[cartProductRemove.slug],
                  operation:"remove"
                })} 
                onCancel={() => setIsModalOpen(false)}/>) 
          : ""}
    </>
  )
}

export default Cart