import CourseCard from "@/components/course-card";
import React from "react";

const courses = [
  {
    image: "/images/course1.jpg",
    title: "NestJS Zero - Xây Dựng Backend Node.JS",
    author: "Hỏi Dân IT với Eric",
    rating: 4.8,
    reviews: 238,
    price: 1349000,
    oldPrice: 1999000,
    tag: "HOT",
  },
  {
    image: "/images/course2.jpg",
    title: "ReactJS từ cơ bản đến nâng cao",
    author: "Nguyễn Văn A",
    rating: 4.5,
    reviews: 120,
    price: 999000,
  },
  {
    image: "/images/course2.jpg",
    title: "ReactJS từ cơ bản đến nâng cao",
    author: "Nguyễn Văn A",
    rating: 4.5,
    reviews: 120,
    price: 999000,
  },
  
  // Thêm khóa học khác...
];

const ListCourses: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          image={course.image}
          title={course.title}
          author={course.author}
          rating={course.rating}
          reviews={course.reviews}
          price={course.price}
          oldPrice={course.oldPrice}
          tag={course.tag}
        />
      ))}
    </div>
  );
};

export default ListCourses;
