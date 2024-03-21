import { useEffect } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";

export default function Navbar({l, darkMode, setDarkMode, lang, setLang}) {
    useEffect(() => {
        let handleScroll = () => {
            const navbar = document.querySelector(".navbar");
            const isScrolled = window.scrollY > 20;
        
            navbar.classList.toggle("bg-slate-400", isScrolled);
            navbar.classList.toggle("bg-transparent", !isScrolled);
            navbar.classList.toggle("shadow-md", isScrolled);
            navbar.classList.toggle("text-slate-900", isScrolled);
            !darkMode && navbar.classList.toggle("text-slate-300", !isScrolled);
        };
        
        document.addEventListener("scroll", handleScroll)
        
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);
  return (
    <nav className={`transition navbar fixed flex gap-x-2 lg:gap-x-6 flex-wrap z-[1000] rounded-xl p-4 ${!darkMode&& 'text-slate-900'} items-center}`}>
          <a href="#about" className="hover:text-yellow-500">{l.nav.about}</a>
          <a href="#experience" className="hover:text-yellow-500">{l.nav.experience}</a>
          <a href="#projects" className="hover:text-yellow-500">{l.nav.projects}</a>
          {/* <a href="#contact" className="hover:text-yellow-500">{l.nav.contact}</a> */}
          <div
            className={`cursor-pointer hover:text-yellow-500`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <MdOutlineWbSunny />
            ) : (
              <FaRegMoon />
            )}
          </div>
          <div
            className={`cursor-pointer hover:text-yellow-500`}
            onClick={() => setLang(lang == "es" ? "en" : "es")}
          >
            {lang == "es" ? "EN" : "ES"}
          </div>
    </nav>
  );
}
