import type { Course } from "@/data/MockApi";

export interface CartItem {
  id: string; // uuid của cart_item
  cart_id: string; // uuid của cart
  course_id: string; // uuid (tham chiếu tới course.uuid)
  price: string; // lưu theo JSON hiện tại
  quantity: number;
  course: Course; // object course detail đã join
}

// nếu bạn muốn kiểu cho mảng cart items:
export type CartItems = CartItem[];

// Optional: kiểu Cart (nếu cần)
export interface Cart {
  id: string;
  user_id?: string | null;
  created_at?: string;
  updated_at?: string;
  items?: CartItem[];
}