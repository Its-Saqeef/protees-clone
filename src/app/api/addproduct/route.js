import connectDB from "@/lib/Connection.js";
import { Product } from "@/components/Backend/models/Product.models";

export async function POST(request) {
  await connectDB();

  try {
    const data = await request.formData();

    const name = data.get("name");
    const sizes = JSON.parse(data.get("sizes"));
    const description = data.get("description");
    const category = data.get("category");
    const subcategory = (data.get("subcategory")).toLowerCase();
    const colors = JSON.parse(data.get("colors")); 
    const composition = data.get("composition");
    const price = parseInt(data.get("price"));
    const sale = parseInt(data.get("sale"));
   const images = data.getAll("images[]")

    if(!images.length){
      return Response.json({
        message : "Please Upload Photo"
      })
    }
    
    const imageUrls=[]
    for (let image of images) {
    const formdata = new FormData();
    formdata.append('file',image)
    formdata.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);
    formdata.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);

    let response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formdata,
      }
    )
      .then((res) => res.json())
      .then((result) => result.public_id)
      .catch((error) => console.log("could not upload to cloudinary", error));
      imageUrls.push(response)
    }
  
    let newComposition = composition.split(",")
    
    
    await Product.create({
      name,
      price,
      sizes,
      description,
      category,
      subcategory,
      sale,
      composition: newComposition,
      images: imageUrls,
      colors,
    })
    
    return Response.json({
      message: "Success"
    })
  } catch (error) {
    return Response.json({
      message: "Could Not Enter Data",
    });
  }
}
