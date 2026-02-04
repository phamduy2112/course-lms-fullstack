import React from 'react'
import CourseCurriculum from './components/chapter-course'

const CreateChapter = () => {
  return (
    <div>
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
  <div className="flex flex-col gap-1">
    <h1 className="text-white text-2xl font-bold leading-tight">Course Curriculum</h1>
    <p className="text-text-secondary text-base">Organize your course content. Drag and drop to reorder sections and lessons.</p>
  </div>
  <button className="flex min-w-[120px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-[#222949] hover:bg-[#313a68] border border-border-dark text-white text-sm font-bold leading-normal transition-all">
    {/* <span className="material-symbols-outlined text-[20px]">add</span> */}
    <span className="truncate">Add Section</span>
  </button>
</div>

        <CourseCurriculum/>
    </div>
  )
}

export default CreateChapter