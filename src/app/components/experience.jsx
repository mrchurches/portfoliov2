export default function Experience({l}){

    return (
        <section id="experience" className="">
            <h2 className="text-xl"><strong>{l.experience.title}</strong></h2>
            <div className="flex flex-col gap-y-6 pt-4">
                {l.experience.content.map((experience, index) => (
                    <article key={index} className="flex flex-col gap-y-2">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <h3 className="font-semibold">{experience.company}</h3>
                            <p className="font-normal text-sm italic text-fg-muted">{experience.duration}</p>
                        </div>
                        <h4 className="text-sm">{experience.title}</h4>
                        <ul className="flex flex-col gap-y-2">
                            {experience.tasks.map((task, index) => (
                                <li key={index} className="task text-sm font-mono font-light text-fg-muted" >·{task}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}
