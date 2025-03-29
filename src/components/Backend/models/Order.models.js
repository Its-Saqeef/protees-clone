import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    orderNumber : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    shippingAddress : {
        type : String,
        required : true
    },
    postalCode : {
        type : String,
        required : true
    },
    billingName: {
        type : String
    },
    billingPostal : {
        type : String
    },
    billingAddress : {
        type : String,
    },
    paymentMethod : {
        type : String,
    },
    status : {
        type : String,
        enum : ["pending","shipped","delivered"],
        default : "pending"
    },
    phone : {
        type : String,
        required : true
    },
    billingPhone : {
        type : String,
    },
    product : [{
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number
        },
        quantity : {
            type : Number
        },
        size : {
            type : String
        },
        image : {
            type : [String]
        },
        id : {
            type : String
        },
        rating : {
            type : String
        }
    }],
},{timestamps : true})

export const Order=mongoose.models.Order || mongoose.model("Order",orderSchema)