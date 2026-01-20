import type { OTP } from "@/types/userType";
import { axiosClient,apiAuth } from "@/hooks/axiosClient"

export const csrf_cookie = async():Promise<any> => {
    const response = await axiosClient.get('/sanctum/csrf-cookie');
    return response;
}

export const fetchNewOtp = async():Promise<OTP> => {
    const response = await apiAuth.post('/auth/resend');
    return response.data.data;
}

export const fetchValidateOTP = async(otp:string):Promise<boolean> => {
    const response = await apiAuth.post('/auth/validate_otp',{otp});
    return response.data.data;
}
