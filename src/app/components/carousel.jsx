import Image from "next/image";
import { useEffect, useState } from "react";


export default function Carousel ({ images }){
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((index + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  useEffect(() => {
    setIndex(0);
  }, [images]);

  return (
    <div className="carousel">
      <div className="carousel-inner w-auto h-96 p-2">
        {images.map((image, i) => (
          <Image
            key={i}
            src={image}
            alt={`Image ${i}`}
            className={`${i === index ? "active" : "hidden"} object-cover rounded-xl`}
            width={1000}
            height={10000}
          />
        ))}
      </div>
      <button className="prev-btn" onClick={prevImage}>❮</button>
      <button className="next-btn" onClick={nextImage}>❯</button>
    </div>
  );
};