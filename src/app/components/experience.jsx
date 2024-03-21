import { useEffect } from "react";

export default function Experience({l, darkMode}){

    return (
        <section id="experience" className="">
            <h2 className="text-xl"><strong>{l.experience.title}</strong></h2>
            <div className="flex flex-col gap-y-6 pt-4">
                {l.experience.content.map((experience, index) => (
                    <article key={index} className="flex flex-col gap-y-2">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <h3 className="font-semibold">{experience.company}</h3>
                            <h5 className="font-normal text-sm italic">{experience.duration}</h5>
                        </div>
                        <h4 className="text-sm">{experience.title}</h4>
                        {experience.tasks.map((task, index) => (
                            <h4 key={index} className={`task text-sm font-mono font-light text-slate-400`} >·{task}</h4>
                        ))}
                    </article>
                ))}
            </div>
        </section>
    );
}