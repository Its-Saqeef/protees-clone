import ListProducts from "@/components/Dashboard/ListProducts";
import { getAllProducts } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export default async function page() {
  let data = [];

  try {
    data = await getAllProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
  }

  return <ListProducts data={data} />;
}
