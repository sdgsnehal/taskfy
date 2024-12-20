import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook",
]);
export default clerkMiddleware((auth, req) => {
  const { redirectToSignIn } = auth();

  if (auth().userId && isPublicRoute(req)) {
    let path = "/select-org";
    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }
    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }
  if (!auth().userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
