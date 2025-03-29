import Nav from "@/components/Account/Nav";
import Order from "@/components/Checkout/Order";
import axios from "axios";
import React from 'react'

async function page({params}) {
  const {orderid}=await params
  const data=await axios.get(`${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/api/getorder/${orderid}`).then((res)=>res.data.order)
  
  return (
    <div className="bg-white">
        <Nav data={data}/>
      <Order data={data}/>
    </div>
  )
}

export default page
