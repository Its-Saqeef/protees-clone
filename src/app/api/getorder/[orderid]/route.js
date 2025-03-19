import connectDB from "@/lib/Connection";
import { Order } from "@/components/Backend/models/Order.models";

export async function GET(req,{params}){
    try {
        await connectDB()
        const {orderid}=await params
       
        const orders=await Order.findOne({orderNumber : orderid})
        

        return Response.json({
            message : "Success",
            order : orders
        })

    } catch (error) {
        return Response.json({
            message : "Fetching Failed"
        })
    }
}