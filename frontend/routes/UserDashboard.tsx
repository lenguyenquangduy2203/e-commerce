import { h, Fragment } from "preact";

export default function UserDashboard() {
  return (
    <Fragment>
      {/* Background Image with Gradient Overlay */}
      <div class="fixed inset-0 bg-cover bg-center z-[-1]">
        <div
          class="absolute inset-0 bg-gradient-to-b from-blue-500/50 to-blue-700/70"
          style="background-image: url('/images/background/background3.jpg');"
        ></div>
      </div>

      {/* Navbar */}
      <header class="flex items-center justify-between px-10 py-6 shadow-md bg-white bg-opacity-90 fixed top-0 left-0 w-full z-50">
        <div class="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <img src="/images/logo/online-shop.png" class="w-8 h-8" alt="Logo" />
          <span>User Dashboard</span>
        </div>
        <nav class="space-x-6 text-sm font-medium text-gray-700">
          <a href="#" class="hover:text-black">Home</a>
          <a href="#" class="hover:text-black">Orders</a>
          <a href="#" class="hover:text-black">Profile</a>
          <a href="#" class="hover:text-black">Settings</a>
        </nav>
        <div class="space-x-3 text-gray-600">
          <a href="/SignOut" class="hover:text-black">Sign Out</a>
        </div>
          <div class="space-x-3 text-gray-600">
          <button class="hover:text-black">👤</button>
          <button class="hover:text-black">🌙</button>
        </div>
      </header>

      {/* Hero Section */}
      <main class="pt-40 pb-20 text-center relative z-10 px-4">
        <h1 class="text-5xl font-extrabold text-white mb-6 drop-shadow">
          Welcome to Your Dashboard
        </h1>
        <p class="text-gray-100 mb-10 max-w-xl mx-auto">
          Manage your account, view your orders, and explore more features.
        </p>

        {/* Featured Actions */}
        <div class="flex justify-center flex-wrap gap-6 mb-10">
          <a
            href="/Orders"
            class="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View Orders
          </a>
          <a
            href="/Profile"
            class="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Edit Profile
          </a>
          <a
            href="/Settings"
            class="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Account Settings
          </a>
        </div>

        {/* Featured Images (Placeholder items) */}
        <div class="flex justify-center flex-wrap gap-4 mb-10">
          <img
            src="/images/items/halibuton_shoes.png"
            class="w-24 md:w-28 rounded-xl shadow-lg"
            alt="Product 1"
          />
          <img
            src="/images/items/lameloxpuma.png"
            class="w-24 md:w-28 rounded-xl shadow-lg"
            alt="Product 2"
          />
          <img
            src="/images/items/palermopride.png"
            class="w-24 md:w-28 rounded-xl shadow-lg"
            alt="Product 3"
          />
          <img
            src="/images/items/pumaxaries.png"
            class="w-24 md:w-28 rounded-xl shadow-lg"
            alt="Product 4"
          />
          <img
            src="/images/items/speedcat.png"
            class="w-24 md:w-28 rounded-xl shadow-lg"
            alt="Product 5"
          />
        </div>

        {/* Call to Actions */}
        <div class="space-x-4">
          <a
            href="/"
            class="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Go to Homepage
          </a>
          <a
            href="/SignOut"
            class="bg-red-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-700 transition"
          >
            Sign Out
          </a>
        </div>
      </main>
    </Fragment>
  );
}