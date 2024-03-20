import { useEffect } from "react";

export default function Navbar() {
    useEffect(() => {
        let handleScroll = () => {
            const navbar = document.querySelector(".navbar");
            const isScrolled = window.scrollY > 20;
        
            navbar.classList.toggle("bg-slate-300", isScrolled);
            navbar.classList.toggle("bg-transparent", !isScrolled);
            navbar.classList.toggle("shadow-md", isScrolled);
            navbar.classList.toggle("text-slate-900", isScrolled);
            navbar.classList.toggle("text-slate-300", !isScrolled);
        };
        
        document.addEventListener("scroll", handleScroll)
        
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);
  return (
    <nav className="navbar flex gap-x-2 fixed z-[1000] rounded-xl p-2">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
    </nav>
  );
}
