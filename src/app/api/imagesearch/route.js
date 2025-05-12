import connectDB from "@/lib/Connection";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB()
        const body=await request.formData()
        const image=body.get("image")
        
        if (!image) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

        return NextResponse.json({
            success : true
        })
    } catch (error) {
         return NextResponse.json({
            success : false
        })
    }
}