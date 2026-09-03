import Home from "@/components/Home/GetHomeData";
import { getAllProducts } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export default async function page() {
  let data = [];

  try {
    data = await getAllProducts();
  } catch (error) {
    console.error("Failed to load products:", error.message);
  }

  return (
    <section>
      <Home data={data} />
    </section>
  );
}
