import { Inter } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "./components/GoogleTagManager";

const inter = Inter({ subsets: ["latin"] });

// The document is served in English, so every metadata string is in English too.
// Mixing them makes Google render an English title over a Spanish snippet.
export const metadata = {
  metadataBase: new URL("https://portfolio-laureano.vercel.app"),
  title: "Laureano Iglesias | Full Stack Developer",
  description: "Full Stack Developer with 3+ years shipping production software at startups. React, Vue, Next.js, NestJS, Node and Ruby on Rails. Buenos Aires, Argentina.",
  keywords: "full stack developer, react, vue, nextjs, nodejs, ruby on rails, nestjs, argentina, portfolio, web developer",
  authors: [{ name: "Laureano Iglesias" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Laureano Iglesias - Full Stack Developer",
    description: "Portfolio - Alkemy, Calendico, Nular. React, Vue, Next.js, NestJS, Node, Ruby on Rails.",
    siteName: "Laureano Iglesias Portfolio",
    images: [
      {
        // Real dimensions of the file. Declaring 1200x630 over a 960x562 image
        // makes scrapers fall back or crop. A purpose-built card is still pending.
        url: "/personal-home.jpg",
        width: 960,
        height: 562,
        alt: "Laureano Iglesias - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laureano Iglesias | Full Stack Developer",
    description: "Full Stack Developer with 3+ years shipping production software at startups. Buenos Aires, Argentina.",
    images: ["/personal-home.jpg"],
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={inter.className} suppressHydrationWarning={true}>
        <GoogleTagManager />
        {children}
      </body>
    </html>
  );
}
