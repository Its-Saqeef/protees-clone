import connectDB from "@/lib/Connection";
import { User } from "@/components/Backend/models/Users.models";
import {sendEmail} from "@/lib/Mailer"

export async function POST(req) {
    try {
        await connectDB()

        const email =await req.json()
        const user= await User.findOne({email : email})

        if(!user){
            return Response.json({
                message : "Email Does not Exist",
                success : false
            })
        }

        const code= Math.ceil(100000 + Math.random() * 900000)

        await User.findOneAndUpdate({email : email},{
            verificationToken : code,
            tokenExpiry : Date.now() + 900000
        })

        const response = await sendEmail(email,code)
       

        return Response.json({
            message : "Success"
        })
    } catch (error) {
        return Response.json({
            message : "Verification Failed",
            error : error
        },{status : 400})
    }
}