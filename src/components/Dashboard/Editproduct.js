"use client";
import axios from "axios";
import React, { useState,useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";
import { CldImage } from "next-cloudinary";


const Editproduct = ({setEditPage,editPage,product}) => {
  useEffect(()=>{
    document.title="Add Product - Protees.pk"
  },[])
  const [formData, setFormData] = useState({
    id : product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory,
    sale: product.sale,
    composition:product.composition ,
    sizes: product.sizes,
    images : [],
    colors: [],
    status : product.isActive
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name } = e.target;
    if (
      name === "SMALL" ||
      name === "MEDIUM" ||
      name === "LARGE" ||
      name === "XL" ||
      name === "XXL"
    ) {
      setFormData((prevData) => {
        const updatedSizes = prevData.sizes.some((item) => item.size === name)
          ? prevData.sizes.map((item) =>
              item.size === name ? { ...item, quantity: e.target.value } : item
            )
          : [...prevData.sizes, { size: name, quantity: e.target.value }];
  
        return { ...prevData, sizes: updatedSizes };
      });
    }
    
      else if(name==="images"){
        const selectedFiles = Array.from(e.target.files)
        setFormData((prevData)=>{
          return {...prevData,images : [...prevData.images,...selectedFiles]}
        })
    }
    else if (name === "colors") {
      const value = e.target.value;
      const array = value.split(",");
      setFormData({ ...formData, colors: array });
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    form.append("id",formData.id)
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("subcategory", formData.subcategory.toLowerCase());
    form.append("sale", formData.sale);
    form.append("composition", formData.composition);
    form.append("sizes", JSON.stringify(formData.sizes));
    form.append("colors", JSON.stringify(formData.colors));
    for (let index = 0; index < formData.images.length; index++) {
      form.append(`images[]`,formData.images[index])
    }

    const response = await axios
      .post("/api/updateproduct", form)
      .then((res) =>
        res.data.success === true && toast.success("Product Updated")
      )
      .catch((err) => toast.error("Could not Update Product"));
      setFormData({
        name: "",
    price: "",
    description: "",
    category: "",
    subcategory: "",
    sale: 0,
    composition: "",
    sizes: [],
    colors: [],
    images : []
      })
     setIsLoading(false);
  };

  return (
    <main className={`${editPage && "fixed inset-0 bg-black bg-opacity-30 overflow-y-scroll"}`}>
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-between">
        Edit Product
        <IoCloseSharp onClick={()=>setEditPage(false)} className="cursor-pointer"/>
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            value={formData.price}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            value={formData.category}
          />
        </div>

        {/* Subcategory */}
        <div className="mb-4">
          <label
            htmlFor="subcategory"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Subcategory
          </label>
          <input
            type="text"
            id="subcategory"
            name="subcategory"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            value={formData.subcategory}
          />
        </div>

        {/* Sale Percentage */}
        <div className="mb-4">
          <label
            htmlFor="sale"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Sale Percentage
          </label>
          <input
            type="number"
            id="sale"
            name="sale"
            min="0"
            max="100"
            placeholder="Enter Sale Percentage"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            value={formData.sale}
          />
        </div>

        {/* Composition */}
        <div className="mb-4">
          <label
            htmlFor="composition"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Composition
          </label>
          <input
            type="text"
            id="composition"
            name="composition"
            placeholder="e.g. Cotton, Polyester"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            value={formData.composition}
          />
        </div>

        {/* Images */}
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            placeholder="Upload Images"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            multiple
          />
          <div className="flex gap-4 items-center my-4">
          {
            formData.images.map((img,i)=>{
               const url= URL.createObjectURL(img)
               return <img src={url} alt="photo" height={100} width={100} key={i} />
             })
          }
          </div>
          <p>Exisitng Images</p>
          <div className="flex gap-4">
            {
                product.images.map((img,i)=>{
                    return <CldImage src={img} alt="photo" height={100} width={100} key={i}/>
                })
            }
          </div>
        </div>

        {/* Sizes and Quantities */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 mb-2">
            Sizes and Quantities
          </label>
          <div className="grid grid-cols-5 gap-4">
            {["SMALL", "MEDIUM", "LARGE", "XL", "XXL"].map((size) => (
              <div key={size} className="flex flex-col items-center">
                <label className="text-gray-700">{size}</label>
                <input
                  type="number"
                  name={size}
                  placeholder="Quantity"
                  className="w-20 p-2 mt-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onChange={handleChange}
                  
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-evenly mt-5">
          {
            product.sizes.map((item,i)=>{
                return <span key={i}>{item.size}{item.quantity}</span>
            })
          }
          </div>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <label
            htmlFor="colors"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Colors
          </label>
          <input
            type="text"
            id="colors"
            name="colors"
            placeholder="e.g. Red, Blue, Green"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={handleChange}
            value={formData.colors}
          />
        </div>
        {/* Status */}

        <p>Status</p>
        <div className="flex gap-2">
          <label >Active</label><input type="radio"  name="status" checked={formData.status===true} onChange={(e)=>setFormData({...formData,status : true})}/>
          <label >Disable</label><input type="radio" name="status" checked={formData.status===false} onChange={(e)=>setFormData({...formData,status : false})}/>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-red-700 text-white text-lg rounded-md hover:bg-red-500 transition duration-300"
          >
            {isLoading ? (
              <div className="loader mx-auto"></div>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </section>
    </main>
  );
};

export default Editproduct;
