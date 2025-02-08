import React from 'react'
export const metadata={
  title : "SHIPPING POLICY - Protees.pk"
}
function Shipping() {

  return (
    <div  className='w-[95%] lg:max-w-[80%] xl:max-w-[70%] mx-auto mb-[100px]'>
        <h1 className='text-5xl text-center font-semibold py-8 mb-7 mt-10'>SHIPPING POLICY</h1>
        <div className='p-3'>
            <h1 className='text-4xl font-medium py-4'>SHIPPING POLICY</h1>
            <ul className='pl-5 py-5 list-disc leading-7 text-lg font-normal'>
                <li>Free Shipping on all orders over the value of Rs.2000.</li>
                <li>We charge Rs.200 on all orders under the value of Rs.2000.</li>
                <li>Orders placed by 5:00 PM (Pakistan Standard Time) will be shipped the same day via Registered Courier Service.</li>
                <li>Orders received after 5:00 pm will be dispatched the next day.</li>
                <li>Orders received on Sundays and on Pakistan's National Holidays will be processed and shipped on the next working day.</li>
                <li>Delivery time is between 4 to 7 working days (No delivery on Sundays). However delivery can take up to 7 working days during busy shopping season or our mega sales events.</li>
                <li>We will deliver to the home or office address indicated by you when you place an order.</li>
                <li>We cannot deliver to PO boxes. All deliveries must be signed for upon receipt. We will try at least twice to deliver your order at the address indicated by you.</li>
                <li>In-case of self collection or any address where we think that the courier network is not available we demand for advance payment . </li>
                <li>If you have any questions you can contact us at 0321-6331227 or email us at protees.pk@gmail.com.</li>
            </ul>
        </div>
    </div>
  )
}

export default Shipping