import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCommentThunk } from '@/store/thunks/comment-thunks';
import React, { useEffect, useState } from 'react';

interface CommentProps {
  course_id: number;
}

const Comment: React.FC<CommentProps> = ({ course_id }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // Redux state
  const commentState = useAppSelector((state) => state.comment.comments);

  // Nếu commentState là object { data: [...] }, lấy .data, đảm bảo luôn là array
  const listCommentDetail = Array.isArray(commentState) ? commentState : [];

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      await dispatch(getCommentThunk(course_id));
      setLoading(false);
    };

    if (course_id) fetchComments();
  }, [course_id, dispatch]);

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="space-y-4 lg:flex flex-col">
      {listCommentDetail.length > 0 ? (
        listCommentDetail.map((item) => (
          <div key={item.id} className="flex items-center lg:w-[49%]">
           <Avatar className="size-12 shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
            <div className="ml-4">
              <p className="font-semibold">{item.user?.name || 'Unknown'}</p>
              <p className="text-sm text-gray-500">{item.created_at}</p>
              <p className="mt-2 text-sm">{item.content}</p>
            </div>
          </div>
        ))
      ) : (
        <div>Không có bình luận</div>
      )}
    </div>
  );
};

export default Comment;
