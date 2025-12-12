import axiosInstance from "../axios-config"

export const createComment = async (data: any) => {
  const response = await axiosInstance('/comment', {
    method: "POST",
    data: data,
  });
  return response.data
}

export const getComment = async (id: string) => {
  const response = await axiosInstance.get(`/comment/${id}`);
  return response.data; // ✅ chỉ trả về data
}
