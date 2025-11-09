"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCardList } from "@/components/course-list";
import { courses } from "@/data/MockApi";
import FilterSidebar from "./components/navbar-courses";

const Courses = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        {/* Nút ẩn/hiện bộ lọc */}
        <Button
          onClick={handleToggle}
          variant="outline"
          className="mb-4 flex items-center gap-2"
        >
            <>
              <ChevronLeft className="w-4 h-4" />
              bộ lọc
            </>
        </Button>

        <div
          className={`grid transition-all duration-500 gap-6 ${
            isOpen ? "grid-cols-[250px_1fr]" : "grid-cols-[0px_1fr]"
          }`}
        >
          {/* Sidebar */}
          <FilterSidebar isOpen={isOpen} />

          {/* Main content */}
          <main className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">10.000 kết quả</p>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Phổ biến nhất</option>
                <option>Mới nhất</option>
                <option>Đánh giá cao nhất</option>
              </select>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <CourseCardList key={course.id} {...course} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Courses;
