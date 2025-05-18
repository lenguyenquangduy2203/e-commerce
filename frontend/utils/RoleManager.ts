import { decode } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

export class RoleManager {
  static getUserRole(token: string): string | null {
    try {
      const [, payload] = decode(token);
      const role = (payload as { role?: string })?.role;
      return role ? `ROLE_${role}` : null;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }
}
