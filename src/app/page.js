"use client"
import ShopByCategory from "@/components/Home/ShopByCategory"
import React,{useEffect} from "react";
import Aos from "aos";
import "aos/dist/aos.css"
import useSWR from "swr";
import { toast } from "react-toastify";
import axios from "axios";
import EachCategory from "@/components/Home/EachCategory";

const fetcher=async ()=>{
  const response = await axios.get("/api/getproducts").then((res)=>res.data.data).catch((err)=>console.log("Request Failed",err.message))
  return response
}

export default function Home() {
  
  const {data,error}=useSWR("Get Data",fetcher)
  
  if(error){
    return toast.error(error)    
  }

  const beyondActive=data ? data.filter((item)=>item.subcategory=="beyond active") : null
  const graphicTees=data ? data.filter((item)=>item.subcategory=="graphic") : null
  const superTees=data ? data.filter((item)=>item.subcategory==="superheroes") : null
  const basic= data ? data.filter((item)=>item.subcategory==="basic") : null
  const sweatshirts= data ? data.filter((item)=>item.subcategory==="sweatshirt") : null
  useEffect(()=>{
    Aos.init({
          once: false
        })
  },[])
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
