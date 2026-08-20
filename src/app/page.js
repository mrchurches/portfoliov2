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
    localStorage.setItem("language", lang);
  }, [lang]);

  return (
    <div className="flex justify-center pt-5 bg-surface text-fg">
      <div className="flex w-10/12 lg:w-5/12 flex-col h-content gap-y-10">
        <Navbar l={l} lang={lang} setLang={setLang} />
        <main className="flex flex-col gap-y-10">
          <About l={l} />
          <Contact l={l} />
          <Experience l={l} />
          <Education l={l} />
          <Skills l={l} />
          <Projects l={l} />
        </main>
        <footer id="footer">
          <p className="text-xs text-center italic py-4">{l.footer.content} {new Date().getFullYear()}.</p>
        </footer>
      </div>
    </div>
  );
}
