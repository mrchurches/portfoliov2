import Card from "./card";

export default function Projects({l}){
    return (
        <section id="projects">
            <h2 className="text-xl pb-3"><strong>{l.projects.title}</strong></h2>
            <div className="flex flex-wrap gap-x-6">
              {l.projects.content.map((p, i) => (
                  <Card key={p.title + i} project={p} l={l}/>
              ))}
            </div>
      </section>
    );
}
