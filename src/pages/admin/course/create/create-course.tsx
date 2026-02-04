import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ArrowLeft, PlusIcon, SparkleIcon } from 'lucide-react'
import React from 'react'
// import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import slugify from "slugify"
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Link } from 'react-router-dom'
import RichTextEditor from '@/components/rich-text-editor/Editor'
import Uploader from '@/components/file-uploader/Uploader'
import { MdDeleteOutline } from 'react-icons/md'
import CreateChapter from './create-chapter'
type CourseFormData = {
  title: string
  description: string
  fileKey: string
  price: number
  duration: number
  category: string
  status: string
  slug: string
  level: string
}


const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  fileKey: z.string().optional(),       // có thể bỏ trống
  price: z.coerce.number().optional(),  // input type number
  duration: z.coerce.number().optional(),
  category: z.string().optional(),
  status: z.string().default("Draft"),  // default "Draft"
  slug: z.string().optional(),
  level: z.string().default("Beginner"),
})

type FormData = z.infer<typeof courseSchema>
 const courseCategories=[
    "Development",
    "Busincess",
    "Finance",
    "IT & Software"
]
const courseLevels=[
    "Beginner",
    "Advance"
]
const CreateCoursePage = () => {
  const form=useForm<any>({
    resolver:zodResolver(courseSchema),
    defaultValues:{
    title: "",
  description: "",
  fileKey:"",
  price:"",
  duration:"",
  category:"",
  status:"Draft",
  slug:"",
  level:"Beginner"
    }
  })
  function onSubmit(values:z.infer<typeof courseSchema>){
    console.log(values)
  }
  return (
    <div className=''>
        {/* <div className='flex items-center gap-4 '>
          <Link
            to="/admin/courses"
            className={buttonVariants({variant:"outline",size:"icon"})}
            ><ArrowLeft className='size-4'></ArrowLeft></Link>
            <h1 className='text-2xl font-bold'>Create Courses</h1>
        </div> */}
        {/* <Card className='bg-transparent border-none mt-4 text-white'>
         
            <CardContent>

 <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
       <div className='glass-card p-4 space-y-4'>  
        <div className="flex flex-col gap-2">
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide basic information about the course</CardDescription>
            </div>
           <FormField 
       control={form.control}
       name="title"
       render={({field})=>(
        <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
                <Input placeholder='Title' {...field}></Input>
            </FormControl>
            <FormMessage></FormMessage>
        </FormItem>
       )}
       />
      <div className="flex gap-4 items-end">
        <FormField 
       control={form.control}
       name="slug"
       render={({field})=>(
        <FormItem className='w-full'>
            <FormLabel>Slug</FormLabel>
            <FormControl>
                <Input placeholder='Slug' {...field}></Input>
            </FormControl>
            <FormMessage></FormMessage>
        </FormItem>
       )}
       />
       
       <Button type='button' className='w-fit text-white' onClick={()=>{
        const titleValue=form.getValues("title");
        const slug=slugify(titleValue)
        form.setValue("slug",slug,{shouldValidate:true})
       }}>
        Generate Slug <SparkleIcon className='ml-1' size={16}/>
       </Button>
      </div>
   <FormField 
       control={form.control}
       name="smallDescription"
       render={({field})=>(
        <FormItem className='w-full'>
            <FormLabel>Small Description</FormLabel>
            <FormControl>
                <Textarea placeholder='Small Description'
                className='min-h-[120px]'
                {...field}></Textarea>
            </FormControl>
            <FormMessage></FormMessage>
        </FormItem>
       )}
       />

          <FormField 
       control={form.control}
       name="description"
       render={({field})=>(
        <FormItem className='w-full'>
            <FormLabel>Description</FormLabel>
            <FormControl>
             <RichTextEditor />
            </FormControl>
            <FormMessage></FormMessage>
        </FormItem>
       )}
       />
       
       </div>
    
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 glass-card p-4'>
        <FormField
  control={form.control}
  name="category"
       
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>Category</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}  >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {courseCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

 <FormField
  control={form.control}
  name="level"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>Level</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Level" />
        </SelectTrigger>
        <SelectContent>
          {courseLevels.map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="level"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>Status</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Level" 
          />
        </SelectTrigger>
        <SelectContent>
          {courseLevels.map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
     <FormField
  control={form.control}
  name="duration"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>Duration (hours)</FormLabel>
     <FormControl>
               <Input placeholder='Duration' type='number' {...field}/>
            </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
 <FormField
  control={form.control}
  name="price"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>Price</FormLabel>
     <FormControl>
               <Input placeholder='Price' type='number' {...field}/>
            </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

       </div>
<div className="glass-card p-4 space-y-4">
  
             <FormField 
       control={form.control}
       name="fileKey"
       render={({field})=>(
        <FormItem className='w-full'>
            <FormLabel>Thumbnail image</FormLabel>
            <FormControl className="">
               <Uploader/>
            </FormControl>
            <FormMessage></FormMessage>
        </FormItem>
       )}
       />

</div>

<div className='flex justify-end space-x-2'>
  <Button className='text-white'
    variant={"destructive"}
  > <MdDeleteOutline /> Detele</Button>

<Button className='text-white bg-blue-700 hover:bg-blue-800'>Create & Continue <PlusIcon className='ml-1' size={16}/></Button>

</div>
      </form>
    </Form>
            </CardContent>
        </Card> */}
        <CreateChapter/>
    </div>
  )
}

export default CreateCoursePage