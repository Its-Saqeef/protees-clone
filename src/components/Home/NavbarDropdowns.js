import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";


function Lists() {
    
  return (
    <nav className="w-[85%] lg:w-[70%] xl:w-[55%] 2xl:w-[50%] mx-auto">
        <ul className="hidden md:flex items-center justify-evenly my-[2%]">
            <div className="group">
              <li className="flex items-center text-base tracking-wider cursor-pointer custom relative">MEN <MdOutlineKeyboardArrowDown className="md:text-base xl:text-2xl ml-[10px]"  /></li>
                  <div className="hidden group-hover:flex shadow-lg py-10 absolute left-0 w-full bg-white z-10 mt-1">
                    <div className="lg:w-[40%] mx-auto flex gap-14 items-start">
                      <ul className=" md:text-sm lg:text-base">
                        <Link href={""}><li className="p-1 text-xs lg:text-sm">FOUR SEASON</li></Link>
                        <Link href={"/collections/sweatshirt"}><li className="p-1">SWEATSHIRTS</li></Link>
                        <Link href={"/collections/basic"}><li className="p-1" >BASIC</li></Link>
                        <Link href={""}><li className="p-1">OVERSIZED TEES</li></Link>
                        <Link href={"/collections/beyond active"}><li className="p-1" >BEYOND ACTIVE</li></Link>
                        <Link href={"/collections/graphic"}><li className="p-1">GRAPHIC TEES</li></Link>
                        <Link href={"/collections/superheroes"}><li className="p-1">SUPER TEES</li></Link>
                      </ul>
                        <ul className="md:text-sm lg:text-base">
                            <Link href={""}><li className="p-1 text-xs lg:text-sm ">WINTER</li></Link>
                            <Link href={""}><li className="p-1">PUFFER JACKETS</li></Link>
                            <Link href={""}><li className="p-1">SUPER SWEATSHIRTS</li></Link>
                            <Link href={""}><li className="p-1">SUPER HOODIES</li></Link>
                        </ul>
                    </div>
                  </div>
             </div>
            <li className="group  text-base flex items-center tracking-wider cursor-pointer custom relative">WOMEN <MdOutlineKeyboardArrowDown className="ml-[10px] md:text-base xl:text-2xl"/>
                <div className="hidden shadow-lg group-hover:flex bg-[#ffffff] mt-[25px] top-1 left-[-15px] min-h-[375px] w-[25vw] lg:w-[16vw] xl:w-[12vw] px-2 py-2 absolute z-10">
                <ul className="py-1 mt-5 md:text-sm lg:text-base">
                  <Link href={""}><li className="p-1 ">CROP TEES AND TOPS</li></Link>
                  <Link href={""}><li className="p-1 " >YEARLY TEES</li></Link>
                  <Link href={""}> <li className="p-1 ">FULL SLEEVES</li></Link>
                  <Link href={""}><li className="p-1 ">SUPER HODDIES</li></Link>
                  <Link href={""}><li className="p-1">SUPER CAPS</li></Link>
                </ul>
                </div>
             </li>
            <li className="text-base  cursor-pointer tracking-wider custom relative">PROTEES JUNIOR</li>
            <li className="text-base  cursor-pointer tracking-wider custom relative">CLEARANCE SALE</li>
            <li className="text-base  cursor-pointer tracking-wider custom relative">SPECIAL OFFER</li>
        </ul>
        
    </nav>
  )
}

export default Lists