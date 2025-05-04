import ListProducts from '@/components/Dashboard/ListProducts'
import axios from 'axios'
import React from 'react'

async function getData(){
    const response=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getproducts`).then((res)=>res.data)
    return response
}

async function page() {
    const data = await getData()
  return (
    <ListProducts data={data.data} />
  )
}

export default page
