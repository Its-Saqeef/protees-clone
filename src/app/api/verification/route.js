import connectDB from "@/lib/Connection";
import { User } from "@/components/Backend/models/Users.models";
import { Resend } from 'resend';
import VerificationCodeEmail from "@/lib/Email-Service/VerificationTemplate";

const resend = new Resend(process.env.RESEND_API_KEY)

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

        const data =await resend.emails.send({
            from: 'Protees-clone <email@portfoliosite.store>',
            to: email,
            subject: `${code} is your login code`,
           react : VerificationCodeEmail({
                name : user.name,
                verificationCode : code
           })
        })
        
        
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