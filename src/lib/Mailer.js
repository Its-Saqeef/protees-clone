import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail=async (email,code)=>{
  
    try {
      
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: `${code} is your login code`,
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
      })
    } catch (error) {
        console.log("Error Occured",error)
    }
}