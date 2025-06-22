"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

function Allorders({data}) {

    useEffect(()=>{
        document.title="Dashboard - All Orders"
    },[])

    const handleStatus=async(orderNumber)=>{

       const response = await axios.post("/api/updateorder",{orderNumber,status: "delivered"},{
        headers: {
            'Content-Type': 'application/json',
          }
       }).then((res)=>res.data)
       if(response.success){
        toast.success(response.message)
       }
    }

  return (
    <main>
        <h1 className='font-bold text-2xl lg:text-4xl my-[20px] text-gray-800 tracking-widest text-center'>All Orders ({data.length})</h1>
        <div className='w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[50%] mx-auto'>
            {
                data.map((order)=>{
                    return (
                        <div key={order._id} className='flex border-2 my-2 items-center flex-wrap'>
                            <Link href={`/order/${order.orderNumber}`} target='blank'><p>{order.orderNumber}</p></Link>
                            <div className='self-start ml-2'>
                                <h1>{order.name}</h1>
                                <p>{order.email}</p>
                                <p>Order status : {order.status}<span>{order.status == "pending" && <button className='bg-green-600 text-white px-2 py-1 rounded-md ml-2 my-2' onClick={()=>handleStatus(order.orderNumber)}>Mark Delivered</button>}</span></p>
                                
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </main>
  )
}

export default Allorders
