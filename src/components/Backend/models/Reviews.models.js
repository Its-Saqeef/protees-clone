import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    rating : {
        type : Number,
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
