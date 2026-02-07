"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
// optional
import { Badge } from "@/components/ui/badge"

type PurchasedCourse = {
  id: string
  title: string
  instructor: string
  imageUrl: string
}

type OrderConfirmedProps = {
  orderNumber?: string
  dateLabel?: string
  paymentLabel?: string
  totalLabel?: string
  courses?: PurchasedCourse[]
}

const fallbackCourses: PurchasedCourse[] = [
  {
    id: "c1",
    title: "Mastering AI with Python",
    instructor: "Dr. Angela Smith",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2ZQ2OQwhcP3v_3U9dN4vRVhrOZnexb63w8VQQD-3ZTz6oPv2Sp4nt381_vskxCg8BnnDAvBnbK0bpKDk_AaAT68Bwwx8zDvWWxD27aY0sXBBIvHqk3pnHAmKdcb-LkLIXK7oX7TR7aFKCwUHAPjV3w0opzBjzD7RX5eEJF8oDhRAZogJmD_l2NRNdcGHtgF7G1pi6IEVuMWpZ11pWSUU-3uEXY08qIAG397O_1-61pegz2vdpaFvogWYr4lnO2va0YoP4x5U3NRo",
  },
  {
    id: "c2",
    title: "Advanced React Patterns",
    instructor: "John Doe",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXA8SfmDQSgDkG5m6eUj8FMr1v0wrikOuYo1IFT7aI30PHRSh_JxxjjvRnQCmUx-CJ4OzLcwZz66EqxiPgl9Y4U-s6ISEsmo4R7aCEKsHrKcG0KkWEMWvK3eDVFkPfYJn6-3uTepCkXJ879GgCsKjN9hPmZ48526SsFj-QBdQw9X2QMdyjvon3eh9DSSI4W_T-WRCzt6oFWs6TQvc9T_obbaNi1-LxjNhqtDD-tmyVpDwEJzqEDkN4z8D-alaUDdBSgvjqCr0rzyI",
  },
]

export default function OrderConfirmedPage({
  orderNumber = "#ORD-7782",
  dateLabel = "Oct 24, 2023",
  paymentLabel = "Visa **** 4242",
  totalLabel = "$49.98",
  courses = fallbackCourses,
}: OrderConfirmedProps) {
  return (
    <main className="flex-1 flex justify-center py-10 px-4 sm:px-8 bg-[#101323]">
      <div className="w-full max-w-[640px] flex flex-col gap-8">
        {/* Header */}
        <section className="flex flex-col items-center gap-6 text-center">
          <div className="relative flex items-center justify-center size-20 rounded-full bg-primary/20 ring-1 ring-primary/50 shadow-[0_0_20px_rgba(13,51,242,0.3)]">
            <span className="material-symbols-outlined text-primary text-[40px]">
              check_circle
            </span>
          </div>

          <div className="max-w-[480px] flex flex-col items-center gap-2">
            <h1 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
              Order Confirmed!
            </h1>
            <p className="text-[#909acb] text-base">
              Thank you! Your order{" "}
              <span className="text-white font-medium">{orderNumber}</span> has
              been successfully placed.
            </p>
          </div>
        </section>

        {/* Order Details */}
        <Card className="rounded-xl border border-[#222949] bg-[#161b32] overflow-hidden text-white">
          <CardHeader className="p-5 border-b border-[#222949]">
            <CardTitle className="text-lg">Order Details</CardTitle>
          </CardHeader>

          <CardContent className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div className="flex flex-col gap-1">
                <p className="text-[#909acb] text-sm">Order Number</p>
                <p className="text-white text-base font-medium">{orderNumber}</p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[#909acb] text-sm">Date</p>
                <p className="text-white text-base font-medium">{dateLabel}</p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[#909acb] text-sm">Payment Method</p>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-[18px]">
                    credit_card
                  </span>
                  <p className="text-white text-base font-medium">
                    {paymentLabel}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[#909acb] text-sm">Total Amount</p>
                <p className="text-primary text-xl font-bold">{totalLabel}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchased Courses */}
        <section className="flex flex-col gap-4">
          <h3 className="text-white text-xl font-bold leading-tight px-1">
            Purchased Courses
          </h3>

          <div className="flex flex-col gap-3">
            {courses.map((c) => (
              <Card
                key={c.id}
                className="rounded-xl border border-[#222949] bg-[#161b32] text-white hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div
                      className="w-full sm:w-32 h-32 sm:h-20 shrink-0 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url("${c.imageUrl}")` }}
                    />
                    <div className="flex flex-col flex-1 gap-1 min-w-0">
                      <p className="text-white text-base font-bold truncate">
                        {c.title}
                      </p>
                      <p className="text-[#909acb] text-sm truncate">
                        {c.instructor}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        {/* nếu bạn chưa có Badge component thì đổi thành span */}
                        <Badge className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                          <span className="material-symbols-outlined text-[16px] mr-1">
                            verified
                          </span>
                          Ready to start
                        </Badge>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto mt-2 sm:mt-0">
                      <Button
                        type="button"
                        className="w-full sm:w-auto min-w-[100px] h-9 bg-[#222949] hover:bg-[#313a68] text-white"
                      >
                        Access Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section className="flex flex-col items-center gap-4 pt-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              type="button"
              className="flex-1 sm:flex-none sm:min-w-[200px] h-12 bg-primary hover:bg-blue-700 shadow-lg shadow-primary/20"
            >
              Go to My Learning
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1 sm:flex-none sm:min-w-[200px] h-12 border-[#313a68] bg-transparent text-white hover:bg-[#222949]"
            >
              Browse More Courses
            </Button>
          </div>

          <p className="text-[#586185] text-sm text-center">
            An email confirmation has been sent to your registered email.
          </p>
        </section>
      </div>
    </main>
  )
}
