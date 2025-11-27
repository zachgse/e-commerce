import { axiosClient } from "./axiosClient"

export const csrf_cookie = async():Promise<any> => {
    const response = await axiosClient.get('/sanctum/csrf-cookie');
    return response;
}
