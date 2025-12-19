import { useParams } from "react-router"
import { useSingleProductFetch } from "@/services/queries/productQueries"
import ProductShowSkeleton from "@/features/products/single/ProductShowSkeleton"
import ProductInfo from "@/features/products/single/ProductInfo"
import ProductReview from "@/features/products/single/ProductReview"

const ProductShow = () => {
    const params = useParams();

    if (!params.slug){
        return <div>Slug missing</div>
    }

    const slug = params.slug;

    const {data:product,isLoading,error} = useSingleProductFetch(slug);
    const reviews = product?.reviews;

    if (error) {
        console.log("error is ", error);
        return <div>Error!</div>
    }

    if (isLoading) {
        return <ProductShowSkeleton/>
    }

    if (!product) {
        return <div>Product not found.</div>
    }
        
    return (
        <div className="flex flex-col gap-8">
            <ProductInfo product={product}/>
            <ProductReview reviews={reviews ?? []}/>
        </div>
    )
}

export default ProductShow