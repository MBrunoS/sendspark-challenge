import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  if (req.cookies.has("token")) {
    const token = req.cookies.get("token")?.value;
    let response: NextResponse;

    try {
      await jwtVerify(
        token!,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );

      const isLogin = req.nextUrl.pathname.startsWith("/login");
      const isSignup = req.nextUrl.pathname.startsWith("/signup");

      if (isLogin || isSignup) {
        response = NextResponse.redirect(new URL(`/`, req.url));
      } else {
        response = NextResponse.next();
      }

      return response;
    } catch (err) {
      console.error("[MIDDLEWARE]", err);

      if (req.nextUrl.pathname.startsWith("/")) {
        const loginUrl = new URL("/login", req.url);
        response = NextResponse.redirect(loginUrl);
      } else {
        response = NextResponse.next();
      }

      response.cookies.delete("token");

      return response;
    }
  }

  let response: NextResponse;

  const isHome = req.nextUrl.pathname === "/";

  if (isHome) {
    const loginUrl = new URL("/login", req.url);
    response = NextResponse.redirect(loginUrl);
  } else {
    response = NextResponse.next();
  }

  response.cookies.delete("user");
  return response;
}

export const config = {
  matcher: ["/", "/login", "/signup"]
};
