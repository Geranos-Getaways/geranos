'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CustomizeTrip from '../CustomizeTrip';
import { DestinationContext } from './DestinationContext';

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
        <div
          className="page-hero-section h-[300px] md:h-[700px] overflow-hidden relative flex flex-col items-center"
          id="destination-hero-section"
        >
          <Image
            width={1920}
            height={500}
            src={destination?.acf?.large_image || `/global/${state}.webp`}
            alt={`${state} Hero Section`}
            className="w-full h-full object-cover object-center"
          />

          {/* Overlay content */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center"
            style={{ backgroundColor: '#00000075' }}
          >
            <h1 className="text-4xl md:text-8xl font-bold drop-shadow-lg capitalize font-bropella">
              {state}
            </h1>
            <p className="text-lg md:text-2xl mt-2 drop-shadow-md text-white">
              {destination?.acf?.sub_heading}
            </p>
          </div>

          {/* Nav bar positioned above bottom */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
            <ul
              className="flex gap-4 text-lg bg-slate-200 px-6 py-2 rounded-full shadow-md"
              style={{ backgroundColor: '#ffffffa3' }}
            >
              <li>
                <Link
                  href={`/destination/${state}/explore/culture-and-history`}
                  className="hover:text-blue-600 hover:text-xl transition-all duration-200 text-black"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href={`/destination/${state}/itineraries`}
                  className="hover:text-blue-600 hover:text-xl transition-all duration-200 text-black"
                >
                  Itineraries
                </Link>
              </li>
              <li>
                <Link
                  href={`/destination/${state}/experiences`}
                  className="hover:text-blue-600 hover:text-xl transition-all duration-200 text-black"
                >
                  Experiences
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-2 my-2">{children}</div>

        <div className="cta-footer my-4">
          <CustomizeTrip />
        </div>
      </div>
    </DestinationContext.Provider>
  );
};

export default Layout;
