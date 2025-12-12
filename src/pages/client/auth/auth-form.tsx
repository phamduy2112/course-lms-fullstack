import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/lib/schema/auth.schema";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: any) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const formSchema = type === "login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30" />

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {type === "login" ? "Đăng nhập" : "Tạo tài khoản"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* NAME (REGISTER ONLY) */}
          {type === "register" && (
            <div>
              <label className="block text-sm mb-2">Họ và tên</label>
              <Input
                {...register("name")}
                placeholder="Nguyễn Văn A"
                className="bg-white/20 text-white placeholder-gray-300"
              />
              {errors?.name && (
                <p className="text-red-300 text-sm mt-1">
                  {errors?.name.message}
                </p>
              )}
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <Input
              {...register("email")}
              placeholder="you@example.com"
              className="bg-white/20 text-white placeholder-gray-300"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-2">Mật khẩu</label>
            <Input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="bg-white/20 text-white placeholder-gray-300"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD (REGISTER ONLY) */}
          {type === "register" && (
            <div>
              <label className="block text-sm mb-2">Xác nhận mật khẩu</label>
              <Input
                type="password"
                {...register("confirmPassword")}
                placeholder="••••••••"
                className="bg-white/20 text-white placeholder-gray-300"
              />
              {errors.confirmPassword && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all"
          >
            {type === "login" ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </form>

        <p className="text-center text-gray-300 mt-6 text-sm">
          {type === "login" ? (
            <>
              Chưa có tài khoản?{" "}
              <a href="/register" className="text-blue-300">
                Đăng ký ngay
              </a>
            </>
          ) : (
            <>
              Đã có tài khoản?{" "}
              <a href="/login" className="text-blue-300">
                Đăng nhập
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
