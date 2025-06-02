import { h } from "preact";
import SettingIsland from "../islands/settingIsland.tsx";

export default function SettingPage() {
  return (
    <div class="min-h-screen bg-blue-50 flex flex-col">
      <header class="px-8 py-6 bg-white shadow flex items-center justify-between">
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
      </header>
      <main class="flex-1 flex flex-col items-center justify-center">
        <SettingIsland />
      </main>
    </div>
  );
}
