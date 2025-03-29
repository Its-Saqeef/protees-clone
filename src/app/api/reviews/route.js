import connectDB from "@/lib/Connection";
import { NextResponse } from "next/server";
import { Reviews } from "@/components/Backend/models/Reviews.models";
import jwt from "jsonwebtoken"

export async function POST(request){
    try {
        await connectDB()

        const body=await request.json()
        const token=request.cookies.get("Token")?.value
        const tokenValue=jwt.verify(token,process.env.TOEKN_SECRET)
        
        
        body.map(async(item)=>{
            if(item.id !=''){
                const product= await Reviews.findOne({productId : item.id, userId : tokenValue.id})
                 if(product){
                    await Reviews.findOneAndUpdate(product._id,{
                        rating : item.stars
                    })
                }else{
                    await Reviews.create({
                        rating : item.stars,
                        productId : item.id,
                        userId : tokenValue.id
                    })
                }
            }
        })

        return NextResponse.json({
            success : true
        })

    } catch (error) {
        return NextResponse.json({
            success : false,
            error : error
        })
    }
}