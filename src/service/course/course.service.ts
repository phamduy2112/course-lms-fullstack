
import axiosInstance from "../axios-config";

export const getCourses=():any=>{
    return axiosInstance("/courses",{method:"get"})
}

export const getCoursesUser=():any=>{
        return axiosInstance("/courses/courses-of-user",{method:"get"})
}
export const getCourseDetail=(id:string)=>{
    return axiosInstance(`/courses/${id}`,{method:"get"})
}