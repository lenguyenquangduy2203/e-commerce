import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const BACKEND_URL = "http://catalog-backend:8080";

export default function CartIsland() {
  const [cartItems, setCartItems] = useState<{ id: number; name: string; quantity: number; price: number }[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items.");
        }
        const data = await response.json();
        setCartItems(data.items);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
      }
    }
    fetchCart();
  }, []);

  const handleRemoveItem = async (itemId: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove item.");
      }
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
      {error && <p class="text-red-500">{error}</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} class="mb-4">
            <div class="flex justify-between items-center">
              <span>{item.name} - {item.quantity} x ${item.price}</span>
              <button
                type="button"
                class="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
