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
    <section class="relative z-10 flex-1 p-6 max-w-3xl mx-auto w-full mt-10 flex flex-col items-center">
      <div class="bg-white/90 rounded-2xl shadow-2xl px-12 py-8 mb-10 mt-4 max-w-2xl w-full flex flex-col items-center">
        <h1 class="text-3xl font-extrabold mb-2 text-blue-900 text-center drop-shadow">Order History</h1>
      </div>
      {error && <p class="text-red-600 text-sm mb-4 text-center">{error}</p>}
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <li key={order.id} class="bg-white shadow-md rounded-lg p-4">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Order #{order.id}</h2>
            <p class="text-sm text-gray-600"><strong>Total:</strong> ${order.total_price}</p>
            <p class="text-sm text-gray-600"><strong>Status:</strong> {order.status}</p>
            <p class="text-sm text-gray-600"><strong>Date:</strong> {order.create_at}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
