import connectDB from "@/lib/Connection";
import { Order } from "@/components/Backend/models/Order.models";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(request,{params}){
    try {
       await connectDB()

        const token=request.cookies.get("Token")?.value
        const isVerified = jwt.verify(token,process.env.TOEKN_SECRET)
        
        

        
        if(isVerified){
            const {email}=isVerified
            const orders= await Order.find({email : email})
            return NextResponse.json({
                message : "Data Found",
                success : true,
                data : orders
            }
        )
        }else{
            return NextResponse.redirect(new URL('/login', request.url))
        }
        
       
        
    } catch (error) {
        return NextResponse.json({
            message : "Error",
            success : false
        },{status : 500})
    }
}