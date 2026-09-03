import axios from 'axios'
import React from 'react'
import Allorders from '@/components/Dashboard/Allorders'
import { getApiBaseUrl } from "@/lib/apiBaseUrl"

async function getOrders() {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/api/getorder`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return { orders: [] }; // fallback to empty array
  }
}

export default async function Page() {
  const orders = await getOrders();

  return (
    <Allorders data={orders.orders} />
  );
}
