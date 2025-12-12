// src/pages/UserDetail.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { getUserDetail } from "@/store/thunks/user-thunks";
import { Progress } from "@radix-ui/react-progress";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { DialogUserMore } from "./component/dialog-user-more";
import { useCourseOfUserQuery } from "@/hooks/query/use-course";
import { courses } from "@/data/MockApi";

const UserDetail: React.FC = () => {
  
  // const courses = [
  //   { name: "React Mastery", status: "Đang học", progress: 65 },
  //   { name: "TypeScript Advanced", status: "Hoàn thành", progress: 100 },
  //   { name: "UI/UX Design", status: "Đang học", progress: 45 },
  // ];
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getUserDetail());
    }, [dispatch]);
  const userState = useSelector((state) => state.user.user);
  const user=userState?.data
  const { data:courses, isLoading } = useCourseOfUserQuery();
  if (isLoading) return <p>Loading...</p>;
 console.log(courses)
  return (
    <div className=" to-white p-6">
      <div className=" container mx-auto">
        {/* Header Cover */}


        <div className=" px-8 pb-10  ">
          {/* User Info */}
          <Avatar className="size-40 relative top-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="
          bg-white shadow-lg pt-14 px-9 pb-7 rounded-2xl overflow-hidden
          flex justify-between items-start flex-wrap">

            <div className="">

              <h1 className="text-2xl font-bold text-gray-800">
                {user?.name}
              </h1>
              <p className="text-gray-500">{user?.role} • Tim hieu  

                            <DialogUserMore user={user}/>

              </p>
            </div>
            <Button className="px-5 py-2 rounded-lg ">
              Chỉnh sửa hồ sơ
            </Button>
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
                    <p className="font-medium text-gray-800">{course?.courses?.title}</p>
                    <div className="w-40 bg-gray-200 h-2 rounded-full mt-2">
                   <Progress value={33} />

                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${course.status === "Hoàn thành"
                        ? "text-green-600"
                        : "text-indigo-600"
                      }`}
                  >
                    Hoan thanh
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
