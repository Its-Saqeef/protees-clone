import Order from "@/components/Checkout/Order";
import axios from "axios";
import React from 'react'

async function page({params}) {
  const {orderid}=await params
  const data=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getorder/${orderid}`).then((res)=>res.data.order)
  
  return (
    <div>
      <Order data={data}/>
    </div>
  )
}

export default page
