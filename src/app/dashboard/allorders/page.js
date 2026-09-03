import axios from 'axios'
import React from 'react'
import Allorders from '@/components/Dashboard/Allorders'
import { getApiBaseUrl } from "@/lib/apiBaseUrl"

export const dynamic = "force-dynamic";

async function getOrders() {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/api/getorder`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    return { orders: [] }; // fallback to empty array
  }
}

export default async function Page() {
  const orders = await getOrders();

  return (
    <Allorders data={orders.orders} />
  );
}
