import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  GripVertical,
  ChevronDown,
  Pencil,
  Trash2,
  Play,
  FileText,
  HelpCircle,
  Code2,
  Plus,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type LessonType = "video" | "reading" | "quiz" | "code"

type Lesson = {
  id: string
  title: string
  type: LessonType
  durationSec?: number // video/reading
  questionsCount?: number // quiz
  completed?: boolean
}

type Section = {
  id: string
  title: string
  lessons: Lesson[]
  isOpen?: boolean
}

function formatDuration(totalSec: number) {
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

function sectionTotalMinutes(lessons: Lesson[]) {
  const sec = lessons.reduce((sum, l) => sum + (l.durationSec ?? 0), 0)
  return Math.round(sec / 60) // giống UI: 25m Total
}

function lessonMeta(lesson: Lesson) {
  if (lesson.type === "quiz") return `${lesson.questionsCount ?? 0} Qs`
  if (lesson.durationSec != null) return formatDuration(lesson.durationSec)
  return ""
}

function lessonIcon(type: LessonType) {
  switch (type) {
    case "video":
      return <Play className="h-4 w-4" />
    case "reading":
      return <FileText className="h-4 w-4" />
    case "quiz":
      return <HelpCircle className="h-4 w-4" />
    case "code":
      return <Code2 className="h-4 w-4" />
  }
}

function lessonTypeLabel(type: LessonType) {
  switch (type) {
    case "video":
      return "Content"
    case "reading":
      return "Content"
    case "quiz":
      return "Questions"
    case "code":
      return "Code"
  }
}

// ---------------- Sortable wrappers ----------------

function SortableSectionRow(props: {
  section: Section
  onToggleOpen: (id: string) => void
  onEditSection?: (id: string) => void
  onDeleteSection?: (id: string) => void
  children?: React.ReactNode
}) {
  const { section, onToggleOpen } = props
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const total = sectionTotalMinutes(section.lessons)
  const lessonsCount = section.lessons.length

  return (
    <div ref={setNodeRef} style={style} className={isDragging ? "opacity-75" : ""}>
      {/* Section header */}
      <div
        className={[
          "rounded-xl border bg-background/10",
          "backdrop-blur supports-backdrop-filter:glass-card",
          "px-4 py-3 ",
          "flex items-center justify-between gap-3",
          "shadow-sm",
        ].join(" ")}
      >
        <div className="flex items-center gap-3 min-w-0 ">
          {/* drag handle */}
          <button
            className="text-muted-foreground hover:text-foreground transition"
            {...attributes}
            {...listeners}
            aria-label="Drag section"
          >
            <GripVertical className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-sm  whitespace-nowrap">
                Section {section.id.replace("s", "")}:
              </div>
              <div className="font-semibold truncate">{section.title}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="secondary" className="rounded-md">
            {lessonsCount} Lessons
          </Badge>
          <Badge variant="secondary" className="rounded-md">
            {total}m Total
          </Badge>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => props.onEditSection?.(section.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit section</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => props.onDeleteSection?.(section.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete section</TooltipContent>
            </Tooltip>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onToggleOpen(section.id)}
              aria-label="Toggle section"
            >
              <ChevronDown
                className={[
                  "h-4 w-4 transition-transform",
                  section.isOpen ? "rotate-180" : "rotate-0",
                ].join(" ")}
              />
            </Button>
          </TooltipProvider>
        </div>
      </div>

      {/* Section body */}
      <AnimatePresence initial={false}>
        {section.isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl border bg-background/10 px-3 py-3">
              {props.children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SortableLessonRow(props: {
  lesson: Lesson
  index: number
  onEditLesson?: (id: string) => void
  onDeleteLesson?: (id: string) => void
}) {
  const { lesson, index } = props
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: lesson.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        "rounded-lg border",
        "px-3 py-3",
        "flex items-center justify-between gap-3",
        isDragging ? "opacity-70" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="text-muted-foreground hover:text-foreground transition"
          {...attributes}
          {...listeners}
          aria-label="Drag lesson"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-muted text-muted-foreground">
          {lessonIcon(lesson.type)}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {index + 1}.
            </div>
            <div className="font-medium truncate">{lesson.title}</div>
            {lesson.completed && (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 text-sm text-muted-foreground">
        <div className="tabular-nums">{lessonMeta(lesson)}</div>

        <Separator orientation="vertical" className="h-5 mx-1" />

        <div className="flex items-center gap-1">
          <div className="text-muted-foreground/80">{lessonTypeLabel(lesson.type)}</div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => props.onEditLesson?.(lesson.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => props.onDeleteLesson?.(lesson.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => props.onDeleteLesson?.(lesson.id)}
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ---------------- Main ----------------

const initialData: Section[] = [
  {
    id: "s1",
    title: "Introduction to AI & Neural Networks",
    isOpen: true,
    lessons: [
      {
        id: "l1",
        title: "Welcome to the Course",
        type: "video",
        durationSec: 5 * 60 + 20,
        completed: true,
      },
      {
        id: "l2",
        title: "Reading: Understanding Perceptrons",
        type: "reading",
        durationSec: 10 * 60,
      },
      {
        id: "l3",
        title: "Knowledge Check: Basics",
        type: "quiz",
        questionsCount: 10,
      },
    ],
  },
  {
    id: "s2",
    title: "Deep Learning Architectures",
    isOpen: false,
    lessons: [],
  },
  {
    id: "s3",
    title: "Real-world AI Projects",
    isOpen: false,
    lessons: [],
  },
]

export default function CourseCurriculum() {
  const [sections, setSections] = React.useState<Section[]>(initialData)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )

  function toggleOpen(sectionId: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, isOpen: !s.isOpen } : s))
    )
  }

  // Reorder sections
  function onDragEndSections(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setSections((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === active.id)
      const newIndex = prev.findIndex((s) => s.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  // Reorder lessons inside a section
  function onDragEndLessons(sectionId: string, event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId) return s
        const oldIndex = s.lessons.findIndex((l) => l.id === active.id)
        const newIndex = s.lessons.findIndex((l) => l.id === over.id)
        if (oldIndex < 0 || newIndex < 0) return s
        return { ...s, lessons: arrayMove(s.lessons, oldIndex, newIndex) }
      })
    )
  }

  function addLesson(sectionId: string, type: LessonType) {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId) return s
        const id = `${type}-${Date.now()}`
        const base: Lesson = {
          id,
          title:
            type === "video"
              ? "New Video"
              : type === "quiz"
              ? "New Quiz"
              : type === "code"
              ? "New Code"
              : "New Reading",
          type,
          durationSec: type === "video" || type === "reading" ? 3 * 60 : undefined,
          questionsCount: type === "quiz" ? 5 : undefined,
        }
        return { ...s, isOpen: true, lessons: [...s.lessons, base] }
      })
    )
  }

  return (
    <div className="w-full  mx-auto pt-4">
      <div className="space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEndSections}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <SortableSectionRow
                key={section.id}
                section={section}
                onToggleOpen={toggleOpen}
                onEditSection={(id) => console.log("edit section", id)}
                onDeleteSection={(id) => console.log("delete section", id)}
              >
                {/* lessons list */}
                <div className="space-y-2">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => onDragEndLessons(section.id, e)}
                  >
                    <SortableContext
                      items={section.lessons.map((l) => l.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {section.lessons.map((lesson, idx) => (
                        <SortableLessonRow
                          key={lesson.id}
                          lesson={lesson}
                          index={idx}
                          onEditLesson={(id) => console.log("edit lesson", id)}
                          onDeleteLesson={(id) => console.log("delete lesson", id)}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>

                  {/* add buttons */}
                  <div className="pt-3 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg bg-transparent"
                      onClick={() => addLesson(section.id, "video")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      VIDEO
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg bg-transparent"
                      onClick={() => addLesson(section.id, "quiz")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      QUIZ
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg bg-transparent"
                      onClick={() => addLesson(section.id, "code")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      CODE
                    </Button>
                  </div>
                </div>
              </SortableSectionRow>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
