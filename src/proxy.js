import { NextResponse } from "next/server";

const LOCALES = ["en", "es"];
const DEFAULT_LOCALE = "en";

/**
 * The site lives at /en and /es. A visitor landing on / gets sent to the
 * language their browser asks for, defaulting to English.
 */
function preferredLocale(request) {
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (LOCALES.includes(base)) return base;
  }

  return DEFAULT_LOCALE;
}

export function proxy(request) {
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
