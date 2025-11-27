import { useParams } from "react-router"
import { useSingleProductFetch } from "../features/products/productQueries"
import ProductSingleSkeleton from "../components/products/single/ProductSingleSkeleton"
import ProductInfo from "../components/products/single/ProductInfo"
import ProductReview from "../components/products/single/ProductReview"

const ProductShow = () => {
    const params = useParams();

    if (!params.slug){
        return <div>Slug missing</div>
    }

    const slug = params.slug;

    const {data:product,isLoading,error} = useSingleProductFetch(slug);

    if (error) {
        console.log("error is ", error);
        return <div>Error!</div>
    }

    if (isLoading) {
        return <ProductSingleSkeleton/>
    }

    if (!product) {
        return <div>Product not found.</div>
    }

    const reviews = product.reviews;
    
    return (
        <div className="flex flex-col gap-8">
            <ProductInfo product={product}/>
            <ProductReview reviews={reviews}/>
        </div>
    )
}

export default ProductShow