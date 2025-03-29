import axios from "axios";
import Product from "@/components/Product";
import { notFound } from "next/navigation";


async function GetData(id) {
  const getData = await axios
    .get(`http://localhost:3000/api/getproducts/${id}`)
    .then((res) =>res)
  return getData;
}

async function page({ params }) {
  const { id } = await params;
  try {
    const data = await GetData(id)
    return <Product data={data.data.data} reviews={data.data.reviews} />;
  } catch (error) {
    if(error.status==404){
      notFound()
    }
  } 
  
}

export default page;
