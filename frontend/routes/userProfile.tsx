import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

export default function UserProfile() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user profile.");
        }
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
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">User Profile</h1>
      {error && <p class="text-red-500">{error}</p>}
      {user ? (
        <div class="border p-4 rounded">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
