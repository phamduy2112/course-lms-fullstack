import React from 'react'
import Comment from './components/comment'
import FormAddComment from './components/form-add-comment'

const CommentDetail = ({course_id}:any) => {
  return (
    <div>  <div className="mt-6">
           <p className="font-semibold">4,8 ⭐ xếp hạng khóa học • 238 xếp hạng</p>
         </div>
   
         <div className="mt-6">
   
         <Comment course_id={course_id}/>
           <div>
             <FormAddComment course_id={course_id}/>
           </div>
         </div></div>
  )
}

export default CommentDetail