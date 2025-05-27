import { Star, StarIcon, StarsIcon } from 'lucide-react';
import { fetchExternalImage } from 'next/dist/server/image-optimizer';
import React from 'react';

interface CardProps {
  title: string;
  destination: string;
  featuredImage: string;
  price: string;
  days: string;
  nights: string;
  ratings: string;
}

const EventCards = ({
  destination,
  title,
  price,
  days,
  nights,
  featuredImage,
  ratings,
}: CardProps) => {
  // console.log("Featured Image", featuredImg)
  return (
    <div
      className="h-[260px] w-full rounded-xl overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.8)), url(${featuredImage})`,
      }}
    >
      {/* Rating Badge */}
      <div className="absolute top-2 right-2 rounded-full px-3 py-1 flex items-center gap-1 bg-[rgb(75_75_75_/_45%)]">
        <StarsIcon className="text-yellow-400 w-4 h-4" />
        <span className="text-sm font-medium text-white">{ratings || 4.5}</span>
      </div>

      {/* Bottom Overlay Content */}
      <div className="absolute bottom-4 w-full text-white px-4">
        <div className="flex justify-between items-end">
          <div className="w-[65%]">
            <p className="text-xs uppercase opacity-80 tracking-wide truncate">{destination}</p>
            <h5 className="text-sm font-medium leading-tight line-clamp-2">{title}</h5>
          </div>
          <div className="text-right">
            <p className="italic text-xs">Starts @</p>
            <p className="text-sm font-semibold text-[#f3c30c]">₹ {price || 'Not Mentioned'}/-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCards;
