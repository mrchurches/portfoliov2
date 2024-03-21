import { useState } from "react";
import Carousel from "./carousel";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

export default function Projects({l,darkMode}){
    const [selectedProject, setSelectedProject] = useState(0);
    let project = l.projects.content[selectedProject];
    return (
        <div className="" id="projects">
        <h2 className="text-lg font-bold pb-3">{l.projects.title}</h2>
        <div>
          <div className={`flex gap-2 overflow-auto whitespace-nowrap `}>
            {l.projects.content.map((p, i) => (
              <h3
                key={p.title + i + selectedProject}
                className={`w-full break-keep text-md flex gap-x-1 p-2 items-center rounded-lg  justify-center hover:cursor-pointer`}
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
            className={`my-3 p-4 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-slate-300"
            } p-2`}
          >
            <Carousel images={project.image} />
            <p className="pt-4 px-5 font-light">{project.description}</p>
            <Link href={project.link} target="_blank">
              <div className="flex pt-2 pr-3 text-sky-600 gap-x-2 items-center w-full justify-end">
                Github <SiGithub />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
}