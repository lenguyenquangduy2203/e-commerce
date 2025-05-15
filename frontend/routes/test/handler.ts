import { Handlers } from "$fresh/server.ts";
import { z } from "zod";

const BACKEND_URL = Deno.env.get("BASE_BACKEND_URL") || "http://catalog-backend:8080";


// Define a schema for the expected response
const MessageSchema = z.object({
    message: z.string(),
});

export const handler: Handlers = {
    async GET(_req, ctx) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/test`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            });
            const json = await response.json();

            // Safe parse to validate response with a fallback
            const result = MessageSchema.safeParse(json);

            if (!result.success) {
                console.error("Validation error:", result.error);
                return ctx.render({ message: "Fallback: Unable to fetch message" });
            }

            return ctx.render(result.data);
        } catch (error) {
            console.error("Request error:", error);
            return ctx.render({ message: "Fallback: Server error occurred" });
        }
    },
};
