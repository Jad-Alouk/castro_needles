import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    async createOrUpdateUser(ctx, args) {
      // 1. Identify if the incoming authentication type is password credentials
      if (args.type === "credentials") {
        const email = args.profile.email;

        // 2. Search your users table to see if this email is already registered
        const existingUser = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("email"), email))
          .first();

        // 3. Throw a backend error to reject the transaction if the user is missing
        if (!existingUser) {
          throw new Error("Sign-ups are strictly disabled. Registration denied.");
        }

        // 4. If they exist, allow the internal engine to map back to this user ID
        return existingUser._id;
      }
    },
  },
});