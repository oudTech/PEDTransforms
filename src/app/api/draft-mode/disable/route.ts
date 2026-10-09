import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { safeRedirectPath } from "@/lib/url";

export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  const target = safeRedirectPath(request.nextUrl.searchParams.get("redirect"), "/blog");
  return NextResponse.redirect(new URL(target, request.url));
}
