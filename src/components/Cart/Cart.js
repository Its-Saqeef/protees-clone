 import React from 'react'
import { IoMdClose } from "react-icons/io";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import Link  from 'next/link'
import { useSelector } from 'react-redux';
import {CldImage} from "next-cloudinary"
import { addToCart,removeFromCart,toggleCart } from '@/app/store/CartSlice';
import { useDispatch } from 'react-redux';


function Cart({setOpenCart}) {
    const dispatch=useDispatch()
    const data=useSelector(state=>state.cart)
    let calculatePrice=0
    data && data.map((item)=>{
        const individual_item=item.price * item.quantity
        calculatePrice=individual_item + calculatePrice
    })
    
  return (
    <section className='w-[100%] h-[100vh] top-0 left-0 fixed z-20 flex'>
        <div className='w-[10%] sm:w-[55%] lg:w-[60%] xl:w-[70%] bg-opacity-50 bg-gray-300 backdrop-blur-sm' onClick={()=>dispatch(toggleCart({toggle: false}))}></div>
      <div className={`w-[100%] sm:w-[55%] md:w-[50%] lg:w-[40%] xl:w-[40%] 2xl:w-[30%] overflow-y-auto bg-white` }>
          <div className='w-[95%] mx-auto' data-aos="fade-up" data-aos-duration="700">
              <div className='flex justify-between items-center border-b-2 py-5'>
                <h2 className='text-2xl xl:text-3xl font-semibold '>CART</h2>
                <IoMdClose className='text-2xl cursor-pointer' onClick={()=>dispatch(toggleCart({toggle: false}))}/>
              </div>
              
              <div className={`h-[70vh] 2xl:h-[75vh] overflow-y-auto`}> 
                <p className={`p-4 text-base lg:text-lg xl:text-xl mt-4 ${data.length > 0 ? "hidden" : ""} `}>Your cart is currently empty.</p>
                {
                 data.map((item,i)=>{
                   return(
                    <div className='flex  my-4 py-4 xl:py-5 border-b-2 gap-1' key={i}>
                      <Link href={`/collections/${item.subcategory}/product/${item.id}`} onClick={()=>dispatch(toggleCart({toggle: false}))}>
                      <CldImage src={item.image[0]} alt='photo' width={150} height={120} /></Link>
                      <div  className='flex flex-col justify-start gap-2 xl:gap-3'>
                        <h4 className='font-medium tracking-wider sm:w-[170px] lg:w-[230px] xl:text-lg w-[120px] xl:w-[270px]'>{item.name}</h4>
                        
                        <p><span className='text-xs'>SIZE</span> : {item.size}</p>
                        <div className='flex gap-[15px] xl:gap-[25px]'>
                          <div className='flex items-center border gap-3 xl:gap-4 self-start'>
                          <LuMinus className='cursor-pointer' onClick={()=>dispatch(removeFromCart({id : item.id,size : item.size}))}/>
                          <p>{item.quantity}</p>
                          <LuPlus className='cursor-pointer' onClick={()=>dispatch(addToCart({id : item.id,size :item.size}))}/>
                          </div>
                          <p className='font-medium text-sm xl:text-lg'>Rs {item.price}.00</p>
                        </div>
                      </div>
                    </div>
                    
                  )
                  })
                }
              </div>
              
              <div className={`flex flex-col justify-center ${data.length==0 ? "hidden" : "block" }`}>
                <div className='flex justify-between pt-3'>
                  <h2 className='tracking-wider'>SUBTOTAL</h2>
                  <p className='font-medium mr-4 text-xl'>Rs {calculatePrice.toLocaleString("en-IN")}.00</p>
                </div>
                <p className='py-3'>Shipping, taxes, and discount codes calculated at checkout.</p>
               <Link href={"/checkout"} onClick={()=>dispatch(toggleCart({toggle: false}))} className='bg-black text-white p-4 tracking-widest w-full rounded-md text-center'>CHECK OUT</Link>
              </div>
            
          </div>
        </div>
    </section>
  )
}

export default Cart