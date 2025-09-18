import Image from "next/image";
import { CiShare1 } from "react-icons/ci";
import { GrStatusGoodSmall } from "react-icons/gr";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import useGTM from "../hooks/useGTM";

export default function Card({ project }) {
  const { trackEvent } = useGTM();

  const extractTechStack = (description) => {
    const stackMatch = description.match(/Stack:\s*(.+?)(?:\.|$)/);
    if (stackMatch) {
      return stackMatch[1].split(',').map(tech => tech.trim());
    }
    return [];
  };

  const techStack = extractTechStack(project.description);
  const isGitHub = project.link.includes('github.com');

  const handleProjectClick = () => {
    trackEvent("project_click", {
      project_name: project.title,
      project_status: project.status === 1 ? 'active' : 'paused',
      project_link: project.link,
      project_type: project.typeOfWork
    });
  };

  return (
    <article className="w-full lg:w-2/5 flex flex-col gap-y-3 hover:bg-slate-800 rounded-xl p-4 transition hover:shadow-lg">
      <div className="flex gap-x-3">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={project.image[0]}
            alt={project.title}
            fill
            className="rounded-xl object-cover"
            sizes="80px"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <h3 className="flex items-center gap-x-2 text-lg font-bold">
            {project.title}
            <span className="relative group">
              <GrStatusGoodSmall color={`${project.status == 1? '#22c55e':'#f97316'}`} size="0.5rem"/>
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {project.status === 1 ? 'Activo' : 'En pausa'}
              </span>
            </span>
          </h3>
          <a
            href={project.link}
            target="_blank"
            onClick={handleProjectClick}
            className="flex items-center gap-x-1 text-slate-500 hover:text-slate-300 text-xs truncate transition"
          >
            <span>
              {isGitHub ? <FaGithub /> : <FaExternalLinkAlt />}
            </span>
            {isGitHub ? 'Ver en GitHub' : 'Ver Demo'}
          </a>
        </div>
      </div>

      <p className="text-slate-300 text-sm font-normal line-clamp-3">
        {project.description.replace(/Stack:.*/, '').trim()}
      </p>

      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-slate-700 rounded-full text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <h4 className="flex text-xs italic self-end text-slate-400">{project.typeOfWork}</h4>
    </article>
  );
}
