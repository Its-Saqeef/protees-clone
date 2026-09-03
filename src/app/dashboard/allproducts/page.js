import ListProducts from '@/components/Dashboard/ListProducts'
import axios from 'axios'
import React from 'react'
import { getApiBaseUrl } from "@/lib/apiBaseUrl"

async function getData(){
    const response=await axios.get(`${getApiBaseUrl()}/api/getproducts`).then((res)=>res.data)
    return response
}

async function page() {
    const data = await getData()
  return (
    <ListProducts data={data.data} />
  )
}

export default page
