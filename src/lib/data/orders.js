import connectDB from "@/lib/Connection";
import { Order } from "@/components/Backend/models/Order.models";
import { serialize } from "@/lib/serialize";

export async function getAllOrders() {
  await connectDB();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
  return serialize(orders);
}

export async function getOrderByNumber(orderNumber) {
  await connectDB();
  const order = await Order.findOne({ orderNumber }).lean();
  return order ? serialize(order) : null;
}
