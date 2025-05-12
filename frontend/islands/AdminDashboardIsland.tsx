import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

export default function AdminDashboardIsland() {
  const [products, setProducts] = useState<{
    id: number;
    name: string;
    model: string;
    amount: number;
    currency: string;
    stock_quantity: number;
    category: string;
  }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(query = "") {
    try {
      const response = await fetch(`/api/products?search=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  }

  async function handleRemoveProduct(productId: number) {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove product.");
      }
      fetchProducts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  }

  return (
    <div class="p-6 bg-gray-100 min-h-screen">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      {error && <p class="text-red-600 text-sm mb-4">{error}</p>}

      {/* Search Bar */}
      <div class="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          class="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => fetchProducts(searchQuery)}
          class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Product List */}
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.id} class="bg-white shadow-md rounded-lg p-4">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p class="text-sm text-gray-600"><strong>Model:</strong> {product.model}</p>
            <p class="text-sm text-gray-600"><strong>Price:</strong> {product.amount} {product.currency}</p>
            <p class="text-sm text-gray-600"><strong>Stock:</strong> {product.stock_quantity}</p>
            <p class="text-sm text-gray-600"><strong>Category:</strong> {product.category}</p>
            <button
              type="button"
              onClick={() => handleRemoveProduct(product.id)}
              class="mt-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
