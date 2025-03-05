import connectDB from "@/lib/Connection.js";
import { Product } from "@/components/Backend/models/Product.models";

export async function GET(request,{params}) {
    try {
        await connectDB()
        
       const parameters=request.nextUrl.searchParams
       const query=parameters.get("query")
        if(query){
            const data=await Product.find({
                $or : [
                    {
                        name : {$regex: query, $options: 'i' }
                    },
                    {
                        subcategory : {$regex: query, $options: 'i' }
                    },
                ]
            })
            return Response.json({
                message : "Success",
                Success : true,
                data : data
            },{status : 200})
        }


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