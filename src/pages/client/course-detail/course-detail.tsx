"use client";

import React from "react";
import { Star, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Chapter from "./components/chapter";
import CourseProfile from "./components/course-profile";
import CourseCard from "@/components/course-card";
import ListCourses from "./components/list-course";
import { useCourseDetailQuery } from "@/hooks/query/use-course";
import { useCart } from "@/hooks/query/use-cart";
import CommentDetail from "./comment-detail";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>(); // slug = dynamic part
  const { data, isLoading, error } = useCourseDetailQuery(slug);
  const course=data?.data?.data?.course
    const {  createCart } = useCart();

  const handleAddCart = (course:any) => {
    const payload={
        course_id:course.uuid,
        price:course.price,
        quantity:1,
    }

    createCart.mutate(payload);
  };
  const courseOfUser=data?.data?.data?.user
  console.log(course)
    if(isLoading) return <>Loadiing</>
    return (
        <div className="bg-white min-h-screen p-6">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                {/* LEFT SIDE */}
                <div className="">
                    <div className="mb-6">
                        <p className="text-sm text-gray-500">Phát triển &gt; Phát triển web &gt; TypeScript</p>
                        <h1 className="text-3xl font-bold mt-2">
                                                   {course?.title}

                        </h1>
                        <p className="text-lg text-gray-700 mt-2">
                            Tạo Server Backend Restful API Professional với Framework Nest.JS (TypeScript)
                        </p>

                        {/* Rating + students */}
                        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                            <span className="flex items-center text-yellow-500">
                                <Star className="w-4 h-4 fill-yellow-400" /> 4.8
                            </span>
                            <span>(238 xếp hạng)</span>·
                            <span>1.148 học viên</span>
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                            Được tạo bởi <span className="text-blue-600 hover:underline">
                                {courseOfUser?.name}
                            </span>
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                            Lần cập nhật gần đây nhất 9/2025 · <span className="font-medium">Vietnamese</span>
                        </p>
                    </div>

                    {/* Course content summary */}
                    <div className="border rounded-lg p-5 bg-gray-50">
                        <h2 className="text-lg font-semibold mb-3">Nội dung bài học</h2>
                        <ul className="grid sm:grid-cols-2 gap-2 text-gray-700 text-sm list-disc list-inside">
                            <li>Luyện Tư Duy Khi Xây Dựng Một Hệ Thống Lớn & Tính Mở Rộng Cao</li>
                            <li>Thực Hành Xây Dựng Backend phân chia Modules</li>
                            <li>Rèn Luyện Kỹ Năng Lập Trình Hướng Đối Tượng Qua Thực Hành</li>
                            <li>Thực Hành NestJS như là server Restful APIs</li>
                        </ul>
                    </div>

                    {/* Related topics */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Khám phá các chủ đề liên quan</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">TypeScript</Badge>
                            <Badge variant="secondary">Phát triển web</Badge>
                            <Badge variant="secondary">Phát triển</Badge>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Course Includes */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Khóa học này bao gồm:</h3>
                        <ul className="text-sm text-gray-700 space-y-2">
                            <li>🎥 24 giờ video theo yêu cầu</li>
                            <li>📝 6 bài viết</li>
                            <li>📺 Truy cập trên thiết bị di động và TV</li>
                            <li>♾️ Quyền truy cập đầy đủ suốt đời</li>
                            <li>📜 Giấy chứng nhận hoàn thành</li>
                        </ul>
                    </div>
                    <Chapter chapters={course.sections}/>
                    <div>


                        <ul>
                            <h2 className="text-lg font-semibold">Yêu cầu</h2>
                            <li>
                                Không cần kinh nghiệm lập trình – Bạn sẽ được chia sẻ mọi thứ cần biết

                            </li>
                            <li>
                                Không cần kinh nghiệm lập trình – Bạn sẽ được chia sẻ mọi thứ cần biết

                            </li>
                        </ul>
                        <div>
                            <h2 className="text-lg font-semibold">Mô tả
                            </h2>
                            <span>
                                Chào mừng bạn đến với khóa học: Làm Chủ Git và GitHub Từ A đến Z - quản lý mã nguồn chuyên nghiệp và làm việc nhóm hiệu quả!

                                Mình là một Senior AI Engineer, có nhiều năm kinh nghiệm trong lĩnh vực Machine Learning, Deep Learning, và phát triển phần mềm. Trong quá trình làm việc, mình nhận thấy rằng rất nhiều lập trình viên – kể cả người có kinh nghiệm – chưa thật sự hiểu rõ cách Git và GitHub hoạt động, dẫn đến việc sử dụng sai cách, mất code, hoặc khó khăn trong làm việc nhóm cũng như quản lý mã nguồn.

                                Vì vậy, mình thiết kế khóa học này để giúp bạn hiểu bản chất, thực hành thành thạo, và ứng dụng Git/GitHub chuyên nghiệp trong công việc.

                                VỀ KHÓA HỌC "Làm Chủ Git và GitHub Từ A đến Z"
                                <div>Hien them</div>
                            </span>
                        </div>
                        <CourseProfile user={courseOfUser}/>
                        {/*  */}
                       <CommentDetail course_id={course?.uuid}></CommentDetail>
                        <div>
                            <h2 className="pb-3">Các khóa học khác của Hỏi Dân IT với Eric .</h2>
                            <ListCourses/>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE (STICKY CARD) */}
                <div className="h-fit sticky top-6">
                    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
                        <div className="relative">
                            <img
                                src="/images/nestjs-course.jpg"
                                alt="NestJS Course"
                                className="w-full h-44 object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <PlayCircle className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <p className="text-2xl font-bold">1.349.000 ₫</p>
                            <Button 
                            onClick={() => handleAddCart(course)} // ✅ dùng arrow function
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                                Thêm vào giỏ hàng
                            </Button>
                            <Button variant="outline" className="w-full">
                                Mua ngay
                            </Button>

                            <p className="text-xs text-gray-500 text-center">
                                Đảm bảo hoàn tiền trong 30 ngày
                            </p>

                            <Separator />

                            <div>
                                <p className="font-medium mb-2">Khóa học này bao gồm:</p>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li>24 giờ video theo yêu cầu</li>
                                    <li>6 bài viết</li>
                                    <li>Truy cập trên thiết bị di động và TV</li>
                                    <li>Quyền truy cập đầy đủ suốt đời</li>
                                    <li>Giấy chứng nhận hoàn thành</li>
                                </ul>
                            </div>

                            <div className="text-sm text-center text-blue-600 mt-3">
                                <a href="#" className="hover:underline">Chia sẻ</a> ·{" "}
                                <a href="#" className="hover:underline">Tặng khóa học này</a>
                            </div>

                            <Button variant="ghost" className="w-full mt-2 text-sm text-gray-600">
                                Áp dụng coupon
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
