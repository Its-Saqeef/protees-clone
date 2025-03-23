import mongoose from "mongoose";

const Users=new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    verificationToken : {
        type : String
    },
    tokenExpiry : {
        type : Date,
    }
})


export const User= mongoose.models.User || mongoose.model("User",Users)