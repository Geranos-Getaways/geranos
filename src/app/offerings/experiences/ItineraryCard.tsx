import { StarIcon } from 'lucide-react';
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

const ItineraryCard = ({
  destination,
  title,
  price,
  days,
  nights,
  featuredImage,
  ratings,
}: CardProps) => {
  console.log('Itinerary Card Destination: ', destination);
  return (
    <div
      className="h-[260px] w-full rounded-xl overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(167 167 167 / 0%), rgb(0 0 0 / 80%)), url(${featuredImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Rating Badge */}
      <div className="absolute top-2 right-2 bg-[rgb(75_75_75_/_45%)] text-white rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
        <StarIcon className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-medium">{ratings}</span>
      </div>

      {/* Bottom Overlay Content */}
      <div className="absolute bottom-4 w-full text-white px-4">
        <div className="flex justify-between items-end">
          <div className="w-[60%]">
            <span className="block text-xs opacity-80 uppercase tracking-wide">{destination}</span>
            <h5 className="text-sm leading-4 font-normal line-clamp-2">{title}</h5>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="italic text-sm">Starts @</p>
            <p className="text-md font-bold text-[#f3c30c]">₹ {price || 'Not Mentioned'}/-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
