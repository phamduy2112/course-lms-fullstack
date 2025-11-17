import React from "react";
import { AuthForm } from "./auth-form";

export const Register: React.FC = () => {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Đăng nhập với:", data);
   
  };

  return (
    <div className="  bg-gray-100">
      <AuthForm type="register" onSubmit={handleLogin} />
    </div>
  );
};
