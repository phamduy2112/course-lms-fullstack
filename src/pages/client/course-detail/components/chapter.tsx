"use client";

import * as Accordion from "@radix-ui/react-accordion";
import React from "react";

interface Chapter {
  title: string;
  duration: string;
  subChapters: string[];
}

const courseContent: Chapter[] = [
  {
    title: 'Các tính năng HOT',
    duration: '3 bài giảng • 40 phút',
    subChapters: [
      'Demo Kết Quả Đạt Được Khi Kết Thúc Khóa Học',
      'Hướng Dẫn Sử Dụng Udemy Dành Cho Người Mới Bắt Đầu',
      'Cách Hỗ Trợ/Support Trong Quá Trình Học (Bắt Buộc Xem)',
    ],
  },
  {
    title: 'Ôn Tập JavaScript/TypeScript',
    duration: '10 bài giảng • 59 phút',
    subChapters: ['Chapter 0: Bắt buộc xem', 'Chapter 1: Tổng quan về NestJS'],
  },
  {
    title: 'Chapter 1: Tổng quan về NestJS',
    duration: '4 bài giảng • 30 phút',
    subChapters: [],
  },
];

const Chapter:any = (chapters:any) => {
 
  return (
    <div className="bg-white py-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nội dung khóa học</h1>
      <Accordion.Root type="multiple" className="">
        {chapters?.chapters?.map((chapter, index) => (
          <Accordion.Item key={index} value={`item-${index}`} className="border rounded-md overflow-hidden">
            <Accordion.Header>
              <Accordion.Trigger className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition">
                <div>
                  <h2 className="text-lg font-semibold">{chapter.title}</h2>
                  <p className="text-gray-500 text-sm">{chapter.duration}</p>
                </div>
                <span className="text-blue-500">▼</span>
              </Accordion.Trigger>
            </Accordion.Header>

            {chapter.lectures.length > 0 && (
              <Accordion.Content className="p-4 bg-white space-y-2">
              {chapter.lectures.map((lecture, idx) => (
  <div key={idx} className="text-gray-700">
    {lecture.title}  {/* ✔ render title thay vì object */}
  </div>
))}

              </Accordion.Content>
            )}
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default Chapter;
