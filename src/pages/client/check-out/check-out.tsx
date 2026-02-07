"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"

type CheckoutItem = {
  id: string
  title: string
  instructor: string
  price: number
  originalPrice: number
  imageUrl: string
}

const reviewItems: CheckoutItem[] = [
  {
    id: "1",
    title: "Advanced React Patterns & Performance",
    instructor: "Sarah Drasner",
    price: 89.99,
    originalPrice: 129.99,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgEjjeyyE63_eO8EFasGYcsZvcqSfdzqd17mFs8y_z_gf6ygfI93JkFqGlLuEArmS7OqZGZi-nrA6C-XHY7WSdbLk9ZCcMvwLRuUPyWfZdED4Eu7j7afjQ0ctErOaG0TWZbKXZRfJo387HraXdDm9bLKBP4KzyKwoX-NhDaWcT_P-6R9b6xZoK1iuUj0KMdB1r6qb_7O3l7VA6JnXRdlwRAF1myl8Id3tTqk9L16AWg-qOdg2VBDEoSWBaK5eRO7la8-rOU7lEH_8",
  },
  {
    id: "2",
    title: "AI & Machine Learning Masterclass",
    instructor: "Andrew Ng",
    price: 94.99,
    originalPrice: 199.99,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMKnl9fa7JaPVlCTWAUWzrvrKu8fziK9_x8CrmoDwcPVCZHI4HPQGetPDyRnXlyCCa-QaeKGlp0YDNhtHhqs04Z15KeeMlYzxlOFqztoR8GxIzOAumppE8IyP9TGLfIBzYKmGWokpUGArinx0wyv0dZ-XpMd1HldVtQNW9a-VDLSfE8wcPqSKvCehVwH5NOl-gExbMw_XfdPs4FN5fptfsbWFzCcxcOiH8p5TTpP_c35bS3XhBua1r2X0mkxzAS-wNnVs7mSY-rcg",
  },
]

const money = (n: number) => n.toFixed(2)

const checkoutSchema = z
  .object({
    // billing
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    country: z.string().min(1, "Please select a country"),
    address: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "Zip code is required"),

    // payment
    paymentMethod: z.enum(["card", "paypal"]),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvc: z.string().optional(),
    saveCard: z.boolean().default(false),
  })
  .superRefine((val, ctx) => {
    if (val.paymentMethod === "card") {
      if (!val.cardNumber || val.cardNumber.trim().length < 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cardNumber"],
          message: "Card number is required",
        })
      }
      if (!val.expiry || val.expiry.trim().length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["expiry"],
          message: "Expiry date is required",
        })
      }
      if (!val.cvc || val.cvc.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cvc"],
          message: "CVC is required",
        })
      }
    }
  })

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const originalTotal = reviewItems.reduce((s, x) => s + x.originalPrice, 0)
  const total = reviewItems.reduce((s, x) => s + x.price, 0)
  const discounts = originalTotal - total
  const tax = 0
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema) as any,
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "United States",
      address: "",
      city: "",
      zip: "",
      paymentMethod: "card",
      cardNumber: "",
      expiry: "",
      cvc: "",
      saveCard: false,
    },
    mode: "onSubmit",
  })


  const paymentMethod = form.watch("paymentMethod")

  function onSubmit(values: CheckoutFormValues) {
    // ✅ form data gửi BE
    console.log("CHECKOUT FORM DATA:", values)

    // ✅ payload gợi ý
    // const payload = {
    //   billing: { ... },
    //   payment: { ... },
    //   items: reviewItems.map(i => ({ id: i.id, price: i.price })),
    //   total,
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="flex-grow w-full  mx-auto px-4 md:px-10 py-8 ">
          <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight pb-8">
            Checkout
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Step 1 */}
              <Card className="rounded-xl border border-[#222949] bg-[#181d34]/40 overflow-hidden">
                <CardHeader className="px-6 py-4 border-b border-[#222949] flex-row items-center gap-3 space-y-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                    1
                  </div>
                  <CardTitle className="text-white text-lg font-bold">
                    Billing Details
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm font-medium">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-12 bg-[#101323] border-[#313a68] text-white placeholder:text-[#909acb]/60 focus-visible:ring-primary/40"
                            placeholder="Enter first name"
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
                        <FormLabel className="text-white text-sm font-medium">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-12 bg-[#101323] border-[#313a68] text-white placeholder:text-[#909acb]/60 focus-visible:ring-primary/40"
                            placeholder="Enter last name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-white text-sm font-medium">
                          Country / Region
                        </FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-[#101323] border-[#313a68] text-white">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#101323] border-[#313a68] text-white">
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-white text-sm font-medium">
                          Street Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-12 bg-[#101323] border-[#313a68] text-white placeholder:text-[#909acb]/60 focus-visible:ring-primary/40"
                            placeholder="House number and street name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm font-medium">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-12 bg-[#101323] border-[#313a68] text-white placeholder:text-[#909acb]/60 focus-visible:ring-primary/40"
                            placeholder="Enter city"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm font-medium">
                          Zip Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-12 bg-[#101323] border-[#313a68] text-white placeholder:text-[#909acb]/60 focus-visible:ring-primary/40"
                            placeholder="ZIP code"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="rounded-xl border border-[#222949] bg-[#181d34]/40 overflow-hidden">
                <CardHeader className="px-6 py-4 border-b border-[#222949] flex-row items-center gap-3 space-y-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                    2
                  </div>
                  <CardTitle className="text-white text-lg font-bold">
                    Payment Method
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid gap-4"
                          >
                            {/* CARD */}
                            <label className="cursor-pointer">
                              <div className="flex items-center gap-4 rounded-lg border border-[#313a68] bg-[#101323] p-4 hover:border-primary/50 transition-all">
                                <RadioGroupItem value="card" id="pm_card" />
                                <div className="flex flex-1 items-center justify-between">
                                  <span className="font-bold text-white">
                                    Credit or Debit Card
                                  </span>
                                  <div className="flex gap-2">
                                    <div className="h-6 w-10 rounded bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                                      VISA
                                    </div>
                                    <div className="h-6 w-10 rounded bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                                      MC
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>

                            {/* PAYPAL */}
                            <label className="cursor-pointer">
                              <div className="flex items-center gap-4 rounded-lg border border-[#313a68] bg-[#101323] p-4 hover:border-primary/50 transition-all">
                                <RadioGroupItem value="paypal" id="pm_paypal" />
                                <div className="flex flex-1 items-center justify-between">
                                  <span className="font-bold text-white">PayPal</span>
                                  <span className="material-symbols-outlined text-[#909acb]">
                                    account_balance_wallet
                                  </span>
                                </div>
                              </div>
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {paymentMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:pl-9">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-white text-sm font-medium">
                              Card Number
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#909acb]">
                                  credit_card
                                </span>
                                <Input
                                  {...field}
                                  className="h-12 bg-[#101323] border-[#313a68] text-white pl-11 placeholder:text-[#909acb]/60 focus-visible:ring-primary/40"
                                  placeholder="0000 0000 0000 0000"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="expiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-sm font-medium">
                              Expiry Date
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="h-12 bg-[#101323] border-[#313a68] text-white placeholder:text-[#909acb]/60 focus-visible:ring-primary/40"
                                placeholder="MM/YY"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-sm font-medium">
                              CVC / CVV
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="h-12 bg-[#101323] border-[#313a68] text-white placeholder:text-[#909acb]/60 focus-visible:ring-primary/40"
                                placeholder="123"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="saveCard"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2 flex flex-row items-center gap-3 pt-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(v) => field.onChange(Boolean(v))}
                                className="border-[#313a68] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                            </FormControl>
                            <div className="space-y-1">
                              <FormDescription className="text-[#909acb] text-sm">
                                Save this card securely for future purchases
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="rounded-xl border border-[#222949] bg-[#181d34]/40 overflow-hidden">
                <CardHeader className="px-6 py-4 border-b border-[#222949] flex-row items-center gap-3 space-y-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                    3
                  </div>
                  <CardTitle className="text-white text-lg font-bold">
                    Review Items
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 flex flex-col gap-4">
                  {reviewItems.map((it, idx) => (
                    <React.Fragment key={it.id}>
                      <div className="flex gap-4 items-start">
                        <div
                          className="h-20 w-32 shrink-0 rounded-lg bg-cover bg-center overflow-hidden relative"
                          style={{ backgroundImage: `url('${it.imageUrl}')` }}
                        >
                          <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h4 className="text-white font-bold line-clamp-1">
                              {it.title}
                            </h4>
                            <p className="text-sm text-[#909acb] mt-1">
                              By {it.instructor}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-primary font-bold">
                              ${money(it.price)}
                            </span>
                            <span className="text-xs text-[#909acb] line-through">
                              ${money(it.originalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {idx !== reviewItems.length - 1 && (
                        <div className="h-px bg-[#222949] w-full my-1" />
                      )}
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* RIGHT */}
            <div className="lg:w-[380px] shrink-0">
              <div className="sticky top-24 flex flex-col gap-6">
                <Card className="rounded-xl border border-[#222949] bg-[#181d34]/40 overflow-hidden shadow-xl shadow-black/20">
                  <CardHeader className="px-6 py-4 border-b border-[#222949]">
                    <CardTitle className="text-white text-lg font-bold">
                      Summary
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-[#909acb]">
                      <span className="text-sm">Original Price</span>
                      <span className="text-sm line-through">
                        ${money(originalTotal)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[#909acb]">
                      <span className="text-sm">Discounts</span>
                      <span className="text-sm text-green-400">
                        -${money(discounts)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[#909acb] border-b border-[#222949] pb-4">
                      <span className="text-sm">Tax (Estimated)</span>
                      <span className="text-sm">${money(tax)}</span>
                    </div>

                    <div className="flex justify-between items-end pt-1">
                      <span className="text-white font-bold text-lg">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${money(total + tax)}
                      </span>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full h-12 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Complete Checkout
                          <span className="material-symbols-outlined text-[20px]">
                            arrow_forward
                          </span>
                        </span>
                      </Button>

                      <p className="text-center text-xs text-[#909acb] mt-3">
                        By completing your purchase you agree to these{" "}
                        <a className="text-primary hover:underline" href="#">
                          Terms of Service
                        </a>
                        .
                      </p>
                    </div>
                  </CardContent>

                  <div className="bg-[#13172a] px-6 py-4 border-t border-[#222949]">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-[#909acb] text-xs">
                        <span className="material-symbols-outlined text-[16px] text-green-400">
                          lock
                        </span>
                        <span>Secure 256-bit SSL encrypted payment</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#909acb] text-xs">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          verified_user
                        </span>
                        <span>30-Day Money-Back Guarantee</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="rounded-xl border border-[#222949] bg-[#181d34]/40 p-6 hidden md:block">
                  <div className="flex gap-4">
                    <div className="size-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-purple-400">
                        card_giftcard
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Gift a Course</h4>
                      <p className="text-[#909acb] text-xs mt-1">
                        Buying for your team or a friend? You can send this cart as a
                        gift after purchase.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </form>
    </Form>
  )
}
