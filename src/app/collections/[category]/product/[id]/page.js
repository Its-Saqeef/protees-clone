import Product from "@/components/Product";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export default async function page({ params }) {
  const { id } = await params;

  try {
    const result = await getProductById(id);
    if (result?.product?.isActive) {
      return <Product data={result.product} reviews={result.reviews || []} />;
    }
  } catch (error) {
    console.error("Failed to load product:", error.message);
  }

  notFound();
}
