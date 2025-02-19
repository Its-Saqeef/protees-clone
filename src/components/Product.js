"use client";
import React, { useState, useRef, useEffect } from "react";
import { useParams,useRouter } from "next/navigation";
import { TfiWorld } from "react-icons/tfi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import YouMayLike from "@/components/YouMayLike";
import Aos from "aos";
import "aos/dist/aos.css";
import { addToCart,setCartFromLocalStorage } from "@/components/Store/CartSlice";
import { useDispatch } from "react-redux";
import RecentlyViewed from "./RecentlyViewed";
import { IoIosArrowRoundBack } from "react-icons/io"

function Product({data}) {
  const router=useRouter()
  const params = useParams();
  const [id, setId] = useState(params.id);
  const [open, setOpen] = useState(false);
  const [size,setSize]=useState("SMALL")
  const [active,setActive]=useState("SMALL")
  const sizeButtonsRef = useRef({});  
  const [stock, setStock] = useState();
  const [recent,setRecent]=useState(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("Recent")) || [] : null)
  useEffect(() => {
    Aos.init({
      once: false,
    })
      document.title = data.name + " - Protees.pk";
      setStock(data.sizes[0].quantity);
      if(recent.length>6 && !recent.some(item => item._id === data._id)){
        recent.shift();
        localStorage.setItem("Recent", JSON.stringify([...recent,data]))
      }
      else if(!recent.some(item => item._id === data._id)){
        localStorage.setItem("Recent", JSON.stringify([...recent,data]))
      }
  },[]);
  
  const dispatch=useDispatch()
  useEffect(()=>{
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
      dispatch(setCartFromLocalStorage(storedCart));
    }
  },[dispatch])
  
  return (
    <main className={`w-[95%] sm:w-[90%] md:max-w-[80%] mx-auto mt-10`}>
      {data ? (
        <div
          className="flex flex-col md:flex-row md:items-start gap-4"
          key={data._id}
        >
          <div className="w-[100%] md:sticky md:top-0 mx-auto">
            <CldImage
              src={data.images[0]}
              alt="Photo"
              width={1000}
              height={1000}
              priority
            />
          </div>
          <div className="w-[100%] md:[w-50%] flex flex-col">
            <h1 className="text-lg sm:text-2xl text-center md:text-start xl:text-3xl pb-4 mb-3 mx-auto md:mx-0 tracking-wide ">
              {data.name}
            </h1>
            <div className="flex gap-5 text-base sm:text-xl md:text-lg mx-auto md:mx-0">
              <h3 className={`line-through py-1 ${data.sale ? "" : "hidden"}`}>
                Rs.
                {(
                  Math.floor((data.sale / 100) * data.price) + data.price
                ).toLocaleString("en-IN")}
                .00
              </h3>
              <h3 className="py-1">
                Rs {data.price.toLocaleString("en-IN")}.00
              </h3>
              <h3
                className={`text-red-700 py-1 ${!data.sale ? "hidden" : null}`}
              >
                Save {data.sale}%
              </h3>
            </div>
            <p className="text-[15px] mx-auto md:m-0">
              <span className=" relative custom py-1 border-b-2 hover:border-none">
                Shipping
              </span>{" "}
              calculated at checkpoint
            </p>
            <hr className="border my-6" />
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg my-2 tracking-wider">SIZE</h3>
              <div className="flex gap-1 sm:gap-2 xl:gap-3 text-xs lg:text-base">
                {data &&
                  data.sizes.map((size, index) => {
                    return (
                      <button
                        className={`font-medium border-2 ${active===size.size ? "border-black" : "border-gray-300"} ${
                          size.quantity == 0 ? "line-through text-gray-500" : ""
                        } py-2 px-2 sm:px-3 md:min-w-20`}
                        key={index}
                        onClick={() => {setStock(size.quantity),setSize(size.size),setActive(size.size)}}
                        ref={(el) => (sizeButtonsRef.current[size.size] = el)}
                      >
                        {size.size}
                      </button>
                    );
                  })}
              </div>
            </div>
            <p className="flex items-center gap-1 text-md mx-auto md:mx-0 font-medium py-4">
              <TfiWorld className="text-xl" /> Free shipping on order above 2000{" "}
            </p>
            <h6 className=" text-sm tracking-wider text-center md:text-start">
              <p
                className={`p-1 w-1 h-1 mx-2 inline-block rounded-[50%] ${
                  stock < 5
                    ? "bg-red-600"
                    : stock < 8
                    ? "bg-[#f4af29]"
                    : "bg-green-700"
                }`}
              ></p>
              {stock == 0
                ? "Inventory on the way"
                : stock < 5
                ? `Low stock - only ${stock} items left`
                : stock < 8
                ? `${stock} items left - Shop now`
                : `In stock - order now`}
            </h6>
            {stock == 0 ? (
              <button
                className="bg-gray-200 text-gray-400 p-3 border-gray-600 border tracking-wider rounded-sm my-4"
                disabled={stock}
              >
                SOLD OUT
              </button>
            ) : (
              <div className="flex flex-col gap-2 my-5">
                <button className="border border-black p-3 tracking-wider rounded-sm" onClick={()=>dispatch(addToCart({id : data._id,name: data.name,size :size,price : data.price,image : data.images,subcategory : data.subcategory}))}>
                  ADD TO CART
                </button>
                <button className="bg-black text-white p-3 tracking-wider rounded-sm" onClick={()=>(dispatch(addToCart({id : data._id,name: data.name,size :size,price : data.price,image : data.images,subcategory : data.subcategory})), router.push("/checkout"))}>
                  BUY NOW
                </button>
              </div>
            )}

            <div>
              <h2
                className={`text-lg font-medium ${
                  !data.description ? "hidden" : null
                }`}
              >
                Product Description:
              </h2>
              <pre className="py-5 text-base text-wrap">{data.description}</pre>
              <h2 className="text-lg font-medium">Composition & Care:</h2>
              <ul className="list-disc p-3 ml-2 text-base ">
                {data.composition.map((prod, index) => {
                  return <li key={index}>{prod}</li>;
                })}
              </ul>
            </div>
            <div className="border-2 p-2" onClick={() => setOpen(!open)}>
              <h1 className="cursor-pointer tracking-widest text-center">
                SIZE CHART{" "}
                <MdOutlineKeyboardArrowDown
                  className={`float-right text-2xl  transition ease-linear duration-100 ${
                    open ? "rotate-180" : null
                  } `}
                />
              </h1>
              <div
                className={`grid ${open ? "animateHeight" : "defaultheight"}`}
              >
                <div className="overflow-hidden">
                  <h1 className="font-bold text-2xl md:text-4xl p-2 my-[20px] tracking-wider">
                    NOTE:
                  </h1>
                  <ul className="list-disc ml-[40px] ">
                    <li>All sizes are given in inches.</li>
                    <li>Chest size is for the front of the t-shirt.</li>
                    <li>Chest size is measured from under the arm .</li>
                    <li>
                      Shirt lengths are measure from bottom to high point neck.
                    </li>
                    <li>Tolerance of half an inch (plus or minus).</li>
                  </ul>
                  <img src="/sizes/Fullsleeve.webp" alt="photo" />
                  <img src="/sizes/halfsleeve.webp" alt="photo" />
                  <img src="/sizes/hoodies.webp" alt="photo" />
                  <img src="/sizes/Oversize.webp" alt="photo" />
                  <img src="/sizes/puffer.webp" alt="photo" />
                  <img src="/sizes/tanktop.webp" alt="photo" />
                  <img src="/sizes/trouser.webp" alt="photo" />
                </div>
              </div>
            </div>
            <Link href="https://www.facebook.com/share_channel/" target="blank">
              <span className="flex justify-center items-center gap-2 text-xl my-4">
                <FaFacebook /> Share
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="loader w-12 mx-auto mt-10 border-x-black border-y-white"></div>
      )}
      <YouMayLike params={params} />
      <RecentlyViewed id={data._id} />
      <div className="flex justify-center my-5">
        <Link href={`/collections/${data.subcategory}`}>
        <button className="text-white bg-black py-3 px-2 text-center rounded-md"><IoIosArrowRoundBack className="inline-block text-2xl" /> <span className="uppercase text-xs tracking-widest">BACK TO {data.subcategory}</span></button>
        </Link>
      </div>
      
    </main>
  );
}

export default Product;
