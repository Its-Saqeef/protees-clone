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

        if(query && (!max_price && availability==1)){
            const data=await Product.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: query, $options: 'i' } },
                            { subcategory: { $regex: query, $options: 'i' } }
                        ]
                    },
                    {
                        sizes: {
                            $elemMatch: {
                                quantity: { $gt: 0 } 
                            }
                        }
                    }
                ]
            })
            
            return Response.json({
                message : "Success",
                Success : true,
                data : data
            },{status : 200})
        }
        
        else if(query && (!max_price && availability==0)){
            const data=await Product.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: query, $options: 'i' } },
                            { subcategory: { $regex: query, $options: 'i' } }
                        ]
                    },
                    {
                        sizes: {
                            $elemMatch: {
                                quantity: { $lte: 0 }
                            }
                        }
                    }
                ]
            })
            console.log(data)
            return Response.json({
                message : "Success",
                Success : true,
                data : data
            },{status : 200})
        }else if(query && max_price && (availability==0 || availability==1)){
            let data
            if(availability==0){
                data=await Product.find({
                    $and: [
                        {
                            $or: [
                                { name: { $regex: query, $options: 'i' } },
                                { subcategory: { $regex: query, $options: 'i' } }
                            ]
                        },
                        {
                            price : {$gte : min_price, $lte : max_price}
                        },
                        {
                            sizes: {
                                $elemMatch: {
                                    quantity: { $lte: 0 }
                                }
                            }
                        }
                    ]
                })
                return Response.json({
                    message : "Success",
                    data : data
                })
           }
           else{
            data=await Product.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: query, $options: 'i' } },
                            { subcategory: { $regex: query, $options: 'i' } }
                        ]
                    },
                    {
                        price : {$gte : min_price, $lte : max_price}
                    },
                    {
                        sizes: {
                            $elemMatch: {
                                quantity: { $gt: 0 }
                            }
                        }
                    }
                ]
            })
            return Response.json({
                message : "Success",
                data : data
            })
           }
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