import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchInstance } from "../config/fetchInstance.ts";

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
      const response = await fetchInstance(`/api/orders`);
      const data = await response.json();
      setOrders(data.orders);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  }

  return (
    <div class="relative min-h-screen flex flex-col bg-gray-100">
      {/* Navbar/Menu */}
      <header class="relative z-10 flex items-center justify-between px-10 py-6 shadow-md bg-white bg-opacity-90 w-full">
        <div class="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <img src="/images/logo/online-shop.png" class="w-8 h-8" alt="Logo" />
          <span>IShopping</span>
        </div>
        <nav class="space-x-6 text-sm font-medium text-gray-700">
          <a href="/" class="hover:text-black">Home</a>
          <a href="/product" class="hover:text-black">Products</a>
          <a href="/order" class="hover:text-black">Orders</a>
          <a href="/userProfile" class="hover:text-black">Profile</a>
        </nav>
        <div class="space-x-3 text-gray-600">
          <a href="/cart" class="hover:text-black">🛒</a>
          <a href="/userProfile" class="hover:text-black">👤</a>
        </div>
      </header>

      <main class="flex-grow p-6">
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
      </main>
    </div>
  );
}
