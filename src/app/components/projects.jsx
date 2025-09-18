import Card from "./card";

export default function Projects({ l, darkMode }) {
  return (
    <section className="" id="projects">
      <h2 className="text-xl font-bold pb-3">{l.projects.title}</h2>
      <div className="flex flex-wrap gap-x-6">
        {l.projects.content.map((p, i) => (
          <Card key={p.title + i} project={p} />
        ))}
      </div>
    </section>
  );
}
