"use client";
import es from "../../public/es.json";
import en from "../../public/en.json";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import About from "./components/about";
import Skills from "./components/skills";
import Experience from "./components/experience";
import Education from "./components/education";
import Contact from "./components/contact";
import Projects from "./components/projects";

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      return saved || "en";
    }
    return "en";
  });
  const languageJson = { es, en };
  const l = languageJson[lang];

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    const root = document.documentElement;
    root.style.setProperty(
      "--scrollbar-track-color-dark",
      darkMode ? "#2e4169" : "#f1f1f1"
    );
    root.style.setProperty(
      "--scrollbar-thumb-color-dark",
      darkMode ? "#1c273f" : "#888"
    );
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", lang);
  }, [lang]);

  return (
    <div
      className={`flex justify-center pt-5 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } ${darkMode ? "text-slate-300" : "text-slate-900"}`}
    >
      <div className="flex w-10/12 lg:w-5/12 flex-col h-content gap-y-10">
        <Navbar
          l={l}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          lang={lang}
          setLang={setLang}
        />
        <About l={l} darkMode={darkMode} />
        <Contact l={l} darkMode={darkMode} />
        <Experience l={l} darkMode={darkMode} />
        <Education l={l} darkMode={darkMode} />
        <Skills l={l} darkMode={darkMode} />
        <Projects l={l} darkMode={darkMode} />
        <footer id="footer">
          <p className="text-xs text-center italic py-4">{l.footer.content} {new Date().getFullYear()}.</p>
        </footer>
      </div>
    </div>
  );
}
