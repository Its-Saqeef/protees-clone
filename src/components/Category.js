"use client";
import React, { useEffect,useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { GoFilter } from "react-icons/go";
import Slider from "@mui/material/Slider";
import { CldImage } from "next-cloudinary";
import Aos from "aos";
import "aos/dist/aos.css";
import { useQueryState } from "nuqs";

function Category({ data }) {
  const [maxPrice, setMaxPrice] = useState(data ? Math.max(...data.map((item) => item.price)) : 0);
  useEffect(() => {
    document.title = data[0].subcategory.toUpperCase() + " - Protees.pk";
    Aos.init({
      once: false,
    });
  });
  const [value, setValue] = useState([0, maxPrice]);
  const [minPrice, setMinPrice] = useQueryState("min_price");
  const [maximumPrice, setMaximumPrice] = useQueryState("max_price");
  const [sortBy,setSortBy]=useQueryState("sort_by")
  const [availability,setAvailability]=useQueryState("availability")
  const [togglePrice, setTogglePrice] = useState(false);
  const [toggleAvailability, setToggleAvailability] = useState(false);
  const [filter, setFilter] = useState(false);

  const valuetext = () => {
    return `${value}`;
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMinPrice(newValue[0])
    setMaximumPrice(newValue[1])
  }

  // useEffect(()=>{
  //   setMinPrice(value[0]);
  //   setMaximumPrice(value[1]);
  // },[value])

  const handleStock = (e) => {
    const availability = e.target.value;
    if(availability=="yes"){
      setAvailability(1)
    }
     else{
      setAvailability(0)
    }
  };
  

  return (
    <main className="w-[90%] mx-auto flex gap-[50px] my-[50px]">
      <div className="w-[20%] hidden md:block pt-4 h-[50%] sticky top-4">
        <ul className="border-b-2 pb-5">
          <li
            className="flex justify-between tracking-widest pb-2 items-center cursor-pointer"
            onClick={() => setToggleAvailability(!toggleAvailability)}
          >
            AVAILABILITY{" "}
            <MdOutlineKeyboardArrowDown
              className={` text-xl  transition ease-linear duration-100 ${
                toggleAvailability ? "rotate-180" : null
              } `}
            />
          </li>
          <div
            className={`grid duration-300 ${
              toggleAvailability ? "animateHeight" : "defaultheight"
            }`}
          >
            <div className="overflow-hidden">
              <li
                className={`text-[12px]  flex items-center hover:underline gap-2 py-[5px]`}
              >
                <input
                  type="radio"
                  id="instock"
                  name="stock"
                  value="yes"
                  className="cursor-pointer"
                  onClick={handleStock}
                />
                <label htmlFor="instock" className="cursor-pointer">
                  IN STOCK
                </label>
                <p>(10)</p>
              </li>
              <li
                className={`text-[12px] flex items-center gap-2 hover:underline py-[5px] `}
              >
                <input
                  type="radio"
                  id="outofstock"
                  name="stock"
                  value="no"
                  className="cursor-pointer"
                  style={{ color: "black" }}
                  onClick={handleStock}
                />
                <label htmlFor="outofstock" className="cursor-pointer">
                  OUT OF STOCK
                </label>
                <p>(10)</p>
              </li>
            </div>
          </div>
        </ul>
        <div>
          <div>
            <h2
              className="flex mt-[20px] justify-between tracking-widest items-center cursor-pointer"
              onClick={() => setTogglePrice(!togglePrice)}
            >
              PRICE
              <MdOutlineKeyboardArrowDown
                className={` text-xl  transition ease-linear duration-100 ${
                  togglePrice ? "rotate-180" : null
                } `}
              />
            </h2>
            <div
              className={` mx-auto py-2 grid duration-300 ${
                togglePrice ? "animateHeight" : "defaultheight"
              }`}
            >
              <div className="flex flex-col overflow-hidden">
                <div className="flex justify-between mb-4">
                  <span>Rs.{value[0]}</span>
                  <span>Rs. {value[1].toLocaleString("en-IN")}.00</span>
                </div>
                <div className="w-[90%] mx-auto">
                <Slider
                  getAriaLabel={() => "Price"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  color="black"
                  min={0}
                  max={maxPrice}
                  step={10}
                />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed left-0 top-0 w-[80%] sm:w-[70%] h-[100%] bg-white z-10 transition-all ease-in-out duration-500 ${
          filter ? "left-0" : "left-[-82%] sm:left-[-75%] "
        } md:hidden`}
      >
        <h1 className="flex justify-between items-center w-[95%] mx-auto text-lg px-1 py-5 border-b tracking-widest">
          FILTER <IoMdClose onClick={() => setFilter(false)} />
        </h1>
        <ul className="border-b-2 pb-5 pt-5 w-[95%] mx-auto text-sm">
          <li className="flex justify-between tracking-widest pb-2 items-center cursor-pointer">
            AVAILABILITY <MdOutlineKeyboardArrowDown className={``} />
          </li>
          <li
            className={`text-[12px] cursor-pointer flex items-center hover:underline gap-2 py-[5px] `}
          >
            <input
              type="radio"
              name="stock"
              value="yes"
              className="cursor-pointer"
              onClick={handleStock}
            />
            IN STOCK
            <p>(10)</p>
          </li>
          <li
            className={`text-[12px] cursor-pointer flex items-center gap-2 hover:underline py-[5px] `}
          >
            <input
              type="radio"
              name="stock"
              value="no"
              className="cursor-pointer"
              onClick={handleStock}
            />
            OUT OF STOCK
            <p>(10)</p>
          </li>
        </ul>
        <div className="w-[95%] mx-auto text-sm">
          <h2 className="flex mt-[20px] justify-between tracking-widest items-center cursor-pointer">
            PRICE <MdOutlineKeyboardArrowDown className={``} />
          </h2>
          <div className={`w-[95%] mx-auto py-2 `}>
            <div className="flex justify-between">
              <h5>Rs. {value[0]}.00</h5>
              <h5>Rs. {value[1].toLocaleString("en-IN")}.00</h5>
            </div>
            <div className="w-[95%] mx-auto">
                <Slider
                  getAriaLabel={() => "Price"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  color="black"
                  min={0}
                  max={maxPrice}
                  step={10}
                />
                </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 mt-3 w-[100%] md:w-[85%] mx-auto">
        <div className="col-span-2 md:col-span-4 pb-5">
          <div className="flex justify-between ">
            <p className="hidden md:block">{data.length} Products</p>
            <div
              className="flex border-2 px-2 py-1 items-center gap-2 w-[45%] md:hidden "
              onClick={() => setFilter(true)}
            >
              <GoFilter />
              <p>Filter</p>
            </div>
            <select
              className="border px-2 py-1 cursor-pointer w-[45%] md:w-auto"
              defaultValue={"Best Selling"}
            >
              <option>Featured</option>
              <option value={"Best Selling"} onClick={()=>setSortBy("best-selling")}>Best Selling</option>
              <option value={"Alphabetically, A-Z"}>Alphabetically, A-Z</option>
              <option value={"Alphabetically, Z-A"}>Alphabetically, Z-A</option>
              <option value={"Price, low to high"}>Price, low to high</option>
              <option value={"Price, high to low"}>Price, high to low</option>
              <option value={"Date, old to new"}>Date, old to new</option>
              <option value={"Date, new to old"}>Date, new to old</option>
            </select>
          </div>
        </div>
        {data &&
          data.map((item) => {
            return (
              <Link
                href={`/collections/${item.subcategory}/product/${item._id}`}
                key={item._id}
              >
                <div
                  className={`relative my-[10px] cursor-pointer p-2`}
                  data-aos="fade-up"
                >
                  <p
                    className={`w-[90%] text-xs md:text-sm xl:text-base 2xl:text-lg bg-gray-200 text-black text-center py-1 mt-[40%] hidden`}
                  >
                    Out of Stock
                  </p>
                  <p
                    className={
                      item.sale
                        ? "text-white bg-red-600 inline px-2 py-1 absolute right-2 top-2"
                        : "hidden"
                    }
                  >
                    sale
                  </p>
                  <div className="flex flex-col justify-center items-center">
                    <CldImage
                      src={item.images[0]}
                      width={600}
                      height={600}
                      alt="Product Image"
                    />
                    <h3 className="text-xs sm:text-xs lg:text-base  mb-[10px] text-center tracking-wider text-gray-800">
                      {item.name}
                    </h3>
                  </div>
                  <div className="w-[95%] flex gap-2 justify-around mx-auto text-xs sm:text-sm text-gray-700 flex-wrap">
                    <p
                      className={`${
                        item.sale ? "block line-through" : "hidden"
                      } `}
                    >
                      Rs.
                      {(
                        Math.floor((item.sale / 100) * item.price) + item.price
                      ).toLocaleString("en-IN")}
                      .00
                    </p>
                    <p className="">
                      Rs.{item.price.toLocaleString("en-IN")}.00
                    </p>
                    <h3
                      className={`text-red-500 ${
                        !item.sale ? "hidden" : "block"
                      } `}
                    >
                      save {item.sale}%
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        <h1 className="text-4xl"></h1>
      </div>
    </main>
  );
}

export default Category;
