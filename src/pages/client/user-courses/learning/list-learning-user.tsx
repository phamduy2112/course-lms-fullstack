"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, BookOpen } from "lucide-react";
import ListCourses from "../../course-detail/components/list-course";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress?: number;
  image: string;
}

interface ListCoursesUserProps {
  courses: Course[];
}

export default function ListCoursesUser({ courses }: ListCoursesUserProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <BookOpen className="mx-auto mb-3 w-10 h-10 text-gray-400" />
        <p>Bạn chưa có khóa học nào trong danh sách này.</p>
      </div>
    );
  }

  return (
    <div className="">
        <h1 className="text-xl font-bold mb-1">Danh sách khóa học của tôi</h1>
        <div>
           <div className="flex items-center gap-1 pb-2">
             <h3>abc</h3>
             <MdOutlineModeEdit />
             <MdDeleteOutline />

           </div>
            <ListCourses/>
        </div>
    </div>
  );
}
