import React from 'react'
import CareerGoalsSection from './home/component/career-goals-section'
import CourseSlider from '@/components/course-slider';
import Banner from './home/component/banner';

const Home = () => {
    const courses = [
    {
      image: "https://img-c.udemycdn.com/course/240x135/4467252_61d1_3.jpg",
      title: "Thành Thạo Docker Từ Cơ Bản Đến Nâng Cao",
      author: "AI Coding",
      rating: 4.9,
      reviews: 135,
      price: 279000,
      oldPrice: 779000,
      tag: "Thịnh hành & mới",
    },
    {
      image: "/docker-course.jpg",
      title: "Thành Thạo Docker Từ Cơ Bản Đến Nâng Cao",
      author: "AI Coding",
      rating: 4.9,
      reviews: 135,
      price: 279000,
      oldPrice: 779000,
      tag: "Thịnh hành & mới",
    },
    {
      image: "/docker-course.jpg",
      title: "Thành Thạo Docker Từ Cơ Bản Đến Nâng Cao",
      author: "AI Coding",
      rating: 4.9,
      reviews: 135,
      price: 279000,
      oldPrice: 779000,
      tag: "Thịnh hành & mới",
    },
    {
      image: "/docker-course.jpg",
      title: "Thành Thạo Docker Từ Cơ Bản Đến Nâng Cao",
      author: "AI Coding",
      rating: 4.9,
      reviews: 135,
      price: 279000,
      oldPrice: 779000,
      tag: "Thịnh hành & mới",
    },
    {
      image: "/docker-course.jpg",
      title: "Thành Thạo Docker Từ Cơ Bản Đến Nâng Cao",
      author: "AI Coding",
      rating: 4.9,
      reviews: 135,
      price: 279000,
      oldPrice: 779000,
      tag: "Thịnh hành & mới",
    },
    {
      image: "/docker-course.jpg",
      title: "Thành Thạo Docker 1 Từ Cơ Bản Đến Nâng Cao",
      author: "AI Coding",
      rating: 4.9,
      reviews: 135,
      price: 279000,
      oldPrice: 779000,
      tag: "Thịnh hành & mới",
    },
  
  ];
  return (
    <div className='mb-[2rem]'>
      <Banner></Banner>
      <CareerGoalsSection/>
      <div>
        <h1 className='mb-[1rem] text-[2rem] font-bold'>Lĩnh vực sẽ học tiếp theo
</h1>
<CourseSlider courses={courses} />

      </div>
            
    </div>
  )
}

export default Home