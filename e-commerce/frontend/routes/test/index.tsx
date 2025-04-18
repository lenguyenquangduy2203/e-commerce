import { PageProps } from "$fresh/server.ts";
import { handler } from "./handler.ts";

interface Data {
    message: string;
}

export { handler }; // Export the handler from this file

export default function test({ data }: PageProps<Data>) {
    return (
        <div>
            <h1>Welcome to E-commerce</h1>
            <p>Message from backend: {data.message}</p>
        </div>
    );
}