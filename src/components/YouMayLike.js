import axios from 'axios';
import React, { useState } from 'react'
import useSWR from "swr";
import Link from 'next/link';
import {CldImage} from "next-cloudinary"
function YouMayLike({params}) {
    const [decodedCategory,setCategory]=useState(params.category ?  decodeURIComponent(params.category) : "")
    const {data,error}=useSWR("Related Products",async ()=>{
        const response=await axios.get(`/api/getcategory/${decodedCategory}`).then((res)=>res.data.data)
        return response
    })
    console.log();
    
  return (
    <section className='my-5 md:mt-20'>
        <h1 className='w-max mx-auto text-xl md:text-2xl lg:text-3xl my-[20px] text-gray-800 tracking-wider text-center'>YOU MAY ALSO LIKE</h1>
        <div className='md:grid md:grid-cols-4 mt-[30px] flex overflow-x-scroll md:overflow-hidden'>
        {
            data && data.map((item)=>{
                 if(item._id!=params.id)
                return (
                    <Link href={`/collections/${item.subcategory}/product/${item._id}`} key={item._id}>
                    <div  className='relative my-[10px] w-44 md:w-auto p-2' data-aos="fade-left">
                        <p className={item.sale ? "text-white bg-red-600 inline p-[3px] md:px-2 md:py-1 absolute right-2 rounded-sm" : 'hidden' }>sale</p>
                        <div className='flex flex-col justify-center items-center'>
                        <CldImage width="600" height="600" src={item.images[0]} alt='Photo'/>
                        <h3 className='text-xs sm:text-sm md:text-base  mb-[10px] text-center tracking-wider text-gray-800'>{item.name}</h3>
                        </div>
                        <div className='w-[95%] flex gap-2 justify-around mx-auto text-xs sm:text-sm text-gray-700 flex-wrap'>
                  <p className={`${item.sale ? 'block line-through' : "hidden"} `}>Rs.{((Math.floor((item.sale/100)*item.price))+ item.price).toLocaleString("en-IN")}.00</p>
                  <p className="">Rs.{(item.price).toLocaleString("en-IN")}.00</p>
                  <h3 className={`text-red-500 ${!item.sale ? 'hidden': 'block'} `}>save {item.sale}%</h3>
                </div>   
                    </div>
                    </Link>
                )            
        })
        }
        </div>
    </section>  
  )
}

export default YouMayLike