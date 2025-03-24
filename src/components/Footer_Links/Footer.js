"use client"
import React, { useState } from 'react'
import { RxEnvelopeClosed } from "react-icons/rx";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Footer() {
    const [email,setEmail]=useState();
    const pathname=usePathname()
    
  return (
    <footer className={`lg:w-[90%] lg:mx-auto  border-t-[2px] text-sm text-gray-800 ${pathname.startsWith("/account") || pathname.startsWith('/login') ? "hidden" : "block"}`}>
        <div className='flex flex-col md:flex-row justify-around p-8 mt-5'>
            <div className='flex flex-col gap-[10px] border-b-2 md:border-0 md:w-1/3 xl:w-auto'>
                <h1 className='font-bold text-xl'>CONTACT US</h1>
                <Image  src="/SITE_LOGO_1.png" alt='photo' width={300} height={300} style={{height : "auto" , width : "auto"}}/>
                <p className='text-sm  font-bold'>PROTEES HEAD OFFICE,NAWAB TOWN RAIWIND ROAD LAHORE</p>
                <p>0321-6331227</p>
                <p>Info@protees.pk</p>
            </div>
            <div className='border-b-2 md:border-0 mt-2 md:mt-0 md:w-1/3 md:text-center xl:w-auto'>
                <div className='leading-9 flex flex-col' onClick={()=> window.scrollTo(0,0)}>
                 <Link href='/pages/size'>SIZE CHART</Link>
                 <Link href='/pages/guarantee'>GUARANTEE</Link>
                 <Link href='/pages/privacy-policy'>PRIVACY POLICY</Link>
                 <Link href='/pages/return-exchange'>RETURN & EXCHANGE</Link>
                 <Link href='/pages/refund-policy'>REFUND POLICY</Link>
                 <Link href='/pages/terms-of-service'>TERMS OF SERVICE</Link>
                 <Link href='/pages/shipping-policy'>SHIPPING POLICY</Link>
                </div>
            </div>
            <div className='flex flex-col items-start gap-[20px] lg:gap-[40px] mt-2 md:mt-0 md:w-1/3 xl:w-auto'>
                <h1 className='font-bold text-xl'>SIGN UP AND SAVE</h1>
                <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                <div className='flex items-center border-b-2 border-black focus:border-2 '>
                    <input className='p-2 focus:outline-none' type='email' placeholder='Enter your email' onChange={(e)=> setEmail(e.target.value)}/><RxEnvelopeClosed />
                </div>
                <div className='flex gap-2 text-2xl'>
                   <Link target='blank' href='https://www.instagram.com/_protees.pk/?hl=en'> <FaInstagram /></Link>
                    <Link target='blank' href='https://www.facebook.com/Protees.pk'><FaFacebook /></Link>
                    <Link target='blank' href='https://www.youtube.com/@proteesprivatelimited1827'><FaYoutube /></Link>
                </div>
            </div>
        </div>    
        <p className='text-center'>© 2025 Protees.pk</p>
    </footer>
  )
}

export default Footer