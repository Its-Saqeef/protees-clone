"use client";
import axios from "axios";
import React, { useState, useEffect,useRef } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { CldImage } from "next-cloudinary";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import Aos from "aos";
import "aos/dist/aos.css";

function Reviews() {
  const [data, setData] = useState();
  const [rating, setRating] = useState();
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  const totalItems = data?.data.length || 0;

  useEffect(() => {
    (async () => {
      const result = await axios.get(`/api/getreviews`).then((res) => setData(res.data))
    })();
  }, []);

  useEffect(() => {
    Aos.init({
      once: false,
    });
    if (data) {
      const rating = data.totalrating / data.totalreviews;
      setRating(rating);
    }
  }, [data]);

  useEffect(() => {
    const updateVisibleItems = () => {
      if(window.innerWidth < 768){
        setVisibleItems(1)
      }else if (window.innerWidth < 1280) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    updateVisibleItems()
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="fill-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="fill-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="fill-gray-300" />);
    }
  }


  const handleNext = () => {
    if (index < totalItems - visibleItems) {
      setIndex((prev) => prev + 1);
    }
    else{
      setIndex(0)
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
    else{
      setIndex(totalItems - visibleItems)
    }
  };

  useEffect(()=>{
    setIndex(index+1)
  },[])

  useEffect(()=>{
      const timer= setTimeout(()=>{
        handleNext()
      },3000)
      return ()=>clearTimeout(timer)   
  },[index])
  
  return (
    <section
      className={`w-[90%] mx-auto flex flex-col items-center mt-5 mb-20`}
      data-aos="fade-up" 
    >
      <h1 className="font-bold text-2xl lg:text-4xl my-[10px] text-gray-800 tracking-widest text-center uppercase">
        Let customers speak for us
      </h1>
      <div className="flex gap-1">{stars}</div>
      <p>from {data && data.totalreviews} reviews</p>
      <div className="w-full sm:max-w-[65%] mx-auto overflow-hidden mt-8 relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(100 / visibleItems) * index}%)`,
          }}
        >
          {data?.data.map((item, i) => (
            <div
              key={i}
              className="w-full md:w-1/2 xl:w-1/3 flex gap-2 p-4 items-center shrink-0"
            >
              <CldImage
                src={item.productId.images[0]}
                alt="Photo"
                height={120}
                width={120}
              />
              <div className="flex flex-col gap-2">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }, (_, index) =>
                    item.rating >= index + 1 ? (
                      <FaStar key={index} className="fill-yellow-400" />
                    ) : (
                      <FaRegStar key={index} />
                    )
                  )}
                </div>
                <p className="text-sm tracking-wider">{item.productId.name}</p>
                <p className="font-semibold">{item.userId.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="w-max mx-auto flex gap-2 text-3xl mt-5">
          <SlArrowLeft
            onClick={handlePrev}
            className={`cursor-pointer`}
          />
          <SlArrowRight
            onClick={handleNext}
            className={`cursor-pointer`}
          />
        </div>
      </div>
    </section>
  );
}

export default Reviews;
