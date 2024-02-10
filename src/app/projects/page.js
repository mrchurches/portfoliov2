'use client'
import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = [
    'world-app-1.png',
    'world-app-2.png',
    'world-app-3.png',
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex justify-center items-center h-full font-mono '>
      <div className="embla w-10/12 sm:w-8/12 h-4/5 rounded-md" ref={emblaRef}>
        <div className="embla__container h-full ">
          <div className="embla__slide p-4 bg-cover sm:bg-contain bg-no-repeat bg-center transition duration-1000 ease-in-out" style={{backgroundImage: `url(${images[currentIndex]})`}}>
            <div className="content-wrapper absolute bottom-0 left-0 p-4 bg-slate-300 bg-opacity-50">
              <h2 className='pb-2 font-semibold text-xl '>World App</h2> 
              <p className='italic'>Una app desarrollada con el stack PERN que cree para poner en práctica mis conocimientos.
                La app permite a los usuarios buscar países y ver información sobre ellos.
                También permite crear actividades y guardarlas en los países que quieras.
                Toda la información está alojada en una base de datos PostgreSQL y es consumida desde una API en un servidor Node.js.
              </p>
            </div>
          </div>
          <div className="embla__slide">Ecommerce videogames</div>
          <div className="embla__slide">Tetris</div>
        </div>
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2">
        <button className="text-white p-2" onClick={() => emblaApi.scrollPrev() }>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2">
        <button className="text-white p-2" onClick={() => emblaApi.scrollNext()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}