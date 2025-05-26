import { h, Fragment } from "preact";

export default function Home() {
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
          <span>IShopping</span>
        </div>
        <nav class="space-x-6 text-sm font-medium text-gray-700">
          <a href="/" class="hover:text-black">Home</a>
          <a href="/product" class="hover:text-black">Products</a>
          <a href="/order" class="hover:text-black">Orders</a>
          <a href="/userProfile" class="hover:text-black">Profile</a>
        </nav>
        <div class="space-x-3 text-gray-600">
          <button class="hover:text-black">👤</button>
          <button class="hover:text-black">🌙</button>
        </div>
      </header>

      {/* Hero Section */}
      <main class="pt-40 pb-20 text-center relative z-10 px-4">
        <h1 class="text-5xl font-extrabold text-white mb-6 drop-shadow">
          Welcome to IShopping <br />
          <span class="text-white">masterpiece.</span>
        </h1>
        <p class="text-gray-100 mb-10 max-w-xl mx-auto">
          Artists can display their masterpieces, and buyers can discover and explore.
        </p>

        {/* Featured Images (Placeholder items) */}
        <div class="flex justify-center flex-wrap gap-4 mb-10">
          <img src="/images/items/halibuton_shoes.png" class="w-24 md:w-28 rounded-xl shadow-lg" alt="Product 1" />
          <img src="/images/items/lameloxpuma.png" class="w-24 md:w-28 rounded-xl shadow-lg" alt="Product 2" />
          <img src="/images/items/palermopride.png" class="w-24 md:w-28 rounded-xl shadow-lg" alt="Product 3" />
          <img src="/images/items/pumaxaries.png" class="w-24 md:w-28 rounded-xl shadow-lg" alt="Product 4" />
          <img src="/images/items/speedcat.png" class="w-24 md:w-28 rounded-xl shadow-lg" alt="Product 5" />
        </div>

        {/* Call to Actions */}
        <div class="space-x-4">
          <a
            href="/SignIn"
            class="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Sign In Now
          </a>
          <a
            href="/SignUp"
            class="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Haven't got an account? Sign Up Now
          </a>
        </div>
      </main>
    </Fragment>
  );
}
