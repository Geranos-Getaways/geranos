'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DestinationContext } from './DestinationContext';
import CustomizeTrip from '@/components/custom/CustomizeTrip/CustomizeTrip';
import HeroSlider from '@/components/custom/HeroSlider/HeroSlider';

interface LayoutProps {
  children: React.ReactNode;
  params: { state: string };
}

const Layout = ({ children, params }: LayoutProps) => {
  const { state } = params;
  const [destination, setDestination] = useState<any>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      const res = await fetch(
        `https://dashboard.geranosgetaways.com/wp-json/wp/v2/destinations?slug=${state}`
      );
      const destinationInfo = await res.json();
      setDestination(destinationInfo[0]);
    };

    fetchDestination();
  }, [state]);

  if (!destination) return <div className="text-center py-20">Loading destination...</div>;

  return (
    <DestinationContext.Provider value={destination}>
      <div>
        {/* HERO BANNER */}
        <HeroSlider
          slides={destination.acf?.destination_hero_slider}
          title={destination?.title?.rendered}
          subheading={destination?.acf?.sub_heading}
        />

        {/* Sticky Tabs */}
        <div
          className="relative z-10 -mt-4 flex justify-center"
          id="destination-stick-layout-options"
        >
          <div className="bg-white rounded-full shadow-md border border-gray-200 px-4 py-1 sm:px-6 sm:py-2 flex gap-4 sm:gap-6 text-sm sm:text-base">
            <Link href={`/destination/${state}/explore`}>
              <button className="text-gray-600 hover:text-black transition-colors">Explore</button>
            </Link>
            <Link href={`/destination/${state}/itineraries`}>
              <button className="text-gray-600 hover:text-black transition-colors">
                Itinerary
              </button>
            </Link>
            <Link href={`/destination/${state}/experiences`}>
              <button className="text-gray-600 hover:text-black transition-colors">
                Experience
              </button>
            </Link>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="py-2 px-4" id="destination-state-layout">
          {children}
        </div>

        {/* CUSTOMIZE TRIP FORM */}
        {/* <div className="cta-footer my-8">
          <CustomizeTrip />
        </div> */}
      </div>
    </DestinationContext.Provider>
  );
};

export default Layout;
