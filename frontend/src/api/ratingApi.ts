import { apiAuth } from "./axiosClient";
import type { RatingCreateFields } from "../features/rating/ratingType"

export const createRating = (payload:RatingCreateFields):Promise<any> => {
    const response = apiAuth.post("user/rating",payload)
    return response;
}