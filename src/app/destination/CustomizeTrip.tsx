import Image from 'next/image';
import React from 'react';
import CustomTripModal from './[state]/CustomTripModal';

const CustomizeTrip = () => {
  return (
    <div
      className="w-full max-w-6xl mx-auto rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-12"
      style={{ backgroundImage: 'linear-gradient(45deg, #ecfbff, #e9fcffe0)' }}
    >
      {/* Left Content Section */}
      <div className="flex flex-col sm:flex-row items-start gap-6 flex-1">
        {/* Avatar Stack */}
        <div className="relative min-w-[144px] h-12">
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

        {/* Text Content */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Want a customized Experience?</h3>
          <p className="text-sm text-gray-500">
            Get in touch with our Expert who knows the destination better than anyone!
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4">
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
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full sm:w-auto">
        <CustomTripModal />
      </div>
    </div>
  );
};

export default CustomizeTrip;
