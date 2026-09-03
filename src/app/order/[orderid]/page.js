import Order from "@/components/Checkout/Order";
import { notFound } from "next/navigation";
import { getOrderByNumber } from "@/lib/data/orders";

export const dynamic = "force-dynamic";

export default async function page({ params }) {
  const { orderid } = await params;

  try {
    const data = await getOrderByNumber(orderid);
    if (data) {
      return (
        <div>
          <Order data={data} />
        </div>
      );
    }
  } catch (error) {
    console.error("Failed to load order:", error.message);
  }

  notFound();
}
