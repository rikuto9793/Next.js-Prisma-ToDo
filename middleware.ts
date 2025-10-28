// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(req: NextRequest) {
const session = await auth();
const isAuthRoute = req.nextUrl.pathname.startsWith("/signin");
if (!session && !isAuthRoute) {
const url = req.nextUrl.clone();
url.pathname = "/signin";
return NextResponse.redirect(url);
}
if (session && isAuthRoute) {
const url = req.nextUrl.clone();
url.pathname = "/";
return NextResponse.redirect(url);
}
return NextResponse.next();
}

export const config = {
matcher: ["/((?!_next|api/auth).*)"],
};