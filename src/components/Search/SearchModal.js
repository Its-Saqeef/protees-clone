"use client"
import { useEffect, useRef,useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Link from "next/link"
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

function Modal({setToggleSearch}) {
    const modalref=useRef();
    const [searchInput,setSearchInput]=useState("")
    const [data,setData]=useState()
    const router=useRouter()

    const closemodal=(e)=>{
        if(modalref.current== e.target){
        }
    }

    const keyhandler=async(e)=>{
      if(e.key=="Enter"){
        if(searchInput.length > 0){
          router.push(`/search?query=${searchInput}`)
          setToggleSearch(false)
        }
      }      
    }

    useEffect(()=>{
        const timer=setTimeout(async()=>{
            const data =await axios.get(`/api/getproducts/?query=${searchInput.toLowerCase()}`).then((res)=>res.data.data)
            setData(data)
        },1400)

        return ()=>clearTimeout(timer)
    },[searchInput])
    
  return (
    <section className="fixed inset-0 z-10 bg-[#e6e6e6]" ref={modalref} onClick={closemodal}>
        <h1 className="text-3xl tracking-widest ml-[50%] translate-x-[-50%] absolute  top-[100px]">SEARCH</h1>
        <div className="w-[90%] md:w-[50%] mx-[50%] translate-x-[-50%] top-72 fixed rounded-md custom-animate flex items-center gap-2">
            <div className={` flex items-center  bg-white w-full  focus:border-black border-2`}>
                <input type="text" placeholder="Search" className="w-full focus:outline-none p-2 md:p-3" onKeyDown={keyhandler} onChange={(e)=>setSearchInput(e.target.value)}/>
                <CiSearch className="text-2xl cursor-pointer" onClick={()=>[searchInput.length > 0 ? (router.push(`/search?query=${searchInput}`),setToggleSearch(false)) : null]}/>
            </div>
            <IoMdClose className="text-2xl cursor-pointer" onClick={()=>setToggleSearch(false)}/>
            {
                searchInput &&
                <div className={`${'border-2 max-h-[450px] overflow-y-scroll lg:overflow-none w-full absolute top-11 bg-white z-10 ' }`} >
                {
                    data && data.length > 0 ? (
                <div className='flex flex-col lg:flex-row max-w-[95%] mx-auto gap-4'> 
                  <div className='w-full lg:w-[40%]'>
                    <h1 className='text-xl p-2 my-3 border-b-2'>SUGGESTIONS</h1>
                    {data.map((item)=>{
                          return(
                         <div key={item._id}>
                         <Link href={`/collections/${item.subcategory}/product/${item._id}`}><p className='py-2 hover:bg-gray-300' onClick={()=>[setSearchInput(''),setToggleSearch(false)]}>{item.name}</p></Link>
                         </div>
                           )           
                        }).slice(0,3)
                      }
                    
                    <h1 className='text-xl p-2 my-3 border-b-2'>COLLECTIONS</h1>
                    {data.map((item)=>{
                          return(
                         <div key={item._id}>
                         <Link href={`/collections/${item.subcategory}`}><p className='py-2 text-xl hover:bg-gray-300 font-semibold uppercase' onClick={()=>[setSearchInput(''),setToggleSearch(false)]}>{item.subcategory}</p></Link>
                         </div>
                           )           
                        }).slice(0,1)
                      }
                  </div>
                  <div className='w-full  lg:ml-5 '>
                    <h1 className='text-xl p-2 my-3 border-b-2'>PRODUCTS</h1>
                    {data.map((item)=>{
                      return(
                        <Link href={`/collections/${item.subcategory}/product/${item._id}`} key={item._id}>
                          <div className='flex gap-4 items-center h-[150px] w-[100%] hover:bg-gray-300' onClick={()=>[setSearchInput(''),setToggleSearch(false)]}>
                          <CldImage src={item.images[0]} width={150} height={150} className='h-[90%] ml-2' alt="Image"/>
                           <p>{item.name}</p>
                          </div>
                     </Link>
                       )           
                    }).slice(0,3)
                    }
                  </div>
                </div>
                    ) : <p className="text-sm font-semibold p-4">Search For "{searchInput}"</p>
                }
          
          </div>
            }
            <Link href={"/search"} className="absolute top-20 underline left-[50%] translate-x-[-50%]" onClick={()=>setToggleSearch(false)}>Search by Image</Link>
        </div>
        
    </section>    
  )
}

export default Modal
