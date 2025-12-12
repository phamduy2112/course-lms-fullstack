import React from "react";
import { AuthForm } from "./auth-form";
import type { TRegister } from "@/service/auth/auth.type";
import { register } from "@/service/auth/auth.service";

export const Register: React.FC = () => {
  const handleLogin = async (data:TRegister) => {
    const registerUser=await register(data);
    return registerUser

  };

  return (
    <div className="  bg-gray-100">
      <AuthForm type="register" onSubmit={handleLogin} />
    </div>
  );
};
