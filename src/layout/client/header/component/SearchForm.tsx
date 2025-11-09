import React, { useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IoSearchOutline } from "react-icons/io5";

const SearchSchema=z.object({
    query:z.string().min(1,{message:"Vui lòng nhập từ khóa tìm kiếm"})
})

type SearchFormValues=z.infer<typeof SearchSchema>;
const SearchForm = () => {
    const {register ,handleSubmit,watch,formState:{errors}}=useForm<SearchFormValues>({
        resolver:zodResolver(SearchSchema),
        defaultValues:{query:""},
    })
    const watchQuery=watch("query");
    const debounceRef=useRef<number|null>(null);
    useEffect(()=>{
        if(debounceRef.current) clearTimeout(debounceRef.current);
        if(!watchQuery||watchQuery.trim().length===0) return;
        debounceRef.current=window.setTimeout(()=>{
            console.log("Tự động tìm kiếm:", watchQuery);
        },500)
        return()=>{
            if(debounceRef.current) clearTimeout(debounceRef.current);
        }
    },[watchQuery])
    const onSubmit = (values: SearchFormValues) => {
console.log("Tìm kiếm:", values.query);
};
  return (
    <form onSubmit={handleSubmit(onSubmit)} 
    className='flex lg:w-[30rem] xl:w-[40rem] 2xl:w-[60rem] border rounded-3xl'>
           <Input
{...register("query")}
placeholder="Nhập từ khóa tìm kiếm..."
aria-invalid={!!errors.query}
  className="border-none bg-transparent 
w-[96%]
  shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
/>
<Button
  type="submit"
  size="icon"
  variant="default"
  className="!rounded-[1000px] !bg-blue-700 !hover:bg-blue-800 text-white"
>
  <IoSearchOutline size={16} />
</Button>



{/* {errors.query && <p className="text-sm text-red-500">{errors.query.message}</p>} */}
    </form>
  )
}

export default SearchForm