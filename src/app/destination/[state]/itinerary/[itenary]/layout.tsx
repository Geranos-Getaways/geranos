'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import defaultImage from '../../../../../../public/global/Punjab.webp';
import Link from 'next/link';
import SingleItenarySidebar from './SingleItenarySidebar';
import { ItineraryProvider, useItinerary } from './ItineraryContext';

interface LayoutProps {
  children: React.ReactNode;
  params: { state: string; itenary: string };
}

interface LayoutStructureProps {
  children: React.ReactNode;
  params: { state: string; itenary: string };
}

const LayoutStructure = ({ children, params }: LayoutStructureProps) => {
  const { itineraryInfo } = useItinerary();
  const acf = itineraryInfo?.acf;
  const { state } = params;

  return (
    <>
      {/* Banner */}
      <div className="w-full h-[290px] md:h-[450px] relative">
        <Image
          src={acf?.thumbnail || defaultImage}
          alt="Hero"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      {/* Sticky Tabs */}
      <div className="relative z-10 -mt-8 flex justify-center">
        <div className="bg-white rounded-full shadow-lg px-6 py-2 flex gap-6 text-sm border border-gray-200">
          <Link href={`/destination/${state}/itinerary/${itineraryInfo?.slug}`}>
            <button className="text-gray-500">Overview</button>
          </Link>
          <Link href={`/destination/${state}/itinerary/${itineraryInfo?.slug}/daywise`}>
            <button className="text-gray-500">Daywise</button>
          </Link>
          <Link href={`/destination/${state}/itinerary/${itineraryInfo?.slug}/accomodation`}>
            <button className="text-gray-500">Accommodations</button>
          </Link>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-12">
        {/* Main Section */}
        <div className="w-full lg:flex-1">{children}</div>

        {/* Sidebar */}
        <div className="w-full lg:w-[320px] shrink-0">
          <SingleItenarySidebar
            destination={acf?.destination?.post_title}
            price={acf?.starting_price}
          />
        </div>
      </div>
    </>
  );
};

const Layout = ({ children, params }: LayoutProps) => {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      #destination-hero-section {
        display: none !important;
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <ItineraryProvider slug={params.itenary}>
      <LayoutStructure params={params}>{children}</LayoutStructure>
    </ItineraryProvider>
  );
};

export default Layout;
