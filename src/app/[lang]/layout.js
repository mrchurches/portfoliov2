import { Inter } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "../dictionaries";
import GlassFilter from "../components/glass-filter";

const inter = Inter({ subsets: ["latin"] });

// viewportFit: "cover" is what makes env(safe-area-inset-*) resolve to
// anything other than 0. Without it a bottom-fixed element sits under the
// iPhone home indicator.
export const viewport = {
  themeColor: "#111827",
  viewportFit: "cover",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL("https://portfolio-laureano.vercel.app"),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Laureano Iglesias" }],
    alternates: {
      canonical: `/${lang}`,
      // Each language is its own URL now, so crawlers can index both and
      // serve the right one instead of guessing from a client-side toggle.
      languages: { en: "/en", es: "/es" },
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      url: `/${lang}`,
      title: meta.ogTitle,
      description: meta.ogDescription,
      siteName: "Laureano Iglesias Portfolio",
      // Images come from the opengraph-image route.
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <GlassFilter />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
