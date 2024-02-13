'use client'
import es from "../../public/es.json"
import en from "../../public/en.json"
import { useState } from "react";
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("es");
  return (
<div className="flex flex-col w-screen justify-center pt-20">
  <div>
    
  </div>
  <div className="flex h-content justify-center items-center left-20 relative">
    <img src="/personal-home.jpg" alt="image of the owner of the porfolio" className="rounded-full w-5/12" />
    <div>
    <h1 className="relative right-20 bg-stone-200	rounded-xl p-3 w-8/12 text-center">{lang.home.title}</h1>
    </div>
  </div>
  <div className="flex justify-center items-center text-lg p-3">
    <h2 className="text-center w-5/12">{lang.home.subtitle}</h2>
  </div>
</div>
  );
}
