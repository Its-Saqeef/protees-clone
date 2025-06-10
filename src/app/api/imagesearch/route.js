import connectDB from "@/lib/Connection";
import { NextResponse } from "next/server";
import { Product } from "@/components/Backend/models/Product.models";
import axios from "axios";

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

export async function POST(request) {
    try {
        await connectDB()
        const body=await request.formData()
        const image=body.get("image")
        if (!image) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        
        const page=parseInt(request.nextUrl.searchParams.get("page")) || 1
        const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 10

        const min_price = request.nextUrl.searchParams.get("min_price")
        const max_price = request.nextUrl.searchParams.get("max_price")
        const availability = request.nextUrl.searchParams.get("availability") || 1
        
        const startIndex=(page -1)* limit
        const endIndex=startIndex + limit
        
        const embeddings = async ()=>{
              const form=new FormData()
              form.append("image",image)
               const response=await axios.post("http://localhost:5000/embed",form).then((res)=>res)
               return response.data.embedding
        }

        const embedding =await embeddings()

        let searchQuery = {};

       if (min_price && max_price) {
           searchQuery.price = { $gte: min_price, $lte: max_price };
       }

       if (availability == 1) {
           searchQuery.sizes = { $elemMatch: { quantity: { $gt: 0 } } };
       } else if (availability == 0) {
           searchQuery.sizes = { $elemMatch: { quantity: { $lte: 0 } } };
       }

        const products =await Product.find(searchQuery)
        const scored = products.map(product => {
            return {
            ...product.toObject(),
            score: cosineSimilarity(embedding, product.embedding),
            };
        }).filter(p => p.score >= 0.87)
        .sort((a, b) => b.score - a.score)
        
        const paginated=scored.slice(startIndex,endIndex)
        const totalItems=scored.length
        const totalPages = Math.ceil(totalItems/limit)

        return NextResponse.json({
            success : true,
            data : paginated,
            pagination : {
                totalItems,
                totalPages,
                currentPage : page,
                
            }
        })
    } catch (error) {
         return NextResponse.json({
            success : false,
            error : "Something went wrong"
        },{status : 500})
    }
}