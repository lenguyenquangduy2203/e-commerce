import { Handlers } from "$fresh/server.ts";
import { z } from "zod";

const BACKEND_URL = Deno.env.get("BASE_BACKEND_URL") || "http://catalog-backend:8080";

const OrdersResponseSchema = z.object({
  orders: z.array(
    z.object({
      id: z.number(),
      total_price: z.number(),
      status: z.string(),
      create_at: z.string(),
    })
  ),
});

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/orders`);
      const json = await response.json();

      const result = OrdersResponseSchema.safeParse(json);
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
};
