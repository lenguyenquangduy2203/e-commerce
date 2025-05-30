import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchInstance } from "../config/fetchInstance.ts";

interface ProductSummary {
  id: number;
  name: string;
  model: string;
  price: number; // Backend uses 'price' for price
  currency: string;
  stockQuantity: number;
  category: string;
}

interface PaginatedResponse {
  content: ProductSummary[];
  totalPages: number;
  totalElements: number;
}

export default function AdminDashboardIsland() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string>("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    model: "",
    description: "",
    price: "",
    currency: "",
    stockQuantity: "",
    category: "",
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(query = "", price = "", priceOperator = "") {
    setError("");
    try {
      let url = "/products/search?";
      const params = [];
      if (query) params.push(`name=${encodeURIComponent(query)}`);
      if (price) params.push(`price=${encodeURIComponent(price)}`);
      if (priceOperator) params.push(`priceOperator=${encodeURIComponent(priceOperator)}`);
      params.push("page=0", "size=10", "sortBy=name", "sortDirection=asc");
      url += params.join("&");
      const response = await fetchInstance(url);
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error || "Failed to fetch products.";
        throw new Error(errorMessage);
      }
      const data: PaginatedResponse = await response.json();
      if (data && data.content) {
        setProducts(data.content);
      } else {
        throw new Error("Received unexpected data format from server.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  }

  const [searchPrice, setSearchPrice] = useState("");
  const [searchPriceOperator, setSearchPriceOperator] = useState("");

  useEffect(() => {
    if (searchQuery.trim() !== "" || searchPrice !== "" || searchPriceOperator !== "") {
      fetchProducts(searchQuery, searchPrice, searchPriceOperator);
    } else {
      fetchProducts();
    }
  }, [searchQuery, searchPrice, searchPriceOperator]);

  async function handleAddProduct(e: Event) {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      const response = await fetchInstance(`/products?keyword=${encodeURIComponent(searchQuery)}` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          model: newProduct.model,
          description: newProduct.description,
          price: Number(newProduct.price),
          currency: newProduct.currency,
          stockQuantity: Number(newProduct.stockQuantity),
          category: newProduct.category,
        }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error || "Failed to add product.";
        throw new Error(errorMessage);
      }
      setNewProduct({ name: "", model: "", description: "", price: "", currency: "", stockQuantity: "", category: "" });
      fetchProducts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    } finally {
      setAdding(false);
    }
  }

  async function handleRemoveProduct(productId: number) {
    setError("");
    try {
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
    }
  }

  async function handleUpdateProduct(product: ProductSummary) {
    setError("");
    try {
      const response = await fetchInstance(`/products/${product.id}?keyword=${encodeURIComponent(searchQuery)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          model: product.model,
          price: Number(product.price),
          currency: product.currency,
          stockQuantity: Number(product.stockQuantity),
          category: product.category,
        }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error || "Failed to update product.";
        throw new Error(errorMessage);
      }
      fetchProducts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  }

  return (
    <div class="relative min-h-screen flex flex-col bg-cover bg-center" style="background-image: url('/images/background/background3.jpg');">
      <div class="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-200/60 z-0"></div>
      <header class="relative z-10 flex items-center justify-between px-10 py-6 shadow-md bg-white bg-opacity-90 w-full">
        <div class="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <img src="/images/logo/online-shop.png" class="w-8 h-8" alt="Logo" />
          <span>IShopping Admin</span>
        </div>
        <div class="space-x-3 text-gray-600">
          <button class="hover:text-black" type="button">👤</button>
        </div>
      </header>
      <main class="relative z-10 flex-1 p-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <img src="/images/logo/online-shop.png" class="w-10 h-10" alt="Logo" />
          Admin Dashboard
        </h1>
        {error && <p class="text-red-600 text-sm mb-4">{error}</p>}
        <form class="bg-white rounded-lg shadow-lg p-8 mb-10 max-w-2xl mx-auto border border-blue-200" onSubmit={handleAddProduct}>
          <h2 class="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input class="border-2 border-blue-200 rounded px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" required placeholder="Name" value={newProduct.name} onInput={e => setNewProduct({ ...newProduct, name: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" required placeholder="Model" value={newProduct.model} onInput={e => setNewProduct({ ...newProduct, model: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" required placeholder="Price" type="number" min="0" value={newProduct.price} onInput={e => setNewProduct({ ...newProduct, price: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" required placeholder="Currency" value={newProduct.currency} onInput={e => setNewProduct({ ...newProduct, currency: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" required placeholder="Stock Quantity" type="number" min="0" value={newProduct.stockQuantity} onInput={e => setNewProduct({ ...newProduct, stockQuantity: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" required placeholder="Category" value={newProduct.category} onInput={e => setNewProduct({ ...newProduct, category: (e.target as HTMLInputElement).value })} />
          </div>
          <button type="submit" class="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition disabled:opacity-60" disabled={adding}>{adding ? "Adding..." : "Add Product"}</button>
        </form>
        <div class="flex flex-col md:flex-row items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            class="flex-grow border-2 border-blue-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <input
            type="number"
            min="0"
            placeholder="Price"
            value={searchPrice}
            onInput={e => setSearchPrice((e.target as HTMLInputElement).value)}
            class="w-32 border-2 border-blue-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <select
            value={searchPriceOperator}
            onInput={e => setSearchPriceOperator((e.target as HTMLSelectElement).value)}
            class="border-2 border-blue-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            title="Price Operator"
          >
            <option value="">Operator</option>
            <option value="LESS_THAN">Less Than</option>
            <option value="GREATER_THAN">Greater Than</option>
            <option value="EQUAL">Equal</option>
          </select>
          <button
            type="button"
            onClick={() => fetchProducts(searchQuery, searchPrice, searchPriceOperator)}
            class="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition"
          >
            Search
          </button>
        </div>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <li key={product.id} class="bg-white shadow-lg rounded-xl p-6 border border-blue-100 flex flex-col h-full">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-xl font-semibold text-blue-800">{product.name}</h2>
                <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{product.category}</span>
              </div>
              <p class="text-sm text-gray-600 mb-1"><strong>Model:</strong> {product.model}</p>
              <p class="text-sm text-gray-600 mb-1"><strong>Price:</strong> {Number(product.price).toLocaleString()} {product.currency}</p>
              <p class="text-sm text-gray-600 mb-1"><strong>Stock:</strong> {Number(product.stockQuantity).toLocaleString()}</p>
              <div class="flex gap-2 mt-auto pt-4">
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product.id)}
                  class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex-1"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateProduct(product)}
                  class="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition flex-1"
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}