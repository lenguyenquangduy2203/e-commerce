import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const BACKEND_URL = "http://catalog-backend:8080";

export default function UserDashboardIsland() {
  const [orders, setOrders] = useState<{
    id: number;
    total_price: number;
    status: string;
    create_at: string;
  }[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/orders`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }
      const data = await response.json();
      setOrders(data.orders);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  }

  return (
    <div class="p-6 bg-gray-100 min-h-screen">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>
      {error && <p class="text-red-600 text-sm mb-4">{error}</p>}

      {/* Order List */}
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <li key={order.id} class="bg-white shadow-md rounded-lg p-4">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Order #{order.id}</h2>
            <p class="text-sm text-gray-600"><strong>Total:</strong> ${order.total_price}</p>
            <p class="text-sm text-gray-600"><strong>Status:</strong> {order.status}</p>
            <p class="text-sm text-gray-600"><strong>Date:</strong> {new Date(order.create_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
