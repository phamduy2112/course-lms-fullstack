import z from "zod";

export const loginSchema=z.object({
    email:z.string().email("Email no math"),
    password:z.string().min(6,"Mat khau it nhat 6 ki tu"),
})