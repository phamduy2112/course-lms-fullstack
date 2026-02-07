"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"

const privacySchema = z.object({
  // Profile Visibility
  publicProfile: z.coerce.boolean().default(true),
  showCompletedCourses: z.coerce.boolean().default(false),
  directMessages: z.coerce.boolean().default(true),

  // Data & Consent
  personalizedRecommendations: z.coerce.boolean().default(false),
})

type PrivacyValues = z.infer<typeof privacySchema>

export default function PrivacySettingsPage() {
  const form = useForm<PrivacyValues>({
    resolver: zodResolver(privacySchema) as any,
    defaultValues: {
      publicProfile: true,
      showCompletedCourses: false,
      directMessages: true,
      personalizedRecommendations: false,
    },
  })

  function onSubmit(values: PrivacyValues) {
    console.log("PRIVACY FORM:", values)
    // call API ở đây
  }

  return (
    <main className="flex-1 p-4 lg:p-10 min-w-0">
      <div className="max-w-[800px] mx-auto w-full flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-2 pb-4 border-b border-[#222949]">
          <h1 className="text-white text-3xl font-bold leading-tight tracking-tight">
            Privacy Settings
          </h1>
          <p className="text-[#909acb] text-base font-normal">
            Manage your visibility and data consent preferences.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {/* Section: Profile Visibility */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-xl font-bold leading-tight">Profile Visibility</h3>

              <Card className="border border-[#313a68] bg-[#161b2e] overflow-hidden text-white">
                <CardContent className="p-0">
                  {/* Toggle 1 */}
                  <div className="flex items-center justify-between p-5 border-b border-[#313a68]/50 gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-medium">Public Profile</p>
                      <p className="text-[#909acb] text-sm">
                        Make my profile visible to other users and search engines.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="publicProfile"
                      render={({ field }) => (
                        <FormItem className="flex items-center">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-center justify-between p-5 border-b border-[#313a68]/50 gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-medium">Show Completed Courses</p>
                      <p className="text-[#909acb] text-sm">
                        Display your learning achievements on your profile.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="showCompletedCourses"
                      render={({ field }) => (
                        <FormItem className="flex items-center">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Toggle 3 */}
                  <div className="flex items-center justify-between p-5 gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-medium">Direct Messages</p>
                      <p className="text-[#909acb] text-sm">
                        Allow instructors to send me direct messages regarding courses.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="directMessages"
                      render={({ field }) => (
                        <FormItem className="flex items-center">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section: Data & Consent */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-xl font-bold leading-tight">Data &amp; Consent</h3>

              <Card className="border border-[#313a68] bg-[#161b2e] text-white">
                <CardContent className="p-5 flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="personalizedRecommendations"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(v) => field.onChange(Boolean(v))}
                              className="mt-1 border-[#313a68] bg-[#222949] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                          </FormControl>

                          <div className="flex flex-col gap-1">
                            <FormLabel className="text-white text-base font-medium cursor-pointer">
                              Personalized Recommendations
                            </FormLabel>
                            <FormDescription className="text-[#909acb] text-sm">
                              Allow us to use your learning activity to recommend relevant courses and content.
                            </FormDescription>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="bg-[#313a68]/50" />

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-medium">Your Data</p>
                      <a
                        className="text-primary hover:text-primary/80 text-sm font-medium underline-offset-4 hover:underline"
                        href="#"
                      >
                        View Privacy Policy
                      </a>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#313a68] bg-transparent text-white hover:bg-[#222949] hover:border-[#4b5586]"
                      onClick={() => console.log("REQUEST EXPORT")}
                    >
                      Request Data Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section: Danger Zone */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold leading-tight text-red-400">Danger Zone</h3>

              <Card className="border border-red-900/30 bg-red-900/5 text-white">
                <CardContent className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-base font-medium">Delete Account</p>
                    <p className="text-[#909acb] text-sm">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>

                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => console.log("DELETE ACCOUNT")}
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Action Footer */}
            <div className="flex justify-end gap-3 pt-6 border-t border-[#222949]">
              <Button
                type="button"
                variant="outline"
                className="border-[#313a68] bg-transparent text-white hover:bg-[#222949]"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>

              <Button type="submit" className="bg-primary hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(13,51,242,0.3)]">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  )
}
