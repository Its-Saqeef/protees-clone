import { redirect } from 'next/navigation'

import { stripe } from '@/lib/Stripe/stripe'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const orderId =`Order-${Math.floor(10000 + Math.random() * 900000)}`
    const data =await resend.emails.send({
        from: 'Protees-clone <email@portfoliosite.store>',
        to: customerEmail,
        subject: `${orderId} is your Order Id`,
        html: `<div>
        <p>Thank You for Shopping</p>
        <p>Your order will be delivered in 5-7 working days</p>
        </div>`
    })
    return (
      <section id="success" className='bg-gray-100 w-[30%] flex flex-col mx-auto my-20 p-2'>
        <p className='font-semibold text-3xl flex justify-center items-center gap-2'>Success <IoCheckmarkCircleOutline className='text-green-600 text-4xl'/></p>
        <div className='w-[90%] mx-auto text-center mt-8'>
            <p>
            We appreciate your business! A confirmation email will be sent to{' '}
            {customerEmail}. If you have any questions, please email{' '}
            </p>
            <a href="mailto:protees-clone@gmail.com">protees-clone@gmail.com</a>.
        </div>
        
      </section>
    )
  }
}