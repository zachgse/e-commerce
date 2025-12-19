import { apiAuth } from "./axiosClient";
import type { RatingCreateFields } from "../types/ratingType"

export const createRating = (payload:RatingCreateFields):Promise<any> => {
    const response = apiAuth.post("user/rating",payload)
    return response;
}