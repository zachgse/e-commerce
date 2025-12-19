import React from "react"
import { useProductsFetch } from "@/services/queries/productQueries"
import ProductListData from "./ProductListData"

const ProductListContent: React.FC = () => {
  const { data , isLoading, isError } = useProductsFetch();

  return (
    <ProductListData products={data?.products ?? []}
                      isError={isError}
                      isLoading={isLoading}/>
  );
};

export default ProductListContent;
