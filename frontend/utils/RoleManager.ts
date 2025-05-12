import { decode } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

export class RoleManager {
  static getUserRole(token: string): string | null {
    try {
      const [, payload] = decode(token);
      return (payload as { role?: string })?.role || null;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }
}
