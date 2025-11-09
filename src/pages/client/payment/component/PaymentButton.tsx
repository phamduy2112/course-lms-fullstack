"use client";
import { useState } from "react";

interface PaymentButtonProps {
  amount: number;
}

export default function PaymentButton({ amount }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = () => {
    setLoading(true);
    setMessage("");

    // Fake payment delay
    setTimeout(() => {
      setLoading(false);
      const transactionId = "MOCK-" + Date.now();
      setMessage(`Thanh toán ${amount} VND thành công! (ID: ${transactionId})`);
    }, 1000); // mô phỏng xử lý 1s
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Đang xử lý..." : `Thanh toán ${amount} VND`}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
