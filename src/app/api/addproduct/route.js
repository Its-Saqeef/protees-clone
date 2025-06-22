import connectDB from "@/lib/Connection.js";
import { Product } from "@/components/Backend/models/Product.models";
import {generateImageEmbedding} from "@/lib/embedding"
import axios from "axios";


export async function POST(request) {
  await connectDB();

  try {
    const data = await request.formData();
    console.log(data)
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
   const colorSizeQuantities = JSON.parse(data.get("colorSizeQuantities"))

    const colorImageMap={}

    for(const color of colors){
      const file = data.get(`colorImages[${color}]`)
      if(file){
        const colorFormData = new FormData()
        colorFormData.append("file", file)
        colorFormData.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`)
        colorFormData.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`)

        try {
          const result = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: colorFormData,
          }
        ).then((res) => res.json()).catch(("Error Uploading Image"))

        colorImageMap[color] = result.public_id
        

        } catch (error) {
          console.log(`Could not upload ${color} image to Cloudinary`, error)
        }
      }
    }

    // const embeddings = async ()=>{
    //   const form=new FormData()
    //   form.append("image",images[0])
    //    const response=await axios.post("http://localhost:5000/embed",form).then((res)=>res)
    //    return response.data.embedding
    // }

    // const embedding =await embeddings()

    const embedding = []

    const imageUrls=[]
    for (let image of images) {
      if(image){
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
      embedding : embedding,
      colorImages : colorImageMap,
      colorSizeQuantities : colorSizeQuantities
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
