// src/pages/UserDetail.tsx
import React from "react";

const UserDetail: React.FC = () => {
  const courses = [
    { name: "React Mastery", status: "Đang học", progress: 65 },
    { name: "TypeScript Advanced", status: "Hoàn thành", progress: 100 },
    { name: "UI/UX Design", status: "Đang học", progress: 45 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header Cover */}
        <div className="relative h-40 bg-gradient-to-r from-indigo-600 to-purple-600">
          <img
            src="https://i.pravatar.cc/120"
            alt="User Avatar"
            className="absolute left-8 bottom-[-48px] w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        <div className="pt-20 px-8 pb-10">
          {/* User Info */}
          <div className="flex justify-between items-start flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Nguyễn Văn A
              </h1>
              <p className="text-gray-500">Học viên • nguyenvana@example.com</p>
            </div>
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Chỉnh sửa hồ sơ
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: "Khóa học đã đăng ký", value: 12 },
              { label: "Hoàn thành", value: 8 },
              { label: "Tiến độ TB", value: "75%" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-indigo-50 rounded-xl p-4 text-center hover:bg-indigo-100 transition"
              >
                <p className="text-2xl font-bold text-indigo-600">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Courses */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Khóa học của bạn</h2>
            <div className="space-y-4">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className="p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{course.name}</p>
                    <div className="w-40 bg-gray-200 h-2 rounded-full mt-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      course.status === "Hoàn thành"
                        ? "text-green-600"
                        : "text-indigo-600"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
