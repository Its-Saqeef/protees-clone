
import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "@/components/store/CartSlice"

export const store=configureStore({
    reducer : cartreducer,
})
export default store