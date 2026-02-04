import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const enrollSchema = z.object({
  fullName: z.string().min(2, "Tên phải >= 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  course: z.enum(["uiux", "python", "react"], { required_error: "Chọn course" }),
})

type EnrollValues = z.infer<typeof enrollSchema>

type Props = {
  onSubmit?: (values: EnrollValues) => Promise<void> | void
}

export function EnrollStudentDialog({ onSubmit }: Props) {
  const [open, setOpen] = React.useState(false)

  const form = useForm<EnrollValues>({
    resolver: zodResolver(enrollSchema),
    defaultValues: {
      fullName: "",
      email: "",
      course: undefined as unknown as EnrollValues["course"],
    },
    mode: "onChange",
  })

  const submitting = form.formState.isSubmitting

  const handleSubmit = async (values: EnrollValues) => {
    // ✅ gọi API ở đây
    await onSubmit?.(values)

    // demo: nếu bạn chưa truyền onSubmit thì cứ log
    if (!onSubmit) console.log("Enroll:", values)

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) form.reset() // đóng dialog thì reset form
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="h-10 px-6 bg-primary hover:bg-blue-700 text-white text-sm font-bold shadow-[0_0_15px_rgba(13,51,242,0.3)]"
        >
          Enroll Student Manually
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px] bg-[#101323] border border-[#313a68] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Enroll Student</DialogTitle>
          <DialogDescription className="text-[#909acb]">
            Nhập thông tin học viên và chọn course để ghi danh.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#909acb] uppercase text-xs font-bold">
                    Full name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nguyễn Văn A"
                      className="h-11 bg-[#181d34] border-[#313a68] text-white placeholder:text-[#909acb]/70"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#909acb] uppercase text-xs font-bold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="student@gmail.com"
                      className="h-11 bg-[#181d34] border-[#313a68] text-white placeholder:text-[#909acb]/70"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#909acb] uppercase text-xs font-bold">
                    Course
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 bg-[#181d34] border-[#313a68] text-white">
                        <SelectValue placeholder="Chọn course..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="uiux">Advanced UI/UX Design</SelectItem>
                      <SelectItem value="python">Python for Data Science</SelectItem>
                      <SelectItem value="react">React Native Masterclass</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-[#313a68] text-[#909acb] hover:text-white hover:bg-[#313a68]/40"
                onClick={() => setOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={!form.formState.isValid || submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white" 
              >
                {submitting ? "Enrolling..." : "Enroll"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
