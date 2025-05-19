import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  return (
    <div className="page-hero-section h-[500px] overflow-hidden">
      <Image
        src="/global/Punjab.webp"
        alt="Punjab Hero Section"
        className="w-full object-cover object-center"
      />
    </div>
  );
};

export default HeroSection;
