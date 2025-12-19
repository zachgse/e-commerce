import { useMutation } from "@tanstack/react-query"
import { createRating } from "../../api/ratingApi"

export const useCreateRating = () => {
  return useMutation({
    mutationFn: createRating,
  })
}