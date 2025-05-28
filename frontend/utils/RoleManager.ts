import { decode } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

export class RoleManager {
  static getUserRole(token: string): string | undefined {
    try {
      const [, payload] = decode(token);
      const role = (payload as { authorities?: string[] })?.authorities;
      return role ? role.at(0) : undefined;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return undefined;
    }
  }
}
