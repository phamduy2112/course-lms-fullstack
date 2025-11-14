import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import EditCourseForm from './components/edit-course-form'
import EditCourseStuctre from './components/course-stucture'

const Edit = () => {
  const data = {
  chapter: [
    {
      id: 1,
      title: "Giới thiệu khóa học",
      position: 1,
      lessons: [
        { id: 101, title: "Tổng quan về khóa học", position: 1 },
        { id: 102, title: "Hướng dẫn học hiệu quả", position: 2 },
      ],
    },
    {
      id: 2,
      title: "Cơ bản về JavaScript",
      position: 2,
      lessons: [
        { id: 201, title: "Biến và kiểu dữ liệu", position: 1 },
        { id: 202, title: "Cấu trúc điều kiện", position: 2 },
        { id: 203, title: "Vòng lặp", position: 3 },
      ],
    },
    {
      id: 3,
      title: "Nâng cao",
      position: 3,
      lessons: [
        { id: 301, title: "Hàm và phạm vi", position: 1 },
        { id: 302, title: "Đối tượng và mảng", position: 2 },
      ],
    },
  ],
};

  return (
    <div>
        <h1 className='text-3xl font-bold mb-8'>
            Edit Course:{" "}
            <span className='text-primary underline'>title</span>
        </h1>
        <Tabs defaultValue='basic-info' className='w-full'>
            <TabsList className='grid grid-cols-2 w-full'>
                <TabsTrigger value='basic-info'>Basic Infor</TabsTrigger>
                <TabsTrigger value='course-structure'>Course Structure</TabsTrigger>
            </TabsList>
            <TabsContent value='basic-info'>
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Info</CardTitle>
                        <CardDescription>
                            Provide basic information about the course
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EditCourseForm/>
                    </CardContent>
                </Card>
            </TabsContent>
                  <TabsContent value='course-structure'>
                <Card>
                    <CardHeader>
                        <CardTitle>Course Structure</CardTitle>
                        <CardDescription>
                            Provide course structure about the course
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EditCourseStuctre data={data}/>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default Edit