import Allorders from "@/components/Dashboard/Allorders";
import { getAllOrders } from "@/lib/data/orders";

export const dynamic = "force-dynamic";

export default async function Page() {
  let orders = [];

  try {
    orders = await getAllOrders();
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
  }

  return <Allorders data={orders} />;
}
