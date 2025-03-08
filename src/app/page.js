import axios from "axios";
import Home from "@/components/Home/GetHomeData";
import { toast } from "react-toastify";
const fetcher=async ()=>{
  const response = await axios.get(`/api/getproducts`).then((res)=>res.data.data).catch((err)=>console.log("Request Failed",err.message))
  return response
}

export default async function page() {

  try {
    const data=await fetcher()    
    return (
      <section>      
        <Home data={data} />
      </section>
    );
  } catch (error) {
    toast.error("Error Occured",error)
  }
}
