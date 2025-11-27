import React from "react"
import { Link } from "react-router"
import { useProductsFetch } from "../../../features/products/productQueries"
import ProductListSkeleton from "./ProductListSkeleton"
import Box from "../../reusable/Box"
import { money_format } from "../../../helpers/helper"

const Products: React.FC = () => {
  const { data , isLoading, error } = useProductsFetch();

  if (isLoading) {
    return <ProductListSkeleton/>; 
  }

  if (error) {
    return <div className="text-sm text-center text-gray-500">No reviews yet.</div> //refactor soon add error messages
  }

  return (
    <div className="grid grid-cols-2 sm:grid-colas-4 md:grid-cols-8 gap-4">
      {data && data.list.length > 0 ?
        data.list.map((product,index) => (
          <Link to={`product/${product.slug}`} key={index}
            className="border border-gray-300 flex flex-col gap-1 p-4">
            {product.thumbnail_image ? 
              <img src={`${product.thumbnail_image}`}/> //refactor soon resize later
                : <Box class="w-full aspect-square"/>}
            <p className="font-bold">{product.name}</p>
            <p className="text-xs text-gray-500 font-semibold">{money_format(product.price)}</p>
          </Link>
        ))
        : <div className="text-sm text-center text-gray-500">No reviews yet.</div>
      }
    </div>
  );
};

export default Products;
