
import Link from 'next/link'
import React from 'react'

function Allorders({data}) {
  return (
    <main>
        <h1 className='font-bold text-2xl lg:text-4xl my-[20px] text-gray-800 tracking-widest text-center'>All Orders ({data.length})</h1>
        <div className='w-[50%] mx-auto'>
            {
                data.map((order)=>{
                    return (
                        <div key={order._id} className='flex border-2 my-2 items-center '>
                            <Link href={`/order/${order.orderNumber}`} target='blank'><p>{order.orderNumber}</p></Link>
                            <div className='self-start ml-2'>
                                <h1>{order.name}</h1>
                                <p>{order.email}</p>
                                <p>Order status : {order.status}<span>{order.status == "pending" && <button className='bg-green-600 text-white px-2 py-1 rounded-md ml-2'>Mark Delivered</button>}</span></p>
                                
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
