import { getCategory } from "@/service/category/category.service";
import { useQuery } from "@tanstack/react-query";

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getCategory();
      return res.data; // chỉ trả data thật
    },
    staleTime: 1000 * 60 * 5, // 5 phút (tối ưu)
        refetchOnWindowFocus: false, // tránh gọi lại khi tab active

  });
};
