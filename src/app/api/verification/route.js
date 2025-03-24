import connectDB from "@/lib/Connection";
import { User } from "@/components/Backend/models/Users.models";
import {sendEmail} from "@/lib/Mailer"
import { Resend } from 'resend';

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

       // const response = await sendEmail(email,code)
       const data=await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: "proteesclone@gmail.com",
        subject: `${code} is your login code`,
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
      })
      console.log(data)

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