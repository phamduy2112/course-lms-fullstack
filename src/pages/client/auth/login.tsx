import React from "react";
import { AuthForm } from "./auth-form";

export const Login: React.FC = () => {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Đăng nhập với:", data);
    // TODO: Gọi API login
  };

  return (
    <div className="  bg-gray-100">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};
