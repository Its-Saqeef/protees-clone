import ListProducts from '@/components/Dashboard/ListProducts'
import axios from 'axios'
import React from 'react'
import { getApiBaseUrl } from "@/lib/apiBaseUrl"

export const dynamic = "force-dynamic";

async function getData(){
    try {
        const response=await axios.get(`${getApiBaseUrl()}/api/getproducts`).then((res)=>res.data)
        return response
    } catch (error) {
        console.error("Failed to fetch products:", error.message)
        return { data: [] }
    }
}

async function page() {
    const data = await getData()
  return (
    <ListProducts data={data.data} />
  )
}

export default page
