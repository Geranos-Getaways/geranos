import { Star, StarIcon } from 'lucide-react';
import { fetchExternalImage } from 'next/dist/server/image-optimizer';
import React from 'react';

interface CardProps {
  title: string;
  destination: string;
  featuredImage: string;
  price: string;
  days: string;
  nights: string;
}

const EventCards = ({ destination, title, price, days, nights, featuredImage }: CardProps) => {
  // console.log("Featured Image", featuredImg)
  return (
    <div
      className="h-[260px] w-full rounded-xl overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(167 167 167 / 0%), rgb(0 0 0 / 80%)), url(${featuredImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute bottom-4 w-full text-white px-4">
        <div className="flex justify-between items-end">
          <div className="w-[60%]">
            <span className="block text-xs opacity-80 uppercase tracking-wide">{destination}</span>
            <h5 className="text-sm leading-4 font-regular">{title}</h5>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="italic text-sm">Starts @</p>
            <p className="text-md font-bold" style={{ color: '#f3c30c' }}>
              ₹ {price || 'Not Mentioned'}/-
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCards;
