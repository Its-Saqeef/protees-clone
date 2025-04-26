import connectDB from "@/lib/Connection.js";
import { Product } from "@/components/Backend/models/Product.models";
import { NextResponse } from "next/server";

export const dynamic="force-static"

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { category } = await params
    const min_price = request.nextUrl.searchParams.get("min_price")
    const max_price = request.nextUrl.searchParams.get("max_price")
    const availability = request.nextUrl.searchParams.get("availability") || 1

    console.log( availability)

    if (!category) {
      return NextResponse.json(
        {
          message: "No Input Data",
          success : false
        },
        { status: 400 }
      );
    }

    if (!max_price && availability==1){
      let filterCriteria = { subcategory: category };

      
        filterCriteria = {
          ...filterCriteria,
          sizes: {
            $elemMatch: {
              quantity: { $gt: 0 }, 
            },
          },
        };
      const eachCategory = await Product.find(filterCriteria)
      if (eachCategory.length == 0) {
        return NextResponse.json({
          message: "Category Not Found",
          success :false
        }, { status: 404 })
      }
      else {
        return NextResponse.json(
          {
            message: "Success",
            data: eachCategory,
            success :true
          },
          { status: 200 }
        )
      }
    }
    else if(!max_price && availability==0){
      let filterCriteria = { subcategory: category };
      
        filterCriteria = {
          ...filterCriteria,
          sizes: {
            $elemMatch: {
              quantity: { $lte: 0 },
            },
          },
        };      

      const eachCategory = await Product.find(filterCriteria);
      return NextResponse.json({
        message: "Success",
        data: eachCategory,
        success :true
      }, { status: 200 });
    }
    else if(max_price && (availability==0 || availability==1)){
      let filterCriteria = { subcategory: category, price: { $gte: min_price, $lte: max_price } };
      if(availability==0){
        filterCriteria = {
          ...filterCriteria,
          sizes: {
            $elemMatch: {
              quantity: { $lte: 0 }, 
            },
          },
        };
      }else{
        filterCriteria = {
          ...filterCriteria,
          sizes: {
            $elemMatch: {
              quantity: { $gt: 0 }, 
            },
          },
        };
      }
      const eachCategory = await Product.find(filterCriteria);
      return NextResponse.json({
        message: "Success",
        data: eachCategory,
        success :true
      }, { status: 200 });
    }
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