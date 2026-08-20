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
  SiMongodb,
  SiRedis,
  SiFirebase,
} from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiRuby } from "react-icons/di";

export default function Skills({ l }) {
  const skillsIcons = {
    "JavaScript (ES6+)": RiJavascriptFill,
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
    PostgreSQL: BiLogoPostgresql,
    "AWS (S3, Lambda, etc.)": FaAws,
    "Firebase (Auth, Hosting)": SiFirebase,
    MongoDB: SiMongodb,
    Redis: SiRedis,
    Git: FaGitAlt,
  };

  const categorizedSkills = Object.entries(l.skills.categories)
    .filter(([category]) => category !== "spokenLanguages")
    .map(([category, label]) => ({
      category,
      label,
      skills: l.skills.content.filter(skill => skill.category === category),
    }));

  return (
    <section id="skills" className="flex flex-col gap-y-4">
      <h2 className="text-xl">
        <strong>{l.skills.title}</strong>
      </h2>

      <div className="space-y-4 pt-4">
        {categorizedSkills.map(({ category, label, skills }) => (
          skills.length > 0 && (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider">
                {label}
              </h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {skills.map(({ name }) => {
                  const Icon = skillsIcons[name];
                  return (
                    <li
                      className="flex items-center gap-x-1 px-3 py-1 rounded-full bg-surface-raised hover:bg-surface-chip transition"
                      key={`${category}-${name}`}
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

        {l.skills.spokenLanguages.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider">
              {l.skills.categories.spokenLanguages}
            </h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {l.skills.spokenLanguages.map(({ name, level }) => (
                <li
                  className="flex items-center gap-x-1 px-3 py-1 rounded-full bg-surface-raised hover:bg-surface-chip transition"
                  key={name}
                >
                  <span className="text-sm">{name} {level}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
