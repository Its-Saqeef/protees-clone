"use client";
import axios from "axios";
import React, { useState,useRef, useEffect } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {
  useEffect(()=>{
    document.title="Add Product - Protees.pk"
  },[])
  const [colorImages, setColorImages] = useState({});
  const [colorSizeQuantities, setColorSizeQuantities] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    subcategory: "",
    sale: 0,
    composition: "",
    sizes: [],
    images : [],
    colors: [],
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
    } else if (name === "color-image") {
    const colorName = e.target.dataset.color;
    const file = e.target.files[0];
    setColorImages((prev) => ({
      ...prev,
      [colorName]: file,
    }))
    }
     else {
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
    Object.entries(colorImages).forEach(([color, file]) => {
    form.append(`colorImages[${color}]`, file);
  });

    form.append("colorSizeQuantities", JSON.stringify(colorSizeQuantities))

    const response = await axios
      .post("/api/addproduct", form)
      .then((res) =>
        res.data.message === "Success"
          ? toast.success("Product Added Successfully")
          : toast.error(res.data.message)
      )
      .catch((err) => toast.error("Could not Add Product"));
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
    setColorImages({});
     setIsLoading(false);
  };

  const handleColorSizeQuantityChange = (color, size, value) => {
  setColorSizeQuantities(prev => {
    const existingIndex = prev.findIndex(entry => entry.color === color);

    if (existingIndex !== -1) {
      // Update existing color's size quantity
      const updated = [...prev];
      updated[existingIndex] = {
        ...updated[existingIndex],
        sizes: {
          ...updated[existingIndex].sizes,
          [size]: parseInt(value)
        }
      };
      return updated;
    } else {
      // Add new color entry with all sizes defaulted to 0
      return [
        ...prev,
        {
          color,
          sizes: {
            SMALL: 0,
            MEDIUM: 0,
            LARGE: 0,
            XL: 0,
            XXL: 0,
            [size]: parseInt(value)  // override one size with given value
          }
        }
      ];
    }
  });
}

const getSizeValue = (color, size) => {
  const entry = colorSizeQuantities.find((e) => e.color === color);
  return entry?.sizes?.[size] ?? "";
}

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10 ">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Create New Product
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
            min={0}
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
            // onChange={(e) => setImage(e.target.files?.[0])}
            // ref={imageRef}
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
                  min={0}
                  name={size}
                  placeholder="Quantity"
                  className="w-20 p-2 mt-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <label
            htmlFor="colors"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Colors(Comma separated)
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

        {/* Per-Color Images */}
        {formData.colors.length > 0 && (
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-600 mb-2">
                Upload Image for Each Color
              </label>
              <div className="space-y-4">
                {formData.colors.map((color) => (
                  <div key={color} className="border p-4 rounded-md">
                    <div className="flex items-center gap-4 mb-2">
                      <label className="w-24 text-gray-700 capitalize">{color}</label>
                      <input
                        type="file"
                        name="color-image"
                        data-color={color}
                        accept="image/*"
                        className="border border-gray-300 p-2 rounded-md"
                        onChange={handleChange}
                        
                      />
                      {colorImages[color] && (
                        <img
                          src={URL.createObjectURL(colorImages[color])}
                          alt={`${color} preview`}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-5 gap-4 mt-4">
                      {["SMALL", "MEDIUM", "LARGE", "XL", "XXL"].map((size) => (
                        <div key={size} className="flex flex-col items-center">
                          <label className="text-gray-700 text-sm">{size}</label>
                          <input
                            type="number"
                            min="0"
                            className="w-20 p-2 mt-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={
                             getSizeValue(color, size)
                            }
                            onChange={(e) =>
                              handleColorSizeQuantityChange(color, size, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


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
              "Submit Product"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProductForm;
