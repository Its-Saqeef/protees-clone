import connectDB from "@/lib/Connection";
import { Product } from "@/components/Backend/models/Product.models";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const data = {};

    // Convert FormData to a plain object
    for (const [key, value] of formData.entries()) {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }
    if (typeof data.sizes === "string") {
        try {
            data.sizes = JSON.parse(data.sizes);
        } catch (err) {
            console.error("Invalid JSON in sizes field", err)
        }
    }
     data.composition = data.composition.split(",")

    console.log("Received FormData:", data);

    const result = await Product.findOneAndUpdate({ _id: data.id }, data, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Product Updated",
    });

  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something Went Wrong",
      },
      { status: 500 }
    );
  }
}
