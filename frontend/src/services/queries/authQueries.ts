import { useMutation } from "@tanstack/react-query"
import { fetchNewOtp, fetchRegister, fetchValidateOTP } from "../api/authApi";
import type { Register } from "@/types/authTypes";

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

export const useFetchRegister = () => {
    return useMutation({
        mutationFn: (payload:Register) => fetchRegister(payload)
    })
}
