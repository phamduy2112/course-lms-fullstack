"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Schema validation bằng Zod
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(50, "Mật khẩu quá dài"),
    confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface NewPasswordFormProps {
  email?: string;
  onSubmit: (password: string) => void;
}

export function NewPasswordForm({ email, onSubmit }: NewPasswordFormProps) {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: PasswordFormValues) => {
    onSubmit(values.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-25" />

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white z-10">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
            alt="Reset Password"
            className="w-12 h-12 mx-auto mb-3"
          />
          <h1 className="text-3xl font-bold">Đặt lại mật khẩu</h1>
          {email && (
            <p className="text-sm text-gray-300 mt-2">
              Cho tài khoản: <span className="text-blue-200">{email}</span>
            </p>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-semibold"
            >
              Đặt lại mật khẩu
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default NewPasswordForm;
