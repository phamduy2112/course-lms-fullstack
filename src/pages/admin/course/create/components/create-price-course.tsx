
import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@headlessui/react"

const pricingSchema = z
  .object({
    currency: z.string().min(1),
    price: z
      .number({
        // required_error: "Please enter a price",
        // invalid_type_error: "Price must be a number",
      })
      .min(0, "Price must be ≥ 0"),
    dynamicPricing: z.boolean().default(false),
    isFree: z.boolean().default(false),
  })
  .superRefine((val, ctx) => {
    if (!val.isFree && val.price <= 0) {
      ctx.addIssue({
        path: ["price"],
        message: "Price must be greater than 0 unless the course is free",
        code: z.ZodIssueCode.custom,
      })
    }
  })

// ✅ Input type: dùng cho useForm (cho phép boolean | undefined do default)
type PricingFormInput = z.input<typeof pricingSchema>

// ✅ Output type: dùng cho payload chắc chắn boolean
type PricingFormOutput = z.output<typeof pricingSchema>

const currencyOptions = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "JPY", label: "JPY (¥)" },
]

export default function CreatePriceCourse() {
  // ❗IMPORTANT: useForm phải nằm TRONG component
  const form = useForm<PricingFormInput>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      currency: "USD",
      price: 49.99,
      dynamicPricing: false,
      isFree: false,
    },
    mode: "onChange",
  })

  const isFree = form.watch("isFree") ?? false

  function onSubmit(values: PricingFormInput) {
    // ✅ parse để ra output chắc chắn (boolean luôn có)
    const payload: PricingFormOutput = pricingSchema.parse(values)
    console.log("FORM DATA:", payload)
  }

  function onSave() {
    const values = form.getValues()
    const payload: PricingFormOutput = pricingSchema.parse(values)
    console.log("DRAFT:", payload)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="relative flex-1 bg-background-dark p-6 lg:p-10">
          <div className="mx-auto  flex flex-col gap-8 pb-3">
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222949] pb-6">
              <h1 className="text-white text-3xl font-bold leading-tight">Pricing</h1>
              <p className="text-[#909acb] text-base">
                Set your course pricing and manage how it&apos;s offered to students globally.
              </p>
            </div>

            {/* Pricing Card */}
            <Card className="glass-card text-white border border-[#222949]">
              <CardHeader className="space-y-1">
                <CardTitle>Pricing</CardTitle>
                <CardDescription className="text-[#909acb]">
                  Set a price for your course. If it&apos;s your first course, we recommend starting with a
                  lower price to attract students.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Currency */}
                  {/* <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wide opacity-80  text-white">
                          Currency
                        </FormLabel>
         

                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="h-12
                            
                            w-full bg-[#181d34] border-[#313a68] text-white">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#181d34] 
                          
                          border-[#313a68] text-white">
                            {currencyOptions.map((c) => (
                              <SelectItem 
                              
                             className="h-20" key={c.value} value={c.value}>
                                {c.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
   <FormField
            control={form.control}
                                name="currency"
            render={({ field }) => (
    <FormItem>
      <FormLabel className="text-xs font-bold uppercase tracking-wide opacity-80 text-white">
        Currency
      </FormLabel>

      <FormControl>
        <div className="relative">
       <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="h-12
                            
                            w-full bg-[#181d34] border-[#313a68] text-white">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#181d34] border-[#313a68] text-white">
                            {currencyOptions.map((c) => (
                              <SelectItem 
                              
                                key={c.value} value={c.value}>
                                {c.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

          {/* Currency suffix */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#909acb] text-sm">
            {form.watch("currency")}
          </span>
        </div>
      </FormControl>

      <FormDescription className="text-[#909acb]">
        Enter the course price (numbers only).
      </FormDescription>

      <FormMessage />
    </FormItem>
  )}
/>
                  {/* Price Tier */}
                 <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
    <FormItem>
      <FormLabel className="text-xs font-bold uppercase tracking-wide opacity-80 text-white">
        Price
      </FormLabel>

      <FormControl>
        <div className="relative">
          <Input
            type="number"
            step="0.01"
            min={0}
            disabled={isFree}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.valueAsNumber)}
            className="h-9
            pl-4 
            w-full bg-[#181d34] border-[#313a68] text-white pr-20"
            placeholder="0.00"
          />

          {/* Currency suffix */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#909acb] text-sm">
            {form.watch("currency")}
          </span>
        </div>
      </FormControl>

      <FormDescription className="text-[#909acb]">
        Enter the course price (numbers only).
      </FormDescription>

      <FormMessage />
    </FormItem>
  )}
/>
                </div>

                <Separator className="bg-[#222949]" />

                {/* Dynamic Pricing */}
                <FormField
                  control={form.control}
                  name="dynamicPricing"
                  render={({ field }) => (
                    <div className="flex items-center justify-between p-4 bg-[#181d34] rounded-lg border border-[#313a68]">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white text-sm font-bold">Enable Dynamic Pricing</span>
                        <span className="text-[#909acb] text-xs">
                          Automatically adjust price based on regional market purchasing power.
                        </span>
                      </div>

                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-222949 bg-black"
                      />
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            {/* Free Course */}
            <Card className="glass-card text-white border border-[#222949]">
              <CardContent className="p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value ?? false}
                            onCheckedChange={(v) => field.onChange(Boolean(v))}
                            className="mt-1 border-[#313a68] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </FormControl>

                        <div className="space-y-1">
                          <FormLabel className="text-white text-base font-bold cursor-pointer">
                            Make this course free
                          </FormLabel>
                          <FormDescription className="text-[#909acb] text-sm">
                            By selecting this, students can enroll in your course without any payment.
                          </FormDescription>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-[#1e2235] p-4">
                  <span className="text-whie text-sm font-bold">i</span>
                  <p className="text-[#909acb] text-sm">
                    Free courses cannot be longer than 2 hours in total duration.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Action Bar */}
          <div
            className="flex items-center justify-between"
          >
            <Button
              type="button"
              variant="ghost"
              className="text-[#ef4444] hover:bg-[#ef4444]/10 hover:text-[#ef4444] font-medium"
              onClick={() => console.log("DELETE clicked")}
            >
              Delete
            </Button>

            <div className="flex gap-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                Save &amp; Continue
              </Button>
            </div>
          </div>
        </main>
      </form>
    </Form>
  )
}
