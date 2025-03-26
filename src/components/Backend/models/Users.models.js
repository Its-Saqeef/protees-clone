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
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    }
})


export const User= mongoose.models.User || mongoose.model("User",Users)