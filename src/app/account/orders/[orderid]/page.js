import Nav from "@/components/Account/Nav";
import Order from "@/components/Checkout/Order";
import axios from "axios";
import React from 'react'
import { getApiBaseUrl } from "@/lib/apiBaseUrl";

export const dynamic = "force-dynamic";

async function page({params}) {
  const {orderid}=await params
  const data=await axios.get(`${getApiBaseUrl()}/api/getorder/${orderid}`).then((res)=>res.data.order)
  
  return (
    <div className="bg-white">
        <Nav data={data}/>
      <Order data={data}/>
    </div>
  )
}

export default page
