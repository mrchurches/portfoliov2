'use client'
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])
  return (
    <div>
      <p>A lot of projects here ...</p>
      <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          Slide1
          <button onClick={()=>console.log('hola')}>Click me</button>  
        </div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
    </div>
  );
}