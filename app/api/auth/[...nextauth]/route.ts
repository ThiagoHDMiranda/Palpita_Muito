import { ensureUserExists } from "@/server/actions/user.actions";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const dbUser = await ensureUserExists(user.email!, user.name!);

      if (!dbUser.success) {
        return false;
      }

      user.userId = dbUser.data.id;
      user.role = dbUser.data.role;

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.userId = token.userId as string;
      session.user.role = token.role as "ADMIN" | "USER";
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
