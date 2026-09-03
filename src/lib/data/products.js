import connectDB from "@/lib/Connection";
import { Product } from "@/components/Backend/models/Product.models";
import { Reviews } from "@/components/Backend/models/Reviews.models";
import { serialize } from "@/lib/serialize";

export async function getAllProducts() {
  await connectDB();
  const products = await Product.find({}).lean();
  return serialize(products);
}

export async function getProductById(id) {
  await connectDB();
  const [product, reviews] = await Promise.all([
    Product.findById(id).lean(),
    Reviews.find({ productId: id }).lean(),
  ]);

  if (!product) {
    return null;
  }

  return {
    product: serialize(product),
    reviews: serialize(reviews),
  };
}
