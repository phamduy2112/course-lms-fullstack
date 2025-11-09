import React from 'react';

const CourseProfile = () => {
  return (
    <div className="container bg-white py-4">
      <div className="flex items-center space-x-6">
        <img
          src="https://via.placeholder.com/150"
          alt="Giảng viên"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold">Giảng viên</h2>
          <p className="text-sm text-gray-500">Hỏi Dân IT với Eric</p>
          <p className="mt-2 text-gray-700">Ghéth Code và Chỉ Biết Google - "Beyond Your Coding Skills"</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xl font-medium">4,8 ⭐ xếp hạng giảng viên</p>
        <p className="text-sm text-gray-500">2630 đánh giá</p>
        <p className="text-sm text-gray-500">8779 học viên</p>
        <p className="text-sm text-gray-500">17 khóa học</p>
      </div>

      <div className="mt-6">
        <p className="font-semibold">Hi there...</p>
        <p className="text-sm text-gray-700">Mình tên là Eric, cựu sinh viên CNTT (Software Engineer), trường đại học Bách Khoa Hà Nội, và đang làm nghề freelancer...</p>
      </div>

      <div className="mt-6">
        <p className="font-semibold">4,8 ⭐ xếp hạng khóa học • 238 xếp hạng</p>
      </div>

      <div className="mt-6">
        {/* Dánh giá */}
        <div className="space-y-4">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="Hoàng Văn C."
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <p className="font-semibold">Hoàng Văn C.</p>
              <p className="text-sm text-gray-500">5 tháng trước</p>
              <p className="mt-2 text-sm">Khóa học dễ hiểu</p>
            </div>
          </div>

          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="Bùi Anh D."
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <p className="font-semibold">Bùi Anh D.</p>
              <p className="text-sm text-gray-500">5 tháng trước</p>
              <p className="mt-2 text-sm">Khóa học này đầy đủ kiến thức cơ bản để tiếp cận NestJS</p>
            </div>
          </div>

          {/* Add more reviews here */}
        </div>
      </div>
    </div>
  );
};

export default CourseProfile;
