import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import useGTM from "../hooks/useGTM";

export default function Card({ project, l }) {
  const { trackEvent } = useGTM();

  const stack = Array.isArray(project.stack) ? project.stack : [];
  const links = project.links || {};
  const hasImage = Array.isArray(project.image) && project.image.length > 0;

  const handleProjectClick = (kind, link) => {
    trackEvent("project_click", {
      project_name: project.title,
      project_status: project.status === 1 ? "active" : "paused",
      project_link: link,
      project_link_type: kind,
      project_type: project.typeOfWork,
    });
  };

  const linkClass =
    "focus-ring flex items-center gap-x-1 text-fg-muted hover:text-fg-strong text-xs transition";

  return (
    <article className="w-full lg:w-2/5 flex flex-col gap-y-3 rounded-xl p-4 border border-transparent transition hover:bg-surface-raised hover:border-surface-chip hover:shadow-lg">
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
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleProjectClick("demo", links.demo)}
                className={linkClass}
              >
                <FaExternalLinkAlt aria-hidden="true" />
                {l.projects.viewDemo}
              </a>
            )}
            {links.repo && (
              <a
                href={links.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleProjectClick("repo", links.repo)}
                className={linkClass}
              >
                <FaGithub aria-hidden="true" />
                {l.projects.viewRepo}
              </a>
            )}
          </div>
        </div>
      </div>

      <p className="text-fg text-sm font-normal line-clamp-3">
        {project.description}
      </p>

      {stack.length > 0 && (
        <ul className="flex flex-wrap gap-1">
          {stack.map((tech) => (
            <li
              key={tech}
              className="text-xs px-2 py-1 bg-surface-chip rounded-full text-fg"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <p className="flex text-xs italic self-end text-fg-muted">{project.typeOfWork}</p>
    </article>
  );
}
