import { Handlers } from "$fresh/server.ts";
import { z } from "zod";

const BACKEND_URL = Deno.env.get("BASE_BACKEND_URL") || "http://catalog-backend:8080";

// Define a schema for the expected response
const LoginResponseSchema = z.object({
    token: z.string(),
    user: z.object({
        id: z.string(),
        email: z.string().email(),
        role: z.string(), // Added role to the schema
    }),
});

export const handler: Handlers = {
    async POST(req, _ctx) {
        try {
            const body = await req.json();
            // Corrected URL to match the backend endpoint: /registry/signin
            const response = await fetch(`${BACKEND_URL}/registry/signin`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body),
            });

            const json = await response.json();

            // Check for non-OK HTTP status first
            if (!response.ok) {
                 // Assuming backend error responses are in the format { error: "message" }
                 console.error("Backend error:", json.error);
                 return new Response(JSON.stringify(json), { status: response.status });
            }
            
            // Safe parse to validate response with a fallback
            const result = LoginResponseSchema.safeParse(json);

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
