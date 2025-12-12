import { createSlice } from "@reduxjs/toolkit";
import { getUserDetail, logoutDeviceThunk, updateUser } from "../thunks/user-thunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    loggedIn: false,
  },

  reducers: {
    // dùng trong fallback nếu cần reset thủ công
    resetUser(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔹 GET USER DETAIL — khi user đã login và load info lên
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.user = action.payload;
      })

      // 🔹 UPDATE USER PROFILE
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // 🔹 LOGOUT DEVICE
      .addCase(logoutDeviceThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loggedIn = false;
        localStorage.removeItem("access_token");
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
