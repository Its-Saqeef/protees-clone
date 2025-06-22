import connectDB from "@/lib/Connection.js";
import { Product } from "@/components/Backend/models/Product.models";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { category } =await params;
    const min_price = request.nextUrl.searchParams.get("min_price");
    const max_price = request.nextUrl.searchParams.get("max_price");
    const availability = parseInt(request.nextUrl.searchParams.get("availability") || "1");

    if (!category) {
      return NextResponse.json(
        { message: "No Input Data", success: false },
        { status: 400 }
      );
    }

    let filterCriteria = { subcategory: category };

    // Add price filter if applicable
    if (max_price) {
      filterCriteria.price = {
        $gte: parseFloat(min_price || 0),
        $lte: parseFloat(max_price),
      };
    }

    // Add availability filter
    if (availability === 0) {
      filterCriteria.sizes = {
        $elemMatch: { quantity: { $lte: 0 } },
      };
    } else if (availability === 1 && category !=="dtf-tees") {
      filterCriteria.sizes = {
        $elemMatch: { quantity: { $gt: 0 } },
      };
    }else if(availability === 1){
      filterCriteria.colorSizeQuantities = {
        $elemMatch : {
          $or : [
          { "sizes.SMALL": { $gt: 0 } },
          { "sizes.MEDIUM": { $gt: 0 } },
          { "sizes.LARGE": { $gt: 0 } },
          { "sizes.XL": { $gt: 0 } },
          { "sizes.XXL": { $gt: 0 } },
          ]
        }
      }
    }

    
    const eachCategory = await Product.find(filterCriteria);

    if (eachCategory.length === 0 && !max_price) {
      return NextResponse.json(
        { message: "Category Not Found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Success", data: eachCategory, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid Category", error, success: false },
      { status: 500 }
    );
  }
}
