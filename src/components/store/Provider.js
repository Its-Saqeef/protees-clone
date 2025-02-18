"use client"
import {store} from "@/components/store/Store"
import { Provider } from "react-redux"

export const StoreProvider=({children})=>{
   return(
    <Provider store={store}>
        {children}
    </Provider>
   )
   
}