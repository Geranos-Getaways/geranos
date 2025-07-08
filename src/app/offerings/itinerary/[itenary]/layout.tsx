'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import defaultImage from '../../../../../public/global/Punjab.webp';
import SingleItenarySidebar from './SingleItenarySidebar';
import {
  CustomItineraryDestinationProvider,
  useCustomItineraryDestination,
} from './CustomItineraryDestinationContext';

interface LayoutProps {
  children: React.ReactNode;
  params: { itenary: string };
}

const LayoutShell: React.FC<LayoutProps> = ({ children, params }) => {
  const { itineraryInfo, isLoading } = useCustomItineraryDestination();
  const { acf } = itineraryInfo || {};
  const { itenary } = params;

  if (isLoading) {
    return <div className="py-20 text-center">Loading itinerary…</div>;
  }

  return (
    <>
      {/* Banner */}
      <div className="w-full h-[290px] md:h-[450px] relative">
        <Image
          src={acf?.thumbnail || defaultImage}
          alt="Hero"
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 -mt-8 flex justify-center">
        <div className="bg-white rounded-full shadow-md border border-gray-200 px-4 py-1 sm:px-6 sm:py-2 flex gap-4 sm:gap-6 text-sm sm:text-base">
          {['overview', 'daywise', 'accomodation'].map((tab) => (
            <Link
              key={tab}
              href={`/offerings/itinerary/${itenary}/${tab}`}
              className="text-gray-600 hover:text-black"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:flex-1">{children}</div>
        <div className="w-full lg:w-[320px] shrink-0 hidden lg:block">
          <SingleItenarySidebar
            destination={acf?.destination?.post_title}
            price={acf?.starting_price}
          />
        </div>
      </div>
    </>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, params }) => (
  <CustomItineraryDestinationProvider slug={params.itenary}>
    <LayoutShell params={params}>{children}</LayoutShell>
  </CustomItineraryDestinationProvider>
);

export default Layout;
