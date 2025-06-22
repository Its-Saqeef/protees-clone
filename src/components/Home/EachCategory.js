"use client"
import React,{useState} from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import colorName from "color-name";

function EachCategory({ data, heading }) {
    const [selectedColors, setSelectedColors] = useState({})

    function nameToHex(name) {
    const rgb = colorName[name.toLowerCase()];
    return rgb
      && "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("")
    }
console.log(data)
  const router = useRouter();
  return (
    <section className="w-[90%] xl:w-[80%] mx-auto my-[60px] flex flex-col items-center gap-10">
      <div className="flex flex-col items-center py-3">
        <h1
          className="font-bold text-2xl lg:text-4xl my-[20px] text-gray-800 tracking-widest text-center"
          data-aos="fade-up"
        >
          {heading}
        </h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 cursor-pointer gap-x-1 gap-y-4">
        {data ? (
          data
            .map((item) => {
                const selectedColor = selectedColors[item._id];
                const selectedImage = selectedColor && item.colorImages[selectedColor];
                const defaultImage = !item.images.length > 0 && Object.values(item && item.colorImages)[0];
              return (
                <div                  
                  key={item._id}
                >
                  <div className="relative my-[10px] p-2" data-aos="fade-up" key={item._id}>
                    <p
                      className={
                        item.sale
                          ? "text-white bg-red-600 inline p-[3px] md:px-2 md:py-1 absolute right-2 rounded-sm"
                          : "hidden"
                      }
                    >
                      sale
                    </p>
                    <Link href={`/collections/${item.subcategory}/product/${item._id}`}>
                    <div className="flex flex-col justify-center items-center">
                      {item.images.length > 0 && (
                        <CldImage
                          width="600"
                          height="600"
                          src={item.images[0]}
                          alt={item.name}
                        />
                      )}
                      {selectedImage ? (
                        <CldImage
                            width="600"
                            height="600"
                            src={selectedImage}
                            alt={`${item.name} ${selectedColor}`}
                            
                        />
                        ) : defaultImage ? (
                        <CldImage
                            width="600"
                            height="600"
                            src={defaultImage}
                            alt={item.name}
                        />
                        ) : null}
                      <h3 className="text-xs sm:text-sm md:text-base  mb-[10px] text-center tracking-wider text-gray-800">
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
                          Math.floor((item.sale / 100) * item.price) +
                          item.price
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
            })
            .slice(0, 8)
        ) : (
          <div className="loader w-12 mx-auto col-span-2 lg:col-span-4 border-x-black border-y-white"></div>
        )}
      </div>
      <button
        className="bg-black px-6 py-3 text-white w-max rounded-md tracking-widest text-sm"
        onClick={() =>
          router.push(`/collections/${data ? data[0].subcategory : null}`)
        }
      >
        VIEW ALL
      </button>
    </section>
  );
}

export default EachCategory;
