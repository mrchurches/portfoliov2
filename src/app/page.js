import texts from "../../public/es.json"
export default function Home() {

  return (
<div className="flex w-screen h-screen justify-end align-start">
        <div className="w-80 sm:w-1/2 static">
            <img src="/personal-home.jpg" alt="Imagen de fondo" className="w-full h-full object-cover" />
            <div className="px-6 w-1/2 absolute top-1/3 right-1/3 text-black">
                <div className="w-screen sm:w-auto text-3xl font-bold">{texts.home.title}</div>
                <div className="bg-amber-500 w-full h-2 mb-4"></div>
                <div className="text-lg p-3 sm:p-6" id="subtitle-home">{texts.home.subtitle}</div>
            </div>
        </div>
</div>
  );
}
