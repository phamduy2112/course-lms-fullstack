import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import React, { useState } from "react";

interface OtpFormProps {
  onSubmit: (otp: string) => void;
  email?: string;
}

export const OtpForm: React.FC<OtpFormProps> = ({ onSubmit, email }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      onSubmit(otp);
    } else {
      alert("Vui lòng nhập đủ 6 số OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-700 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605902711622-cfb43c4437f0?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-25" />

      {/* Card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white z-10">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/483/483408.png"
            alt="OTP Icon"
            className="w-12 h-12 mx-auto mb-3"
          />
          <h1 className="text-3xl font-bold">Xác thực OTP</h1>
          <p className="text-sm text-gray-300 mt-2">
            Mã xác thực đã gửi đến{" "}
            <span className="text-blue-200">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-semibold"
          >
            Xác nhận mã OTP
          </Button>

          <p className="text-center text-gray-300 text-sm mt-4">
            Chưa nhận được mã?{" "}
            <a href="#" className="text-blue-300 hover:text-blue-200">
              Gửi lại
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
