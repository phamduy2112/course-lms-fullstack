import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseOverview from "./components/video-overview";

const VideoDetail = () => {
  const { slug, learning } = useParams<{ slug: string; learning: string }>();
  console.log("Course slug:", slug);
  console.log("Lesson:", learning);

  // Dữ liệu demo: sections + lessons
  const sections = [
    {
      title: "Phần 1: Day 1 - Beginner",
      duration: "1 giờ 12 phút",
      lessons: [
        {
          name: "1. Giới thiệu khóa học",
          type: "document",
          content: `<h1>Giới thiệu khóa học</h1>
                    <p>Chào mừng bạn đến với khóa học Python cơ bản.</p>
                    <ul>
                      <li>Biến và kiểu dữ liệu</li>
                      <li>Toán tử cơ bản</li>
                      <li>Cấu trúc điều kiện và vòng lặp</li>
                    </ul>`,
          time: "3 phút",
        },
        {
          name: "2. START HERE",
          type: "video",
          video_mux: "abc123",
          time: "5 phút",
        },
      ],
    },
    {
      title: "Phần 2: Day 2 - Beginner",
      duration: "58 phút",
      lessons: [
        {
          name: "1. Introduction to Data Types",
          type: "video",
          video_mux: "def456",
          time: "4 phút",
        },
        {
          name: "2. Working with Strings",
          type: "document",
          content: `<p>Trong bài học này, bạn sẽ học cách thao tác với chuỗi trong Python.</p>`,
          time: "6 phút",
        },
      ],
    },
  ];

  // State
  const [openIndex, setOpenIndex] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(sections[0].lessons[0]);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleSelectLesson = (lesson: any) => {
    setCurrentLesson(lesson);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold">Udemy Clone</div>
        <div className="text-sm">{slug}</div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Main content */}
        <div className="flex-1 p-4">
          {currentLesson.type === "video" ? (
           <>
            <div className="bg-black flex items-center justify-center h-[500px] text-gray-400">
              🎥 Video Player - {currentLesson.video_mux}
            </div>
            <CourseOverview/>
           </>
          ) : (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            />
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-96 bg-white border-l overflow-y-auto">
          <h2 className="font-semibold p-4 border-b">Nội dung khóa học</h2>

          {sections.map((sec, index) => (
            <div key={index} className="border-b">
              {/* Section header */}
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

              {/* Lessons list */}
              {openIndex === index && (
                <div className="bg-gray-50 px-4 py-2 space-y-2">
                  {sec.lessons.map((lesson, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectLesson(lesson)}
                      className={`flex items-start justify-between p-2 rounded cursor-pointer hover:bg-white ${
                        currentLesson === lesson ? "bg-blue-50" : ""
                      }`}
                    >
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
