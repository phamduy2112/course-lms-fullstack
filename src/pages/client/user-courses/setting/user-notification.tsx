"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

// -------------------- ZOD --------------------
const notificationSchema = z.object({
  // Email preferences
  courseUpdates: z.boolean().default(true),
  promotionalOffers: z.boolean().default(false),
  newCourseReleases: z.boolean().default(true),
  accountActivity: z.boolean().default(true), // thường nên luôn bật + disabled ở UI

  // Push
  browserNotifications: z.boolean().default(false),
})

type NotificationValues = z.infer<typeof notificationSchema>

const emailItems = [
  {
    name: "courseUpdates" as const,
    icon: "school",
    title: "Course Updates",
    desc: "Receive announcements, Q&A replies, and assignment alerts from your instructors.",
  },
  {
    name: "promotionalOffers" as const,
    icon: "local_offer",
    title: "Promotional Offers",
    desc: "Get notified about new sales, special promotions, and personalized course recommendations.",
  },
  {
    name: "newCourseReleases" as const,
    icon: "cast_for_education",
    title: "New Course Releases",
    desc: "Be the first to know when instructors you follow publish new content.",
  },
  {
    name: "accountActivity" as const,
    icon: "manage_accounts",
    title: "Account Activity",
    desc: "Get critical alerts about your logins, password changes, and security updates.",
    disabled: true, // giống mẫu
  },
]

export default function NotificationSettings() {
  const form = useForm<NotificationValues>({
    resolver: zodResolver(notificationSchema) as any,
    defaultValues: {
      courseUpdates: true,
      promotionalOffers: false,
      newCourseReleases: true,
      accountActivity: true,
      browserNotifications: false,
    },
  })

  function onSubmit(values: NotificationValues) {
    console.log("NOTIFICATION SETTINGS:", values)
    // call API update settings ở đây
  }

  function onCancel() {
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="flex-1 min-w-0">
          <Card className="flex flex-col bg-surface-dark border-border-dark rounded-xl overflow-hidden shadow-xl text-white">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-border-dark bg-gradient-to-r from-surface-dark to-[#15182a]">
              <h2 className="tracking-tight text-3xl font-bold leading-tight mb-2">
                Notification Settings
              </h2>
              <p className="text-text-secondary text-sm md:text-base max-w-2xl">
                Manage how we communicate with you regarding courses, promotions, and account updates. We promise not to spam your inbox.
              </p>
            </div>

            {/* Email Preferences */}
            <div className="p-6 md:p-8 pb-0">
              <h3 className="tracking-tight text-xl font-bold leading-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">mail</span>
                Email Preferences
              </h3>

              <div className="flex flex-col gap-1">
                {emailItems.map((it, idx) => (
                  <FormField
                    key={it.name}
                    control={form.control}
                    name={it.name}
                    render={({ field }) => (
                      <div
                        className={[
                          "flex flex-col md:flex-row md:items-center justify-between gap-4 py-5",
                          idx !== emailItems.length - 1 ? "border-b border-border-dark/50" : "",
                          "hover:bg-white/5 px-2 -mx-2 rounded-lg transition-colors group",
                        ].join(" ")}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-text-secondary hidden md:flex items-center justify-center rounded-lg bg-background-dark border border-border-dark shrink-0 size-10 group-hover:border-primary/50 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">
                              {it.icon}
                            </span>
                          </div>

                          <div className="flex flex-col justify-center">
                            <p className="text-white text-base font-medium leading-normal">
                              {it.title}
                            </p>
                            <p className="text-text-secondary text-sm font-normal leading-normal mt-1">
                              {it.desc}
                            </p>

                            {/* optional message (khi disabled) */}
                            {it.disabled ? (
                              <p className="text-xs text-text-secondary mt-2">
                                This setting is always enabled for security reasons.
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <div className="shrink-0 pt-2 md:pt-0">
                          <Switch
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(v)}
                            disabled={Boolean(it.disabled)}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      </div>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div className="p-6 md:p-8 pt-2">
              <Separator className="bg-border-dark my-8" />

              <h3 className="tracking-tight text-xl font-bold leading-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  notifications_active
                </span>
                Push Notifications
              </h3>

              <FormField
                control={form.control}
                name="browserNotifications"
                render={({ field }) => (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 hover:bg-white/5 px-4 -mx-4 rounded-lg border border-border-dark/50 bg-[#15182a]">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col justify-center">
                        <p className="text-white text-base font-medium leading-normal">
                          Enable Browser Notifications
                        </p>
                        <p className="text-text-secondary text-sm font-normal leading-normal mt-1">
                          Receive real-time updates directly in your browser even when you're not on the site.
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <Switch
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v)}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  </div>
                )}
              />
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 bg-[#101323] border-t border-border-dark flex flex-col-reverse sm:flex-row justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full sm:w-auto px-6 py-3 border-border-dark text-text-secondary hover:text-white hover:border-white/30 bg-transparent"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-[#0b2bd9] text-white shadow-[0_0_20px_rgba(13,51,242,0.3)] hover:shadow-[0_0_25px_rgba(13,51,242,0.5)]"
              >
                <span className="material-symbols-outlined text-[18px] mr-2">
                  save
                </span>
                Save Changes
              </Button>
            </div>
          </Card>
        </main>
      </form>
    </Form>
  )
}
