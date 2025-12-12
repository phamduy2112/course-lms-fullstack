import { getCategory } from "@/service/category/category.service";
import { getCourseDetail, getCourses, getCoursesUser } from "@/service/course/course.service";
import { useQuery } from "@tanstack/react-query";

export const useCourseQuery = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await getCourses();
      return res.data; // chỉ trả data thật
    },
    staleTime: 1000 * 60 * 5, // 5 phút (tối ưu)
        refetchOnWindowFocus: false, // tránh gọi lại khi tab active

  });
};

export const useCourseOfUserQuery=()=>{
  return useQuery({
    queryKey:["courses-of-user"],
    queryFn:async ()=>{
      const res=await getCoursesUser();
       return res.data.data;
    },
        staleTime: 1000 * 60 * 5, // 5 phút (tối ưu)
        refetchOnWindowFocus: false, // tránh gọi lại khi tab active

  })
}

export const useCourseDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["course-detail", id],   // ✔ cache theo id
    queryFn: () => getCourseDetail(id),
    enabled: !!id,                     // ✔ tránh fetch khi id undefined
    staleTime: 1000 * 60 * 5,          // (optional) cache 5 phút
  });
};
