import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("google-site-verification: googled15a89c91c8574e3", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
