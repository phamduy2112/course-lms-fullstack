import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSuccess } from "../slices/auth-slice";
import { login } from "@/service/auth/auth.service";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    payload: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await login(payload)
      const token = res.data.data.token;

      dispatch(loginSuccess(token)); 
      return token;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);
