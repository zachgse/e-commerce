import { Link } from "react-router"
import type { Product } from '@/types/productType'
import Box from "@/components/reusable/Box"
import { money_format } from "@/utils/helper"
import { FaStar,FaRegStar } from "react-icons/fa"
import ProductListSkeleton from "./ProductListSkeleton"

type ProductListDataProps = {
    isLoading?: boolean
    isFetching?: boolean
    isError?: boolean
    products: Product[]
}

const ProductListData = ({products,isLoading,isFetching,isError}:ProductListDataProps) => {    
    if (isLoading || isFetching) return <ProductListSkeleton/>
    if (isError) {
        return <div className="text-sm text-center text-gray-500">Error.</div>
    }
    return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {products ? products.map((product,index) => (
            <Link to={`/product/${product.slug}`} key={index}
            className="border border-gray-300 flex flex-col gap-2 p-4">
                <div className="flex-none">
                {product?.thumbnail_image ? 
                    <img src={`${product?.thumbnail_image}`}/>
                    : <Box class="w-full aspect-square"/>}
                </div>
                <p className="font-bold flex-1 break-all">{product.name}</p>
                <p className="text-xs text-gray-500 font-semibold">{money_format(product.price)}</p>
                <div className="flex flex-none flex-wrap items-center gap-1">
                    {Array.from({ length:5 }).map((_,index) => (
                        <div key={index}>
                            {index+1 <= product.average_reviews 
                            ? <FaStar className="text-yellow-500 w-3 h-3"/>
                            : <FaRegStar className="text-yellow-500 w-3 h-3"/>
                            }
                        </div> 
                    ))}
                    <p className="text-xs">({product.total_number_reviews})</p>
                </div>
            </Link>
        )) : <div className="text-center">No products found.</div>}
    </div>
    )
}

export default ProductListData