import connectDB from "@/lib/Connection";
import { NextResponse } from "next/server";
import { Product } from "@/components/Backend/models/Product.models";

export async function GET(request,{params}) {
    try {
        await connectDB()
        const {id}=await params
        
        const result=await Product.findByIdAndDelete(id)
        if(!result){
            return NextResponse.json({
                success : false,
                message : "Product Does not Exist"
            })
        }

        return NextResponse.json({
            success : true
        })
    } catch (error) {
        return NextResponse.json({
            success : false,
            error : "Could Not Delete"
        },{status : 500})
    }
}