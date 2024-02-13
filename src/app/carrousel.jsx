import { useEffect, useState } from "react";


const Carousel = ({ images }) => {
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
      <div className="carousel-inner w-auto h-96">
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`Image ${i}`}
            className={`${i === index ? "active" : "hidden"} object-cover rounded-lg`}
          />
        ))}
      </div>
      <button className="prev-btn" onClick={prevImage}>❮</button>
      <button className="next-btn" onClick={nextImage}>❯</button>
    </div>
  );
};

export default Carousel;
