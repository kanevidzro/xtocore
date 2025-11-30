import { createAuthClient } from "better-auth/react";
import { twoFactorClient, adminClient } from "better-auth/client/plugins";

// Create a unique type alias for the inferred type (prevents portability issues)
export type AuthClient = ReturnType<typeof createAuthClient>;

// Create the client using the alias
export const authClient: AuthClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  plugins: [twoFactorClient(), adminClient()],
});
