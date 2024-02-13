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
import Carousel from "./carousel";

import Link from "next/link";
import { IconContext } from "react-icons";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("en");
  const [selectedSkills, setSelectedSkills] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const languageJson = {
    es: es,
    en: en,
  };
  const l = languageJson[lang];
  const icon = [<BiAward key="00000001" />, <BiSolidWindowAlt key="00000002"/>, <LiaLanguageSolid key="00000003"/>];
  let project = l.projects.content[selectedProject];
  let bg = darkMode ? "bg-gray-900" : "bg-white";
  let colorFont = darkMode ? "text-slate-300" : "text-slate-900";
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
    darkMode
      ? ((bg = "bg-gray-900"),
        (textColor = "text-slate-300"),
        (selectedButtonBg = "bg-gray-700"),
        (buttonsBg = "bg-gray-800"))
      : ((bg = "bg-white"),
        (textColor = "text-slate-900"),
        (selectedButtonBg = "bg-gray-800"),
        (buttonsBg = "bg-slate-200"));
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
      <div className="flex w-10/12 lg:w-5/12 flex-col h-content ">
        <div className="flex justify-between" id="about">
          <div className="w-6/12 lg:w-8/12">
            <h1 className="pb-5 font-bold text-3xl lg:text-5xl">Portfolio</h1>
            <h2 className="pb-2 font-semibold text-xl lg:text-2xl">{l.home.title}</h2>
            <p className="text-sm lg:text-xl">{l.home.subtitle}</p>
          </div>
          <div className="w-40 h-40 rounded-full overflow-hidden self-end mt-10">
            <img
              src="/personal-home.jpg"
              alt="image of the owner of the porfolio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="pt-5 lg:pt-10" id="skills">
          <div>
            <h2 className="text-lg font-bold">{l.skills.title}</h2>
            <div>
              <ul className="flex gap-x-4 py-3 overflow-auto whitespace-nowrap">
                {l.skills.categories.map((category, index) => (
                  <li
                    key={`${index}-${selectedSkills}`}
                    id={`${index}-${selectedSkills}-`}
                    className={`flex gap-x-1 p-2 items-center rounded-lg ${hoverButtonBg} hover:cursor-pointer  ${
                      selectedSkills == index && selectedButtonBg
                    }`}
                    onClick={() => setSelectedSkills(index)}
                  >
                    {icon[index]}
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pb-3 ">
              <ul
                className={`flex flex-wrap ${!darkMode && "text-slate-300"}`}
                id=""
              >
                {l.skills.all[selectedSkills].map((stack,index) => (
                  <li key={stack+selectedSkills+index}
                    className={`${buttonsBg} ${textColor} ${hoverButtonBg} p-2 m-1 rounded-lg`}
                  >
                    {stack}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="" id="projects">
          <h2 className="text-lg font-bold">{l.projects.title}</h2>
          <div>
            <div className={`flex gap-2 overflow-auto whitespace-nowrap`}>
              {l.projects.content.map((p, i) => (
                <h3
                  key={p.title+i+selectedProject}
                  className={`w-full break-keep text-md flex gap-x-1 p-2 items-center rounded-lg ${hoverButtonBg} hover:cursor-pointer ${textColor} ${
                    selectedProject == i && selectedButtonBg
                  } ${selectedProject == i && !darkMode && "text-slate-300"}`}
                  onClick={() =>
                    l.projects.content[i].clickeable == true &&
                    setSelectedProject(i)
                  }
                >
                  {p.title}
                </h3>
              ))}
            </div>
            <div
              className={`my-3 py-4 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-slate-300"
              } p-2`}
            >
              <Carousel images={project.image} />
              <p className="pt-4">{project.description}</p>
              <Link href={project.link} target="_blank">
                <div className="pt-2 text-sky-600">Deploy</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="" id="contact">
          <h2 className="text-lg font-bold">{l.contact.title}</h2>
          <div className="flex justify-center gap-x-4 m-4">
            <IconContext.Provider
              value={{ size: "5em", className: "global-class-name" }}
            >
              <Link href={l.contact.github} target="_blank">
                <SiGithub />
              </Link>
              <Link href={l.contact.linkedin} target="_blank">
                <BsLinkedin />
              </Link>
              <Link href={l.contact.wsp} target="_blank">
                <FaWhatsapp />
              </Link>
              <Link href={l.contact.cv} target="_blank">
                <FaFileDownload />
              </Link>
            </IconContext.Provider>
          </div>
        </div>
        <div className="flex flex-col fixed bottom-2 right-2  gap-y-2">
          <div
            className="rounded-lg p-3 bg-gray-800"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <MdOutlineWbSunny />
            ) : (
              <FaRegMoon color="rgb(192,213,225)" />
            )}
          </div>
          <div
            className={`rounded-lg p-2 bg-gray-800 ${
              !darkMode && "text-slate-300"
            }`}
            onClick={() => setLang(lang == "es" ? "en" : "es")}
          >
            {lang == "es" ? "EN" : "ES"}
          </div>
        </div>
      </div>
    </div>
  );
}
