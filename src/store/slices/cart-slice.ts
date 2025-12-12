import { createSlice } from "@reduxjs/toolkit";
import { createCartThunk, getCartThunk } from "../thunks/cart-thunks";

interface CartState {
  carts: any[];
}

const initialState: CartState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder
  .addCase(getCartThunk.fulfilled, (state, action) => {
    state.carts = action.payload?.data || []; // ✅ đảm bảo là array
  })
  .addCase(createCartThunk.fulfilled, (state, action) => {
    const newCart = action.payload?.data;
    if (newCart) {
      if (!Array.isArray(state.carts)) state.carts = []; // phòng lỗi
      state.carts.unshift(newCart);
    }
  });

  },
});

export default cartSlice.reducer;
