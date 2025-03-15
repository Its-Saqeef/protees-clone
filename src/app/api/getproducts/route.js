import connectDB from "@/lib/Connection.js";
import { Product } from "@/components/Backend/models/Product.models";

export async function GET(request,{params}) {
    try {
        await connectDB()
        
       const parameters=request.nextUrl.searchParams
       const query=parameters.get("query")
       const min_price =parameters.get("min_price")
       const max_price=parameters.get("max_price")
       const availability=parameters.get("availability") || 1

    const page = parseInt(parameters.get("page")) || 1;
    const limit = parseInt(parameters.get("limit")) || 10;
    const skip = (page - 1) * limit;


       let searchQuery = {};

       if (query) {
           searchQuery.$or = [
               { name: { $regex: query, $options: 'i' } },
               { subcategory: { $regex: query, $options: 'i' } }
           ];
       }

       if (min_price && max_price) {
           searchQuery.price = { $gte: min_price, $lte: max_price };
       }

       if (availability == 1) {
           searchQuery.sizes = { $elemMatch: { quantity: { $gt: 0 } } };
       } else if (availability == 0) {
           searchQuery.sizes = { $elemMatch: { quantity: { $lte: 0 } } };
       }

       if(Object.keys(searchQuery).length>0){
        const data = await Product.find(searchQuery).limit(limit).skip(skip)

        const totalCount=await Product.countDocuments(searchQuery)
        const totalPages=Math.ceil(totalCount/limit)

        return Response.json({
            message : "Success",
            data : data,
            pagination : {
                totalItems : totalCount,
                totalPages,
                currentPage : page,
                itemsPerPage : limit
            }
        })
       }
       // Fetch paginated data
       

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