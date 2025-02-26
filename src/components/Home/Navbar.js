"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaList } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { setCartFromLocalStorage, toggleCart } from "@/app/store/CartSlice";
import Modal from "../Search/SearchModal";
import Image from "next/image";

function Navbar() {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);
  const [men, setMen] = useState(true);
  const [women, setWomen] = useState(false);
  const [fourseason, setFourSeason] = useState(true);
  const [winter, setWinter] = useState(false);
  const data = useSelector((state) => state.cart);
  const [toggleSearch, setToggleSearch] = useState(false);

  const togglecart = useSelector((state) => state.toggleCart);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
      dispatch(setCartFromLocalStorage(storedCart));
    }
  }, []);

  return (
    <header>
      {togglecart ? <Cart /> : null}
      {toggleSearch ? <Modal setToggleSearch={setToggleSearch} /> : null}
      <article className={`w-[95%] sm:w-[90%] md:max-w-[80%] mx-auto `}>
        <div className="hidden md:flex gap-2 text-xl justify-end p-2">
          <p className="cursor-pointer relative show">
            <span className=" message">Dark Mode</span>
            <MdOutlineDarkMode />
          </p>
          <Link
            href="https://www.instagram.com/_protees.pk/?hl=en"
            target="blank"
          >
            <p className="cursor-pointer relative show">
              <span className=" message">Instagram</span>
              <FaInstagram />
            </p>
          </Link>
          <Link target="blank" href="https://www.facebook.com/Protees.pk">
            <p className="cursor-pointer relative show">
              <span className="absolute message">Facebook</span>
              <FaFacebook />
            </p>
          </Link>
          <Link
            target="blank"
            href="https://www.youtube.com/@proteesprivatelimited1827"
          >
            <p className="cursor-pointer relative show">
              <span className="absolute message">Youtube</span>
              <FaYoutube />
            </p>
          </Link>
        </div>

        <div className="flex justify-between items-center mt-[40px]">
          <FaList className="md:hidden" onClick={() => setNav(true)} />
          <div>
            <p className="relative show">
              <span className="message">Search</span>
              <CiSearch
                className="text-2xl cursor-pointer"
                onClick={() => setToggleSearch(true)}
              />
            </p>
          </div>
          <Link href="/">
            <Image
              src={"/SITE_LOGO_1.png"}
              alt="photo"
              height={300}
              width={300}
              style={{height : "auto", width : "auto", cursor : "pointer"}}
            />
          </Link>
          <div className="flex items-center gap-5 md:gap-10">
            <div>
              <p className="relative show">
                <span className="message">Login</span>
                <BsPerson className="text-2xl cursor-pointer" />
              </p>
            </div>
            <div>
              <p className="relative show">
                <span className="message">Cart</span>
                <IoBagOutline
                  className="text-2xl cursor-pointer"
                  onClick={() => dispatch(toggleCart({ toggle: true }))}
                />
              </p>
              <hr
                className={`bg-red-500 w-[10px] h-[10px] absolute rounded-xl ml-[17px] mt-[-25px] ${
                  data.length == 0 ? "hidden" : null
                }`}
              />
            </div>
          </div>
        </div>
        <div
          className={`md:hidden bg-white sm:flex flex-col overflow-y-scroll border border-solid w-[310px] sm:w-[380px] transition-all ease-in-out duration-500 fixed top-0 left-0 z-10 h-[100%] ${
            nav ? "left-0" : "left-[-400px]"
          } `}
        >
          <div className="w-[95%] mx-auto border-b flex justify-end px-3 py-4">
            <IoMdClose onClick={() => setNav(false)} className="text-2xl" />
          </div>
          <div className="w-[95%] mx-auto flex flex-col">
            <div className="border-b-2 py-2">
              <div className="flex justify-between tracking-wider p-2 text-lg">
                MEN
                <MdOutlineKeyboardArrowDown
                  className={`text-2xl w-[30px] ${
                    men ? "rotate-180 border-r-2" : "rotate-0 border-l-2"
                  } `}
                  onClick={() => {
                    setMen(!men);
                  }}
                />
              </div>

              <div className={`${!men ? "hidden" : "block"}`}>
                <div className="flex justify-between w-[95%] mx-auto py-2 text-lg">
                  FOUR SEASON
                  <MdOutlineKeyboardArrowDown
                    className={`text-xl border-2 rounded-xl w-[25px] h-[25px] ${
                      fourseason ? "rotate-180" : "rotate-0"
                    }`}
                    onClick={() => setFourSeason(!fourseason)}
                  />
                </div>

                <div
                  className={`w-[95%] mx-auto pl-2 border-l border-black tracking-wider text-base ${
                    fourseason ? "flex flex-col" : "hidden"
                  }`}
                  onClick={() => setNav(false)}
                >
                  <Link href="/collections/sweatshirt">SWEATSHIRTS</Link>
                  <Link href="/collections/basic">BASIC</Link>
                  <Link href="/collections/beyond active">BEYOND ACTIVE</Link>
                  <Link href="/collections/graphic">GRAPHIC TEES</Link>
                  <Link href="/collections/superheroes">SUPER TEES</Link>
                </div>
              </div>
              <div className={`${!men ? "hidden" : "block"}`}>
                <Link href="">
                  <div className="flex justify-between w-[95%] mx-auto py-2 text-lg">
                    WINTER
                    <MdOutlineKeyboardArrowDown
                      className={`text-xl border-2 rounded-xl w-[25px] h-[25px] ${
                        winter ? "rotate-180" : "rotate-0"
                      }`}
                      onClick={() => setWinter(!winter)}
                    />
                  </div>
                </Link>
                <div
                  className={`w-[95%] mx-auto pl-2 border-l border-black tracking-wider text-base ${
                    winter ? "flex flex-col" : "hidden"
                  }`}
                >
                  <Link href="">PUFFER JACKETS</Link>
                  <Link href="">SUPER SWEATSHIRTS</Link>
                  <Link href="">SUPER HOODIES</Link>
                </div>
              </div>
            </div>
            <div className="border-b-2 py-2">
              <div className="flex justify-between p-2 tracking-wider text-lg">
                WOMEN
                <MdOutlineKeyboardArrowDown
                  className={`text-2xl w-[30px] ${
                    women ? "rotate-180 border-r-2" : "rotate-0 border-l-2"
                  }`}
                  onClick={() => {
                    setWomen(!women);
                  }}
                />
              </div>
              <div className={`${!women ? "hidden" : "block"}`}>
                <div className="w-[95%] mx-auto pl-2 border-l border-black tracking-wider text-base flex flex-col">
                  <Link href={""}>CROP TEES AND TOPS</Link>
                  <Link href={""}>YEARLY TEES</Link>
                  <Link href={""}>FULL SLEEVES</Link>
                  <Link href={""}>SUPER HOODIES</Link>
                  <Link href={""}>SUPER CAPS</Link>
                </div>
              </div>
            </div>
            <Link
              href={""}
              className="w-[95%] mx-auto  py-4 border-b-2 tracking-wider text-lg"
            >
              PROTEES JUNIOR
            </Link>
            <Link
              href={""}
              className="w-[95%] mx-auto  py-4 border-b-2 tracking-wider text-lg"
            >
              SUMMER COLLECTION
            </Link>
          </div>
          <div className="w-[90%] mx-auto flex justify-evenly text-2xl my-3 border-2">
            <div className="w-[30%] text-center p-2 border-r-2">
              <Link
                href="https://www.instagram.com/_protees.pk/?hl=en"
                target="blank"
              >
                <FaInstagram />
              </Link>
            </div>
            <div className="w-[30%] text-center p-2 border-r-2">
              <Link target="blank" href="https://www.facebook.com/Protees.pk">
                <FaFacebook />
              </Link>
            </div>
            <div className="text-center p-2">
              <Link
                target="blank"
                href="https://www.youtube.com/@proteesprivatelimited1827"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </header>
  );
}

export default Navbar;
