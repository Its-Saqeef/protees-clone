import connectDB from "@/lib/Connection";
import { Order } from "@/components/Backend/models/Order.models";
import { NextResponse } from "next/server";

export async function GET(params) {
    try {
        await connectDB()

        const orders=await Order.find({}).sort({createdAt : -1})

        return NextResponse.json({
            success : true,
            orders : orders
        })

    } catch (error) {
        return NextResponse.json({
            success : false,
            error : "Error Fetching Orders"
        },{status : 500})

    }
}