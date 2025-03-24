"use client"
import Navbar from "@/components/Home/Navbar";
import NavbarDropDowns from "@/components/Home/NavbarDropdowns"
import SliderMessages from "./SliderMessages";
import { usePathname } from "next/navigation";

function AllNavComps() {
  const pathname=usePathname()
  return (
    <section className={`${pathname.startsWith("/account") ? "hidden" : "block"}`}>
        <Navbar />
        <NavbarDropDowns />
        <SliderMessages />
    </section>
  )
}

export default AllNavComps