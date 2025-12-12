import React from 'react'
import CareerGoalsSection from './home/component/career-goals-section'
import CourseSlider from '@/components/course-slider';
import Banner from './home/component/banner';
import { useCourseQuery } from '@/hooks/query/use-course';

const Home = () => {
     const { data, isLoading } = useCourseQuery();
       if (isLoading) return <p>Loading...</p>;

  //  console.log(data)
  return (
    <div className='mb-[2rem]'>
      <Banner></Banner>
      <CareerGoalsSection/>
      <div className='container m-auto'>
        <h1 className='mb-[1rem] text-[2rem] font-bold'>Lĩnh vực sẽ học tiếp theo
</h1>
<CourseSlider courses={data.data} />

      </div>
            
    </div>
  )
}

export default Home