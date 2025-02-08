import connectDB from "@/lib/Connection.js";
import { Product } from "@/components/Backend/models/Product.models";


export async function GET() {
    try {
        await connectDB()
        
        const data=await Product.find({})
        return Response.json({
            message : "Success",
            data : data
        })
    } catch (error) {
        return Response.json({
            message : "Error Fetching Data",
            error : error
        })
    }
}