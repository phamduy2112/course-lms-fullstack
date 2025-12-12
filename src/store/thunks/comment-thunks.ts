import { createComment, getComment } from "@/service/comment/comment.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCommentThunk=createAsyncThunk("comment/create",async(
    payload:any
)=>{
    try {
        const response=await createComment(payload)
        return response
    } catch (error) {
        
    }
})
export const getCommentThunk=createAsyncThunk("comment/get",async(
    id:any
)=>{
    try {
        const response=await getComment(id)
        return response
    } catch (error) {
        
    }
})

