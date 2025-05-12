import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

export default function OrderHistory() {
  const [orders, setOrders] = useState<{ id: number; total_price: number; status: string; create_at: string; }[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders");
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
    fetchOrders();
  }, []);

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Order History</h1>
      {error && <p class="text-red-500">{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id} class="mb-4">
            <div class="border p-4 rounded">
              <h2 class="text-lg font-semibold">Order #{order.id}</h2>
              <p>Total: ${order.total_price}</p>
              <p>Status: {order.status}</p>
              <p>Date: {new Date(order.create_at).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
