import { useState } from "react";
import Carousel from "./carousel";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import Card from "./card";

export default function Projects({l,darkMode}){
    const [selectedProject, setSelectedProject] = useState(0);
    let project = l.projects.content[selectedProject];
    return (
        <section className="" id="projects">
            <h2 className="text-xl font-bold pb-3">{l.projects.title}</h2>
            <div className="flex flex-wrap gap-x-6">
              {l.projects.content.map((p, i) => (
                  <Card key={p.title + i + selectedProject} project={p}/>
              ))}
            </div>
      </section>
    );
}