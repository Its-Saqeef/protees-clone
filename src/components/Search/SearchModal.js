"use client"
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

function Modal({setToggleSearch}) {
    const modalref=useRef();

    const closemodal=(e)=>{
        if(modalref.current== e.target){
        }
    }
    
  return (
    <section className="fixed inset-0 z-10 bg-[#e6e6e6]" ref={modalref} onClick={closemodal}>
        <h1 className="text-3xl tracking-widest ml-[50%] translate-x-[-50%] absolute  top-[100px]">SEARCH</h1>
        <div className="w-[90%] md:w-[50%] mx-[50%] translate-x-[-50%] top-72 fixed rounded-md custom-animate flex items-center gap-2">
            <div className={` flex items-center  bg-white w-full  focus:border-black border-2`}>
                <input type="text" placeholder="Search" className="w-full focus:outline-none p-2 md:p-3"/>
                <CiSearch className="text-2xl" />
            </div>
            <IoMdClose className="text-2xl cursor-pointer" onClick={()=>setToggleSearch(false)}/>
        </div>
        
    </section>    
  )
}

export default Modal
