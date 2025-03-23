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
            html: `<body>
              <img src="/SITE_LOGO_1.png" alt="photo"/>
              <div className="flex flex-col items-center justify-center">
                <p className="font-bold text-xl">${code}</p>
                <p className="text-base">This code is valid for 15 minutes</p>
                <p className='text-center'>© 2025 Protees.pk</p>
                <a href="https://protees-clone.vercel.app" className="no-underline">Privacy Policy</a>
              </div>
            </body>`, // html body
          }

          const response= await transporter.sendMail(mailOptions)
          return response

           
    } catch (error) {
        console.log("Error Occured",error)
    }
}