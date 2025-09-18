import { useEffect } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import useGTM from "../hooks/useGTM";

export default function Navbar({ l, darkMode, setDarkMode, lang, setLang }) {
  const { trackEvent } = useGTM();
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;
      const isScrolled = window.scrollY > 20;
      navbar.classList.toggle("bg-slate-400", isScrolled);
      navbar.classList.toggle("bg-transparent", !isScrolled);
      navbar.classList.toggle("shadow-md", isScrolled);
      navbar.classList.toggle("text-slate-900", isScrolled);
      if (!darkMode) navbar.classList.toggle("text-slate-300", !isScrolled);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [darkMode]);
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
      className={`transition navbar fixed flex gap-x-2 gap-y-4 lg:gap-x-10 flex-wrap z-[1000] rounded-xl p-4 ${
        !darkMode && "text-slate-900"
      } items-center justify-center text-xs md:text-lg`}
    >
      {l.nav.map((nav, index) => (
        <a
          key={index}
          href={`${nav.path}`}
          onClick={() => handleNavClick(nav)}
          className="hover:text-yellow-500"
        >
          {nav.title}
        </a>
      ))}
      <div
        className={`cursor-pointer hover:text-yellow-500`}
        onClick={handleLangChange}
      >
        {lang == "es" ? "EN" : "ES"}
      </div>
    </nav>
  );
}
