import { useMutation } from "@tanstack/react-query"
import { fetchNewOtp, fetchValidateOTP } from "../api/authApi";

export const useFetchNewOtp = () => {
    return useMutation({
        mutationFn: fetchNewOtp
    });
}

export const useFetchValidateOtp = () => {
    return useMutation({
        mutationFn: ({otp}:{otp:string}) => fetchValidateOTP(otp)
    });
}