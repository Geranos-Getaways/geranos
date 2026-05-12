'use client';

import React, { useState, useEffect } from 'react';

interface HeroSliderProps {
  slides?: {
    [key: string]: string;
  } | null;
  title?: string;
  subheading?: string;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, title, subheading }) => {
  const slideImages = slides
    ? Object.values(slides).filter((slide): slide is string => typeof slide === 'string' && slide.trim() !== '')
    : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slideImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  const goToPrevious = () => {
    if (slideImages.length === 0) return;

    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slideImages.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    if (slideImages.length === 0) return;

    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
  };

  const currentImage = slideImages[currentIndex];

  return (
    <div
      className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden"
      id="destination-hero-section"
    >
  <div
  className="absolute inset-0 bg-cover transition-all duration-1000"
  style={{ 
    backgroundImage: currentImage ? `url(${currentImage})` : undefined, 
    backgroundPosition: 'top center' 
  }}
>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg capitalize font-bropella">
          {title}
        </h1>
        <p className="text-base md:text-xl mt-2 drop-shadow-md text-white">{subheading}</p>
      </div>

      {/* Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
        aria-label="Previous Slide"
      >
        &#8592;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
        aria-label="Next Slide"
      >
        &#8594;
      </button>
    </div>
  );
};

export default HeroSlider;
