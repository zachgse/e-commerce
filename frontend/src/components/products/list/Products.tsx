import React from "react"
import { useProductsFetch } from "../../../features/products/productQueries"
import ProductListSkeleton from "./ProductListSkeleton"
import ProductListData from "./ProductListData";

const Products: React.FC = () => {
  const { data , isLoading, isError } = useProductsFetch();

  if (isLoading) {
    return <ProductListSkeleton/>; 
  }

  if (isError) {
    return <div className="text-sm text-center text-gray-500">Error.</div> //refactor soon add error messages
  }

  if (!data.products) {
    return <div>No products yet.</div>
  }

  return (
    <ProductListData products={data.products}/>
  );
};

export default Products;
