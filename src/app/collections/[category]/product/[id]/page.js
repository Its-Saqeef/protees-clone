import axios from "axios";
import Product from "@/components/Product";
import { notFound } from "next/navigation";
import { getApiBaseUrl } from "@/lib/apiBaseUrl";

export const dynamic = "force-dynamic";


async function GetData(id) {
  const getData = await axios
    .get(`${getApiBaseUrl()}/api/getproducts/${id}`)
    .then((res) =>res)
  return getData;
}

async function page({ params }) {
  const { id } = await params;
  try {
    const data = await GetData(id)
    const product = data?.data?.data
    if(product?.isActive){
      return <Product data={product} reviews={data.data.reviews || []} />
    }
    notFound()
  } catch (error) {
    if(error.status==404){
      notFound()
    }
  } 
  
}

export default page;
