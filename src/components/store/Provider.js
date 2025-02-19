"use client"
import {store} from "@/components/Store/Store"
import { Provider } from "react-redux"

export const StoreProvider=({children})=>{
   return(
    <Provider store={store}>
        {children}
    </Provider>
   )
   
}