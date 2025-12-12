"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StarRating from "@/components/ui/star-rating";
import { useAppDispatch } from "@/store/hooks";
import { createCommentThunk } from "@/store/thunks/comment-thunks";
import React, { useState } from "react";

const FormAddComment = ({course_id}:any) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0); // ⭐ rating
  const dispatch=useAppDispatch()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim().length === 0 || rating === 0) return;

    const formData = {
      rating,
      content,
      parent_id:null,
      course_id
    };
    await dispatch(createCommentThunk(formData))

    console.log("Submit:", formData);

    // TODO: Gửi API tại đây

    // Reset form
    setContent("");
    setRating(0);
  };

  const isDisabled = content.trim().length === 0 || rating === 0;

  return (
    <div className="w-full mx-auto p-5 bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <Avatar className="size-12 shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-700">Đánh giá khóa học</p>
          <StarRating
            value={rating}
            onChange={(val) => setRating(val)}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nhập nội dung đánh giá..."
          className="h-11"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          type="submit"
          disabled={isDisabled}
          className="w-full md:w-auto px-8 py-5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Gửi đánh giá
        </Button>
      </form>
    </div>
  );
};

export default FormAddComment;
