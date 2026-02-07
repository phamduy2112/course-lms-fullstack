"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { FaAngleRight } from "react-icons/fa6"

type CartItem = {
  id: string
  title: string
  instructor: string
  rating: number
  ratingCount: number
  hoursTotal: string
  level: "Beginner" | "Intermediate" | "Advanced"
  price: number
  originalPrice: number
  imageUrl: string
  badge?: "BESTSELLER"
  priceAccent?: boolean
}

const demoCart: CartItem[] = [
  {
    id: "1",
    title: "Advanced AI Architectures with Python",
    instructor: "Dr. Angela Yu, Lead Instructor",
    rating: 4.8,
    ratingCount: 1240,
    hoursTotal: "24h total",
    level: "Advanced",
    price: 12.99,
    originalPrice: 84.99,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdzdHH6180n9elw_2Dh-DyHfB_ntr7h8es1Q8ESyftVylwF71IhzkU8kb3AxGVdMf7c4Xi5n6CVx9ra4tabAr0XFe0Cs4YhSUqkww1tqr-zap6UWugNh0nfGbUAjrO2zf6xNdozZsAvRNuIu7F0YimlcptLxF94U1bByZFlw4Je8kuwFqSJnwxxTn9sY5X1Ih4bFNEzre5bVaqHR7FKZWsncdQBooVct8sY2TAxLmma9tuoi-tTO3ZjrF4cvm7pc2TdSxoHEK5GGo",
  },
  {
    id: "2",
    title: "React Native Mastery 2024",
    instructor: "Max Schwarzmüller",
    rating: 4.9,
    ratingCount: 850,
    hoursTotal: "32h total",
    level: "Intermediate",
    price: 14.99,
    originalPrice: 99.99,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3SZ0maM_tWRscLmdDY_H3JXIsBL0qI5yxBe1RXyJLaWSvfmnyR1yWB8H_VsJ193WU4AHyd_Fk6OLAac9ADswZP27wzvn8cA9aH_d0MuWoGtzE8bMbIi2c3Jto5SAxhoyRY1ORpkOXA3bYjQM7mEOgBAItSU2r_7QxCgV4H_YOyXuYyNW9x_tpotBbhGJ_ZSbLJG1wVbNZdSgHIKpyzMlDf6fK7hYGPO-ck3SSSNAyqsSLO0cG_JqMymw0bYDXBYP7QsxYjs5UCgw",
  },
  {
    id: "3",
    title: "UI/UX Design Principles: Zero to Hero",
    instructor: "Andrei Neagoie",
    rating: 4.7,
    ratingCount: 2100,
    hoursTotal: "12h total",
    level: "Beginner",
    price: 9.99,
    originalPrice: 49.99,
    badge: "BESTSELLER",
    priceAccent: true,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJTPrOMoNYoBioWlVcrhAtPSdDDj280SqD7h_Hh0S16IwUOKPoQuqq8Jslq1I78VXU0cu4E-Yx7xPDBmBvcG0mDEqHcqKVKNxSkLMyZaANNSifEMBfc9ufbgogtfkGt-QWgsjAlwDJ6YItkETsatxPvfRfQMcZmpCfIse3xIFP8MAtjHAxnvLnx10PzU-mq-XEH7grFxd5vmJkxMKWO8W3Scztzb7CVpe4-4yvSFPUTvOEb2N9ebr0FFXfH6PQpc2DN02DCYtPIzk",
  },
]

function formatMoney(n: number) {
  return n.toFixed(2)
}

function Stars({ rating }: { rating: number }) {
  // simple render: 5 icons as text (bạn thay lucide/star nếu muốn)
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return (
    <div className="flex text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1
        const ch =
          idx <= full ? "star" : idx === full + 1 && half ? "star_half" : "star"
        const muted = idx > full + (half ? 1 : 0)
        return (
          <span
            key={i}
            className={[
              "material-symbols-outlined text-[14px] fill-current",
              muted ? "text-yellow-500/30" : "",
            ].join(" ")}
          >
            {ch}
          </span>
        )
      })}
    </div>
  )
}

export default function ShoppingCartPage() {
  const [items, setItems] = React.useState<CartItem[]>(demoCart)
  const [coupon, setCoupon] = React.useState("")

  const originalTotal = React.useMemo(
    () => items.reduce((s, it) => s + it.originalPrice, 0),
    [items]
  )
  const total = React.useMemo(() => items.reduce((s, it) => s + it.price, 0), [items])
  const discounts = React.useMemo(() => originalTotal - total, [originalTotal, total])

  function removeItem(id: string) {
    setItems((prev) => prev.filter((x) => x.id !== id))
  }

  function moveToWishlist(id: string) {
    // demo
    console.log("Move to wishlist:", id)
    removeItem(id)
  }

  function onApplyCoupon() {
    console.log("COUPON:", coupon)
  }

  return (
    <main className="flex-1 py-12 px-6 lg:px-12 ">
      <div className="mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="text-lg font-semibold text-white">
                {items.length} Courses in Cart
              </h2>
              <span className="text-sm text-[#909acb]">Prices are displayed in USD</span>
            </div>

            <div className="flex flex-col gap-6">
              {items.map((it) => (
                <Card
                  key={it.id}
                  className="glass-panel hover-card-glow border-0 bg-white/5 text-white rounded-xl"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* image */}
                      <div className="relative shrink-0 w-full sm:w-48 h-28 rounded-lg overflow-hidden bg-[#181d34] ring-1 ring-white/10">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
                          style={{ backgroundImage: `url('${it.imageUrl}')` }}
                        />
                        {it.badge && (
                          <Badge className="absolute top-2 left-2 bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
                            {it.badge}
                          </Badge>
                        )}
                      </div>

                      {/* content */}
                      <div className="flex flex-col flex-1 min-w-0 justify-between">
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-white leading-tight mb-1 hover:text-primary transition-colors cursor-pointer truncate">
                              {it.title}
                            </h3>
                            <p className="text-sm text-[#909acb] mb-2">{it.instructor}</p>

                            <div className="flex items-center gap-1 opacity-80 mb-2">
                              <span className="text-sm font-bold text-yellow-500">
                                {it.rating.toFixed(1)}
                              </span>
                              <Stars rating={it.rating} />
                              <span className="text-xs text-[#909acb]">
                                ({it.ratingCount.toLocaleString()} ratings)
                              </span>
                            </div>

                            <div className="flex gap-2 text-xs text-[#909acb]">
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">
                                  schedule
                                </span>{" "}
                                {it.hoursTotal}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">
                                  bar_chart
                                </span>{" "}
                                {it.level}
                              </span>
                            </div>
                          </div>

                          {/* price */}
                          <div className="text-right shrink-0">
                            <span
                              className={[
                                "text-xl font-bold",
                                it.priceAccent ? "text-primary" : "text-white",
                              ].join(" ")}
                            >
                              ${formatMoney(it.price)}
                            </span>
                            <div className="text-sm text-[#909acb] line-through decoration-white/30">
                              ${formatMoney(it.originalPrice)}
                            </div>
                          </div>
                        </div>

                        {/* actions */}
                        <div className="flex items-center justify-end sm:justify-between mt-4 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-white/5">
                          <div className="hidden sm:block" />
                          <div className="flex items-center gap-4">
                            <Button
                              type="button"
                              variant="ghost"
                              className="h-auto p-0 text-sm text-[#909acb] hover:text-white"
                              onClick={() => moveToWishlist(it.id)}
                            >
                              Move to Wishlist
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              className="h-auto p-0 text-sm text-[#909acb] hover:text-red-400 flex items-center gap-1"
                              onClick={() => removeItem(it.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* RIGHT */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <Card className="glass-panel border-0 bg-white/5 text-white rounded-xl sticky top-24">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-lg font-bold text-white">Summary</CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#909acb]">Original Price</span>
                    <span className="text-white">${formatMoney(originalTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#909acb]">Discounts</span>
                    <span className="text-white">- ${formatMoney(discounts)}</span>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-3xl font-bold text-white tracking-tight">
                      ${formatMoney(total)}
                    </span>
                  </div>
                </div>

                {/* actions */}
                <div className="space-y-3 pt-2">
                  <Button className="w-full py-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
                    Checkout
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                      <FaAngleRight />
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full py-6 rounded-xl bg-transparent border-white/10 text-[#909acb] hover:bg-white/5 hover:text-white hover:border-white/20"
                  >
                    Continue browsing
                  </Button>
                </div>

                {/* trust row */}
                <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1.5 opacity-60">
                    <span className="material-symbols-outlined text-[16px] text-green-400">
                      lock
                    </span>
                    <span className="text-[11px] text-[#909acb] font-medium">
                      Secure Payment
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-1.5 opacity-60">
                    <span className="material-symbols-outlined text-[16px] text-blue-400">
                      verified_user
                    </span>
                    <span className="text-[11px] text-[#909acb] font-medium">
                      30-Day Guarantee
                    </span>
                  </div>
                </div>

                {/* coupon */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-[#909acb] mb-2 font-medium uppercase tracking-wider">
                    Promotions
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon"
                      className="bg-[#181d34] border-white/10 text-white placeholder:text-[#909acb]/50 focus-visible:ring-primary/50"
                    />
                    <Button
                      type="button"
                      onClick={onApplyCoupon}
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/5"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
