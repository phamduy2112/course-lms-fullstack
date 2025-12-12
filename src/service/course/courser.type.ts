export interface Lecture {
  id: number;
  section_id: number;
  title: string;
  video_url: string | null;
  position: number;
  uuid: string; // uuid của lecture
}

// section chứa lectures[]
export interface Section {
  id: number;
  course_id: number;
  title: string;
  position: number;
  uuid: string;
  lectures: Lecture[];
}

// course (ghi theo cấu trúc JSON bạn gửi)
export interface Course {
  id: number; // numeric id (DB)
  title: string;
  subtitle: string | null;
  description: string | null;
  language: string | null;
  level: string | null;
  price: string; // API trả "79.99" (string). Nếu bạn convert -> use number thay thế
  discount_price: string | null;
  thumbnail_url: string | null;
  promo_video_url: string | null;
  requirements: string | null;
  objectives: string | null;
  category_id: number | null;
  instructor_id: number | null;
  total_lectures: number;
  rating: string; // "0" trong JSON (string)
  students_count: number;
  status: string;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  slug: string;
  uuid: string; // uuid tương ứng với course_id string ở cart_item
  sections: Section[];
}