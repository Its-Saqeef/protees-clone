import axios from "axios";
import Product from "@/components/Product";
import { notFound } from "next/navigation";

async function GetData(id) {
  const getData = await axios
    .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getproducts/${id}`)
    .then((res) => res.data.data)

  return getData;
}

async function page({ params }) {
  const { id } = await params;
  try {
    const data = await GetData(id);
    return <Product data={data} />;
  } catch (error) {
    if(error.status==404){
      notFound()
    }
  }
  
}

export default page;
