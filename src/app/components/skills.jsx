import { useState } from "react";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from "react-icons/fa";
import { SiRedux, SiExpress, SiSequelize, SiRubyonrails } from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiRuby } from "react-icons/di";
import { FiFigma } from "react-icons/fi";

// "skills":[
//     {"name":"HTML", "icon":"FaHtml5"},
//     {"name":"CSS","icon":"FaCss3Alt"},
//     {"name":"JavaScript","icon":"RiJavascriptFill "},
//     {"name":"React","icon":"FaReact"},
//     {"name":"Redux","icon":"SiRedux"},
//     {"name":"Node.js","icon":"FaNodeJs"},
//     {"name":"Express","icon":"SiExpress"},
//     {"name":"PostgreSQL","icon":"BiLogoPostgresql"},
//     {"name":"Sequelize","icon":"SiSequelize"},
//     {"name":"Ruby","icon":""},
//     {"name":"Ruby on Rails","icon":"SiRubyonrails"},
//     {"name":"Git","icon":"DiRuby"},
//     {"name":"Figma","icon":"FiFigma "}
// ],

export default function Skills({ l, darkMode }) {
  const skillsIcons = {
    HTML: FaHtml5,
    CSS: FaCss3Alt,
    JavaScript: RiJavascriptFill,
    React: FaReact,
    Redux: SiRedux,
    "Node.js": FaNodeJs,
    Express: SiExpress,
    PostgreSQL: BiLogoPostgresql,
    Sequelize: SiSequelize,
    Ruby: DiRuby,
    "Ruby on Rails": SiRubyonrails,
    Git: DiRuby,
    Figma: FiFigma,
  };

  return (
    <section id="skills" className="flex flex-col wrap gap-y-4">
      <h2 className="text-xl"><strong>{l.skills.title}</strong></h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
        {l.skills.content.map(({ name, icon }, i) => {
          const Icon = skillsIcons[name];
          return (
            <li className="flex gap-x-1" key={i}>
              {Icon && <Icon />} <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
