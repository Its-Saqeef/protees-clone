"use client"
import axios from 'axios'
import Link from 'next/link'
import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import Cookies from "js-cookie";
import { redirect, RedirectType } from 'next/navigation'


function page() {
    
    const [email,setEmail]=useState("")
    const [toggleLogin,setToggleLogin]=useState(false)
    const [code,setCode]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState()
    const [token,setToken]=useState()
    useEffect(()=>{
        toggleLogin ? document.title="Enter Code - Protees.pk" :document.title="Login - Protees.pk"
    },[toggleLogin])

    const handleEmail=async(e)=>{
        e.preventDefault()
        if(email){
        setIsLoading(true)
        const response = await axios.post(`/api/verification`,JSON.stringify(email)).then((res)=>res)
        
        if(response.data.message=="Success"){
            setIsLoading(false)
            setToggleLogin(true)
        }else if(response.data.success == false){
            setError(response.data.message)
            setIsLoading(false)
        }
    }
    }

    const handleVerification=async(e)=>{
        e.preventDefault()
        if(code){
            setIsLoading(true)            
            const response=await axios.post("/api/verifyemail",JSON.stringify({code,email}),{withCredentials : true}).then((res)=>res)
            if(response.data.message=="Success"){
                toast.success("Verified")
                setToken(Cookies.get("Token"))
                setIsLoading(false)
                redirect("/account/orders")
            }else{
                setIsLoading(false)
                toast.error("Incorrect Code")                
            }
            
        }
    }
    
  return (
    <main className='inset-0 absolute bg-white flex'>
        <div className='bg-gray-100 self-center border-2 mx-auto w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[27%] rounded-md py-4'>
            <Link href="/"><img src='/SITE_LOGO_1.png' alt='Logo' className='mx-auto my-7'/></Link>
            {
                toggleLogin ? (<form className='w-[90%] flex flex-col mx-auto '>
                        <label className='font-semibold text-xl pb-2'>Enter Code</label>
                        <p className='text-gray-500 pb-2'>Sent to {email}</p>
                        <input type='text' placeholder='6-Digit Code' value={code} className='p-2 rounded-md placeholder-gray-800 border-2 bg-gray-100' onChange={(e)=>setCode(e.target.value)}/>
                        <button className='bg-[#c10000] hover:bg-red-800 p-3 my-4 rounded-lg text-white text-lg font-semibold' disabled={isLoading} onClick={handleVerification}>{isLoading ? (
              <div className="loader mx-auto"></div>
            ) : (
              "Submit"
            )}</button>
                        <p className='text-gray-500 pb-2 cursor-pointer my-2' onClick={()=>[setToggleLogin(false),setEmail(""),setCode("")]}>Login with a different email</p>
                </form>) : (
                    <form className='w-[90%] flex flex-col mx-auto '>
                        <label className='font-semibold text-xl pb-2'>Login</label>
                        <p className='text-gray-500 pb-2'>Enter your email and we'll send you a login code</p>
                        <input type='email' required placeholder='Email' value={email} className='p-2 bg-gray-100 placeholder-gray-800 border-2 rounded-md' onChange={(e)=>setEmail(e.target.value)}/>
                        <button className='bg-[#c10000] hover:bg-red-800 p-3 my-4 rounded-lg text-white text-lg font-semibold' disabled={isLoading} onClick={handleEmail}>{isLoading ? (
              <div className="loader mx-auto"></div>
            ) : (
              "Continue"
            )}</button>
            {
                error ? <p>{error}</p> : ""
            }
            </form>
                )
            }
            
            <Link href="/pages/privacy-policy" className='underline w-max ml-6'>Privacy</Link>
        </div>
    </main>
  )
}

export default page
