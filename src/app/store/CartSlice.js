
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState={
    cart : []
}

export const slice=createSlice({
    name : "Cart",
    initialState : initialState,
    reducers : {
        addToCart : (state,action)=> {
           
            const itemIndex = state.cart.findIndex(item => item.id ==action.payload.id && item.size === action.payload.size)
            if (itemIndex !== -1) {
                state.cart[itemIndex].quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            toast.success("Added To Cart")
        },
        removeFromCart : (state,action)=> {
            const itemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id && item.size === action.payload.size
            )        
            if (itemIndex !== -1) {
                if (state.cart[itemIndex].quantity > 1) {
                    state.cart[itemIndex].quantity -= 1;
                } else {
                    state.cart.splice(itemIndex, 1);
                }
            }
        }
    }
})

export const {addToCart,removeFromCart}=slice.actions
export default slice.reducer