import React from "react";
import { AuthForm } from "./auth-form";
import { login } from "@/service/auth/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { loginThunk } from "@/store/thunks/auth-thunks";
import { getUserDetail } from "@/store/thunks/user-thunks";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
const navigate = useNavigate();

const handleLogin = async (data: { email: string; password: string }) => {
  // 1️⃣ login
  const loginResult = await dispatch(loginThunk(data));

  if (loginThunk.fulfilled.match(loginResult)) {
    // 2️⃣ lấy user info
    const userResult = await dispatch(getUserDetail());

    if (getUserDetail.fulfilled.match(userResult)) {
      // 3️⃣ redirect khi tất cả đã xong
      navigate("/");
    } else {
      console.log("Load user failed:", userResult.payload);
    }
  } else {
    console.log("Login failed:", loginResult.payload);
  }
};


  return (
    <div className="  bg-gray-100">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};
