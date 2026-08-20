"use client";
import { useEffect } from "react";
import Link from "next/link";
import useAnalytics from "../hooks/useAnalytics";
import { otherLocale } from "../dictionaries";

export default function Navbar({ l, lang }) {
  const { trackEvent } = useAnalytics();
  const target = otherLocale(lang);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;
      const isScrolled = window.scrollY > 20;
      // surface-raised keeps fg at 10.1:1 while scrolled. The previous
      // bg-slate-400 put a light bar under light text.
      navbar.classList.toggle("bg-surface-raised", isScrolled);
      navbar.classList.toggle("bg-transparent", !isScrolled);
      navbar.classList.toggle("shadow-md", isScrolled);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (navItem) => {
    trackEvent("navigation_click", {
      section: navItem.title,
      path: navItem.path,
    });
  };

  const handleLangChange = () => {
    trackEvent("language_change", { from: lang, to: target });
  };

  return (
    <nav
      aria-label={l.a11y.mainNav}
      className="transition navbar fixed flex gap-x-2 gap-y-4 lg:gap-x-10 flex-wrap z-[1000] rounded-xl p-4 items-center justify-center text-xs md:text-lg"
    >
      {l.nav.map((nav, index) => (
        <a
          key={index}
          // nav.path is stored as "/#about"; the locale segment goes in front.
          href={`/${lang}${nav.path.slice(1)}`}
          onClick={() => handleNavClick(nav)}
          className="focus-ring hover:text-accent"
        >
          {nav.title}
        </a>
      ))}
      <Link
        href={`/${target}`}
        hrefLang={target}
        aria-label={l.a11y.switchLanguage}
        onClick={handleLangChange}
        className="focus-ring hover:text-accent"
      >
        {target.toUpperCase()}
      </Link>
    </nav>
  );
}
