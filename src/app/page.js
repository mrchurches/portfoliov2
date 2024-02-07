import Image from "next/image";

export default function Home() {
  return (
<div className="flex items-center w-full h-full">
  <div className="relative w-full h-full flex justify-between align-center">
    <div className="h-20 w-20" id="deformed-circle"></div>
    <Image className="" src="/personal-home.jpg" width='800' height='500' alt="personal image of the owner of the portfolio" />
  </div>
  <div className="flex ml-4 absolute align-center items-center w-full flex-col">
    <h1 id="description-title">Full stack dev</h1>
    <div id="text" className="bg-orange-300 p-6 w-80 mr-40">Un desarrollador Full Stack con conocimientos en Node.js y React está capacitado para crear aplicaciones web tanto en el frontend como en el backend. En el lado del servidor, utiliza Node.js para desarrollar APIs y servicios web eficientes y escalables. En el lado del cliente, utiliza React para construir interfaces de usuario interactivas y dinámicas. En resumen, esta persona tiene la capacidad de trabajar en todas las partes esenciales de una aplicación web, desde la manipulación de datos y la lógica del servidor hasta la presentación y la experiencia del usuario en el navegador.</div>
  </div>
</div>
  );
}
