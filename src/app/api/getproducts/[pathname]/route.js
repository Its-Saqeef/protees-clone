import connectDB from "@/lib/Connection.js";
import { Product } from "@/components/Backend/models/Product.models";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
  try {
    await connectDB();
    const {pathname}=await params

    if(!pathname){
      return NextResponse.json({
        message : "No Input Data"
      },
      {
        status: 400
      })
    }
      const data=await Product.findById(pathname)

      return NextResponse.json({
        message : "Success",
        data : data
      },
      {
        status : 200
      })
  } catch (error) {
    return NextResponse.json({
      message : "Error Getting Product",
      error : error
    },
  {
    status : 404
  })
  }
}
