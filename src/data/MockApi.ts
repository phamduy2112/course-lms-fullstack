export interface Course {
  id: number;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  lectures: number;
  level: string;
  price: number;
  image: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "React Ultimate - React.JS Cơ Bản Từ Z Đến A Cho Beginners",
    description: "Hiểu và Làm Chủ React (Chỉ Học Những Thứ Cần Thiết)",
    rating: 4.7,
    reviews: 527,
    duration: "21 giờ",
    lectures: 129,
    level: "Tất cả cấp độ",
    price: 699000,
    image: "https://img-c.udemycdn.com/course/240x135/4467252_61d1_3.jpg",
  },
  {
    id: 2,
    title: "NodeJS Pro - Tự Học từ số 0 (MVC, REST APIs, SQL/MongoDB)",
    description: "Xây Dựng Backend Node.js Từ Số 0 (Express/Prisma/Mongoose)",
    rating: 4.8,
    reviews: 355,
    duration: "55.5 giờ",
    lectures: 347,
    level: "Tất cả cấp độ",
    price: 1349000,
    image: "/node-course.jpg",
  },
  {
    id: 3,
    title: "Java Spring MVC - Xây Dựng FullStack Website với Spring Boot",
    description: "Học Spring MVC Chưa Từng Dễ Tới Vậy",
    rating: 4.7,
    reviews: 268,
    duration: "30.5 giờ",
    lectures: 181,
    level: "Tất cả cấp độ",
    price: 1349000,
    image: "/java-course.jpg",
  },
];
