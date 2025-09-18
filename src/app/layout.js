import { Inter } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "./components/GoogleTagManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Laureano Iglesias | Full Stack Developer",
  description: "Full Stack Developer con +2 años de experiencia en startups. React, Vue, Node.js, Ruby on Rails, NestJS. Buenos Aires, Argentina.",
  keywords: "full stack developer, react, nodejs, ruby on rails, nestjs, argentina, portfolio, web developer",
  authors: [{ name: "Laureano Iglesias" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://laureanoiglesias.com",
    title: "Laureano Iglesias - Full Stack Developer",
    description: "Portfolio profesional - Alkemy, Calendico, Nular | React, Node.js, Ruby on Rails",
    siteName: "Laureano Iglesias Portfolio",
    images: [
      {
        url: "/personal-home.jpg",
        width: 1200,
        height: 630,
        alt: "Laureano Iglesias - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laureano Iglesias | Full Stack Developer",
    description: "Full Stack Developer con +2 años de experiencia en startups",
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
