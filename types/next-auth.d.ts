import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    userId: string;
    role: "ADMIN" | "USER";
  }

  interface Session {
    user: {
      id: string;
      userId: string;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role: "ADMIN" | "USER";
  }
}
