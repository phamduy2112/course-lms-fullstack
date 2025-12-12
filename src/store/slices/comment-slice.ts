import { createSlice } from "@reduxjs/toolkit";
import { createCommentThunk, getCommentThunk } from "../thunks/comment-thunks";

interface CommentState {
  comments: any[];
}

const initialState: CommentState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder
  .addCase(getCommentThunk.fulfilled, (state, action) => {
    state.comments = action.payload?.data || []; // ✅ đảm bảo là array
  })
  .addCase(createCommentThunk.fulfilled, (state, action) => {
    const newComment = action.payload?.data;
    if (newComment) {
      if (!Array.isArray(state.comments)) state.comments = []; // phòng lỗi
      state.comments.unshift(newComment);
    }
  });

  },
});

export default commentSlice.reducer;
