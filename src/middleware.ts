import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internal assets and common static files to load
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/fonts")
  ) {
    return NextResponse.next();
  }

  return new NextResponse(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Geranos Getaways | Website Update in Progress</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #faf7f2;
      color: #1f2933;
      padding: 24px;
    }

    .card {
      max-width: 720px;
      background: #ffffff;
      padding: 42px;
      border-radius: 24px;
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
      text-align: center;
    }

    h1 {
      font-size: 34px;
      line-height: 1.2;
      margin: 0 0 16px;
      color: #1b3a34;
    }

    p {
      font-size: 18px;
      line-height: 1.6;
      margin: 0 0 18px;
    }

    .small {
      font-size: 15px;
      color: #667085;
      margin-top: 24px;
    }

    .contact {
      margin-top: 26px;
      font-size: 17px;
      font-weight: 600;
    }

    a {
      color: #1b6b5c;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <main class="card">
    <h1>Geranos Getaways is being refreshed</h1>

    <p>
      We are updating our website to bring you clearer itineraries, better travel experiences,
      and a smoother enquiry process.
    </p>

    <p>
      The site will be back soon. In the meantime, we are still available for custom travel
      planning and getaway enquiries.
    </p>

    <div class="contact">
      For urgent travel enquiries, please contact us directly:<br />
      <a href="mailto:info@geranosgetaways.com">info@geranosgetaways.com</a>
    </div>

    <p class="small">
      Thank you for your patience while we improve the Geranos Getaways experience.
    </p>
  </main>
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
