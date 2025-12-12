import React from 'react';
import FormAddComment from './form-add-comment';
import Comment from './comment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CourseProfile = ({user}:any) => {

  return (
    <div className="container bg-white py-4">
      <div className="flex items-center space-x-6">
      <Avatar className="size-24 shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">Giảng viên</h2>
          <p className="text-sm text-gray-500">{user.name}</p>
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

      
    </div>
  );
};

export default CourseProfile;
