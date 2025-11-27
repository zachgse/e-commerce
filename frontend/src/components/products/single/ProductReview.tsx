import type { Review } from "../../../features/reviews/reviewType"

type ProductReviewProps = {
    reviews: Review[]
}

const ProductReview = ({reviews}:ProductReviewProps) => {
  return (
    <div className="border-1 border-gray-300 rounded shadow-lg p-6 w-full">
        <p className="text-2xl font-bold">Reviews</p>
        <div className="flex flex-col gap-2 p-4">
        {reviews && reviews.length > 0 ? 
            reviews.map((review:Review) => (
                <div>{review.user}</div>
            ))
            :
            <div className="text-sm text-center text-gray-500">No reviews yet.</div>
        }     
        </div>
    </div>
  )
}

export default ProductReview