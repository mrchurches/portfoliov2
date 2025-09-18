import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaVuejs,
  FaAws,
} from "react-icons/fa";
import {
  SiRedux,
  SiExpress,
  SiRubyonrails,
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiFirebase,
} from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiRuby } from "react-icons/di";

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
    JavaScript: RiJavascriptFill,
    TypeScript: SiTypescript,
    Ruby: DiRuby,
    HTML5: FaHtml5,
    CSS3: FaCss3Alt,
    React: FaReact,
    "Vue.js": FaVuejs,
    Redux: SiRedux,
    "Next.js": SiNextdotjs,
    "Node.js": FaNodeJs,
    Express: SiExpress,
    "Ruby on Rails": SiRubyonrails,
    NestJS: SiNestjs,
    PostgreSQL: BiLogoPostgresql,
    MongoDB: SiMongodb,
    MySQL: SiMysql,
    Redis: SiRedis,
    AWS: FaAws,
    Firebase: SiFirebase,
    Git: FaGitAlt,
  };

  const categorizeSkills = (skills) => {
    const categories = {
      "Languages": ["JavaScript", "TypeScript", "Ruby", "HTML5", "CSS3"],
      "Frontend": ["React", "Vue.js", "Redux", "Next.js"],
      "Backend": ["Node.js", "Express", "Ruby on Rails", "NestJS"],
      "Database": ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
      "Cloud & Tools": ["AWS", "Firebase", "Git"]
    };

    const categorized = {};

    Object.entries(categories).forEach(([category, categorySkills]) => {
      categorized[category] = skills.filter(skill =>
        categorySkills.includes(skill.name)
      );
    });

    return categorized;
  };

  const categorizedSkills = categorizeSkills(l.skills.content);

  return (
    <section id="skills" className="flex flex-col wrap gap-y-4">
      <h2 className="text-xl">
        <strong>{l.skills.title}</strong>
      </h2>

      <div className="space-y-4 pt-4">
        {Object.entries(categorizedSkills).map(([category, skills]) => (
          skills.length > 0 && (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {skills.map(({ name }, i) => {
                  const Icon = skillsIcons[name];
                  return (
                    <li
                      className="flex items-center gap-x-1 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 transition"
                      key={`${category}-${i}`}
                    >
                      {Icon && <Icon className="text-lg" />}
                      <span className="text-sm">{name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
        ))}
      </div>
    </section>
  );
}
