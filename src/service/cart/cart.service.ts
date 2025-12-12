import axiosInstance from "../axios-config"

export const createCart = async (data: any) => {
  const response = await axiosInstance('/cart', {
    method: "POST",
    data: data,
  });
  return response.data
}
export const deteleCart = async (course_id: string) => {
  const response = await axiosInstance(`/cart/${course_id}`, {
    method: "delete",
  });
  return response.data
}
export const deleteAllCarts=async()=>{
    const response = await axiosInstance(`/cart`, {
    method: "delete",
  });
  return response.data
}

export const getCart = async () => {
  const response = await axiosInstance.get(`/cart`);
  return response.data; // ✅ chỉ trả về data
}
