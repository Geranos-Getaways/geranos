'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

import defaultImage from '../../../../../public/global/Punjab.webp';
import SingleItenarySidebar from './SingleItenarySidebar';
import {
  OfferingItineraryProvider,
  useOfferingItinerary,
} from '../../../../context/OfferingItineraryContext';

interface LayoutProps {
  children: React.ReactNode;
  params: { state: string; itenary: string };
}

/* ---------------------- PRESENTATIONAL SHELL ---------------------- */

const LayoutShell: React.FC<LayoutProps> = ({ children, params }) => {
  const { itineraryInfo, isLoading } = useOfferingItinerary();
  const acf = itineraryInfo?.acf;
  const { itenary } = params;

  if (isLoading) return <div className="py-20 text-center">Loading itinerary…</div>;

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

      {/* Sticky Tabs */}
      <div className="relative z-10 -mt-8 flex justify-center">
        <div className="bg-white rounded-full shadow-md border border-gray-200 px-4 py-1 sm:px-6 sm:py-2 flex gap-4 sm:gap-6 text-sm sm:text-base">
          <Link href={`/offerings/${itenary}/overview`} className="text-gray-600 hover:text-black">
            Overview
          </Link>
          <Link href={`/offerings/${itenary}/daywise`} className="text-gray-600 hover:text-black">
            Daywise
          </Link>
          <Link
            href={`/offerings/${itenary}/accomodations`}
            className="text-gray-600 hover:text-black"
          >
            Accommodations
          </Link>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="w-full lg:flex-1">{children}</div>

        {/* Sidebar */}
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

/* ---------------------- ROOT LAYOUT WRAPPER ---------------------- */

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  // Hide default hero section (global)
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.id = 'hide-global-hero-style';
    styleEl.innerHTML = `
      #destination-hero-section {
        display: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      const existingEl = document.getElementById('hide-global-hero-style');
      if (existingEl) existingEl.remove();
    };
  }, []);

  return (
    <OfferingItineraryProvider slug={params.itenary}>
      <LayoutShell params={params}>{children}</LayoutShell>
    </OfferingItineraryProvider>
  );
};

export default Layout;
