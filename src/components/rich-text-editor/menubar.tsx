import React from 'react'
import type { Editor } from '@tiptap/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Toggle } from '../ui/toggle';
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1Icon, Italic, ListIcon, ListOrdered, Redo, Strikethrough, Undo } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface appProps{
    editor:Editor|null;

}

const Menubar = ({ editor }:appProps) => {
    if(!editor){
        return null
    }
  return (
    <div className='border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center'>
        <TooltipProvider>
            <div className='flex flex-wrap gap-1'>
                <Tooltip>
                    <TooltipTrigger asChild>
                            <Toggle size="sm" 
                            pressed={editor.isActive("italic")}
                            onPressedChange={()=>editor.chain().focus().toggleItalic().run()}
                            className={
                                cn(editor.isActive("italic")&&"bg-muted text-muted-foreground")
                            }
                            >
                                <Italic></Italic>
                            </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Italic</TooltipContent>
                </Tooltip>
                        <Tooltip>
                    <TooltipTrigger asChild>
                            <Toggle size="sm" 
                            pressed={editor.isActive("strike")}
                            onPressedChange={()=>editor.chain().focus().toggleStrike().run()}
                            className={
                                cn(editor.isActive("strike")&&"bg-muted text-muted-foreground")
                            }
                            >
                                <Strikethrough></Strikethrough>
                            </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Strike</TooltipContent>
                </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                            <Toggle size="sm" 
                            pressed={editor.isActive("bold")}
                            onPressedChange={()=>editor.chain().focus().toggleBold().run()}
                            className={
                                cn(editor.isActive("bold")&&"bg-muted text-muted-foreground")
                            }
                            >
                                <Bold></Bold>
                            </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Bold</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                            <Toggle size="sm" 
                            pressed={editor.isActive("heading",{level:1})}
                            onPressedChange={()=>editor.chain().focus().toggleHeading({level:1}).run()}
                            className={
                                cn(editor.isActive("heading",{level:1})&&"bg-muted text-muted-foreground")
                            }
                            >
                                <Heading1Icon></Heading1Icon>
                            </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Heading</TooltipContent>
                </Tooltip>
                   <Tooltip>
                    <TooltipTrigger asChild>
                            <Toggle size="sm" 
                            pressed={editor.isActive("bulletList")}
                            onPressedChange={()=>editor.chain().focus().toggleBulletList().run()}
                            className={
                                cn(editor.isActive("bulletList",{level:1})&&"bg-muted text-muted-foreground")
                            }
                            >
                                <ListIcon></ListIcon>
                            </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>BulletList</TooltipContent>
                </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                            <Toggle size="sm" 
                            pressed={editor.isActive("orderedList")}
                            onPressedChange={()=>editor.chain().focus().toggleOrderedList().run()}
                            className={
                                cn(editor.isActive("orderedList",{level:1})&&"bg-muted text-muted-foreground")
                            }
                            >
                                <ListOrdered></ListOrdered>
                            </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>OrderedList</TooltipContent>
                </Tooltip>
            </div>

            <div className='w-px h-6 bg-border'>

            </div>
            <div className='flex flex-wrap gap-1'>
                 <Tooltip>
                    <TooltipTrigger asChild>
                            <Toggle size="sm" 
                            pressed={editor.isActive("left")}
                            onPressedChange={()=>editor.chain().focus().setTextAlign("left").run()}
                            className={
                                cn(editor.isActive("left")&&"bg-muted text-muted-foreground")
                            }
                            >
                                <AlignLeft></AlignLeft>
                            </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Left</TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                            <Toggle size="sm" 
                            pressed={editor.isActive("center")}
                            onPressedChange={()=>editor.chain().focus().setTextAlign("center").run()}
                            className={
                                cn(editor.isActive("center")&&"bg-muted text-muted-foreground")
                            }
                            >
                                <AlignCenter></AlignCenter>
                            </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Center</TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                            <Toggle size="sm" 
                            pressed={editor.isActive("right")}
                            onPressedChange={()=>editor.chain().focus().setTextAlign("right").run()}
                            className={
                                cn(editor.isActive("right")&&"bg-muted text-muted-foreground")
                            }
                            >
                                <AlignRight></AlignRight>
                            </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Right</TooltipContent>
                </Tooltip>
            </div>
             <div className='w-px h-6 bg-border'>

            </div>
            <div className='flex flex-wrap gap-1'>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        size={"sm"}
                        variant={"ghost"}
                        type='button'
                        onClick={()=>editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        >
                            <Undo/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Undo</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        size={"sm"}
                        variant={"ghost"}
                        type='button'
                        onClick={()=>editor.chain().focus().redo().run()}
                        disabled={!editor.can().undo()}
                        >
                            <Redo/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Redo</TooltipContent>
                </Tooltip>
             
            </div>
        </TooltipProvider>
    </div>
  )
}

export default Menubar