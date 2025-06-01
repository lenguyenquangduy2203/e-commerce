import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchInstance } from "../config/fetchInstance.ts";

export default function OrderHistoryIsland() {
  const [orders, setOrders] = useState<{
    id: number;
    total_price: number;
    status: string;
    create_at: string;
  }[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetchInstance(`/api/orders`);
        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div class="min-h-screen flex flex-col bg-transparent">
      <div class="border border-blue-200 p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition mt-10 max-w-3xl mx-auto w-full flex flex-col items-center">
        <h1 class="text-3xl font-extrabold mb-6 text-blue-900 text-center drop-shadow">Order History</h1>
        {error && <p class="text-red-500 text-center mb-4">{error}</p>}
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Example order card */}
          <li class="border border-blue-200 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition mb-2">
            <h2 class="text-xl font-semibold text-blue-800 mb-2">Order #12345</h2>
            <p class="text-gray-900 font-bold mb-1"><strong>Total:</strong> $199.99</p>
            <p class="text-gray-700 mb-1"><strong>Status:</strong> Delivered</p>
            <p class="text-gray-700"><strong>Date:</strong> 2025-05-30</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
