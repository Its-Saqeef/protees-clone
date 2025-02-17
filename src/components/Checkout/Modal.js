"use client"
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

function Modal({onClose}) {
    const modalref=useRef();

    const closemodal=(e)=>{
        if(modalref.current== e.target){
            onClose();
        }
    }
    
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-md z-10" ref={modalref} onClick={closemodal}>  
        <div className={`w-[50%] mx-[20%] shadow-md bg-white top-72 fixed rounded-lg custom-animate`}>
          <h1 className={`p-4 text-white bg-black  flex justify-between items-center top-72 rounded-t-lg `}>Shipping policy <IoMdClose className="text-xl cursor-pointer" onClick={onClose}/></h1>
          <h1 className="text-3xl px-3 py-1">SHIPPING POLICY</h1>
          <ul className=" py-1 list-disc w-[90%] mx-auto">
            <li >Free Shipping on all orders over the value of Rs.1500.</li>
            <li>We charge Rs.150 on all orders under the value of Rs.1500.</li>
            <li>Orders placed by 5:00 PM (Pakistan Standard Time) will be shipped the same day via Registered Courier Service.</li>
            <li>Orders received after 5:00 pm will be dispatched the next day.</li>
            <li>Orders received on Sundays and on Pakistan's National Holidays will be processed and shipped on the next working day.</li>
            <li>Delivery time is between 4 to 7 working days (No delivery on Sundays). However delivery can take up to 7 working days during busy shopping season or our mega sales events.</li>
            <li>We will deliver to the home or office address indicated by you when you place an order.</li>
            <li>We cannot deliver to PO boxes. All deliveries must be signed for upon receipt. We will try at least twice to deliver your order at the address indicated by you.</li>
            <li>In-case of self collection or any address where we think that the courier network is not available we demand for advance payment .</li>
            <li>If you have any questions you can contact us at 0321-6331227 or email us at protees.pk@gmail.com.</li>
          </ul>
        </div>
    </div>    
  )
}

export default Modal
