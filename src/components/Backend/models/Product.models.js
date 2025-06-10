import mongoose,{Schema} from "mongoose";


const productSchema=new Schema({
    name : {
            type : String,
            required : [true,"Name is required"],
            trim : true
        },
        price : {
            type : Number,
            required : [true,"Price is required"]
        },
        sizes: [{
            size : {
                type : String,
                required : true,
                enum : ['SMALL',"MEDIUM","LARGE","XL","XXL"]
            },
            quantity : {
                type : String,
                required : true,
                default : "0"
            }
        }],  
        description : {
            type : String,
            required : [true,"Description is required"]
        },
        category : {
            type : String,
            required : [true,"Category is required"]
        },
        subcategory : {
            type : String,
            required : [true,"Subcategory is required"],
            trim : true
        },
        sale : {
            type : Number,
            min : 0,
            max : 100,
            default : 0
        },
        composition : [String],
        images : [String],
        colors : [String],
        features : [Number],
        isActive : {
            type : Boolean,
            default : true
        },
        embedding : [Number]
},{timestamps : true})

export const Product = mongoose.models.Product || mongoose.model("Product",productSchema)