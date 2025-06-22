"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import {CldImage} from "next-cloudinary"
import { toast } from "react-toastify";
import { redirect,useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetCart } from "@/app/store/CartSlice"; 
import { loadStripe } from "@stripe/stripe-js";

function Checkout() {
    useEffect(()=>{
    document.title = "Checkout - Protees.pk";
    },[])
  const [messagedisp, setMessageDisp] = useState(false);
  const [radiotoggleone, setRadioToggleOne] = useState(true);
  const [radiotoggletwo, setRadioToggleTwo] = useState(false);
  const [billaddress, setBillAddress] = useState(false);
  const [shippingtoggle, setShippingToggle] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  const data=useSelector(state=>state.cart)
  const [formdata, setFormData] = useState({
    email: "",
    fname: "",
    lname: "",
    address: "",
    city: "",
    postalcode: "",
    phone: "",
    payment : "Cash On Delivery"
  });

  const [billing, setBilling] = useState({
    fname: "",
    lname: "",
    address: "",
    city: "",
    postalcode: "",
    billingPhone : ""
  });

  const [errors, setErrors] = useState({});
  const dispatch=useDispatch()
  const {canceled} = useSearchParams()

  const changeHandler = (e) => {
    setFormData(() => ({
      ...formdata,
      [e.target.name]: e.target.value,
    }));
  };

  const handlebillingaddress = (e) => {
    if (billaddress) {
      setBilling(() => ({
        ...billing,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleErrors = () => {
    let errors = {};

    if (!formdata.email && !formdata.email) {
      errors.email = "Enter a valid email or phone number";
    }
    if (!formdata.lname) {
      errors.lname = "Enter Last Name";
    }
    if (!formdata.address) {
      errors.address = "Enter an address";
    }
    if (!formdata.city) {
      errors.city = "Enter a city";
    }
    if (!formdata.phone) {
      errors.phone = "Enter a phone number";
    }
    if(!formdata.postalcode){
      errors.postal = "Enter Postal Code"
    }
    if (billaddress) {
      if (!billing.lname) {
        errors.blname = "Enter Last Name";
      }
      if (!billing.address) {
        errors.baddress = "Enter an address";
      }
      if (!billing.city) {
        errors.bcity = "Enter a city";
      }
    }
    return errors;
  };

  const cardPayment=async()=>{
    const stripe=await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    if (canceled) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
    const response = await fetch("/api/checkout-session",{
      method : "POST",
      body : JSON.stringify(data),
      
    }).then((res)=>res.json())
    dispatch(resetCart())
    setIsLoading(false)
       const result=stripe.redirectToCheckout({
       sessionId : response.session_id
    })
  }


  const submitHandler = async(e) => {
    e.preventDefault();

    const errors = handleErrors();

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    if(data.length==0){
      toast.error("Please select Product")
      return;
    }
    setIsLoading(true)
    setErrors({});

    if(radiotoggletwo){
      cardPayment()
    }
    else{
        const response=await axios.post("/api/orders",[formdata,billing,data]).then((res)=>res)
      if(response.data.message=="success"){
        toast.success("Order Placed")
      }else{
        toast.error(response.data.message)
      }
      dispatch(resetCart())
      setIsLoading(false)
      redirect(`/order/${response.data.data.orderNumber}`)
    }
  };

  let totalamount=0
    data && data.map((item)=>{
        const individual_item=item.price * item.quantity
        totalamount=individual_item + totalamount
    })

    
  return (
    <div
      className={` w-full  top-0 bg-black ${
        shippingtoggle ? "fixed top-0" : "absolute"
      }`}
    >
      <div className="w-[90%] mx-auto md:mx-0 md:ml-[10%]">
        {shippingtoggle && (
          <Modal
            onClose={() => setShippingToggle(false)}
            shippingtoggle={shippingtoggle}
          />
        )}
        <div className="py-7 w-[260px]">
          <Link href="/">
            <img src={"/white logo.png"} alt="photo" className="h-[90px]" />
          </Link>
        </div>
        <div className="text-white flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[45%]">
            <form onSubmit={submitHandler}>
              <h2 className="text-2xl py-4">Contact</h2>
              <input
                name="email"
                placeholder="Enter Email"
                className={`bg-black focus:outline-none border border-gray-500 w-full p-3 rounded-md ${
                  errors.email ? "border-red-500" : null
                }`}
                onChange={changeHandler}
              />
              <div className="text-red-500">{errors.email}</div>
              <input
                type="checkbox"
                id="check"
                className="cursor-pointer my-4 mr-2"
                defaultChecked
              />
              <label htmlFor="check" className="cursor-pointer text-lg">
                Email me with news and offers
              </label>
              <h2 className="text-2xl py-5">Delivery</h2>
              <select className="bg-black w-full outline-none border  border-gray-500 p-3 rounded-md" defaultValue="Pakistan">
                <option disabled >Country/State</option>
                <option >Pakistan</option>
              </select>
              <div className="flex gap-5 py-3">
                <input
                  name="fname"
                  placeholder="First Name"
                  className="bg-black w-[50%] outline-none border  border-gray-500 p-3 rounded-md"
                  onChange={changeHandler}
                />
                <div
                  className={`w-[50%] relative ${errors.lname ? "mb-2" : null}`}
                >
                  <input
                    name="lname"
                    placeholder="Last Name"
                    className={`bg-black w-full outline-none border  border-gray-500 p-3 rounded-md ${
                      errors.lname ? "border-red-500 " : null
                    }`}
                    onChange={changeHandler}
                  />
                  <div className="text-red-500 absolute">{errors.lname}</div>
                </div>
              </div>
              <input
                name="address"
                placeholder="Address"
                className={`bg-black w-full outline-none border border-gray-500 p-3 rounded-md ${
                  errors.address ? "border-red-500" : null
                }`}
                onChange={changeHandler}
              />
              <div className="text-red-500 ">{errors.address}</div>
              <div className="flex gap-5 py-5 mt-2">
                <div className="w-[50%] relative">
                  <input
                    name="city"
                    placeholder="City"
                    className={`bg-black w-full outline-none border  border-gray-500 p-3 rounded-md ${
                      errors.city ? "border-red-500" : null
                    }`}
                    onChange={changeHandler}
                  />
                  <div className="text-red-500 absolute">{errors.city}</div>
                </div>
                <input
                  name="postalcode"
                  placeholder="Postal Code"
                  className="bg-black w-[50%] outline-none border  border-gray-500 p-3 rounded-md"
                  onChange={changeHandler}
                />
                <div className="text-red-500">{errors.postal}</div>
              </div>
              <div
                className={`flex items-center border  border-gray-500 rounded-md p-2 relative ${
                  errors.phone ? "border-red-500" : null
                }`}
              >
                <input
                  name="phone"
                  placeholder="Phone"
                  className="bg-black w-[100%] py-1 outline-none"
                  onChange={changeHandler}
                />
                <div>
                  <HiOutlineQuestionMarkCircle
                    className="cursor-pointer w-10 text-2xl"
                    onMouseEnter={() => setMessageDisp(true)}
                    onMouseLeave={() => setMessageDisp(false)}
                  />
                  <p
                    className={`absolute w-[150px] h-[80px] py-1 px-2 rounded-md border z-10 bg-white shadow-md text-black right-0 ${
                      messagedisp ? "block" : "hidden"
                    }`}
                  >
                    In case we need to contact you about your order
                  </p>
                </div>
              </div>
              <div className="text-red-500">{errors.phone}</div>
              <input
                type="checkbox"
                id="check2"
                className="cursor-pointer my-5 mr-2"
              />
              <label htmlFor="check2" className="cursor-pointer text-lg">
                Save this information for next time
              </label>
              <h2 className="text-2xl py-4">Shipping Method</h2>
              <p className="bg-black w-[100%] flex justify-between border  border-gray-500 p-4 rounded-md">
                STANDARD SHIPPING <span>Rs 200.00</span>
              </p>
              <h2 className="text-2xl pt-3 pb-1">Payment</h2>
              <p className="font-light">
                All transactions are secure and encrypted.
              </p>
              <div className="flex flex-col border border-gray-500 my-4 rounded-md">
                <div className="border-b border-gray-500 py-3 pl-2">
                  <input
                    type="radio"
                    value="Cash On Delivery"
                    name="payment"
                    id="payment"
                    defaultChecked
                    className="cursor-pointer"
                    onClick={() => {
                      setRadioToggleTwo(false);
                      setRadioToggleOne(true);
                    }}
                    onChange={(e)=>setFormData({...formdata,payment : e.target.value})}
                  />
                  <label htmlFor="payment" className="cursor-pointer ml-2">
                    Cash on Delivery
                  </label>
                </div>
                <p
                  className={`mx-auto border-b border-gray-500 w-full text-center py-4 ${
                    radiotoggleone ? "block" : "hidden"
                  }`}
                >
                  Pay Cash on Delivery
                </p>
                <div className={`border-b border-gray-500 py-3 pl-2`}>
                  <input
                    type="radio"
                    value="Bank Deposit"
                    name="payment"
                    id="payment2"
                    className="cursor-pointer"
                    onClick={() => {
                      setRadioToggleTwo(true);
                      setRadioToggleOne(false);
                    }}
                    onChange={(e)=>setFormData({...formdata,payment : e.target.value})}
                  />
                  <label htmlFor="payment2" className="cursor-pointer ml-2">
                    Bank Deposit
                  </label>
                </div>
                <div
                  className={`mx-auto w-[60%] py-5 flex flex-col items-center ${
                    radiotoggletwo ? "block" : "hidden"
                  }`}
                >
                 <p>Place Order Below</p>
                </div>
              </div>
              <h2 className="text-2xl py-4">Billing Address</h2>
              <div className="border border-gray-500 rounded-md">
                <div className=" py-3 pl-2">
                  <input
                    type="radio"
                    name="billing"
                    id="billing"
                    onClick={() => setBillAddress(false)}
                    defaultChecked
                  />
                  <label htmlFor="billing" className="ml-2 cursor-pointer">
                    Same as shipping address
                  </label>
                </div>
                <div className="py-3 pl-2">
                  <input
                    type="radio"
                    name="billing"
                    id="billing2"
                    onClick={() => setBillAddress(true)}
                  />
                  <label htmlFor="billing2" className="ml-2 cursor-pointer">
                    Use a different billing address
                  </label>
                </div>
                <div
                  className={`py-5 w-[90%] mx-auto ${
                    billaddress ? "block" : "hidden"
                  } `}
                >
                  <select className="bg-black w-full outline-none border  border-gray-500 p-3 rounded-md" defaultValue={"Pakistan"}>
                    <option disabled>Country/State</option>
                    <option >Pakistan</option>
                  </select>
                  <div className="flex gap-5 py-3 relative">
                    <input
                      name="fname"
                      placeholder="First Name"
                      className="bg-black w-[50%] outline-none border  border-gray-500 p-3 rounded-md"
                      onChange={handlebillingaddress}
                    />
                    <div
                      className={`w-[50%] relative ${
                        errors.blname ? "mb-2" : null
                      }`}
                    >
                      <input
                        name="lname"
                        placeholder="Last Name"
                        className={`bg-black w-full outline-none border  border-gray-500 p-3 rounded-md ${
                          errors.blname ? "border-red-500 " : null
                        }`}
                        onChange={handlebillingaddress}
                      />
                      <div className="text-red-500 absolute">
                        {errors.blname}
                      </div>
                    </div>
                  </div>
                  <input
                    name="address"
                    placeholder="Address"
                    className="bg-black w-full outline-none border  border-gray-500 p-3 rounded-md"
                    onChange={handlebillingaddress}
                  />
                  <div className="text-red-500 my-1">{errors.baddress}</div>
                  <div className="flex gap-5 py-3 mt-2">
                    <input
                      name="city"
                      placeholder="City"
                      className="bg-black w-[50%] outline-none border  border-gray-500 p-3 rounded-md"
                      onChange={handlebillingaddress}
                    />
                    <input
                      name="postalcode"
                      placeholder="Postal Code"
                      className="bg-black w-[50%] outline-none border  border-gray-500 p-3 rounded-md"
                      onChange={handlebillingaddress}
                    />
                  </div>
                  <div className="text-red-500">{errors.bcity}</div>
                  <div
                className={`flex items-center border  border-gray-500 rounded-md p-2 relative`}
              >
                <input
                  name="billingPhone"
                  placeholder="Phone"
                  className="bg-black w-[100%] py-1 outline-none"
                  onChange={handlebillingaddress}
                />
                <div>
                  <HiOutlineQuestionMarkCircle
                    className="cursor-pointer w-10 text-2xl"
                    onMouseEnter={() => setMessageDisp(true)}
                    onMouseLeave={() => setMessageDisp(false)}
                  />
                  <p
                    className={`absolute w-[150px] h-[80px] py-1 px-2 rounded-md border z-10 bg-white shadow-md text-black right-0 ${
                      messagedisp ? "block" : "hidden"
                    }`}
                  >
                    In case we need to contact you about your order
                  </p>
                </div>
              </div>
                </div>
              </div>
              <button  
            onClick={submitHandler}
            className="bg-red-700 hover:bg-red-800 transition ease-in-out duration-300 w-full p-4 text-xl rounded-md my-8 cursor-pointer hidden md:block"
            disabled={isLoading}>
              {isLoading ? <p className="loader mx-auto"></p> : "Complete Order"}
          </button>
            </form>
          </div>

          <div className="bg-black md:bg-white w-full  md:w-[60%] md:h-[810px] text-white md:text-black sticky top-0">
            <div className="w-full md:w-[60%] md:ml-14 mt-10">
              {data.map((item,i) => {
                  return (
                    <div className="flex gap-2 md:justify-between items-center my-5" key={item.id + i}>
                      <div className="relative">
                        {item.colorImage ? 
                          <CldImage src={item.colorImage} alt={item.name}  height={50} width={50} className=" md:h-[80px] md:w-[80px] border-2"/> :
                          <CldImage
                            src={item.image[0]}
                            alt={item.name}
                            height={50}
                            width={50}
                            className="h-[40px] w-[40px] md:h-[80px] md:w-[80px] border-2"
                          />
                        }
                        <p className="absolute top-[-8px] right-[-8px] border-2 h-[20px] md:h-[30px] w-[20px] md:w-[30px] text-center text-xs md:text-sm pb-1 md:p-1 rounded-2xl bg-gray-500 text-white">
                          {item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col justify-start w-[60%] gap-2">
                        <p className="text-sm lg:text-base xl:text-lg">
                          {item.name}
                        </p>
                        <p><span className="text-gray-500">Size : </span>{item.size}</p>
                        <p><span className="text-gray-500">{item.color && "Color :"} </span>{item.color}</p>
                      </div>
                      <p className="text-sm md:text-base text-gray-500">
                        Rs {item.price.toLocaleString("en-IN")}.00
                      </p>
                    </div>
                  );
              })}
              <div className="flex gap-5">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="p-2 border-2 rounded-md w-[80%]"
                />
                <button className="py-2 px-3 border rounded-md text-gray-400 bg-gray-100">
                  Apply
                </button>
              </div>
              <div className=" p-4 my-5 flex flex-col gap-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-semibold">Rs {totalamount.toLocaleString("en-IN")}.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="flex items-center gap-1">
                    Shipping{" "}
                    <HiOutlineQuestionMarkCircle
                      className="cursor-pointer"
                      onClick={() => setShippingToggle(true)}
                    />
                  </p>
                  <p className="font-semibold">
                    {totalamount > 2000 ? "Free" : "Rs 200.00"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold text-xl">Total</p>
                  <p className="font-semibold text-xl">
                    <sub className="text-gray-400 font-normal mr-2">PKR</sub>Rs{" "}
                    {totalamount > 2000
                      ? totalamount + ".00"
                      : totalamount + 200 + ".00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button  
            onClick={submitHandler}
            className="bg-red-700 hover:bg-red-800 transition ease-in-out duration-300 w-full p-4 text-xl rounded-md my-8 cursor-pointer md:hidden"
            disabled={isLoading}>
              {isLoading ? <p className="loader mx-auto"></p> : "Complete Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
