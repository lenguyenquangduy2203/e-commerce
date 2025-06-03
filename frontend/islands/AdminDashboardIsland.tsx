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
  description?: string;
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
    // description removed from UI, but kept in state for API
    description: "",
    price: "",
    currency: "",
    stockQuantity: "",
    category: "",
  });
  const [adding, setAdding] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    model: "",
    // description removed from UI, but kept in state for API
    description: "",
    price: "",
    currency: "",
    stockQuantity: "",
    category: "",
  });

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

  async function handleUpdateProductSubmit(e: Event) {
    e.preventDefault();
    setError("");
    try {
      const response = await fetchInstance(`/products/${editingProductId}?keyword=${encodeURIComponent(searchQuery)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editProduct.name,
          model: editProduct.model,
          description: editProduct.description,
          price: Number(editProduct.price),
          currency: editProduct.currency,
          stockQuantity: Number(editProduct.stockQuantity),
          category: editProduct.category,
        }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error || "Failed to update product.";
        throw new Error(errorMessage);
      }
      setEditingProductId(null);
      fetchProducts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  }

  function handleEditClick(product: ProductSummary) {
    setEditingProductId(product.id);
    setEditProduct({
      name: product.name,
      model: product.model,
      description: product.description || "",
      price: String(product.price),
      currency: product.currency,
      stockQuantity: String(product.stockQuantity),
      category: product.category,
    });
  }

  function handleCancelEdit() {
    setEditingProductId(null);
  }

  return (
    <div class="relative min-h-screen flex flex-col bg-cover bg-center" style="background-image: url('/images/background/background3.jpg');">
      <div class="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-200/60 z-0"></div>
      <main class="relative z-10 flex-1 p-6 flex flex-col items-center justify-center">
        <h1 class="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3 drop-shadow-lg">
          <img src="/images/logo/online-shop.png" class="w-12 h-12" alt="Logo" />
          Admin Dashboard
        </h1>
        {error && <p class="text-red-600 text-base mb-4 font-semibold">{error}</p>}
        <form class="bg-white/90 rounded-2xl shadow-2xl px-10 py-12 max-w-2xl w-full border border-blue-200 mb-12" onSubmit={handleAddProduct}>
          <h2 class="text-2xl font-extrabold mb-8 text-blue-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input class="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-700 placeholder-gray-400 bg-white/80" required placeholder="Name" value={newProduct.name} onInput={e => setNewProduct({ ...newProduct, name: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-700 placeholder-gray-400 bg-white/80" required placeholder="Model" value={newProduct.model} onInput={e => setNewProduct({ ...newProduct, model: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-700 placeholder-gray-400 bg-white/80" required placeholder="Price" type="number" min="0" value={newProduct.price} onInput={e => setNewProduct({ ...newProduct, price: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-700 placeholder-gray-400 bg-white/80" required placeholder="Currency" value={newProduct.currency} onInput={e => setNewProduct({ ...newProduct, currency: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-700 placeholder-gray-400 bg-white/80" required placeholder="Stock Quantity" type="number" min="0" value={newProduct.stockQuantity} onInput={e => setNewProduct({ ...newProduct, stockQuantity: (e.target as HTMLInputElement).value })} />
            <input class="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-700 placeholder-gray-400 bg-white/80" required placeholder="Category" value={newProduct.category} onInput={e => setNewProduct({ ...newProduct, category: (e.target as HTMLInputElement).value })} />
            <textarea class="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-700 placeholder-gray-400 bg-white/80 md:col-span-2" placeholder="Description (optional)" value={newProduct.description} onInput={e => setNewProduct({ ...newProduct, description: (e.target as HTMLTextAreaElement).value })} />
          </div>
          <button type="submit" class="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 hover:shadow-2xl transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60" disabled={adding}>{adding ? "Adding..." : "Add Product"}</button>
        </form>
        <div class="flex flex-col md:flex-row items-center mb-10 gap-4 w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            class="flex-grow border-2 border-blue-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white/80 placeholder-gray-400"
          />
          <input
            type="number"
            min="0"
            placeholder="Price"
            value={searchPrice}
            onInput={e => setSearchPrice((e.target as HTMLInputElement).value)}
            class="w-32 border-2 border-blue-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white/80 placeholder-gray-400"
          />
          <select
            value={searchPriceOperator}
            onInput={e => setSearchPriceOperator((e.target as HTMLSelectElement).value)}
            class="border-2 border-blue-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white/80"
            title="Price Operator"
          >
            <option value="">Operator</option>
            <option value="LESS_THAN">Less Than</option>
            <option value="GREATER_THAN">Greater Than</option>
            <option value="EQUAL">Equal</option>
          </select>
        </div>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {products.map((product) => (
            <li key={product.id} class="bg-white/90 shadow-xl rounded-2xl p-6 border border-blue-100 flex flex-col h-full transition-transform hover:-translate-y-1 hover:shadow-2xl">
              {editingProductId === product.id ? (
                <form onSubmit={handleUpdateProductSubmit} class="flex flex-col gap-2">
                  <input class="border px-3 py-2 rounded-lg" required placeholder="Name" value={editProduct.name} onInput={e => setEditProduct({ ...editProduct, name: (e.target as HTMLInputElement).value })} />
                  <input class="border px-3 py-2 rounded-lg" required placeholder="Model" value={editProduct.model} onInput={e => setEditProduct({ ...editProduct, model: (e.target as HTMLInputElement).value })} />
                  <input class="border px-3 py-2 rounded-lg" required placeholder="Price" type="number" min="0" value={editProduct.price} onInput={e => setEditProduct({ ...editProduct, price: (e.target as HTMLInputElement).value })} />
                  <input class="border px-3 py-2 rounded-lg" required placeholder="Currency" value={editProduct.currency} onInput={e => setEditProduct({ ...editProduct, currency: (e.target as HTMLInputElement).value })} />
                  <input class="border px-3 py-2 rounded-lg" required placeholder="Stock Quantity" type="number" min="0" value={editProduct.stockQuantity} onInput={e => setEditProduct({ ...editProduct, stockQuantity: (e.target as HTMLInputElement).value })} />
                  <input class="border px-3 py-2 rounded-lg" required placeholder="Category" value={editProduct.category} onInput={e => setEditProduct({ ...editProduct, category: (e.target as HTMLInputElement).value })} />
                  <textarea class="border px-3 py-2 rounded-lg" placeholder="Description (optional)" value={editProduct.description} onInput={e => setEditProduct({ ...editProduct, description: (e.target as HTMLTextAreaElement).value })} />
                  <div class="flex gap-2 mt-2">
                    <button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition flex-1">Save</button>
                    <button type="button" class="bg-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition flex-1" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div class="flex items-center justify-between mb-2">
                    <h2 class="text-xl font-bold text-blue-800">{product.name}</h2>
                    <span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-lg font-semibold">{product.category}</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-1"><strong>Model:</strong> {product.model}</p>
                  <p class="text-sm text-gray-600 mb-1"><strong>Price:</strong> {Number(product.price).toLocaleString()} {product.currency}</p>
                  <p class="text-sm text-gray-600 mb-1"><strong>Stock:</strong> {Number(product.stockQuantity).toLocaleString()}</p>
                  {/* Description display removed from product card */}
                  <div class="flex gap-2 mt-auto pt-4">
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(product.id)}
                      class="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition flex-1 shadow"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditClick(product)}
                      class="bg-yellow-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex-1 shadow"
                    >
                      Update
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}