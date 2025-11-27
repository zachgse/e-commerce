import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch,useAppSelector } from '../../../hooks/hooks'
import { tryAddToCart } from '../../../redux/cartThunk'
import type { ProductDetail } from '../../../features/products/productType'
import type { CartItem } from '../../../features/cart/cartType'
import { money_format } from '../../../helpers/helper'
import Box from '../../reusable/Box'
import { FaStar } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa"

type ProductProps = {
    product: ProductDetail;
}

type AddToCartType = {
    cartItem : CartItem;
    product: ProductDetail;
}

const ProductInfo = ({product}:ProductProps) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth.auth);

    const [productAmount,setProductAmount] = useState<number>(1);

    const changeProductAmount = (operation : string) => {
        if (operation == "add") {
            setProductAmount((prev:number) => prev + 1);
        } else {
            setProductAmount((prev:number) => prev - 1);
        }
    }

    const handleAction = async() => {
        if (!auth) {
            toast.error("Please login before adding to cart.");
            return;
        }

        const cartItem : CartItem = {
            "slug":product.slug,
            "quantity":productAmount
        }

        const payload : AddToCartType = {
            "cartItem" : cartItem,
            "product" : product
        }

        const response = await dispatch(tryAddToCart(payload)).unwrap(); 

        switch (response) {
            case "exceeds_stock":
                toast.error("The product in your cart exceeds the maximum stock of this product.");
                break;
            case "added_to_cart":
                toast.success("Product has been added to your cart");
                break;
            default:
                toast.warn("There is an error");
                break;            
        }
    }

    return (
        <div className="border-1 border-gray-300 rounded shadow-lg p-6 w-full">
            <div className="grid grid-cols-3 gap-12">
                <div className="md:col-span-1 col-span-3 flex flex-col gap-2">
                    {product.thumbnail_image ? 
                        <img src={product.thumbnail_image} className="w-full"/>
                        : <Box class="w-full h-96"/> }
                    {product.collection_images ? 
                        <div className="flex flex-wrap justify-center gap-2">
                            {product.collection_images.map((image,index:number) => (
                                <div key={index}>
                                    <img src={image.file_path} className="w-20 h-24 object-cover rounded-lg"/>
                                </div>
                            ))}
                        </div>
                    : ""}
                </div>
                <div className="md:col-span-2 col-span-3 flex flex-col gap-2">
                    <p className="text-2xl font-bold">{product.name}</p>
                    <div className="flex items-center gap-1">
                        {Array.from({ length:5 }).map((_,index) => (
                            <div key={index}>
                                {index+1 <= product.average_reviews 
                                ? <FaStar className="text-yellow-500 w-5 h-5"/>
                                : <FaRegStar className="text-yellow-500 w-5 h-5"/>
                                }
                            </div> 
                        ))}
                        <p className="font-semibold">{product.average_reviews} / 5 ({product.total_number_reviews})</p>
                    </div>
                    <p className="text-gray-500">{money_format(product.price)}</p>
                    <p className="text-xs text-gray-500">In stock: {product.stock}</p>
                    <div className="flex items-center gap-1">
                        <button onClick={() => changeProductAmount("minus")} 
                            className={"flex items-center justify-center bg-black text-white px-4 rounded-full " + 
                                (productAmount <= 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-80")}
                            disabled={productAmount <= 1}>
                                -
                        </button>
                        <input className="bg-white border-1 border-gray-300 text-center w-12" 
                            value={productAmount} onChange={(e) => setProductAmount(Number(e.target.value))}
                            min={1} max={product.stock}/>
                        <button onClick={() => changeProductAmount("add")}
                            className={"flex items-center justify-center bg-black text-white px-4 rounded-full " + 
                                (productAmount >= product.stock ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-80")}
                            disabled={productAmount >= product.stock}>
                                +
                        </button>
                    </div>
                    <p className="">
                        {product.description}
                    </p>
                    {auth && (
                        <button onClick={() => handleAction()} 
                            className='flex items-center justify-center bg-green-500 text-white 
                                        rounded-full cursor-pointer hover:opacity-80 w-30 py-2'>
                                Add to cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductInfo