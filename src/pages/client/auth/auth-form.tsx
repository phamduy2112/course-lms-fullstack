import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";


interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: { email: string; password: string }) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30" />

      {/* Glassmorphism card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white z-10">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            alt="Logo"
            className="w-12 h-12 mx-auto mb-2"
          />
          <h1 className="text-3xl font-bold tracking-tight">
            {type === "login" ? "Đăng nhập" : "Tạo tài khoản"}
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            {type === "login"
              ? "Chào mừng bạn quay lại!"
              : "Hãy tham gia cùng chúng tôi ngay hôm nay."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-200 mb-2">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-2">Mật khẩu</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-semibold"
          >
            {type === "login" ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </form>

        <p className="text-center text-gray-300 mt-6 text-sm">
          {type === "login" ? (
            <>
              Chưa có tài khoản?{" "}
              <a
                href="/register"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                Đăng ký ngay
              </a>
            </>
          ) : (
            <>
              Đã có tài khoản?{" "}
              <a
                href="/login"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                Đăng nhập
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
