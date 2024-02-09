import texts from "../../public/es.json"
export default function Home() {

  return (
<div className="flex w-full h-full justify-end align-start">
        <div className="w-80 sm:w-1/2 static">
            <img src="/personal-home.jpg" alt="Imagen de fondo" className="w-full object-cover image-home" />
            <div className="w-80 sm:w-72 md:w-1/2 text-black absolute top-1/3 left-10 sm:left-96">
                <div className="w-1/2 text-3xl font-bold">{texts.home.title}</div>
                <div className="bg-amber-500 w-full h-2 mb-4"></div>
                <div className="w-full text-lg p-3 sm:p-6 h-1/2  " id="subtitle-home">{texts.home.subtitle}</div>
            </div>
        </div>
</div>
  );
}
