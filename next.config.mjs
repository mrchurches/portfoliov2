/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Evita que el navegador adivine el tipo de un recurso y lo ejecute como otra cosa.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No filtrar la ruta completa como referrer hacia otros dominios.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // El sitio no usa ninguna de estas APIs. Negarlas explícitamente.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Nadie tiene por qué embeber este sitio en un iframe.
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig = {
  // Verification builds write somewhere else so they can never collide with a
  // dev server holding .next. Mixing the two leaves a production
  // webpack-runtime pointing at vendor chunks dev never emits.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
