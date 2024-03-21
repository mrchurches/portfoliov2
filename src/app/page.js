"use client";
import es from "../../public/es.json";
import en from "../../public/en.json";
import { useEffect, useState } from "react";
import { BiAward, BiSolidWindowAlt } from "react-icons/bi";
import { LiaLanguageSolid } from "react-icons/lia";
import { SiGithub } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import Carousel from "./components/carousel";

import Link from "next/link";
import { IconContext } from "react-icons";
import Navbar from "./components/navbar";
import About from "./components/about";
import Skills from "./components/skills";
import Experience from "./components/experience";
import Education from "./components/education";
import Contact from "./components/contact";
import Projects from "./components/projects";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("en");
  const [selectedProject, setSelectedProject] = useState(0);
  const languageJson = {
    es: es,
    en: en,
  };
  const l = languageJson[lang];
  const icon = [
    <BiAward key="00000001" />,
    <BiSolidWindowAlt key="00000002" />,
    <LiaLanguageSolid key="00000003" />,
  ];
  let project = l.projects.content[selectedProject];
  let bg = darkMode ? "bg-gray-900" : "bg-white";
  let hoverButtonBg = darkMode
    ? "hover:bg-gray-700"
    : "hover:bg-slate-300 hover:text-slate-900";
  let buttonsBg = darkMode ? "bg-gray-800" : "bg-slate-200";
  let textColor = darkMode ? "text-slate-300" : "text-slate-900";
  let selectedButtonBg = darkMode ? "bg-gray-800" : "bg-slate-200";

  useEffect(() => {
    project = l.projects.content[selectedProject];
  }, [selectedProject]);
  useEffect(() => {
    //get position of the scroll
    let scroll = window.scrollY;
    darkMode
      ? ((bg = "bg-gray-900"), (textColor = "text-slate-300"))
      : //set color of the nav bg pending of the scroll position
        // (scroll > 20 && document.querySelector(".navbar").classList.add("bg-slate-300 shadow-md text-slate-900"))
        ((bg = "bg-white"), (textColor = "text-slate-900"));
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

  return (
    <div className={`flex justify-center pt-5 ${bg} ${textColor}`}>
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
          <p className="text-xs text-center italic py-4">{l.footer.content}</p>
        </footer>
      </div>
    </div>
  );
}
