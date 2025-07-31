import Image from 'next/image';
import React from 'react';
import TripModal from './TripModal';

interface CustomizeTripProps {
  heroImage?: string; // add optional prop
}

const CustomizeTrip = ({ heroImage }: CustomizeTripProps) => {
  return (
    <div
      className="w-full rounded-2xl shadow-md p-6 md:p-8 flex flex-col gap-6 sticky top-28"
      style={{ backgroundImage: 'linear-gradient(45deg, #ecfbff, #e9fcffe0)' }}
    >
      {/* Header Section */}
      <div className="flex flex-col items-center sm:items-start gap-4">
        {/* Avatar stack */}
        <div className="relative flex-shrink-0 min-w-[120px] h-12">
          <Image
            src="/global/Punjab.webp"
            alt="Expert"
            width={48}
            height={48}
            className="rounded-full border-2 border-white z-30 absolute"
          />
          <Image
            src="/global/Punjab.webp"
            alt="Expert"
            width={48}
            height={48}
            className="rounded-full border-2 border-white z-20 absolute left-6"
          />
          <Image
            src="/global/Punjab.webp"
            alt="Expert"
            width={48}
            height={48}
            className="rounded-full border-2 border-white z-10 absolute left-12"
          />
        </div>

        {/* Text */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-1">Want a customized Experience?</h3>
          <p className="text-sm text-gray-600">
            Get in touch with our Expert who knows the destination better than anyone!
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-purple-100 rounded-full" />
          <p className="text-sm text-gray-600">Customize travel</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-100 rounded-full" />
          <p className="text-sm text-gray-600">Deep destination knowledge</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-orange-100 rounded-full" />
          <p className="text-sm text-gray-600">Personalized assistance</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full">
        <TripModal heroImage={heroImage} /> {/* Pass the heroImage prop */}
      </div>
    </div>
  );
};

export default CustomizeTrip;
