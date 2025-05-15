import { Handlers } from "$fresh/server.ts";
import { z } from "zod";

const BACKEND_URL = Deno.env.get("BASE_BACKEND_URL") || "http://catalog-backend:8080";

// Define a schema for the expected response
const SignupResponseSchema = z.object({
    user: z.object({
        id: z.string(),
        email: z.string().email(),
    }),
});

export const handler: Handlers = {
    async POST(req, ctx) {
        try {
            const body = await req.json();
            const response = await fetch(`${BACKEND_URL}/api/signup`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body),
            });

            const json = await response.json();

            // Safe parse to validate response with a fallback
            const result = SignupResponseSchema.safeParse(json);

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
