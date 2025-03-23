import connectDB from "@/lib/Connection";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        await connectDB()
        const token=request.cookies.get("Token")?.value || ""
        const decodedToken = jwt.verify(token,process.env.TOEKN_SECRET)

        NextResponse.json({
            
        })
        
    } catch (error) {
        return NextResponse.json({
            message : "Error Occured",
            success : false
        })
    }
}