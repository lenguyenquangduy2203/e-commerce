import { Handlers } from "$fresh/server.ts";
import { z } from "zod";

const BACKEND_URL = Deno.env.get("BASE_BACKEND_URL") || "http://catalog-backend:8080";

const CartResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart`);
      const json = await response.json();

      const result = CartResponseSchema.safeParse(json);
      if (!result.success) {
        console.error("Validation error:", result.error);
        return new Response(JSON.stringify({ error: "Invalid response from server" }), { status: 500 });
      }

      return new Response(JSON.stringify(result.data), { status: 200 });
    } catch (error) {
      console.error("Request error:", error);
      return new Response(JSON.stringify({ error: "Server error occurred" }), { status: 500 });
    }
  },

  async DELETE(req, ctx) {
    try {
      const url = new URL(req.url);
      const itemId = url.pathname.split("/").pop();

      const response = await fetch(`${BACKEND_URL}/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item.");
      }

      return new Response(null, { status: 204 });
    } catch (error) {
      console.error("Request error:", error);
      return new Response(JSON.stringify({ error: "Server error occurred" }), { status: 500 });
    }
  },
};
