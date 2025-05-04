import axios from "axios";
import Product from "@/components/Product";
import { notFound } from "next/navigation";


async function GetData(id) {
  const getData = await axios
    .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getproducts/${id}`)
    .then((res) =>res)
  return getData;
}

async function page({ params }) {
  const { id } = await params;
  try {
    const data = await GetData(id)
    if(data.data.data.isActive){
      return <Product data={data.data.data} reviews={data.data.reviews} />
    }
  } catch (error) {
    if(error.status==404){
      notFound()
    }
  } 
  
}

export default page;
