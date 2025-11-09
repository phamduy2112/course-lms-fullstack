import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import EditCourseForm from './components/edit-course-form'
import EditCourseStuctre from './components/course-stucture'

const Edit = () => {
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
                        <EditCourseStuctre/>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default Edit