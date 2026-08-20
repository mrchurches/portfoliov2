import Image from "next/image";
import { BiWorld } from "react-icons/bi";

export default function About({ l }) {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-between pt-10" id="about">
      <div className=" pt-10 gap-y-2 flex flex-col lg:w-3/5">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {l.about.title}
        </h1>
        <p className="text-lg font-medium pb-1">{l.about.role}</p>
        <p className="font-light">{l.about.subtitle}</p>
        <p className="flex flex-wrap gap-x-2 gap-y-1 text-sm items-center italic text-slate-400">
          <span className="flex gap-x-1 items-center"><BiWorld aria-hidden="true" />{l.about.from}</span>
          <span aria-hidden="true">·</span>
          <span>{l.about.status}</span>
        </p>
      </div>
      <div className="relative w-40 h-40 rounded-full overflow-hidden lg:self-end mt-10" id="container_about_image">
        <Image
          src="/personal-home.jpg"
          alt="Laureano Iglesias - Full Stack Developer"
          fill
          className="object-cover"
          sizes="160px"
          priority
        />
      </div>
    </div>
  );
}
