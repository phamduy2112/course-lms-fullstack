"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import AccountSecurity from "./user-security"
import PrivacySettingsPage from "./user-privacy-setting"
import NotificationSettings from "./user-notification"

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  headline: z.string().max(120).optional().or(z.literal("")),
  bio: z.string().max(1000).optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z
    .string()
    .max(50)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || v.startsWith("@") || v.includes("x.com") || v.includes("twitter.com"), {
      message: "Use @username or a valid URL",
    }),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  // ✅ FIX: không bao giờ undefined
  profileVisibility: z.coerce.boolean().default(true),
})



type ProfileValues = z.infer<typeof profileSchema>

type NavKey =
  | "profile"
  | "security"
  | "notifications"
  | "privacy"
  | "payment"
  | "subscriptions"

const navItems: Array<{
  key: NavKey
  label: string
  icon: string
}> = [
  { key: "profile", label: "Profile", icon: "person" },
  { key: "security", label: "Account Security", icon: "lock" },
  { key: "notifications", label: "Notifications", icon: "notifications" },
  { key: "privacy", label: "Privacy", icon: "verified_user" },
  { key: "payment", label: "Payment Methods", icon: "credit_card" },
  { key: "subscriptions", label: "Subscriptions", icon: "loyalty" },
]

export default function UserProfileSettings() {
  const [active, setActive] = React.useState<NavKey>("profile")

  // Avatar preview demo
  const [avatarUrl, setAvatarUrl] = React.useState<string>(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAT00zeJnKo2px_f8dUuY77fdPVYmMKabFCciFZcsRFIwXRAtrH892swNsqoUkovH4MsIf9LkhlY8NhMlx6FvAYv4wvxlLU2XLN8_htrg3de4LxRzFTotIPUnNdG8bQV-QaAozNYVbjLO2qOKGgLmDdPuM3eMkrAw76O8g7VdJ_eAWyZMo84HIf3fjorU59F8PdBoZhe5ropJUlnj-QD9jokdrd-noqyLjX_9awIH4P83vndGvQ2Ed67PTD11ktC-h5G8AjLwZtOjM"
  )
  const fileRef = React.useRef<HTMLInputElement | null>(null)

const form = useForm<ProfileValues>({
  resolver: zodResolver(profileSchema) as any,
  defaultValues: {
    firstName: "Alex",
    lastName: "Morgan",
    headline: "",
    bio: "",
    website: "",
    twitter: "",
    linkedin: "",
    github: "",
    profileVisibility: true,
  },
})


  function onSubmit(values: ProfileValues) {
    console.log("PROFILE FORM:", values)
  }

  function onCancel() {
    form.reset()
  }

  function onPickPhoto() {
    fileRef.current?.click()
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
  }

  function onRemovePhoto() {
    setAvatarUrl("")
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 bg-[#101323]">
      <div className="w-full max-w-[1100px] flex flex-col gap-8">
        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Account Settings
          </h1>
          <p className="text-[#909acb] text-base">
            Manage your profile, preferences and account security
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-2 lg:sticky lg:top-24">
            <div className="hidden lg:block text-[#909acb] text-xs font-bold uppercase tracking-wider mb-2 pl-3">
              Settings
            </div>

            {navItems.map((item) => {
              const isActive = active === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActive(item.key)}
                  className={cn(
                    "w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-[#15192b] border-l-4 border-primary shadow-lg shadow-black/20"
                      : "hover:bg-[#15192b]/50"
                  )}
                >
                  <span
                    className={cn(
                      "material-symbols-outlined",
                      isActive ? "text-white" : "text-[#909acb]"
                    )}
                  >
                    {item.icon}
                  </span>
                  <p
                    className={cn(
                      "text-sm leading-normal",
                      isActive ? "text-white font-bold" : "text-[#909acb] font-medium"
                    )}
                  >
                    {item.label}
                  </p>
                </button>
              )
            })}

            {/* Mobile dropdown: nếu muốn làm đúng shadcn Select thì mình làm tiếp */}
            <div className="lg:hidden mt-2 rounded-lg border border-[#222949] bg-[#15192b] p-3 text-white">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {navItems.find((x) => x.key === active)?.label}
                </span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <p className="text-xs text-[#909acb] mt-1">
                (Mobile dropdown placeholder)
              </p>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* PROFILE TAB */}
            {active === "profile" && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                  <Card className="bg-[#15192b] border border-[#222949] rounded-xl overflow-hidden shadow-xl text-white">
                    <CardHeader className="p-6 border-b border-[#222949]">
                      <CardTitle className="text-xl">Public Profile</CardTitle>
                      <CardDescription className="text-[#909acb]">
                        This information will be displayed publicly so be careful what you share.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6 flex flex-col gap-8">
                      {/* Avatar */}
                      <div className="flex items-center gap-6">
                        <div
                          className="relative group cursor-pointer"
                          onClick={onPickPhoto}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-[#222949] bg-[#11162a] flex items-center justify-center">
                            {avatarUrl ? (
                              <img
                                alt="Profile Avatar"
                                src={avatarUrl}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[#909acb] text-xs">No photo</span>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-white">
                              photo_camera
                            </span>
                          </div>

                          <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onFileChange}
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              className="border-[#313a68] bg-[#11162a] text-white hover:bg-[#2e3760]"
                              onClick={onPickPhoto}
                            >
                              Change Photo
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                              onClick={onRemovePhoto}
                            >
                              Remove
                            </Button>
                          </div>
                          <p className="text-[#909acb] text-xs">
                            Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                          </p>
                        </div>
                      </div>

                      <Separator className="bg-[#222949]" />

                      {/* Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">First Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-[#11162a] border-transparent focus-visible:ring-primary/50 focus-visible:border-primary/50 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-[#11162a] border-transparent focus-visible:ring-primary/50 focus-visible:border-primary/50 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="headline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Headline</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-[#11162a] border-transparent focus-visible:ring-primary/50 focus-visible:border-primary/50 text-white"
                                placeholder='e.g. "Instructor at Udemy"'
                              />
                            </FormControl>
                            <FormDescription className="text-[#909acb]">
                              Add a professional headline like, "Instructor at Udemy" or "Architect."
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Biography</FormLabel>

                            {/* Toolbar fake */}
                            <div className="rounded-lg overflow-hidden border border-transparent focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/40 bg-[#11162a]">
                              <div className="flex items-center gap-1 p-2 border-b border-[#313a68] bg-[#1c213e]">
                                <button
                                  type="button"
                                  className="p-1 text-[#909acb] hover:text-white rounded hover:bg-white/5"
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    format_bold
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="p-1 text-[#909acb] hover:text-white rounded hover:bg-white/5"
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    format_italic
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="p-1 text-[#909acb] hover:text-white rounded hover:bg-white/5"
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    link
                                  </span>
                                </button>
                                <div className="w-px h-4 bg-[#313a68] mx-1" />
                                <button
                                  type="button"
                                  className="p-1 text-[#909acb] hover:text-white rounded hover:bg-white/5"
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    format_list_bulleted
                                  </span>
                                </button>
                              </div>

                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={4}
                                  className="bg-transparent border-0 text-white placeholder:text-[#909acb]/50 focus-visible:ring-0 resize-y"
                                  placeholder="Tell us about yourself..."
                                />
                              </FormControl>
                            </div>

                            <FormDescription className="text-[#909acb]">
                              Links and coupons are not permitted in the biography.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Website</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#909acb] text-[20px]">
                                    language
                                  </span>
                                  <Input
                                    {...field}
                                    placeholder="https://"
                                    className="pl-10 bg-[#11162a] border-transparent focus-visible:ring-primary/50 focus-visible:border-primary/50 text-white"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="twitter"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Twitter / X</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#909acb] text-[20px]">
                                    alternate_email
                                  </span>
                                  <Input
                                    {...field}
                                    placeholder="@username"
                                    className="pl-10 bg-[#11162a] border-transparent focus-visible:ring-primary/50 focus-visible:border-primary/50 text-white"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="linkedin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">LinkedIn</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#909acb] text-[20px]">
                                    business_center
                                  </span>
                                  <Input
                                    {...field}
                                    placeholder="https://linkedin.com/in/username"
                                    className="pl-10 bg-[#11162a] border-transparent focus-visible:ring-primary/50 focus-visible:border-primary/50 text-white"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="github"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">GitHub</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#909acb] text-[20px]">
                                    code
                                  </span>
                                  <Input
                                    {...field}
                                    placeholder="https://github.com/username"
                                    className="pl-10 bg-[#11162a] border-transparent focus-visible:ring-primary/50 focus-visible:border-primary/50 text-white"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 border-t border-[#222949] bg-[#1c213e] flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-[#909acb] hover:text-white hover:bg-white/5"
                        onClick={onCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-blue-700 shadow-lg shadow-primary/25 active:scale-95"
                      >
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Profile Visibility */}
                  <Card className="bg-[#15192b] border border-[#222949] rounded-xl overflow-hidden text-white">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="text-white font-bold">Profile Visibility</h3>
                        <p className="text-[#909acb] text-sm">
                          Allow logged-in users to view your profile
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="profileVisibility"
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-primary"
                          />
                        )}
                      />
                    </CardContent>
                  </Card>
                </form>
              </Form>
            )}

            {/* Other tabs placeholder */}
            {
              active =="security" && (
                <>
                <AccountSecurity/>
                </>
              )
            }
            {
              active =="notifications" && (
                <>
                <NotificationSettings/>
                </>
              )
            }
            {
              active =="privacy" && (
                <>
                <PrivacySettingsPage/>
                </>
              )
            }
            {active !== "profile" && (
              <Card className="bg-[#15192b] border border-[#222949] text-white">
                <CardHeader>
                  <CardTitle>{navItems.find((x) => x.key === active)?.label}</CardTitle>
                  <CardDescription className="text-[#909acb]">
                    Tab content chưa build — nói mình muốn phần nào (security/notifications/privacy/payment/subscriptions).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-[#222949] bg-[#11162a] p-6 text-[#909acb]">
                    Content hidden for focus
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
