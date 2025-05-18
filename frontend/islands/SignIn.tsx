import { h } from "preact";
import { useState } from "preact/hooks";
import { RoleManager } from "../utils/RoleManager.ts";

const BACKEND_URL = "http://catalog-backend:8080";

export default function SignInIsland() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    setError("");

    try {
      // Construct the full backend API URL for the sign-in endpoint
      const signInUrl = `${BACKEND_URL}/registry/signin`;

      const response = await fetch(signInUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Invalid credentials");
      }

      const { token } = await response.json();
      // Use sessionStorage instead of localStorage
      sessionStorage.setItem(
        "token",
        JSON.stringify({ header: "Authorization", token: `Bearer ${token}` })
      );

      const userRole = RoleManager.getUserRole(token);

      if (userRole === "admin") {
        globalThis.location.href = "/AdminDashboard";
      } else if (userRole === "customer") {
        globalThis.location.href = "/UserDashboard";
      } else {
        setError("Unauthorized role. Please contact support.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p class="text-red-500 text-sm mb-4">{error}</p>}
      <div class="mb-4">
        <label class="block text-white text-sm font-medium mb-1" for="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          class="w-full px-4 py-3 border border-white/30 bg-transparent text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          placeholder="you@example.com"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-white text-sm font-medium mb-1" for="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          class="w-full px-4 py-3 border border-white/30 bg-transparent text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          value={password}
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          placeholder="********"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-transparent border border-white text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/10 transition"
      >
        Sign In
      </button>

      <p class="text-sm text-center mt-6 text-white/80">
        Don’t have an account?{" "}
        <a href="/SignUp" class="text-white font-medium hover:underline">
          Sign up
        </a>
      </p>
      <p class="text-sm text-center mt-2 text-white/60">
        By signing in, you agree to our{" "}
        <a href="#" class="underline">Terms</a> and{" "}
        <a href="#" class="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}