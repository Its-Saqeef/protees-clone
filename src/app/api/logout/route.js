import connectDB from "@/lib/Connection";
import { NextResponse } from "next/server";

export async function GET(req) {
    
    try {
        const response=NextResponse.json({
            message : "Logged Out",
            success: true
        })

        response.cookies.delete("Token")

        return response

    } catch (error) {
        return NextResponse.json({
            messgae : "Error Occured",
            error : error
        })
    }
}