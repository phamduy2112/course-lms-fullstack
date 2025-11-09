import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import VideoOverview from "./components/video-overview";

const VideoDetail = () => {
  // dữ liệu demo
  const sections = [
    {
      title: "Phần 1: Day 1 - Beginner - Working with Variables in Python to Manage Data",
      duration: "1 giờ 12 phút",
      lessons: [
        { name: "1. What you're going to get from this course", time: "3 phút" },
        { name: "2. START HERE", time: "3 phút" },
        { name: "3. Downloadable Resources and Tips for Taking the Course", time: "4 phút", resource: true },
        { name: "4. Day 1 Goals: what we will make by the end of the day", time: "3 phút", checked: true, resource: true },
        { name: "5. DO NOT SKIP - Download and Setup PyCharm for Learning", time: "2 phút" },
        { name: "6. Printing to the Console in Python", time: "11 phút", checked: true },
      ],
    },
    {
      title: "Phần 2: Day 2 - Beginner - Understanding Data Types and Strings",
      duration: "58 phút",
      lessons: [
        { name: "1. Introduction to Data Types", time: "4 phút" },
        { name: "2. Working with Strings", time: "6 phút" },
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col  min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold">Udemy Clone</div>
        <div className="text-sm">100 Days of Code: Python Pro Bootcamp</div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Video area */}
       <div className="flex-1 ">
         <div className=" bg-black flex items-center h-[500px] justify-center text-gray-400">
          <span>🎥 Video Player</span>
        </div>
        <VideoOverview/>
       </div>

        {/* Sidebar */}
        <aside className="w-96 bg-white border-l overflow-y-auto">
          <h2 className="font-semibold p-4 border-b">Nội dung khóa học</h2>

          {sections.map((sec, index) => (
            <div key={index} className="border-b">
              {/* Phần header */}
              <button
                className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50"
                onClick={() => toggleSection(index)}
              >
                <div>
                  <p className="font-medium text-gray-800">{sec.title}</p>
                  <p className="text-sm text-gray-500">{sec.duration}</p>
                </div>
                {openIndex === index ? (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
              

              {/* Danh sách bài học */}
              {openIndex === index && (
                <div className="bg-gray-50 px-4 py-2 space-y-2">
                  {sec.lessons.map((lesson, i) => (
                    <div key={i} className="flex items-start justify-between p-2 rounded hover:bg-white">
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" checked={lesson.checked || false} readOnly />
                        <div>
                          <p className="text-sm text-gray-800">{lesson.name}</p>
                          <p className="text-xs text-gray-500">{lesson.time}</p>
                        </div>
                      </div>
                      {lesson.resource && (
                        <button className="text-xs text-purple-600 border border-purple-500 px-2 py-1 rounded hover:bg-purple-50">
                          📁 Tài nguyên
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default VideoDetail;
