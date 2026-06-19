import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    userId: string;
    role: "ADMIN" | "USER";
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: string;
      role: "ADMIN" | "USER";
      name?: string;
      email?: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role: "ADMIN" | "USER";
  }
}
