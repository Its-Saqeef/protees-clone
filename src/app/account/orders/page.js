"use client"
import React,{useEffect, useState,useRef} from 'react'
import Link from 'next/link'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import axios from 'axios';
import { toast } from 'react-toastify';


function page() {
    useEffect(()=>{
        document.title="Orders - Protees.pk"
    },[])
    const [toggleDropDown,setToggleDropDown]=useState(false)
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setToggleDropDown(false);
            }
        }

        if (toggleDropDown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toggleDropDown])

    const handleLogout=async()=>{
        try {
            const response = await axios.get("/api/logout").then((res)=>res)
            toast.success(response.data.message)
        } catch (error) {
            toast.error("Error Logging Out")
        }
    }

  return (
    <main className='absolute inset-0 bg-white'>
        <nav className='bg-gray-100 p-3'>
            <div className='flex justify-between w-[90%] md:w-[60%] mx-auto items-center'>
                <div className='flex gap-6 items-center'>
                    <Link href={"/"}><img src='/SITE_LOGO_1.png' alt='Logo' /></Link>
                    <Link href="/">Shop</Link>
                    <Link href="" className='underline'>Orders</Link>
                </div>
                <div className='relative' ref={dropdownRef}>
                    <div className='flex items-center cursor-pointer hover:bg-white hover:rounded-lg p-2' onClick={()=>setToggleDropDown(!toggleDropDown)}>
                        <p  className='bg-gray-100 rounded-xl p-1'>NM</p>
                        <MdOutlineKeyboardArrowDown className={`text-xl transition duration-100 ease-in ${toggleDropDown ? "rotate-180 " : "rotate-0"}`}/>
                    </div>
                    {
                        toggleDropDown &&
                    <div className={`bg-white shadow-lg rounded-md py-2 px-3 flex flex-col gap-3 absolute top-10`}>
                        <div className='flex items-center gap-2 text-sm py-2 border-b-2'>
                            <p className='bg-gray-100 rounded-xl p-1'>NM</p>
                            <div>
                                <p>Muhammad Saqeef</p>
                                <p>Muhammadxaqeef@gmailcom</p>
                            </div>
                        </div>
                        <p className='hover:bg-gray-100 cursor-pointer py-2 rounded-md'>Profile</p>
                        <p className='hover:bg-gray-100 cursor-pointer py-2 rounded-md'>Settings</p>
                        <p className='hover:bg-gray-100 cursor-pointer py-2 rounded-md' onClick={handleLogout}>Logout</p>
                    </div>
                    }
                </div>
            </div>
        </nav>
        <section className='w-[90%] md:w-[60%] mx-auto my-10'>
            <div className='flex justify-between text-xl font-semibold my-4'>
                <p>Orders</p>
                <div className='flex gap-3 bg-gray-100 p-3 rounded-lg text-xl'>
                    <CiMenuBurger className={`cursor-pointer`} />
                    <CiGrid41 className={`cursor-pointer`} />
                </div>
                
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3'>
                <div className='bg-gray-100 p-3 cursor-pointer transition duration-300 ease-in-out hover:drop-shadow-xl rounded-lg'>
                    <div className='bg-gray-200 rounded-lg px-2 py-3 text-sm'>
                        <p className=''>On its Way</p>
                        <p className='text-gray-500'>Date</p>
                    </div>
                    <img src="/img1.png" alt='Photo' className='bg-gray-200 rounded-lg p-2 my-4'/>
                    <p className='font-semibold text-sm'>1 item</p>
                    <p className='text-sm text-gray-500'>Order Number</p>
                    <div className='my-4 flex gap-3'>
                        <span>Rs 1600.00</span><span>Payment Status</span>
                    </div>
                    <button className='text-red-500 p-2 border-2 w-full rounded-lg'>Buy again</button>
                </div>
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
