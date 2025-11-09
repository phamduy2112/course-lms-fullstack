import React from "react";
import ListCourses from "../../course-detail/components/list-course";
import ListCoursesUser from "./list-learning-user";

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress?: number;
  image: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    instructor: "Dr. Angela Yu",
    progress: 6,
    image: "https://via.placeholder.com/300x180.png?text=Python+Bootcamp",
  },
  {
    id: 2,
    title: "5 Practice Exams | AWS Certified AI Practitioner - AIF-C01",
    instructor: "Apetent Intel",
    image: "https://via.placeholder.com/300x180.png?text=AWS+AI",
  },
  {
    id: 3,
    title: "Làm chủ TypeScript: Từ Any-Where đến Type-Safe",
    instructor: "Even Dev",
    image: "https://via.placeholder.com/300x180.png?text=TypeScript",
  },
  {
    id: 4,
    title: "Machine Learning A-Z: AI, Python & R",
    instructor: "Kirill Eremenko",
    image: "https://via.placeholder.com/300x180.png?text=Machine+Learning",
  },
];

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white px-10 py-5">
        <h1 className="text-3xl font-bold">Học tập</h1>
        <nav className="mt-3 flex gap-8 text-sm border-b border-gray-700 pb-2">
          {["Tất cả khóa học", "Danh sách của tôi", "Danh sách mong ước", "Chứng chỉ", "Đã lưu trữ", "Công cụ học tập"].map((tab) => (
            <button key={tab} className="hover:text-violet-400 relative">
              {tab}
              {tab === "Tất cả khóa học" && (
                <span className="absolute left-0 -bottom-[9px] w-full h-[2px] bg-violet-500"></span>
              )}
            </button>
          ))}
        </nav>
      </header>

   <div>
       {/* Progress Section */}
      <section className="mx-auto py-6">
        <div className="bg-white border rounded-xl shadow-sm p-5 flex flex-col gap-3">
          <h2 className="font-semibold text-lg">Bắt đầu một chuỗi hàng tuần</h2>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Xem 5 phút video mỗi ngày để đạt được mục tiêu của bạn.</p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>0 tuần</span>
              <div className="w-16 h-16 rounded-full border-4 border-violet-400 flex items-center justify-center">
                <span className="text-sm font-semibold">0%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Card */}
      <section className="">
        <div className="bg-gray-50 border rounded-xl shadow-sm p-5">
          <h3 className="font-semibold mb-2">Lên lịch thời gian học</h3>
          <p className="text-sm text-gray-600">
            Lên kế hoạch mỗi ngày để giúp bạn tích lũy kiến thức. 
            Hãy dành thời gian để học và nhận lời nhắc bằng cách sử dụng trình lên lịch học.
          </p>
          <div className="mt-4 flex gap-3">
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm">Bắt đầu</button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">Hủy bỏ</button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className=" mt-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Sắp xếp theo</option>
            <option>Đã truy cập gần đây</option>
            <option>Tên</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Lọc theo</option>
            <option>Danh mục</option>
            <option>Tiến độ</option>
            <option>Giảng viên</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm khóa học của bạn"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64 focus:ring-2 focus:ring-violet-500 outline-none"
        />
      </section>

      {/* Course Grid */}
      <ListCourses/>
   </div>
   {/* <ListCoursesUser courses={courses}/> */}
    </div>
  );
}
