import { Link } from "react-router"
import type { Product } from '../../../features/products/productType'
import Box from "../../reusable/Box"
import { money_format } from "../../../utils/helper"
import { FaStar,FaRegStar } from "react-icons/fa"

type ProductListDataProps = {
    products: Product[]
}

const ProductListData = ({products}:ProductListDataProps) => {    
    return (
    <div className="grid grid-cols-2 sm:grid-colas-4 md:grid-cols-8 gap-4">
        {products && products.map((product,index) => (
            <Link to={`product/${product.slug}`} key={index}
            className="border border-gray-300 flex flex-col gap-2 p-4">
                {product.thumbnail_image ? 
                    <img src={`${product.thumbnail_image}`}/>
                    : <Box class="w-full aspect-square"/>}
                <p className="font-bold">{product.name}</p>
                <p className="text-xs text-gray-500 font-semibold">{money_format(product.price)}</p>
                <div className="flex items-center gap-1">
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
        ))}
    </div>
    )
}

export default ProductListData