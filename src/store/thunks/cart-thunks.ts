import { createCart, deleteAllCarts, deteleCart, getCart } from "@/service/cart/cart.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCartThunk=createAsyncThunk("cart/create",async(
    payload:any
)=>{
    try {
        const response=await createCart(payload)
        return response
    } catch (error) {
        
    }
})
export const getCartThunk=createAsyncThunk("cart/get",async(
)=>{
    try {
        const response=await getCart()
        return response
    } catch (error) {
        
    }
})

export const deleteCartThunk=createAsyncThunk("cart/delete",async(
    course_id:string
)=>{
    try {
        const response=await deteleCart(course_id)
        return response
    } catch (error) {
        
    }
})
export const deleteAllCartThunk=createAsyncThunk("cart/all-delete",async(
)=>{
    try {
        const response=await deleteAllCarts()
        return response
    } catch (error) {
        
    }
})