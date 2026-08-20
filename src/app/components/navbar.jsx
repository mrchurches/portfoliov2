import { useEffect } from "react";
import useGTM from "../hooks/useGTM";

export default function Navbar({ l, lang, setLang }) {
  const { trackEvent } = useGTM();
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
      path: navItem.path
    });
  };

  const handleLangChange = () => {
    const newLang = lang === "es" ? "en" : "es";
    setLang(newLang);
    trackEvent("language_change", {
      from: lang,
      to: newLang
    });
  };

  return (
    <nav
      aria-label={l.a11y.mainNav}
      className="transition navbar fixed flex gap-x-2 gap-y-4 lg:gap-x-10 flex-wrap z-[1000] rounded-xl p-4 items-center justify-center text-xs md:text-lg"
    >
      {l.nav.map((nav, index) => (
        <a
          key={index}
          href={`${nav.path}`}
          onClick={() => handleNavClick(nav)}
          className="focus-ring hover:text-accent"
        >
          {nav.title}
        </a>
      ))}
      <button
        type="button"
        aria-label={l.a11y.switchLanguage}
        className="focus-ring cursor-pointer hover:text-accent"
        onClick={handleLangChange}
      >
        {lang == "es" ? "EN" : "ES"}
      </button>
    </nav>
  );
}
