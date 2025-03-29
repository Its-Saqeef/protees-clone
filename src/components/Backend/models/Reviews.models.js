import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    rating : {
        type : String,
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})

export const Reviews=mongoose.models.Reviews || mongoose.model("Reviews",reviewSchema)
