"use client"
import React,{useEffect, useState,useRef} from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from 'next/link'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function Nav({data}) {

     const dropdownRef = useRef(null);
    const [toggleDropDown,setToggleDropDown]=useState(false)
    const router=useRouter()

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
            if(response.data.success){
                toast.success(response.data.message)
                router.replace("/")
            }            
        } catch (error) {
            toast.error("Error Logging Out")
        }
    }

  return (
    <nav className='bg-gray-100 p-3'>
            <div className='flex justify-between w-[90%] md:w-[60%] mx-auto items-center'>
                <div className='flex gap-6 items-center'>
                    <Link href={"/"}><img src='/SITE_LOGO_1.png' alt='Logo' /></Link>
                    <Link href="/">Shop</Link>
                    <Link href="" className='underline'>Orders</Link>
                </div>
                <div className='relative' ref={dropdownRef}>
                    <div className='flex items-center cursor-pointer hover:bg-white hover:rounded-lg p-2' onClick={()=>setToggleDropDown(!toggleDropDown)}>
                        <p  className='bg-gray-100 rounded-xl p-1'>Profile</p>
                        <MdOutlineKeyboardArrowDown className={`text-xl transition duration-100 ease-in ${toggleDropDown ? "rotate-180 " : "rotate-0"}`}/>
                    </div>
                    {
                        toggleDropDown &&
                    <div className={`bg-white shadow-lg rounded-md py-2 px-3 flex flex-col gap-3 absolute top-10 z-10`}>
                        <div className='flex items-center gap-2 text-sm py-2 border-b-2'>
                            <p className='bg-gray-100 rounded-xl p-1'>NM</p>
                            <div>
                                <p>{data.name}</p>
                                <p>{data.email}</p>
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
  )
}

export default Nav
