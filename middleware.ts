import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/proctected"]);
const isPublicRoute = ["/"];
export default clerkMiddleware((auth, req) => {
  const { redirectToSignIn } = auth();
  if (isProtectedRoute(req)) auth().protect();
  if (auth().userId && isPublicRoute) {
    let path = "/select-org";
    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }
    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }
  if (!auth().userId && !isPublicRoute) {
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
