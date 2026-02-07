"use client"

import * as React from "react"
import { Fragment } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"

// ========================
// Types
// ========================
type CategoryStatus = "LIVE" | "DRAFT"
type CategoryVisibility = "PUBLIC" | "PRIVATE"

type CategoryNode = {
  id: string
  name: string
  description?: string
  icon: string // material symbol name
  status: CategoryStatus
  visibility: CategoryVisibility
  updatedAtLabel: string
  coursesLabel: string
  activeStudentsLabel: string
  accent: "primary" | "purple" | "blue" | "slate"
  children?: CategoryNode[]
}

// ========================
// Zod schema
// ========================
const categorySchema = z.object({
  name: z.string().min(2, "Name tối thiểu 2 ký tự"),
  description: z.string().max(240, "Max 240 ký tự").optional(),
  icon: z.string().min(1, "Chọn icon"),
  status: z.enum(["LIVE", "DRAFT"]),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  parentId: z.string().nullable(),
})

type CategoryFormValues = z.infer<typeof categorySchema>

const iconOptions = [
  { value: "terminal", label: "Terminal" },
  { value: "code", label: "Code" },
  { value: "database", label: "Database" },
  { value: "smart_toy", label: "AI Bot" },
]

// ========================
// Dialog Component
// ========================
function CategoryFormDialog(props: {
  open: boolean
  onOpenChange: (v: boolean) => void
  mode: "create-root" | "create-child" | "edit"
  parentName?: string
  defaultValues?: Partial<CategoryFormValues>
  onSubmit: (values: CategoryFormValues) => Promise<void> | void
}) {
  const { open, onOpenChange, mode, parentName, defaultValues, onSubmit } = props

  const title =
    mode === "edit"
      ? "Edit Category"
      : mode === "create-child"
      ? "Add Sub-category"
      : "Add New Category"

  const desc =
    mode === "create-child"
      ? `Create a sub-category under "${parentName ?? "Parent"}".`
      : "Define and organize the structural hierarchy of your curriculum."

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "terminal",
      status: "LIVE",
      visibility: "PUBLIC",
      parentId: null,
      ...defaultValues,
    },
  })

  // reset mỗi lần mở để không bị dính dữ liệu cũ
  React.useEffect(() => {
    if (!open) return
    form.reset({
      name: "",
      description: "",
      icon: "terminal",
      status: "LIVE",
      visibility: "PUBLIC",
      parentId: null,
      ...defaultValues,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function handleSubmit(values: CategoryFormValues) {
    await onSubmit(values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#101323] border border-[#222949] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-[#909acb]">{desc}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 bg-[#181d34] border-[#313a68] text-white"
                      placeholder="e.g. Programming"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[96px] bg-[#181d34] border-[#313a68] text-white"
                      placeholder="Short description..."
                    />
                  </FormControl>
                  <FormDescription className="text-[#909acb]">
                    Max 240 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Icon</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="h-11 bg-[#181d34] border-[#313a68] text-white">
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#181d34] border-[#313a68] text-white">
                        {iconOptions.map((i) => (
                          <SelectItem key={i.value} value={i.value}>
                            <span className="inline-flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px]">
                                {i.value}
                              </span>
                              {i.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="h-11 bg-[#181d34] border-[#313a68] text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#181d34] border-[#313a68] text-white">
                        <SelectItem value="LIVE">Live</SelectItem>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="rounded-lg border border-[#313a68] bg-[#181d34] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <FormLabel className="text-white">Visibility</FormLabel>
                      <FormDescription className="text-[#909acb]">
                        Public shows to everyone. Private hides category from learners.
                      </FormDescription>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#909acb]">Private</span>
                      <FormControl>
                        <Switch
                          checked={field.value === "PUBLIC"}
                          onCheckedChange={(v) => field.onChange(v ? "PUBLIC" : "PRIVATE")}
                          className="data-[state=checked]:bg-primary"
                        />
                      </FormControl>
                      <span className="text-xs text-white">Public</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-[#313a68] text-white hover:bg-[#222949]"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/80">
                {mode === "edit" ? "Save Changes" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

// ========================
// Page (UI theo HTML bạn đưa)
// ========================
export const CategoryCMS = () => {
  const [data, setData] = React.useState<CategoryNode[]>([
    {
      id: "cat-programming",
      name: "Programming",
      description: "Primary curriculum track for tech",
      icon: "terminal",
      status: "LIVE",
      visibility: "PUBLIC",
      updatedAtLabel: "2h ago",
      coursesLabel: "42 Classes",
      activeStudentsLabel: "12,840",
      accent: "primary",
      children: [
        {
          id: "cat-python",
          name: "Python Development",
          description: "Core logic and backend",
          icon: "code",
          status: "LIVE",
          visibility: "PUBLIC",
          updatedAtLabel: "Yesterday",
          coursesLabel: "18 Classes",
          activeStudentsLabel: "4,520",
          accent: "purple",
        },
        {
          id: "cat-ds",
          name: "Data Science",
          description: "Analytics and visualization",
          icon: "database",
          status: "DRAFT",
          visibility: "PRIVATE",
          updatedAtLabel: "5 days ago",
          coursesLabel: "12 Classes",
          activeStudentsLabel: "0 (Hidden)",
          accent: "slate",
        },
      ],
    },
    {
      id: "cat-ai",
      name: "Artificial Intelligence",
      description: "Generative models and deep learning",
      icon: "smart_toy",
      status: "LIVE",
      visibility: "PUBLIC",
      updatedAtLabel: "14 mins ago",
      coursesLabel: "64 Classes",
      activeStudentsLabel: "24,190",
      accent: "blue",
    },
  ])

  const [dialog, setDialog] = React.useState<{
    open: boolean
    mode: "create-root" | "create-child" | "edit"
    parentId?: string | null
    parentName?: string
    editId?: string
    defaultValues?: Partial<CategoryFormValues>
  }>({ open: false, mode: "create-root" })

  function openCreateRoot() {
    setDialog({ open: true, mode: "create-root", parentId: null })
  }

  function openCreateChild(parent: CategoryNode) {
    setDialog({
      open: true,
      mode: "create-child",
      parentId: parent.id,
      parentName: parent.name,
      defaultValues: { parentId: parent.id },
    })
  }

  function openEdit(node: CategoryNode, parentId: string | null) {
    setDialog({
      open: true,
      mode: "edit",
      editId: node.id,
      parentId,
      defaultValues: {
        name: node.name,
        description: node.description ?? "",
        icon: node.icon,
        status: node.status,
        visibility: node.visibility,
        parentId,
      },
    })
  }

  function removeNode(targetId: string) {
    const removeRec = (arr: CategoryNode[]): CategoryNode[] =>
      arr
        .filter((n) => n.id !== targetId)
        .map((n) => ({
          ...n,
          children: n.children ? removeRec(n.children) : undefined,
        }))
    setData((prev) => removeRec(prev))
  }

  async function handleSubmit(values: CategoryFormValues) {
    if (dialog.mode === "edit" && dialog.editId) {
      const updateRec = (arr: CategoryNode[]): CategoryNode[] =>
        arr.map((n) => {
          if (n.id === dialog.editId) {
            return {
              ...n,
              name: values.name,
              description: values.description,
              icon: values.icon,
              status: values.status,
              visibility: values.visibility,
            }
          }
          return { ...n, children: n.children ? updateRec(n.children) : undefined }
        })
      setData((prev) => updateRec(prev))
      return
    }

    // create
    const newNode: CategoryNode = {
      id: `cat-${Math.random().toString(16).slice(2)}`,
      name: values.name,
      description: values.description,
      icon: values.icon,
      status: values.status,
      visibility: values.visibility,
      updatedAtLabel: "Just now",
      coursesLabel: "0 Classes",
      activeStudentsLabel: "0",
      accent: "primary",
      children: [],
    }

    // create root
    if (!values.parentId) {
      setData((prev) => [...prev, { ...newNode, accent: "blue" }])
      return
    }

    // create child
    const addChildRec = (arr: CategoryNode[]): CategoryNode[] =>
      arr.map((n) => {
        if (n.id === values.parentId) {
          return { ...n, children: [...(n.children ?? []), { ...newNode, accent: "purple" }] }
        }
        return { ...n, children: n.children ? addChildRec(n.children) : undefined }
      })

    setData((prev) => addChildRec(prev))
  }

  return (
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-8 border-b border-[#222949]">
        <div className="flex flex-col gap-1">
          <h2 className="text-white text-3xl font-black leading-tight tracking-tight">
            Category Management
          </h2>
          <p className="text-[#909acb] text-sm font-normal">
            Define and organize the structural hierarchy of your AI curriculum.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center justify-center rounded-lg h-11 px-5 border border-[#313a68] text-[#909acb] text-sm font-bold transition-all hover:bg-[#222949] hover:text-white">
            <span className="material-symbols-outlined mr-2">reorder</span>
            Batch Organize
          </button>

          <button
            onClick={openCreateRoot}
            className="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/80"
          >
            <span className="material-symbols-outlined mr-2">add</span>
            Add New Category
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className=" mx-auto flex flex-col">
          {data.map((root) => (
            <Fragment key={root.id}>
              <CategoryRow
                node={root}
                level={0}
                onEdit={(n, parentId) => openEdit(n, parentId)}
                onAddChild={(n) => openCreateChild(n)}
                onDelete={(id) => removeNode(id)}
              />
              {/* children */}
              {root.children && root.children.length > 0 && (
                <div className="ml-20 my-3 flex flex-col gap-6 relative">
                  {/* tree-line-v (bạn tự css) */}
                  <div className="tree-line-v" />
                  {root.children.map((child) => (
                    <div key={child.id} className="relative">
                      {/* tree-line-h (bạn tự css) */}
                      <div className="tree-line-h" />
                      <CategoryRow
                        node={child}
                        level={1}
                        onEdit={(n, parentId) => openEdit(n, parentId)}
                        onAddChild={(n) => openCreateChild(n)}
                        onDelete={(id) => removeNode(id)}
                        parentId={root.id}
                        compactActions
                      />
                    </div>
                  ))}
                </div>
              )}
            </Fragment>
          ))}

          <button
            onClick={openCreateRoot}
            className="w-full py-6 border-2 border-dashed border-[#222949] rounded-xl flex items-center justify-center gap-2 text-[#909acb] hover:text-primary hover:border-primary/50 transition-all group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              add_circle
            </span>
            <span className="font-bold">Create New Root Category</span>
          </button>
        </div>
      </div>

      {/* Dialog */}
      <CategoryFormDialog
        open={dialog.open}
        onOpenChange={(v) => setDialog((s) => ({ ...s, open: v }))}
        mode={dialog.mode}
        parentName={dialog.parentName}
        defaultValues={dialog.defaultValues}
        onSubmit={handleSubmit}
      />
    </main>
  )
}

function CategoryRow(props: {
  node: CategoryNode
  level: 0 | 1
  parentId?: string | null
  compactActions?: boolean
  onEdit: (node: CategoryNode, parentId: string | null) => void
  onAddChild: (node: CategoryNode) => void
  onDelete: (id: string) => void
}) {
  const { node, level, parentId = null, compactActions, onEdit, onAddChild, onDelete } = props

  const borderLeft =
    node.accent === "primary"
      ? "border-l-primary"
      : node.accent === "purple"
      ? "border-l-accent-purple"
      : node.accent === "blue"
      ? "border-l-blue-500"
      : "border-l-slate-600"

  const iconBg =
    node.accent === "primary"
      ? "bg-primary/20"
      : node.accent === "purple"
      ? "bg-accent-purple/20"
      : node.accent === "blue"
      ? "bg-blue-500/20"
      : "bg-slate-700/40"

  const iconText =
    node.accent === "primary"
      ? "text-primary"
      : node.accent === "purple"
      ? "text-accent-purple"
      : node.accent === "blue"
      ? "text-blue-500"
      : "text-slate-300"

  const statusPill =
    node.status === "LIVE"
      ? "bg-green-500/10 text-green-400 border-green-500/20"
      : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"

  return (
    <div className="relative">
      <div
        className={[
          "glass-card rounded-xl p-5 flex items-center justify-between border-l-4 group",
          borderLeft,
        ].join(" ")}
      >
        <div className="flex items-center gap-5 flex-1">
          <span className="material-symbols-outlined text-[#909acb] cursor-grab">
            drag_indicator
          </span>

          <div
            className={[
              level === 0 ? "size-14" : "size-12",
              "rounded-xl flex items-center justify-center shrink-0",
              iconBg,
            ].join(" ")}
          >
            <span className={["material-symbols-outlined", iconText, level === 0 ? "text-3xl" : "text-2xl"].join(" ")}>
              {node.icon}
            </span>
          </div>

          <div className="flex flex-col gap-1 min-w-[180px]">
            <div className="flex items-center gap-2">
              <h4 className={["text-white font-bold", level === 0 ? "text-lg" : "text-base"].join(" ")}>
                {node.name}
              </h4>
              <span
                className={[
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                  statusPill,
                ].join(" ")}
              >
                {node.status === "LIVE" ? "Live" : "Draft"}
              </span>
            </div>
            <p className="text-[#909acb] text-xs">{node.description}</p>
          </div>

          <div className="hidden xl:flex items-center gap-12 ml-8 flex-1">
            <div className="meta-col">
              <span className="meta-label">Courses</span>
              <span className="meta-value">{node.coursesLabel}</span>
            </div>
            <div className="meta-col">
              <span className="meta-label">Active Students</span>
              <span className="meta-value">{node.activeStudentsLabel}</span>
            </div>
            <div className="meta-col">
              <span className="meta-label">Visibility</span>
              <span className="flex items-center gap-1 text-white text-sm font-semibold">
                <span className="material-symbols-outlined text-sm">
                  {node.visibility === "PUBLIC" ? "public" : "lock"}
                </span>
                {node.visibility === "PUBLIC" ? "Public" : "Private"}
              </span>
            </div>
            <div className="meta-col">
              <span className="meta-label">Last Updated</span>
              <span className="meta-value">{node.updatedAtLabel}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {!compactActions ? (
            <>
              <button
                onClick={() => onEdit(node, parentId)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#222949] text-slate-300 hover:text-white hover:bg-primary/20 transition-all text-sm font-medium"
              >
                <span className="material-symbols-outlined text-lg">edit</span> Edit
              </button>

              <button
                onClick={() => onAddChild(node)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#222949] text-slate-300 hover:text-white hover:bg-accent-purple/20 transition-all text-sm font-medium"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span> Sub-category
              </button>

              <button
                onClick={() => onDelete(node.id)}
                className="p-2 rounded-lg bg-[#222949] text-slate-500 hover:text-red-400 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(node, parentId)}
                className="p-2 rounded-lg bg-[#222949] text-slate-300 hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
              </button>
              <button
                onClick={() => onAddChild(node)}
                className="p-2 rounded-lg bg-[#222949] text-slate-300 hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
              </button>
              <button
                onClick={() => onDelete(node.id)}
                className="p-2 rounded-lg bg-[#222949] text-slate-500 hover:text-red-400 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
