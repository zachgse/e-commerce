import type { Review } from "../../../features/reviews/reviewType"
import { FaRegUserCircle } from "react-icons/fa"

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
              <div className="border-t border-gray-300 flex items-start gap-3 p-4">
                <FaRegUserCircle className="flex-none w-10 h-10"/>
                <div className="flex flex-col grow">
                  <p className="font-bold">{review.name}</p>
                  <p>{review.description}</p>
                </div>
                <div className="flex-none ml-auto text-xs text-gray-300">{review.date.toLocaleString()}</div>
              </div>
            ))
            :
            <div className="text-sm text-center text-gray-500">No reviews yet.</div>
        }     
        </div>
    </div>
  )
}

export default ProductReview