import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchInstance } from "../config/fetchInstance.ts";

export default function ProductIsland() {
  const [products, setProducts] = useState<{
    id: number;
    name: string;
    model: string;
    description: string; // This field is not in ProductSummaryResponse, will be undefined.
    amount: number; // Backend uses 'price', this will be undefined.
    currency: string;
    stock_quantity: number; // Backend uses 'stockQuantity', this will be undefined.
    category: string;
  }[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetchInstance(`/products/search`); // Adjust the endpoint
        // backend's /products/search endpoint returns a paginated response (Page<ProductSummaryResponse>), where the actual list of products is nested under a content field. The current frontend expects a direct data.products array.
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div class="relative min-h-screen flex flex-col product-bg">
      <div class="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-200/60 z-0"></div>
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
      <div class="relative z-10 w-full max-w-3xl mx-auto p-8 mt-24 rounded-2xl shadow-2xl bg-white/80 backdrop-blur">
        <h1 class="text-3xl font-extrabold mb-6 text-blue-900 text-center drop-shadow">Product List</h1>
        {error && <p class="text-red-500 text-center mb-4">{error}</p>}
        <ul>
          {products.map((product) => (
            <li key={product.id} class="mb-6">
              <div class="border border-blue-200 p-6 rounded-xl bg-white/90 shadow-md hover:shadow-lg transition">
                <h2 class="text-xl font-semibold text-blue-800 mb-2">{product.name}</h2>
                <p class="text-gray-700 mb-1"><strong>Model:</strong> {product.model}</p>
                <p class="text-gray-700 mb-1"><strong>Description:</strong> {product.description}</p>
                <p class="text-gray-900 font-bold mb-1"><strong>Price:</strong> {product.amount} {product.currency}</p>
                <p class="text-gray-700 mb-1"><strong>Stock:</strong> {product.stock_quantity}</p>
                <p class="text-gray-700"><strong>Category:</strong> {product.category}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
