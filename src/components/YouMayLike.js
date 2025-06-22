import axios from 'axios';
import React, { useState } from 'react'
import useSWR from "swr";
import Link from 'next/link';
import {CldImage} from "next-cloudinary"
import colorName from "color-name";

function YouMayLike({params}) {
    const [decodedCategory,setCategory]=useState(params.category ?  decodeURIComponent(params.category) : "")
    const [selectedColors, setSelectedColors] = useState({});
    const {data,error}=useSWR("Related Products",async ()=>{
        const response=await axios.get(`/api/getcategory/${decodedCategory}`).then((res)=>res.data.data)
        return response
    })

    function nameToHex(name) {
        const rgb = colorName[name.toLowerCase()];
        return (
          rgb && "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("")
        );
      }
    
  return (
    <section className='my-5 md:mt-20'>
        <h1 className={`w-max mx-auto text-xl md:text-2xl lg:text-3xl my-[20px] text-gray-800 tracking-wider text-center ${data && data.length > 1 ? "" : "hidden"}`}>YOU MAY ALSO LIKE</h1>
        <div className='md:grid md:grid-cols-4 mt-[30px] flex overflow-x-scroll md:overflow-hidden'>
        {
            data && data.map((item)=>{
              const selectedColor = selectedColors[item._id];
              const selectedImage = selectedColor && item.colorImages[selectedColor];
              const defaultImage = !item.images.length > 0 && Object.values(item && item.colorImages)[0];
                 if(item._id!=params.id)
                return (
                    <main  key={item._id}>
                      <Link href={`/collections/${item.subcategory}/product/${item._id}`}>
                    <div  className='relative my-[10px] w-44 md:w-auto p-2' data-aos="fade-left">
                        <p className={item.sale ? "text-white bg-red-600 inline p-[3px] md:px-2 md:py-1 absolute right-2 rounded-sm" : 'hidden' }>sale</p>
                        <div className='flex flex-col justify-center items-center'>
                          {

                          }
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
                    {item.colors.length > 0 && (
                    <div className="flex justify-center gap-2 mt-2">
                        {item.colors.map((color, i) => (
                        <button
                            key={i}
                            onClick={() =>
                            setSelectedColors((prev) => ({ ...prev, [item._id]: color }))
                            }
                            className="p-[5px] w-1 h-1 rounded-xl border-gray-400 focus:border-black border-2"
                            style={{ backgroundColor: nameToHex(color) }}
                        ></button>
                        ))}
                    </div>
                    )}
                    </main>
                )            
        })
        }
        </div>
    </section>  
  )
}

export default YouMayLike