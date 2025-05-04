"use client";
import React, { useEffect, useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

function Order({ data }) {
  const [rating, setRating] = useState([
    {
      id: "",
      stars: 0,
    },
  ]);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [success,setSuccess]=useState(false)
  const [prevReviews,setPrevReviews]=useState()

  let total = 0;
  data.product.map((item) => {
    const individualPrice = item.price * item.quantity;
    total = individualPrice + total;
  });
  function formatDate(isoString) {
    const date = new Date(isoString);

    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  }

  useEffect(()=>{
      fetch("/api/getreviews").then((res)=>res.json()).then((data)=>setPrevReviews(data.data))
  },[])

  const handleRating = (id, star) => {
    setRating((prevRating) => {
      const existing = prevRating.some((item) => item.id === id);

      if (existing) {
        return prevRating.map((item) =>
          item.id === id ? { ...item, stars: star } : item
        );
      } else {
        return [...prevRating, { id: id, stars: star }];
      }
    });
  };
  

  const handleReview = async () => {
    setIsLoading(true);
    if (rating.length==1) {
      toast.error("Please Rate First");
      setIsLoading(false);
      return;
    }
    const response = await axios
      .post("/api/reviews", JSON.stringify(rating))
      .then((res) =>res.data.success ? setSuccess(true) : setSuccess(false));
    setIsLoading(false);
  };

  console.log(prevReviews)  

  return (
    <main>
      <section className="flex flex-col md:flex-row lg:w-[90%] xl:w-[85%] 2xl:w-[75%] mx-auto justify-evenly my-8 relative">
        <section className="lg:w-[60%]">
          <p className="flex items-center text-2xl font-thin">
            <IoCheckmarkCircleOutline className="text-7xl text-green-600" />
            Thank You For Purchase
          </p>
          <p className="p-2 text-lg">#{data.orderNumber}</p>
          <p className="text-sm px-2 mb-2">
            Confirmed {formatDate(data.createdAt)}
          </p>
          <div className="bg-gray-100 px-2 py-4 mx-2 my-4 rounded-lg">
            <p className="text-sm">News and offers</p>
            <p className="text-gray-700">
              You'll receive marketing emails. You can unsubscribe at any time.
            </p>
            <div className="flex gap-2 my-2">
              <input
                type="checkbox"
                id="optforemail"
                className="w-[15px] accent-black"
              />
              <label htmlFor="optforemail" className="cursor-pointer">
                Email me with news and offers
              </label>
            </div>
          </div>
          <div className="flex bg-gray-100 p-2 gap-2 mx-2 rounded-lg">
            <div className="w-full">
              <div className="my-4">
                <p className="text-sm">Contact information</p>
                <p>{data.name}</p>
                <p>{data.email}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm">Shipping address</p>
                <p>{data.name}</p>
                <p>{data.shippingAddress}</p>
                <p>{data.postalCode}</p>
                <p>{data.phone}</p>
              </div>
              <div>
                <p className="text-sm">Shipping method</p>
                <p>Standard</p>
              </div>
            </div>
            <div className="w-full">
              <div className="my-4">
                <p className="text-sm">Payment</p>
                <p>{data.paymentMethod}</p>
                <p className="text-gray-500 text-sm py-1">
                  Rs.{total.toLocaleString("en-IN")}.00
                </p>
                <p className="text-gray-500 text-sm ">
                  {formatDate(data.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm">Billing address</p>
                <p>{data.billingName}</p>
                <p>{data.billingAddress}</p>
                <p>{data.billingPostal}</p>
                <p>{data.billingPhone}</p>
              </div>
            </div>
          </div>
          <Link href={"/"}>
            <button className="bg-gray-600 hover:bg-gray-500 text-white p-2 my-5 rounded-md ml-2">
              Continue Shopping
            </button>
          </Link>
        </section>
        <section className="md:w-[35%] mx-2 my-2">
          <div className="my-4 rounded-lg bg-gray-100 px-2 py-3">
            <p>Rs.{total.toLocaleString("en-IN")}.00</p>
            <p className="text-gray-500 text-sm mt-2">
              {data.status == "pending"
                ? "This order has a pending payment. The balance will be updated when payment is received."
                : "Payment Made"}
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-2 text-gray-700 hidden lg:block">
            {data.product.map((item) => {
              const currentRating =
                rating.find((rate) => rate.id === item.id)?.stars || 0;
                
              return (
                <div
                  className="flex items-center py-1 justify-between"
                  key={item._id}
                >
                  <div className="relative">
                    <Image
                      src={`https://res.cloudinary.com/dtnxlm58e/image/upload/v1741148854/${item.image[0]}`}
                      alt="Photo"
                      height={100}
                      width={100}
                      className="border border-gray-400 rounded-md"
                    />
                    <p className="absolute top-[-5px] right-[-5px] bg-gray-500 rounded-xl w-6 h-6 text-center text-white">
                      {item.quantity}
                    </p>
                  </div>

                  <div className="text-sm max-w-[50%]">
                    <p>{item.name}</p>
                    <p>{item.size}</p>

                    {data.status === "delivered" &&
                      pathname.startsWith("/account") && (
                        
                           
                            <div className={`flex my-2 gap-2 text-base items-center ${success ? "pointer-events-none" : ""}`}>
                            {Array.from({ length: 5 }, (_, index) => (
                              <span
                                key={`${item.id}-${index}`}
                                onClick={() => handleRating(item.id, index + 1)}
                              >
                                {currentRating >= index + 1 ? (
                                  <FaStar className="fill-yellow-500 cursor-pointer" />
                                ) : (
                                  <FaRegStar className="cursor-pointer" />
                                )}
                              </span>
                            ))}
                          </div>
                          
            )
                    
                      }
                  </div>

                  <p>Rs.{item.price.toLocaleString("en-IN")}.00</p>
                </div>
              );
            })}
            {
              data.status === "delivered" &&
              pathname.startsWith("/account") && !success ? (
                <div className="flex justify-center items-center">
                  <button
                  className="w-[50%]  bg-[#c10000] rounded-md p-1 text-white font-semibold hover:bg-red-800"
                  disabled={isLoading}
                  onClick={handleReview}
                >
                  {
                    isLoading ? <div className="flex justify-center"><p className="loader"></p></div> : "Submit Review"
                  }
                </button>
            </div>
              ) : <p className="text-center">Review Submitted</p>

            }
            
            <div className="flex w-[50%] mx-auto justify-between my-2">
              <p>Subtotal</p>
              <p>Rs.{total.toLocaleString("en-IN")}.00</p>
            </div>
            <div className="flex w-[50%] mx-auto justify-between my-2">
              <p>Shipping</p>
              <p>{total > 2000 ? "Free" : "Rs 200.00"}</p>
            </div>
            <div className="flex w-[50%] mx-auto justify-between my-2">
              <p className="text-black font-semibold text-2xl">Total</p>
              <p className="text-black text-lg font-semibold">
                <sub className="mr-1 text-gray-500">PKR</sub>Rs.
                {(total < 2000 ? total + 200 : total).toLocaleString("en-IN")}
                .00
              </p>
            </div>
          </div>
        </section>
      </section>
      <div className="flex gap-3 text-sm items-center justify-center lg:w-[90%] xl:w-[85%] 2xl:w-[75%] mx-auto mb-4">
        <Link href="/pages/refund-policy" className="underline">
          Refund Policy
        </Link>
        <Link href="/pages/shipping-policy" className="underline">
          Shipping Policy
        </Link>
        <Link href="/pages/privacy-policy" className="underline">
          Privacy Policy
        </Link>
        <Link href="/pages/terms-of-service" className="underline">
          Terms of Service
        </Link>
      </div>
    </main>
  );
}

export default Order;
