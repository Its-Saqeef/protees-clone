"use client";

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Initial state without `localStorage`
const initialState = {
  cart: [],
};

export const slice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCartFromLocalStorage: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        toast.success("Added To Cart");
      }

      // Update localStorage with the new cart
      if (typeof window !== "undefined") {
        localStorage.setItem("Cart", JSON.stringify(state.cart));
      }
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex !== -1) {
        if (state.cart[itemIndex].quantity > 1) {
          state.cart[itemIndex].quantity -= 1;
        } else {
          state.cart.splice(itemIndex, 1);
        }
      }

      // Update localStorage with the new cart
      if (typeof window !== "undefined") {
        localStorage.setItem("Cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { addToCart, removeFromCart, setCartFromLocalStorage } = slice.actions;
export default slice.reducer;
