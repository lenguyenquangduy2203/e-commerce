import { h as _h } from "preact";
import { useState, useEffect } from "preact/hooks";

export default function ProductList() {
  const [products, setProducts] = useState<{
    id: number;
    name: string;
    model: string;
    description: string;
    amount: number;
    currency: string;
    stock_quantity: number;
    category: string;
  }[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
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
    fetchProducts();
  }, []);

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Product List</h1>
      {error && <p class="text-red-500">{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id} class="mb-4">
            <div class="border p-4 rounded">
              <h2 class="text-lg font-semibold">{product.name}</h2>
              <p><strong>Model:</strong> {product.model}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> {product.amount} {product.currency}</p>
              <p><strong>Stock:</strong> {product.stock_quantity}</p>
              <p><strong>Category:</strong> {product.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}