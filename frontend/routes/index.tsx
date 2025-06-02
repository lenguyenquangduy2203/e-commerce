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
        <div class="space-x-3 text-gray-600">
          <button class="hover:text-black">👤</button>
          <button class="hover:text-black">🌙</button>
        </div>
      </header>

      {/* Hero Section */}
      <main class="pt-40 pb-20 text-center relative z-10 px-4">
        <h1 class="text-5xl font-extrabold text-white mb-6 drop-shadow">
          Welcome to IShopping <br />
          <span class="text-white">platform.</span>
        </h1>
        <p class="text-gray-100 mb-10 max-w-xl mx-auto">
          Discover the latest trends in fashion and lifestyle. Shop now for exclusive deals and unique items that
          elevate your style. Join our community of fashion enthusiasts and enjoy a seamless shopping experience.
        </p>

        {/* Featured Images (Styled Product Cards) */}
        <div class="flex justify-center flex-wrap gap-6 mb-10">
          {/* Product 1 */}
          <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex flex-col items-center w-32 md:w-36 transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <img src="/images/items/halibuton_shoes.png" class="w-20 md:w-24 rounded-xl mb-2" alt="Product 1" />
            <span class="text-xs text-gray-700 font-medium mt-1">Halibuton Shoes</span>
          </div>
          {/* Product 2 */}
          <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex flex-col items-center w-32 md:w-36 transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <img src="/images/items/lameloxpuma.png" class="w-20 md:w-24 rounded-xl mb-2" alt="Product 2" />
            <span class="text-xs text-gray-700 font-medium mt-1">LaMelo x Puma</span>
          </div>
          {/* Product 3 */}
          <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex flex-col items-center w-32 md:w-36 transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <img src="/images/items/palermopride.png" class="w-20 md:w-24 rounded-xl mb-2" alt="Product 3" />
            <span class="text-xs text-gray-700 font-medium mt-1">Palermo Pride</span>
          </div>
          {/* Product 4 */}
          <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex flex-col items-center w-32 md:w-36 transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <img src="/images/items/pumaxaries.png" class="w-20 md:w-24 rounded-xl mb-2" alt="Product 4" />
            <span class="text-xs text-gray-700 font-medium mt-1">Puma x Aries</span>
          </div>
          {/* Product 5 */}
          <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex flex-col items-center w-32 md:w-36 transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <img src="/images/items/speedcat.png" class="w-20 md:w-24 rounded-xl mb-2" alt="Product 5" />
            <span class="text-xs text-gray-700 font-medium mt-1">Speedcat</span>
          </div>
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
