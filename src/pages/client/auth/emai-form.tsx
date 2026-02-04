"use client";

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
import { FaArrowLeftLong } from "react-icons/fa6";

const emailSchema = z.object({
  email: z.string().email("Email không hợp lệ").nonempty("Vui lòng nhập email"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface EmailFormVerifyProps {
  onSubmit: (email: string) => void; // callback khi gửi email
}

export function EmailFormVerify({ onSubmit }: EmailFormVerifyProps) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: EmailFormValues) => {
    onSubmit(values.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20" />
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white z-10">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          Xác minh email
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Nhập email của bạn"
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
              Gửi mã xác nhận
            </Button>
          </form>
          <div className="mt-8 pt-3 border-t border-[#2a3150] flex justify-center">
<a className="group flex items-center justify-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-bold leading-normal tracking-[0.015em]" href="#">
<span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
  <FaArrowLeftLong />
</span>
<span>Back to Login</span>
</a>
</div>
        </Form>
      </div>
    </div>
  );
}

export default EmailFormVerify;
