import React, { act, useState, type ReactNode } from 'react'
import {DndContext,KeyboardSensor,PointerSensor,rectIntersection, useSensor, useSensors, type DraggableSyntheticListeners} from "@dnd-kit/core"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { arrayMove, SortableContext,sortableKeyboardCoordinates,useSortable,verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { Collapsible } from '@radix-ui/react-collapsible';
import { ChevronDown, ChevronRight, FileText, GripVertical, Trash2 } from 'lucide-react';
import { CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface iAppProps{
  data:any
}
interface SortableItemProps{
  id:string;
  children:(listeners:DraggableSyntheticListeners)=>ReactNode;
  className?:string;
  data?:{
    type:"chapter"|"lesson";
    chapterId?:string;
  }
}
const EditCourseStuctre = ({data}:iAppProps) => {
  const initialItems=data.chapter.map((chapter)=>({
    id:chapter.id,
    title:chapter.title,
    order:chapter.position,
    isOpen:true,
    lessons:chapter.lessons.map((lesson)=>({
      id:lesson.id,
      title:lesson.title,
      order:lesson.position
    }))
  }))
    const [items,setItems]=useState(initialItems);
     function SortableItem({children,id,className,data}:SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: id,data:data});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} className={
      cn("touch-none",className,isDragging?"z-10":"")
    }>
     {
      children(listeners)
     }
    </div>
  );
}
function toggleChapter(chapterId:string){
  setItems(
    items.map((chapter)=>chapter.id===chapterId?{...chapter,isOpen:!chapter.isOpen}:chapter)
  )
}
function handleDragEnd(event: any) {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const activeId = active.id;
  const overId = over.id;
  const activeType = active.data?.current?.type as "chapter" | "lesson";
  const overType = over.data?.current?.type as "chapter" | "lesson";

  // 🧱 DRAG CHAPTER
  if (activeType === "chapter") {
    let targetChapterId: string | number | null = null;

    if (overType === "chapter") {
      targetChapterId = overId;
    } else if (overType === "lesson") {
      targetChapterId = over.data?.current?.chapterId ?? null;
    }

    if (!targetChapterId) {
      console.warn("❌ Could not determine the chapter for reordering");
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === activeId);
    const newIndex = items.findIndex((item) => item.id === targetChapterId);

    if (oldIndex === -1 || newIndex === -1) {
      console.warn("❌ Could not find the chapter for reordering");
      return;
    }

    const reorderedChapters = arrayMove(items, oldIndex, newIndex).map((chapter, index) => ({
      ...(chapter as any),
      order: index + 1,
    }));

    setItems(reorderedChapters);
    return; // ✅ Dừng luôn sau khi reorder chapter
  }

  // 📘 DRAG LESSON
  if (activeType === "lesson" && overType === "lesson") {
    const courseId = data.id;
    const chapterId = active.data?.current?.chapterId;
    const overChapterId = over.data?.current?.chapterId;

    if (!chapterId || chapterId !== overChapterId) {
      console.warn("❌ Lesson move between different chapters or invalid chapter ID is not allowed");
      return;
    }

    const chapterIndex = items.findIndex((chapter: any) => chapter.id === chapterId);
    if (chapterIndex === -1) {
      console.warn("❌ Could not find chapter for lesson reordering");
      return;
    }

    const chapterToUpdate = items[chapterIndex];
    const oldLessonIndex = chapterToUpdate.lessons.findIndex((l: any) => l.id === activeId);
    const newLessonIndex = chapterToUpdate.lessons.findIndex((l: any) => l.id === overId);

    if (oldLessonIndex === -1 || newLessonIndex === -1) {
      console.warn("❌ Could not find lesson for reordering");
      return;
    }

    const reorderedLessons = arrayMove(
      chapterToUpdate.lessons,
      oldLessonIndex,
      newLessonIndex
    );

    const updatedLessonsForState = reorderedLessons.map((lesson, index) => ({
      ...lesson,
      order: index + 1,
    }));

    const newItems = [...items];
    newItems[chapterIndex] = {
      ...chapterToUpdate,
      lessons: updatedLessonsForState,
    };

    setItems(newItems);

    // 🧩 Nếu bạn có gọi API update thứ tự lessons (optional)
    if (courseId) {
      const lessonsToUpdate = updatedLessonsForState.map((lesson) => ({
        id: lesson.id,
        position: lesson.order,
      }));
      console.log("🔄 Lessons to update:", lessonsToUpdate);
      // TODO: Gọi API cập nhật vị trí bài học ở đây
    }
  }
}


    const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
    onDragEnd={handleDragEnd}
    sensors={sensors}
    collisionDetection={rectIntersection}>
        <Card>
            <CardHeader className='flex flex-row items-center justify-between border-b border-border'>
                <CardTitle>Chapters</CardTitle>
            </CardHeader>
            <CardContent>

                <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
                >
                    {items.map((item)=>(
                        <SortableItem key={item.id} id={item.id}
                        
                        data={{type:'chapter'}
                      
                      }>
                        {(listeners)=>(
                          <Card>
                            <Collapsible
                            
                            onOpenChange={()=>toggleChapter(item.id)}
                            open={item.isOpen}>
                            <div className='flex items-center justify-between p-3 border-b border-border'>
                              <div className='flex items-center gap-2'>
                                <Button 
                                 size="icon"
                                variant={"ghost"}
                                 className='cursor-grab opacity-60 hover:opacity-100'
                                 {...listeners}
                                 >
                                  <GripVertical className='size-4'></GripVertical>
                                </Button>
                                <CollapsibleTrigger asChild>
                                <Button
                                
                                size="icon"
                                variant={"ghost"}
                                className='flex items-center'>
                                  {item.isOpen?(
                                    <ChevronDown className='size-4'/>
                                  ):(
                                    <ChevronRight className='size-4'/>
                                  )}
                                </Button>
                                </CollapsibleTrigger>
                                <p className='cursor-pointer hover:text-primary pl-2'>
                                  {item.title}
                                </p>
                              </div>
                              <Button  size="icon"
                                variant={"ghost"}>
                                <Trash2 className='size-4'></Trash2>
                              </Button>
                            </div>

                            <CollapsibleContent>
                            <div className='p-1'>
                              <SortableContext items={item.lessons.map((lesson)=>lesson.id)}
                                strategy={verticalListSortingStrategy}
                                
                                >
                                {item.lessons.map((lesson)=>(
                                      <SortableItem
                                      key={lesson.id}
                                      id={lesson.id}
                                      data={{type:"lesson",chapterId:item.id}}
                                      >
                                        {(lessonListeners)=>(
                                          <div className='flex items-center justify-between p-2 hover:bg-accent rounded-sm'>
                                              <div className='flex items-center gap-2'>
                                                <Button variant={"ghost"} size={"icon"}
                                                
                                                {...lessonListeners}>
                                                  <GripVertical className='size-4'/>
                                                </Button>
                                                <FileText className='size-4'></FileText>
                                                <Link to={`/admin/courses/${data.id}/${item.id}/${lesson.id}`}>
                                          {lesson.title}
                                                </Link>
                                              </div>
                                          </div>
                                        )}
                                      </SortableItem>
                                ))}
                              </SortableContext>
                              <div className='p-2'>
                                <Button className='text-black w-full' variant={"outline"}>Create New Lesson</Button>
                              </div>
                            </div>
                            </CollapsibleContent>
                            </Collapsible>
                          </Card>
                        )}
                      </SortableItem>

                    ))}

                </SortableContext>
            </CardContent>
        </Card>

    </DndContext>
  )
}

export default EditCourseStuctre

 