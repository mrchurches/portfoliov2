import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={inter.className}>
      <nav className="flex justify-between p-4 font-sans font-semibold">
        <div>Laureano Iglesias</div>
        <ul className="flex justify-self-end gap-3">
        <li className="transition ease-in-out duration-200 transform hover:scale-105"><Link href="/">About</Link></li>
          <li className="transition ease-in-out duration-200 transform hover:scale-105"><Link href="/projects">Projects</Link></li>
          <li className="transition ease-in-out duration-200 transform hover:scale-105"><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
        {children}</body>
    </html>
  );
}
