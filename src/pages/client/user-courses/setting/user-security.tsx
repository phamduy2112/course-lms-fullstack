"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"

// -------------------- ZOD --------------------
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Please enter your current password"),
    newPassword: z.string().min(8, "Must contain at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .superRefine((v, ctx) => {
    if (v.newPassword !== v.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      })
    }
  })

type PasswordValues = z.infer<typeof passwordSchema>

// -------------------- Helpers --------------------
function calcStrength(pw: string) {
  // 0..4
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

function strengthLabel(score: number) {
  if (score <= 1) return "Weak"
  if (score === 2) return "Medium"
  if (score === 3) return "Strong"
  return "Very strong"
}

export default function AccountSecurity() {
  // Password form
  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const newPassword = form.watch("newPassword")
  const strength = calcStrength(newPassword)

  const [showCurrent, setShowCurrent] = React.useState(false)
  const [showNew, setShowNew] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)

  // 2FA
  const [twoFA, setTwoFA] = React.useState(false)

  // Demo sessions
  const sessions = [
    {
      id: "s1",
      icon: "laptop_mac",
      title: `Macbook Pro 16"`,
      meta: "San Francisco, US • Chrome on macOS",
      activeNow: true,
      last: "Active Now",
    },
    {
      id: "s2",
      icon: "smartphone",
      title: "iPhone 14 Pro",
      meta: "San Francisco, US • Safari on iOS • 2 days ago",
      activeNow: false,
      last: "2 days ago",
    },
    {
      id: "s3",
      icon: "desktop_windows",
      title: "Windows PC",
      meta: "Seattle, US • Edge on Windows 11 • 1 week ago",
      activeNow: false,
      last: "1 week ago",
    },
  ]

  function onSubmit(values: PasswordValues) {
    console.log("CHANGE PASSWORD:", values)
    // call API đổi mật khẩu ở đây
  }

  return (
    <main className="flex-1 w-full flex flex-col gap-6">
      {/* Header */}
      <div className="hidden lg:flex flex-col gap-2 mb-2">
        <h1 className="text-white tracking-tight text-3xl font-bold">Account Security</h1>
        <p className="text-text-muted text-base">
          Manage your password and 2-step verification settings.
        </p>
      </div>

      {/* Password Change Card */}
      <Card className="bg-card-dark border-border-dark text-white shadow-lg shadow-black/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <span className="material-symbols-outlined">key</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Password Management</h3>
              <p className="text-sm text-text-muted">
                Ensure your account uses a strong, random password.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-2xl">
              {/* Current */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm font-medium">
                      Current Password
                    </FormLabel>

                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          type={showCurrent ? "text" : "password"}
                          placeholder="Enter current password"
                          className="h-12 bg-background-dark border-border-dark text-white placeholder:text-text-muted focus-visible:ring-1 focus-visible:ring-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrent((s) => !s)}
                          className="absolute right-3 text-text-muted hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showCurrent ? "visibility" : "visibility_off"}
                          </span>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* New */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm font-medium">
                        New Password
                      </FormLabel>

                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            type={showNew ? "text" : "password"}
                            placeholder="Enter new password"
                            className="h-12 bg-background-dark border-border-dark text-white placeholder:text-text-muted focus-visible:ring-1 focus-visible:ring-primary"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNew((s) => !s)}
                            className="absolute right-3 text-text-muted hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showNew ? "visibility" : "visibility_off"}
                            </span>
                          </button>
                        </div>
                      </FormControl>

                      {/* Strength meter */}
                      <div className="mt-2">
                        <div className="w-full h-1 bg-border-dark rounded-full overflow-hidden flex">
                          <div
                            className={`h-full w-1/3 ${strength >= 1 ? "bg-red-500" : "bg-border-dark"}`}
                          />
                          <div
                            className={`h-full w-1/3 ${strength >= 2 ? "bg-yellow-500" : "bg-border-dark"}`}
                          />
                          <div
                            className={`h-full w-1/3 ${strength >= 3 ? "bg-emerald-500" : "bg-border-dark"}`}
                          />
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xs text-text-muted">Must contain at least 8 characters.</p>
                          <span className="text-xs text-text-muted">
                            Strength: <span className="text-white font-medium">{strengthLabel(strength)}</span>
                          </span>
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm font-medium">
                        Confirm New Password
                      </FormLabel>

                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            type={showConfirm ? "text" : "password"}
                            placeholder="Retype new password"
                            className="h-12 bg-background-dark border-border-dark text-white placeholder:text-text-muted focus-visible:ring-1 focus-visible:ring-primary"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm((s) => !s)}
                            className="absolute right-3 text-text-muted hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showConfirm ? "visibility" : "visibility_off"}
                            </span>
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  className="h-12 bg-primary hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-900/20"
                >
                  Change Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* 2FA Section */}
      <Card className="bg-card-dark border-border-dark text-white shadow-lg shadow-black/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 mt-1">
                <span className="material-symbols-outlined">shield</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">Two-Factor Authentication</h3>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] font-bold uppercase tracking-wider border border-white/5 ${
                      twoFA ? "bg-emerald-500/10 text-emerald-400" : "bg-border-dark text-text-muted"
                    }`}
                  >
                    {twoFA ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <p className="text-sm text-text-muted max-w-lg">
                  Add an extra layer of security to your account by requiring more than just a password to log in.
                </p>
              </div>
            </div>

            <Switch
              checked={twoFA}
              onCheckedChange={setTwoFA}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className={`mt-8 pt-6 border-t border-border-dark/50 ${twoFA ? "" : "opacity-50 grayscale pointer-events-none select-none"}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-background-dark p-3 rounded-lg border border-border-dark">
                  <span className="material-symbols-outlined text-text-muted">phonelink_lock</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Authenticator App</p>
                  <p className="text-text-muted text-xs">
                    Use an app like Google Authenticator or Authy.
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                className="text-sm font-medium text-primary hover:text-white"
                onClick={() => console.log("SETUP 2FA")}
              >
                Setup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Login Activity */}
      <Card className="bg-card-dark border-border-dark text-white shadow-lg shadow-black/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <span className="material-symbols-outlined">devices</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Login Activity</h3>
                <p className="text-sm text-text-muted">Where you're logged in.</p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="text-sm text-red-400 border border-red-900/30 hover:border-red-400/50 hover:bg-red-500/10"
              onClick={() => console.log("LOGOUT ALL")}
            >
              Log out of all devices
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            {sessions.map((s) => (
              <div
                key={s.id}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  s.activeNow
                    ? "bg-background-dark/50 border border-border-dark/50 hover:border-primary/30"
                    : "border border-transparent hover:bg-background-dark/30 hover:border-border-dark/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-full bg-input-bg flex items-center justify-center ${s.activeNow ? "text-white" : "text-text-muted"}`}>
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium text-sm">{s.title}</p>
                      {s.activeNow && (
                        <>
                          <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] text-green-500 font-bold uppercase tracking-wide">
                            Active Now
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-text-muted text-xs mt-0.5">{s.meta}</p>
                  </div>
                </div>

                {!s.activeNow && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-text-muted hover:text-white hover:bg-white/5"
                    onClick={() => console.log("LOGOUT DEVICE:", s.id)}
                    title="Log out this device"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
