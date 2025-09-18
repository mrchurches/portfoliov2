import Image from "next/image";
import { BiWorld } from "react-icons/bi";

export default function About({ l }) {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-between pt-10" id="about">
      <div className=" pt-10 gap-y-2 flex flex-col lg:w-3/5">
        <h1 className="pb-2 font-semibold">
          {l.about.title}
        </h1>
        <p className="font-light">{l.about.subtitle}</p>
        <h5 className="flex gap-x-1 text-sm items-center italic text-slate-400"><span><BiWorld /></span>{l.about.from}</h5>
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
