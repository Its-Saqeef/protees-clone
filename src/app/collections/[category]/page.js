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
import { toast } from "react-toastify";
import {  redirect, useParams } from "next/navigation";
import colorName from "color-name";

function page() {
  const { category } = useParams()
  const [categoryData,setCategoryData]=useState()
  const [data,setData]=useState()
  const [selectedColors, setSelectedColors] = useState({})

  const [maxPrice, setMaxPrice] = useState(0);
  useEffect(() => {
    (async()=>await fetch(`/api/getcategory/${category}`).then((res)=>res.json()).then((res)=>{
      if(!res.success){
        redirect("/not-found")
      }else{
        [setCategoryData(res.data),setMaxPrice(Math.max(...res.data.map((item) => item.price)))]
      }
      }))();
    Aos.init({
      once: false,
    });
  },[])

  if(categoryData && categoryData.length > 0) (document.title = categoryData[0].subcategory.toUpperCase() + " - Protees.pk" )

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

  const handleStock = (e) => {
    const availability = e.target.value;
    if(availability=="yes"){
      setAvailability(1)      
    }
     else if(availability=="no"){
      setAvailability(0)      
    }
  };
  
  useEffect(()=>{
    const timer=setTimeout(()=>{
      const response=fetch(`/api/getcategory/${category}?min_price=${!minPrice ? 0 : minPrice}&max_price=${!maximumPrice ? "" : maximumPrice}&availability=${availability=== null ? "" : availability}`)
      .then((res) => res.json()).then((res)=>setData(res.data)).catch((err)=>toast.error("Couldn't fetch products"));
    },800)
    return ()=>clearTimeout(timer)
  },[value[0],value[1],availability])

  function nameToHex(name) {
      const rgb = colorName[name.toLowerCase()];
      return rgb
        && "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("")
  }

  return (
    
    <main className="w-[90%] mx-auto flex gap-[50px] my-[50px]">
      <section className="w-[20%] hidden md:block pt-4 h-[50%] sticky top-4">
        <div className="border-b-2 pb-5">
          <div
            className="flex justify-between tracking-widest pb-2 items-center cursor-pointer"
            onClick={() => setToggleAvailability(!toggleAvailability)}
          >
            AVAILABILITY{" "}
            <MdOutlineKeyboardArrowDown
              className={` text-xl  transition ease-linear duration-100 ${
                toggleAvailability ? "rotate-180" : null
              } `}
            />
          </div>
          <div
            className={`grid duration-300 ${
              toggleAvailability ? "animateHeight" : "defaultheight"
            }`}
          >
            <form className="overflow-hidden">
              <div
                className={`text-[12px]  flex items-center hover:underline gap-2 py-[5px]`}
              >
                <input
                  type="radio"
                  id="instock"
                  name="stock"
                  value="yes"
                  className="cursor-pointer"
                  onClick={handleStock}
                  defaultChecked
                />
                <label htmlFor="instock" className="cursor-pointer">
                  IN STOCK
                </label>
              </div>
              <div
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
              </div>
            </form>
          </div>
        </div>
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
      </section>

      <section
        className={`fixed left-0 top-0 w-[80%] sm:w-[70%] h-[100%] bg-white z-10 transition-all ease-in-out duration-500 ${
          filter ? "left-0" : "left-[-82%] sm:left-[-75%] "
        } md:hidden`}
      >
        <h1 className="flex justify-between items-center w-[95%] mx-auto text-lg px-1 py-5 border-b tracking-widest">
          FILTER <IoMdClose onClick={() => setFilter(false)} />
        </h1>
        <div className="border-b-2 pb-5 pt-5 w-[95%] mx-auto text-sm">
          <div className="flex justify-between tracking-widest pb-2 items-center cursor-pointer">
            AVAILABILITY <MdOutlineKeyboardArrowDown className={``} />
          </div>
          <div
            className={`text-[12px] cursor-pointer flex items-center hover:underline gap-2 py-[5px] `}
          >
            <input
              type="radio"
              name="stock"
              value="yes"
              className="cursor-pointer"
              onClick={handleStock}
              id="in-stock"
              defaultChecked
            />
            <label htmlFor="in-stock">IN STOCK</label>
            
          </div>
          <div
            className={`text-[12px] cursor-pointer flex items-center gap-2 hover:underline py-[5px] `}
          >
            <input
              type="radio"
              name="stock"
              value="no"
              className="cursor-pointer"
              onClick={handleStock}
              id="out-of-stock"
            />
            <label htmlFor="out-of-stock">OUT OF STOCK</label>
            
          </div>
        </div>
        <div className="w-[95%] mx-auto text-sm">
          <h2 className="flex mt-[20px] justify-between tracking-widest items-center cursor-pointer">
            PRICE <MdOutlineKeyboardArrowDown className={``} />
          </h2>
          <div className={`w-[95%] mx-auto py-2 `}>
            <div className="flex justify-between">
              <span>Rs. {value[0]}.00</span>
              <span>Rs. {value[1].toLocaleString("en-IN")}.00</span>
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
      </section>
      {
          data ?
        
      <section className="grid grid-cols-2 md:grid-cols-4 mt-3 w-[100%] md:w-[85%] mx-auto">
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
        { data && 
          data.map((item) => {
            const selectedColor = selectedColors[item._id];
                const selectedImage = selectedColor && item.colorImages[selectedColor];
                const defaultImage = Object.values(item.colorImages)[0];
            if(item.isActive)              
            return (
              <div
                className="relative"
                key={item._id}
              >
                <div
                  className={`my-[10px] cursor-pointer p-2 group relative`}
                  data-aos="fade-up"
                >
                  <p
                    className={`w-[90%] text-xs md:text-sm xl:text-base 2xl:text-lg text-black absolute  text-left top-0 py-1 ${item.sizes.some((prod)=>prod.quantity !=0) ? "hidden" : "" }`}
                  >
                    Sold Out
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
                  <Link href={`/collections/${item.subcategory}/product/${item._id}`}>
                  <div className="flex flex-col justify-center items-center ">
                    {item.images.length > 0 && (
                                            <CldImage
                                              width="600"
                                              height="600"
                                              src={item.images[0]}
                                              alt={item.name}
                                              style={{height : "auto", width : "auto"}}
                                            />
                                          )}
                                          {selectedImage ? (
                                            <CldImage
                                                width="600"
                                                height="600"
                                                src={selectedImage}
                                                alt={`${item.name} ${selectedColor}`}
                                                style={{height : "auto", width : "auto"}}
                                            />
                                            ) : defaultImage ? (
                                            <CldImage
                                                width="600"
                                                height="600"
                                                src={defaultImage}
                                                alt={item.name}
                                                style={{height : "auto", width : "auto"}}
                                            />
                                            ) : null}
                  <div className={`w-[90%] absolute flex justify-between opacity-0 group-hover:opacity-75 transition duration-200 ease-in-out`}>
                  {
                    item.sizes.map((size)=>{
                      return( 
                          <span key={size._id} className={`text-sm bg-gray-950 text-white p-1 w-[30px] h-[30px] rounded-2xl text-center ${size.quantity==0 ? "line-through decoration-red-700 decoration-solid decoration-4" : ""}`}>{size.size=="XXL" || size.size=="XL" ? size.size.slice(0,3) :size.size[0]}</span>
                      )
                    })
                  }
                   </div>
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
                  </Link>
                  {item.colors.length > 0 && (
                    <div className="flex justify-center gap-2 mt-2">
                        {item.colors.map((color, i) => (
                        <button
                            key={i}
                            onClick={() =>
                            setSelectedColors((prev) => ({ ...prev, [item._id]: color }))
                            }
                            className="p-[5px] w-1 h-1 rounded-xl border-gray-400 focus:border-black border-2"
                            style={{ backgroundColor: nameToHex(color) }}
                        ></button>
                        ))}
                    </div>
                    )}
                </div>
              </div>
            );
          })} 
      </section> : <section className='w-full flex items-center justify-center'>
        <div className='loader w-12 mx-auto top-[50%] border-x-black border-y-white'></div>
    </section>
    }
    </main>
  );
}

export default page;
