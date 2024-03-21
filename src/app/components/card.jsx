import { CiShare1 } from "react-icons/ci";
import { GrStatusGoodSmall } from "react-icons/gr";

export default function Card({ project }) {
  return (
    <article className="w-2/5 flex flex-col gap-y-4 hover:bg-slate-800 rounded-xl p-4 transition ">
      <img
        src={project.image[0]}
        alt={project.title}
        className="rounded-xl w-20 h-20 object-cover"
      />
      <div className="w-4/5">
        <h3 className="flex items-center gap-x-2 text-lg font-bold">
          {project.title}
          <span >
            <GrStatusGoodSmall color={`${project.status == 1? 'green':'orange'}`} size="0.5rem"/>
          </span>
        </h3>
        <a
          href={project.link}
          target="_blank"
          className="flex items-center gap-x-1 text-slate-500 text-xs truncate"
        >
          <span>
            <CiShare1 />
          </span>
          {project.link}
        </a>
      </div>
      <p className="text-slate-300 text-sm font-normal overflow-y-scroll line-clamp-3 ">{project.description}</p>
      <h4 className="flex text-xs italic self-end">{project.typeOfWork}</h4>
    </article>
  );
}
