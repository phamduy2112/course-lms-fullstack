import React from 'react'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'
import Menubar from './menubar'
import TextAlign from "@tiptap/extension-text-align"

const RichTextEditor = ({field}:{field:any}) => {
const editor=useEditor({
    extensions:[StarterKit,TextAlign.configure({
        types:["heading","paragraph"]
    })],
    editorProps:{
        attributes:{
            class:"min-h-[300px] p-4 focus:outline prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none"
        }
    },
    onUpdate:({editor})=>{
        field.onChange(JSON.stringify(editor.getJSON()))
    }

})
  return (
    <div className='w-full border border-input rounded-lg overflow-hidden'>
        <Menubar editor={editor}/>
        <EditorContent editor={editor}></EditorContent>
    </div>
  )
}

export default RichTextEditor