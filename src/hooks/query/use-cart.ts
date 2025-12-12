import { useAppDispatch } from "@/store/hooks";
import { createCartThunk, deleteAllCartThunk, deleteCartThunk, getCartThunk } from "@/store/thunks/cart-thunks";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export function useCart() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // --- Lấy cart ---
  const { data: carts, refetch } = useQuery<any, Error>({
   queryKey: ['cart'],
  queryFn: async () => {
    try {
      const result = await dispatch(getCartThunk()).unwrap();
      // Nếu API không trả về gì thì mặc định object rỗng
      return result?.data || { cart_items: [] };
    } catch (e) {
      // Không throw để React Query không coi là lỗi
      return { cart_items: [] };
    }
  },
  });

  // --- Thêm cart ---
  const createCart = useMutation<any, Error, any>({
    mutationFn: async (cartData) => {
      const result = await dispatch(createCartThunk(cartData)).unwrap();
      return result?.data;
    },
    onSuccess: (newCartItem) => {
      // Cập nhật cache: thêm vào cart_items
      queryClient.setQueryData(['cart'], (old: any) => {
        const oldCart = old || { cart_items: [] };
        return {
          ...oldCart,
          cart_items: [newCartItem, ...oldCart.cart_items],
        };
      });
    },
  });

  // --- Xóa cart item ---
  const deleteCart = useMutation<any, Error, string>({
    mutationFn: async (course_id) => {
      const result = await dispatch(deleteCartThunk(course_id)).unwrap();
      return result?.data;
    },
    onSuccess: (_, course_id) => {
      queryClient.setQueryData(['cart'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          cart_items: old.cart_items.filter((item: any) => item.course_id !== course_id),
        };
      });
    },
  });
 // --- Xóa toàn bộ cart ---
  const clearCart = useMutation<any, Error>({
    mutationFn: async () => {
      const result = await dispatch(deleteAllCartThunk()).unwrap();
      return result?.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(["cart"], (old: any) => {
        if (!old) return { cart_items: [] };
        return {
          ...old,
          cart_items: [],
        };
      });
    },
  });
  return { carts, refetch, createCart, deleteCart,clearCart };
}
