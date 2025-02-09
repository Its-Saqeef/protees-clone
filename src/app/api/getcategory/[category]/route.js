import connectDB from "@/lib/Connection.js";
import { Product } from "@/components/Backend/models/Product.models";
import { NextResponse } from "next/server";

 export const dynamic = 'force-static'
 
export async function GET(request,{params}) {
  try {
    await connectDB();
    const {category}=await params
    
    if (!category) {
      return NextResponse.json(
        {
          message: "No Input Data",
        },
        { status: 400 }
      );
    }
    const eachCategory = await Product.find({subcategory: category })
    if(eachCategory.length==0){
        return NextResponse.json({
            message : "Category Not Found"
        },{status : 404})
    }
    
    return NextResponse.json(
      {
        message: "Success",
        data: eachCategory,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid Category",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
