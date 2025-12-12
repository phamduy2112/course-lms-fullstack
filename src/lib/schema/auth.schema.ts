import z from "zod";

export const loginSchema=z.object({
    email:z.string().email("Email no math"),
    password:z.string().min(6,"Mat khau it nhat 6 ki tu"),
})

export const registerSchema=z.object({
    name:z.string().min(2,"Ten phai it nhat 2 ki tu"),
    email:z.string().email("Email no math"),
    password:z.string().min(6,"Password is least 6 words"),
    confirmPassword:z.string(),
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Password is no math",
    path:["confirmPassword"]
})