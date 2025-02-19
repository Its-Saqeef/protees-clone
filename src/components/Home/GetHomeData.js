"use client"
import ShopByCategory from "@/components/Home/ShopByCategory"
import React,{useEffect} from "react";
import Aos from "aos";
import "aos/dist/aos.css"
import EachCategory from "@/components/Home/EachCategory";


export default function Home({data}) {
  
  useEffect(()=>{
    Aos.init({
          once: false
        })
  },[])
  const beyondActive=data ? data.filter((item)=>item.subcategory=="beyond active") : null
  const graphicTees=data ? data.filter((item)=>item.subcategory=="graphic") : null
  const superTees=data ? data.filter((item)=>item.subcategory==="superheroes") : null
  const basic= data ? data.filter((item)=>item.subcategory==="basic") : null
  const sweatshirts= data ? data.filter((item)=>item.subcategory==="sweatshirt") : null
  
  return (
    <section>      
      <ShopByCategory />
      <EachCategory data={beyondActive} heading={"BEYOND DRY-FIT SHIRTS"}/>
      <EachCategory data={graphicTees} heading={"GRAPHIC T-SHIRTS"} />
      <EachCategory data={superTees} heading={"COTTON SUPERHERO T-SHIRTS"}/>
      <EachCategory data={basic} heading={"BASIC"}/>
      <EachCategory data={sweatshirts} heading={"SWEATSHIRTS"} />
    </section>
  );
}
