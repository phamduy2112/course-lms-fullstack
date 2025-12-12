import axiosInstance from "../axios-config";
import type { TCreateCategory } from "./category.type";

export const getCategory=():any=>{
    return axiosInstance("/category",{method:"get"})
}