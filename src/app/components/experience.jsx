export default function Experience({l, darkMode}){
    return (
        <section id="experience" className="">
            <h2 className="text-xl"><strong>{l.experience.title}</strong></h2>
            <div className="flex flex-col gap-y-6 pt-4">
                {l.experience.content.map((experience, index) => (
                    <article key={index} className="flex flex-col gap-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{experience.company}</h3>
                            <h5 className="font-extralight text-sm italic">{experience.duration}</h5>
                        </div>
                        <h4 className="text-sm">{experience.title}</h4>
                        {experience.tasks.map((task, index) => (
                            <h4 key={index} className="text-sm font-mono font-light">·{task}</h4>
                        ))}
                    </article>
                ))}
            </div>
        </section>
    );
}