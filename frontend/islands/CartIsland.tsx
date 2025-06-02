import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchInstance } from "../config/fetchInstance.ts";

type AbstractProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  options: string[];
};

export default function CartIsland() {
  const [cartItems, setCartItems] = useState<{
    id: number;
    name: string;
    quantity: number;
    price: number;
    image?: string;
    options?: string[];
    selectedOption?: string;
  }[]>([]);
  const [error, setError] = useState<string>("");
  const [abstractProducts] = useState<AbstractProduct[]>(
    [
      {
        id: 1,
        name: "Puma Speedcat",
        price: 120,
        image: "/images/items/speedcat.png",
        options: ["Red", "Blue", "Black"],
      },
      {
        id: 2,
        name: "Halibuton Shoes",
        price: 95,
        image: "/images/items/halibuton_shoes.png",
        options: ["8", "9", "10"],
      },
      {
        id: 3,
        name: "Palermo Pride",
        price: 110,
        image: "/images/items/palermopride.png",
        options: ["White", "Rainbow"],
      },
    ]
  );
  const [selectedOptions, setSelectedOptions] = useState<{ [id: number]: string }>(
    {}
  );

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetchInstance(`/api/cart`);
        const data = await response.json();
        setCartItems(data.items);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
      }
    }
    fetchCart();
  }, []);

  const handleRemoveItem = async (itemId: number) => {
    try {
      await fetchInstance(`/api/cart/${itemId}`, {
        method: "DELETE",
      });
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  const handleOptionChange = (productId: number, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: value }));
  };

  const handleAddToCart = (product: AbstractProduct, option: string) => {
    setCartItems([
      ...cartItems,
      {
        id: product.id,
        name: product.name + (option ? ` (${option})` : ""),
        quantity: 1,
        price: product.price,
        image: product.image,
        selectedOption: option,
      },
    ]);
  };

  return (
    <div class="relative min-h-screen flex flex-col cart-bg">
      <div class="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-200/60 z-0"></div>
      {/* Navbar/Menu */}
      <header class="relative z-10 flex items-center justify-between px-10 py-6 shadow-md bg-white bg-opacity-90 w-full">
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
      <main class="relative z-10 flex-1 p-6 max-w-3xl mx-auto w-full">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
          Cart Example Page
        </h1>
        {error && <p class="text-red-600 text-sm mb-4">{error}</p>}
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-4 text-blue-700">
            Choose a Product to Add
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {abstractProducts.map((product) => (
              <div
                key={product.id}
                class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  class="w-24 h-24 object-contain mb-2"
                />
                <h3 class="font-bold text-lg mb-1">{product.name}</h3>
                <p class="text-gray-600 mb-2">${product.price}</p>
                <label
                  htmlFor={`option-select-${product.id}`}
                  class="sr-only"
                >
                  Choose option for {product.name}
                </label>
                <select
                  id={`option-select-${product.id}`}
                  class="border rounded px-2 py-1 mb-2"
                  value={selectedOptions[product.id] || ""}
                  onChange={(e) =>
                    handleOptionChange(product.id, (e.target as HTMLSelectElement)
                      .value)
                  }
                  title={`Choose option for ${product.name}`}
                >
                  <option value="" disabled>
                    Choose option
                  </option>
                  {product.options.map((opt) => (
                    <option value={opt}>{opt}</option>
                  ))}
                </select>
                <button
                  type="button"
                  class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  onClick={() =>
                    handleAddToCart(
                      product,
                      selectedOptions[product.id] || product.options[0]
                    )
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 class="text-xl font-semibold mb-4 text-blue-700">Your Cart</h2>
          <ul>
            {cartItems.length === 0 && (
              <li class="text-gray-500">Your cart is empty.</li>
            )}
            {cartItems.map((item) => (
              <li
                key={item.id + (item.selectedOption || "")}
                class="mb-4 bg-white rounded-lg shadow p-4 flex items-center justify-between"
              >
                <div class="flex items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      class="w-12 h-12 object-contain mr-4"
                    />
                  )}
                  <span class="font-medium">{item.name}</span>
                  {item.selectedOption && (
                    <span class="ml-2 text-gray-500">
                      [{item.selectedOption}]
                    </span>
                  )}
                </div>
                <div class="flex items-center space-x-4">
                  <span class="text-gray-700">x{item.quantity}</span>
                  <span class="text-blue-700 font-bold">${item.price}</span>
                  <button
                    type="button"
                    class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
