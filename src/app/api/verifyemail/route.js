import connectDB from "@/lib/Connection";
import { User } from "@/components/Backend/models/Users.models";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(req){

    try {
        await connectDB()
        const {code,email}=await req.json()
        
        
        const user= await User.findOne({
            $and : [
                {email : email},
                {verificationToken : code},
                {tokenExpiry : {$gt : Date.now()}}
            ]
        })
        if(!user){
            return NextResponse.json({
                message : "Invalid Code"
            })
        }

            const response= NextResponse.json({
                message : "Success",
                data : user
            })

            const payload={
                id : user._id,
                email : user.email
            }

            const token=jwt.sign(payload,process.env.TOEKN_SECRET,{expiresIn : "1d"})

            response.cookies.set("Token",token,{
                // httpOnly : true
            })

            user.verificationToken=undefined
            user.tokenExpiry=undefined

            await user.save()

            return response
        

    } catch (error) {
        return NextResponse.json({
            message : "Error"
        },{status : 500})
    }
}