import nodemailer from "nodemailer"

export const sendEmail=async (email,code)=>{

    try {
        
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
          }
        });

          const mailOptions={
            from: 'proteesclone@gmail.com', // sender address
            to: email, // list of receivers
            subject: `${code} is your login code`, // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          }

          const response= await transporter.sendMail(mailOptions)
          return response

           
    } catch (error) {
        console.log("Error Occured",error)
    }
}