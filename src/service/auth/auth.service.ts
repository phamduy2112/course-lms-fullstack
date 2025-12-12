import axiosInstance from "../axios-config";
import type { TLogin, TRegister } from "./auth.type";

export const register=(payload:TRegister)=>{
    return axiosInstance("/auth/register",{
        method:"post",
        data:payload
    })
}
export const login=(payload:TLogin)=>{
    return axiosInstance("/auth/login",{
        method:"post",
        data:payload
    })
}

export const logoutDevice=()=>{
            const token = localStorage.getItem('access_token');

    return axiosInstance("/auth/logout-device",{
        method:"post",
            headers: {
    Authorization: `Bearer ${token}`,
  },

    })
}