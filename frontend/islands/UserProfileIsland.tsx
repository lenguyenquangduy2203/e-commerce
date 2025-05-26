import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { fetchInstance } from "../config/fetchInstance.ts";

export default function UserProfileIsland() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetchInstance("/api/user");
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
      }
    }
    fetchUserProfile();
  }, []);

  return (
    <section class="relative z-10 flex-1 p-6 max-w-3xl mx-auto w-full mt-10 flex flex-col items-center">
      <div class="bg-white/90 rounded-2xl shadow-2xl px-12 py-8 mb-10 mt-4 max-w-2xl w-full flex flex-col items-center">
        <h1 class="text-3xl font-extrabold mb-2 text-blue-900 text-center drop-shadow">User Profile</h1>
        {error && <p class="text-red-600 text-sm mb-4 text-center">{error}</p>}
        {user ? (
          <div class="w-full flex flex-col items-center">
            <p class="mb-2 text-lg text-gray-800"><strong>Email:</strong> {user.email}</p>
            <p class="text-lg text-gray-800"><strong>Role:</strong> {user.role}</p>
          </div>
        ) : (
          <p class="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </section>
  );
}
