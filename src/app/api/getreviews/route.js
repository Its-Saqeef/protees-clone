import connectDB from "@/lib/Connection";
import { Reviews } from "@/components/Backend/models/Reviews.models";
import { User } from "@/components/Backend/models/Users.models";
import { Product } from "@/components/Backend/models/Product.models";
import { NextResponse } from "next/server";


export async function GET(request){
    try {
       await connectDB()

        const reviews= await Reviews.find({}).populate("userId","name").populate("productId","name images").sort({createdAt : -1}).limit(15)
         const totalReviews= await Reviews.find({})
        
         const length=totalReviews.length
         const allRating=totalReviews.reduce((sum,rev)=>sum + rev.rating,0)
        
        
        return NextResponse.json({
            success : true,
            data : reviews,
            totalreviews : length,
            totalrating : allRating
        },{status : 200})

    } catch (error) {
        console.error("Error : ",error)
        return NextResponse.json({
            success :false,
            error : "Something Went Wrong"
        },{status : 500})
    }

}