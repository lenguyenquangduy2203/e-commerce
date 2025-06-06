import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchInstance } from "../config/fetchInstance.ts";

interface ProductSummary {
  id: number; // Assuming backend Long ID maps to number in JS/TS
  name: string;
  model: string;
  price: number; // Matches backend BigDecimal 'price' field
  currency: string;
  stockQuantity: number; // Matches backend 'stockQuantity' field name
  category: string;
  description?: string; // Optional for robustness
}

// Define the type for the paginated response from the backend search endpoint
interface PaginatedResponse {
    content: ProductSummary[]; // list of products
    totalPages: number;
    totalElements: number;
}

export default function ProductIsland() {
  // Updated useState type to be consistent with ProductSummary interface
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetchInstance(`/products/search`); // Adjust the endpoint
        // backend's /products/search endpoint returns a paginated response (Page<ProductSummaryResponse>),
        // where the actual list of products is nested under a content field.
        if (!response.ok) {
          const errorResponse = await response.json();
          const errorMessage = errorResponse.error || "Failed to fetch products.";
          throw new Error(errorMessage);
        }
       const data: PaginatedResponse = await response.json();
        // Corrected response handling to extract products from the 'content' field
        if (data && data.content) {
             setProducts(data.content); // No longer needs casting as types are now consistent
        } else {
            console.error("Unexpected response format:", data);
            throw new Error("Received unexpected data format from server.");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
        console.error("Product Fetch Error:", err);
      }
    }
    fetchProducts();
  }, []);
  
  // Not touch the rest of the code, just the fetchProducts function to ensure it works with the new backend response structure.
  return (
    <div class="min-h-screen flex flex-col bg-transparent">
      {/* Navbar/Menu */}
      <header class="relative z-10 flex items-center justify-between px-10 py-6 shadow-md bg-white/80 backdrop-blur-md w-full">
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
      <div class="border border-blue-200 p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition">
        <h1 class="text-3xl font-extrabold mb-6 text-blue-900 text-center drop-shadow">Product List</h1>
        {error && <p class="text-red-500 text-center mb-4">{error}</p>}
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {products.map((product) => (
            <li key={product.id} class="bg-white/90 shadow-xl rounded-2xl p-6 border border-blue-100 flex flex-col h-full transition-transform hover:-translate-y-1 hover:shadow-2xl">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-xl font-bold text-blue-800">{product.name}</h2>
                <span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-lg font-semibold">{product.category}</span>
              </div>
              <p class="text-sm text-gray-600 mb-1"><strong>Model:</strong> {product.model}</p>
              <p class="text-sm text-gray-600 mb-1"><strong>Price:</strong> {Number(product.price).toLocaleString()} {product.currency}</p>
              <p class="text-sm text-gray-600 mb-1"><strong>Stock:</strong> {Number(product.stockQuantity).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
