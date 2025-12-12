import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
}

const initialState: AuthState = {
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
};
export const authSlice=createSlice({
    name:"auth",
    initialState,
reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string }>
    ) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;

      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("refresh_token", action.payload.refresh_token);
    },

    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;