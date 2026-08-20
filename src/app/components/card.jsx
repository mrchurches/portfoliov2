import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import useGTM from "../hooks/useGTM";

export default function Card({ project, l }) {
  const { trackEvent } = useGTM();

  const extractTechStack = (description) => {
    const stackMatch = description.match(/Stack:\s*(.+?)(?:\.$|$)/);
    if (stackMatch) {
      return stackMatch[1]
        .split(',')
        .map(tech => tech.trim());
    }
    return [];
  };

  const techStack = extractTechStack(project.description);
  const hasLink = project.clickeable === true && typeof project.link === 'string' && project.link.length > 0;
  const hasImage = Array.isArray(project.image) && project.image.length > 0;
  const isGitHub = hasLink && project.link.includes('github.com');

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
        {hasImage && (
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
        )}
        <div className="flex-1">
          <h3 className="text-lg font-bold">{project.title}</h3>
          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleProjectClick}
              className="focus-ring flex items-center gap-x-1 text-slate-500 hover:text-slate-300 text-xs truncate transition"
            >
              {isGitHub ? <FaGithub aria-hidden="true" /> : <FaExternalLinkAlt aria-hidden="true" />}
              {isGitHub ? l.projects.viewRepo : l.projects.viewDemo}
            </a>
          )}
        </div>
      </div>

      <p className="text-slate-300 text-sm font-normal line-clamp-3">
        {project.description.replace(/\s*Stack:\s*.+$/, '').trim()}
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

      <p className="flex text-xs italic self-end text-slate-400">{project.typeOfWork}</p>
    </article>
  );
}
