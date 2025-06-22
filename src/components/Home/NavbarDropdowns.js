"use client"
import { useEffect,useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";

function Lists() {
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
    const token = Cookies.get('Token');

    if (token) {
      try {
        const decoded = jwtDecode(token); // decode JWT payload
        setIsLoggedIn(true);
        if (decoded.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  }, []);
  return (
    <nav className="w-[85%] lg:w-[70%] xl:w-[55%] 2xl:w-[50%] mx-auto" >
        <div className="hidden md:flex items-center justify-evenly my-[2%]" >
            <div className="group">
              <p className="flex items-center text-base tracking-wider cursor-pointer custom relative">MEN <MdOutlineKeyboardArrowDown className="md:text-base xl:text-2xl ml-[10px]"  /></p>
                  <div className="hidden group-hover:flex shadow-lg py-10 absolute left-0 w-full bg-white z-10 mt-[5px]">
                    <div className="lg:w-[40%] mx-auto flex gap-14 items-start">
                      <div className=" md:text-sm lg:text-base flex flex-col">
                        <Link href={""} className="p-1 text-xs lg:text-sm">FOUR SEASON</Link>
                        <Link href={"/collections/sweatshirt"} className="p-1">SWEATSHIRTS</Link>
                        <Link href={"/collections/basic"} className="p-1">BASIC</Link>
                        <Link href={"/collections/oversized"} className="p-1">OVERSIZED TEES</Link>
                        <Link href={"/collections/beyond active"} className="p-1">BEYOND ACTIVE</Link>
                        <Link href={"/collections/graphic"} className="p-1">GRAPHIC TEES</Link>
                        <Link href={"/collections/superheroes"} className="p-1">SUPER TEES</Link>
                        <Link href={"/collections/dtf-tees"} className="p-1">DTF TEES</Link>
                      </div>
                        <div className="md:text-sm lg:text-base flex flex-col">
                            <Link href={""}  className="p-1 text-xs lg:text-sm ">WINTER</Link>
                            <Link href={""} className="p-1">PUFFER JACKETS</Link>
                            <Link href={""} className="p-1">SUPER SWEATSHIRTS</Link>
                            <Link href={""} className="p-1">SUPER HOODIES</Link>
                        </div>
                    </div>
                  </div>
             </div>
            <div className="group  text-base flex items-center tracking-wider cursor-pointer custom relative">WOMEN <MdOutlineKeyboardArrowDown className="ml-[10px] md:text-base xl:text-2xl"/>
                <div className="hidden shadow-lg group-hover:flex bg-[#ffffff] mt-[25px] top-1 left-[-15px] min-h-[375px] w-[25vw] lg:w-[16vw] xl:w-[12vw] px-2 py-2 absolute z-10">
                <div className="py-1 mt-5 md:text-sm lg:text-base flex flex-col">
                  <Link href={""} className="p-1 ">CROP TEES AND TOPS</Link>
                  <Link href={""} className="p-1 ">YEARLY TEES</Link>
                  <Link href={""} className="p-1 ">FULL SLEEVES</Link>
                  <Link href={""} className="p-1 ">SUPER HODDIES</Link>
                  <Link href={""} className="p-1 ">SUPER CAPS</Link>
                </div>
                </div>
             </div>
            <Link href={""} className="text-base  cursor-pointer tracking-wider custom relative">PROTEES JUNIOR</Link>
            <Link href={""} className="text-base  cursor-pointer tracking-wider custom relative">CLEARANCE SALE</Link>
            <Link href={""} className="text-base  cursor-pointer tracking-wider custom relative">SPECIAL OFFER</Link>
            {isLoggedIn && isAdmin && <Link href="/dashboard/allorders" className="p-2 rounded bg-[#c10000] text-white">Dashboard</Link>}
        </div>
        
    </nav>
  )
}

export default Lists