import { logoutDevice } from "@/service/auth/auth.service";
import { getUser, updateUserDetail } from "@/service/user/user.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserDetail=createAsyncThunk("user/user-detail",
    async()=>{

        const response = await getUser();
      return response.data; // trả về user mới sau khi update
    }
)
// 2. Thunk để update thông tin user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateUserDetail(payload);
      return response.data; // trả về user mới sau khi update
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutDeviceThunk = createAsyncThunk(
  "user/logoutDevice",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutDevice();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);