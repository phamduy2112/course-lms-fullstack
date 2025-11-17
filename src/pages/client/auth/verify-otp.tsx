import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OtpForm } from "./otp-form";
import EmailFormVerify from "./emai-form";
import NewPasswordForm from "./password-form";

export const VerifyOtp: React.FC = () => {
const [step, setStep] = useState(3);
const [email, setEmail] = useState("");

return (
  <>
    {step === 1 && (
      <EmailFormVerify
        onSubmit={(email) => {
          setEmail(email);
          setStep(2);
        }}
      />
    )}
    {step === 2 && (
      <OtpForm
        email={email}
        onSubmit={(otp) => {
          console.log("OTP:", otp);
          setStep(3);
        }}
      />
    )}
    {step === 3 &&  <NewPasswordForm
          email={email}
          onSubmit={(password) => {
            console.log("Mật khẩu mới:", password);
            alert("Đặt lại mật khẩu thành công!");
          }}
        />}
  </>
)


};
