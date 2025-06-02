import { h } from "preact";
import OrderHistoryIsland from "../islands/OrderHistoryIsland.tsx";

export default function OrderHistory() {
  return (
    <div class="relative min-h-screen flex flex-col product-bg">
      <header class="flex items-center justify-between px-10 py-6 shadow-md bg-white bg-opacity-90 fixed top-0 left-0 w-full z-50">
        <div class="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <img src="/images/logo/online-shop.png" class="w-8 h-8" alt="Logo" />
          <span>IShopping</span>
        </div>
        <nav class="space-x-6 text-sm font-medium text-gray-700">
          <a href="UserDashboard" class="hover:text-black">Home</a>
          <a href="product" class="hover:text-black">Products</a>
          <a href="order" class="hover:text-black">Orders</a>
          <a href="userProfile" class="hover:text-black">Profile</a>
          <a href="cart" class="hover:text-black">Cart</a>
          <a href="setting" class="hover:text-black">Settings</a>
        </nav>
        <div class="space-x-3 text-gray-600">
          <a href="/cart" class="hover:text-black">🛒</a>
          <a href="/userProfile" class="hover:text-black">👤</a>
        </div>
      </header>
      <main class="flex-1 flex items-center justify-center pt-32">
        <div class="bg-white/70 rounded-2xl shadow-2xl px-10 py-10 w-full max-w-4xl">
          <OrderHistoryIsland />
        </div>
      </main>
    </div>
  );
}
