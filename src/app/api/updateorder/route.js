import connectDB from "@/lib/Connection";
import { NextResponse } from "next/server";
import { Order } from "@/components/Backend/models/Order.models";

export async function POST(request) {
    try {
        await connectDB()

        const body = await request.json()
        console.log(body)
        await Order.findOneAndUpdate({orderNumber : body.orderNumber},{status : body.status})

        return NextResponse.json({
            success : true,
            message : "Status Updated"
        })
    } catch (error) {
        return NextResponse.json({
            success : false
        })
    }
}