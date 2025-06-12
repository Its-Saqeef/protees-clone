import connectDB from "@/lib/Connection";
import { Reviews } from "@/components/Backend/models/Reviews.models";
import { Product } from "@/components/Backend/models/Product.models";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(request) {
    try {
        await connectDB()

        const body=await request.json()

        const token=request.cookies.get("Token")?.value

        const decodedValue =jwt.decode(token,process.env.TOEKN_SECRET)
        const result=await Promise.all(
            body.map(async(item)=>{
           return await Reviews.find({productId : item.id,userId :decodedValue.id})
        })
        )
        
        return NextResponse.json({
            success : true,
            reviews : result
        })
    } catch (error) {
        return NextResponse.json({
            success : false,
            error : "Something went wrong"
        },{status : 500})
    }
}