export default function Education({l, darkMode}){
    return (
        <section>
            <h2 className="text-xl"><strong>{l.education.title}</strong></h2>
            <div className="flex flex-col gap-y-4 pt-4">
                {l.education.content.map((education, index) => (
                    <article key={index} className="flex flex-col gap-y-2">
                        <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{education.institution}</h3>
                        <h5 className="font-extralight text-sm italic">{education.duration}</h5>
                        </div>
                        <h4 className="text-sm font-light italic">{education.title}</h4>
                    </article>
                ))}
            </div>
        </section>
    );
}