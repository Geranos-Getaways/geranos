import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js assets and favicon to load
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  return new NextResponse(
    `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Geranos Getaways | Maintenance</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      display: grid;
      place-items: center;
      min-height: 100vh;
      margin: 0;
      background: #faf7f2;
      color: #222;
      text-align: center;
      padding: 24px;
    }
    .box {
      max-width: 640px;
    }
    h1 {
      font-size: 32px;
      margin-bottom: 12px;
    }
    p {
      font-size: 18px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>Geranos Getaways is being refreshed</h1>
    <p>We are updating the website to serve you better. For travel enquiries, please contact us directly on WhatsApp or email.</p>
  </div>
</body>
</html>`,
    {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Retry-After": "86400",
      },
    }
  );
}

export const config = {
  matcher: "/:path*",
};
