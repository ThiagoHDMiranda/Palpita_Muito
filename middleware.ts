import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // if (path.startsWith("/auth/signIn") && token) {
    //   console.log("/auth/signIn route");
    //   return NextResponse.redirect(new URL("/", req.url));
    // }

    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/auth/error?error=AccessDenied", req.url),
      );
    }

    if (path.startsWith("/user") && !token) {
      return NextResponse.redirect(
        new URL("/auth/error?error=AccessDenied", req.url),
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return true;
        const path = req.nextUrl.pathname;

        if (path.startsWith("/auth")) {
          return true;
        }

        return !!token;
      },
    },
    pages: {
      signIn: "/auth/signin",
      error: "/auth/error",
    },
  },
);

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/auth/:path*", "/"],
};
