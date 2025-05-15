import { h } from "preact";
import { useState } from "preact/hooks";

const BACKEND_BASE_URL = Deno.env.get("BASE_BACKEND_URL") || "http://catalog-backend:8080";

export default function SignUpIsland() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: Event) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Construct the full backend API URL for the sign-up endpoint
      const signUpUrl = `${BACKEND_BASE_URL}/registry/signup`; 

      const response = await fetch(signUpUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to create an account.");
      }

      const { _user } = await response.json();
      alert("Account created successfully!");
      globalThis.location.href = "/SignIn";
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSignUp} >
      {error && <p class="text-red-500 text-sm mb-4">{error}</p>}
      <div class="mb-4">
        <label class="block text-white text-sm font-medium mb-1" for="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          class="w-full px-4 py-3 border border-white/30 bg-transparent text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          value={name}
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
          placeholder="Your Name"
          required
        />
      </div>
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
      <div class="mb-6">
        <label class="block text-white text-sm font-medium mb-1" for="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          class="w-full px-4 py-3 border border-white/30 bg-transparent text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          value={confirmPassword}
          onInput={(e) => setConfirmPassword((e.target as HTMLInputElement).value)}
          placeholder="********"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition duration-300"
      >
        Sign Up
      </button>
      <p class="text-sm text-center mt-6 text-white/80">
        Already have an account?{" "}
        <a href="/SignIn" class="text-white font-medium hover:underline">
          Sign in
        </a>
      </p>
      <p class="text-sm text-center mt-2 text-white/60">
        By signing up, you agree to our{" "}
        <a href="#" class="underline">Terms</a> and{" "}
        <a href="#" class="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}