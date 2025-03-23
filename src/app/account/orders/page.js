"use client"
import React,{useEffect, useState,useRef} from 'react'
import Link from 'next/link'
import { CiMenuBurger } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Account/Nav';


function page() {
    useEffect(()=>{
        document.title="Orders - Protees.pk"
    },[])
    const [toggleDropDown,setToggleDropDown]=useState(false)
    const dropdownRef = useRef(null);
    const router=useRouter()
    const [data,setData]=useState()


    useEffect(()=>{
        (async()=>{const response =await axios.post(`/api/getorderhistory`).then((res)=>res)
        setData(response.data.data)})();
        
    },[])
    console.log(data)
    const handleLogout=async()=>{
        try {
            const response = await axios.get("/api/logout").then((res)=>res)
            toast.success(response.data.message)
            router.replace("/")
        } catch (error) {
            toast.error("Error Logging Out")
        }
    }
    function formatDate(isoString) {
        const date = new Date(isoString);
        
        const day = date.getUTCDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getUTCFullYear();
        
        return `${day} ${month} ${year}`;
      }

      const calculateOrderTotal = (orders) => {
        return orders.map(order => {
            const totalAmount = order.product.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return { orderNumber: order.orderNumber, totalAmount };
        });
    };
    
    const result =data&&calculateOrderTotal(data);
    console.log(result);

  return (
    <main className='absolute inset-0 bg-white'>
        <Nav />
        <section className='w-[90%] md:w-[60%] mx-auto my-10'>
            <div className='flex justify-between text-xl font-semibold my-4'>
                <p>Orders</p>
                <div className='flex gap-3 bg-gray-100 p-3 rounded-lg text-xl'>
                    <CiMenuBurger className={`cursor-pointer`} />
                    <CiGrid41 className={`cursor-pointer`} />
                </div>
                
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                {
                    data&& data.map((item)=>{
                        return (
                            <Link href={`/account/orders/${item.orderNumber}`} key={item._id}>
                            <div className='bg-gray-100 p-3 cursor-pointer transition duration-300 ease-in-out hover:drop-shadow-xl rounded-lg' key={item._id}>
                        <div className='bg-gray-200 rounded-lg px-2 py-3 text-sm'>
                            <p className='capitalize'>{item.status}</p>
                            <p className='text-gray-500'>{formatDate(item.createdAt)}</p>
                        </div>
                        <img src={`https://res.cloudinary.com/dtnxlm58e/image/upload/v1741148854/${item.product[0].image[0]}`} alt='Photo' className='bg-gray-200 rounded-lg p-2 my-4'/>
                        <p className='font-semibold text-sm'>{item.product.length} items</p>
                        <p className='text-sm text-gray-500'>{item.orderNumber}</p>
                        <div className='my-4 flex gap-3 flex-wrap'>
                            {
                                result.map((prod)=>{
                                    if(item.orderNumber==prod.orderNumber)
                                  return  <span key={item._id}>Rs.{(prod.totalAmount).toLocaleString("en-IN")}.00</span>
                                })
                            }
                            
                            <span className='text-gray-500'>{item.status}</span>
                        </div>
                        <button className='text-red-500 p-2 border-2 w-full rounded-lg'>Buy again</button>
                    </div>
                    </Link>
                        )
                    })
                }
            </div>
        </section>
        <div className=' border-t-2 border-gray-200 w-[90%] md:w-[60%] mx-auto flex gap-2 text-sm px-2 py-7'>
            <Link href='/pages/refund-policy' className='underline'>Refund Policy</Link>
            <Link href='/pages/shipping-policy' className='underline'>Shipping Policy</Link>
            <Link href='/pages/privacy-policy' className='underline'>Privacy Policy</Link>
            <Link href='/pages/terms-of-service' className='underline'>Terms of Service</Link>
        </div>
    </main>
  )
}

export default page
