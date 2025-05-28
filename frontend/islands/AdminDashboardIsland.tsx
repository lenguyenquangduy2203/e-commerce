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
  // description is NOT part of ProductSummaryResponse, so it's omitted
}

// Define the type for the paginated response from the backend search endpoint
interface PaginatedResponse {
    content: ProductSummary[]; // list of products
    totalPages: number;
    totalElements: number;
}

export default function AdminDashboardIsland() {
  // Updated products state type to match ProductSummary interface
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string>("");

 // Added 'description' field to newProduct state, and updated amount/stock_quantity to match backend
  const [newProduct, setNewProduct] = useState({
    name: "",
    model: "",
    description: "", // Added description field
    price: "", // Changed from 'amount' to 'price'
    currency: "",
    stockQuantity: "", // Changed from 'stock_quantity' to 'stockQuantity'
    category: "",
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(query = "") {
    setError(""); // Clear previous errors
    try {
      // Corrected API path to /products/search
      // Pass search query as 'keyword' parameter for general search
      // Added default pagination and sorting parameters
      const response = await fetchInstance(
        `/products/search?keyword=${encodeURIComponent(query)}&page=0&size=10&sortBy=name&sortDirection=asc`
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error || "Failed to fetch products.";
        throw new Error(errorMessage);
      }
      
      const data: PaginatedResponse = await response.json();
      // Extract products from the 'content' field of the paginated response
      if (data && data.content) {
        setProducts(data.content);
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
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchProducts(searchQuery);
    } else {
      fetchProducts();
    }
  }, [searchQuery]);

  function handleDeleteFromSearch(productId: number) {
    handleRemoveProduct(productId);
  }
  async function handleAddProduct(e: Event) {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      // Corrected API path to /products
      const response = await fetchInstance(`/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          model: newProduct.model,
          description: newProduct.description, // Include description
          price: Number(newProduct.price), // Changed from 'amount' to 'price'
          currency: newProduct.currency,
          stockQuantity: Number(newProduct.stockQuantity), // Changed from 'stock_quantity' to 'stockQuantity'
          category: newProduct.category,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error || "Failed to add product.";
        throw new Error(errorMessage);
      }

      setNewProduct({ name: "", model: "", amount: "", currency: "", stock_quantity: "", category: "" });
      fetchProducts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    } finally {
      setAdding(false);
    }
  }

  async function handleRemoveProduct(productId: number) {
    setError(""); // Clear previous errors
    try {
      // Corrected API path to /products/{id}
      const response = await fetchInstance(
        `/products/${productId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error || "Failed to delete product.";
        throw new Error(errorMessage);
      }
      fetchProducts();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      console.error("Delete Product Error:", err);
    }
  }

  // Not touch the rest of the code, just the fetchProducts function to ensure it works with the new backend response structure.
  return (
    <div class="relative min-h-screen flex flex-col bg-cover bg-center" style="background-image: url('/images/background/background3.jpg');">
      <div class="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-200/60 z-0"></div>
      {/* Navbar/Menu */}
      <header class="relative z-10 flex items-center justify-between px-10 py-6 shadow-md bg-white bg-opacity-90 w-full">
        <div class="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <img src="/images/logo/online-shop.png" class="w-8 h-8" alt="Logo" />
          <span>IShopping Admin</span>
        </div>
        <nav class="space-x-6 text-sm font-medium text-gray-700">
          <a href="/" class="hover:text-black">Home</a>
          <a href="/product" class="hover:text-black">Products</a>
          <a href="/order" class="hover:text-black">Orders</a>
          <a href="/userProfile" class="hover:text-black">Profile</a>
        </nav>
        <div class="space-x-3 text-gray-600">
          <button class="hover:text-black" type="button">👤</button>
        </div>
      </header>
      <main class="relative z-10 flex-1 p-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        {error && <p class="text-red-600 text-sm mb-4">{error}</p>}
        {/* Add Product Form */}
        <form class="bg-white rounded-lg shadow-md p-6 mb-8 max-w-xl mx-auto" onSubmit={handleAddProduct}>
          <h2 class="text-xl font-bold mb-4 text-blue-700">Add Product</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input class="border rounded px-3 py-2" required placeholder="Name" value={newProduct.name} onInput={e => setNewProduct({ ...newProduct, name: (e.target as HTMLInputElement).value })} />
            <input class="border rounded px-3 py-2" required placeholder="Model" value={newProduct.model} onInput={e => setNewProduct({ ...newProduct, model: (e.target as HTMLInputElement).value })} />
            <input class="border rounded px-3 py-2" required placeholder="Amount" type="number" min="0" value={newProduct.amount} onInput={e => setNewProduct({ ...newProduct, amount: (e.target as HTMLInputElement).value })} />
            <input class="border rounded px-3 py-2" required placeholder="Currency" value={newProduct.currency} onInput={e => setNewProduct({ ...newProduct, currency: (e.target as HTMLInputElement).value })} />
            <input class="border rounded px-3 py-2" required placeholder="Stock Quantity" type="number" min="0" value={newProduct.stock_quantity} onInput={e => setNewProduct({ ...newProduct, stock_quantity: (e.target as HTMLInputElement).value })} />
            <input class="border rounded px-3 py-2" required placeholder="Category" value={newProduct.category} onInput={e => setNewProduct({ ...newProduct, category: (e.target as HTMLInputElement).value })} />
          </div>
          <button type="submit" class="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition" disabled={adding}>{adding ? "Adding..." : "Add Product"}</button>
        </form>
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
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}