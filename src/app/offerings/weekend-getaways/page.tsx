'use client';

import React, { useEffect, useState } from 'react';
import defaultImage from '../../../../public/global/Tour_Packages.jpg';
import EventCards from '@/components/custom/EventCards';
import Link from 'next/link';

interface ExperienceItem {
  id: number;
  title: { rendered: string };
  acf: {
    ratings: string;
    offerings: string;
    starting_price: string;
    thumbnail: string | number;
    destination_of_itenary: string;
    destination: any; // string or WP object
    nights: string;
    days: string;
  };
  slug: string;
  /** flag injected below: 'itinerary' | 'offering' */
  type: 'itinerary' | 'offering';
}

const Page = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  /* ────────────────────────────────── FETCH DATA ────────────────────────────────── */
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const [itineraryRes, offeringsRes] = await Promise.all([
          fetch('https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?per_page=50'),
          fetch('https://dashboard.geranosgetaways.com/wp-json/wp/v2/offerings?per_page=50'),
        ]);

        const [itineraryData, offeringsData] = await Promise.all([
          itineraryRes.json(),
          offeringsRes.json(),
        ]);

        const filteredItineraries = itineraryData
          .filter((i: any) => i.acf?.offerings === 'Weekend Getaways')
          .map((i: any) => ({ ...i, type: 'itinerary' as const }));

        const filteredOfferings = offeringsData
          .filter((o: any) => o.acf?.offerings === 'Weekend Getaways')
          .map((o: any) => ({ ...o, type: 'offering' as const }));

        setExperiences([...filteredOfferings, ...filteredItineraries]);
      } catch (err) {
        console.error('Something went wrong while fetching Weekend Getaways', err);
      }
    };

    fetchExperiences();
  }, []);

  /* ─────────────────────────────────── RENDER ─────────────────────────────────── */
  return (
    <div className="flex flex-col gap-16">
      {/* HERO SECTION */}
      <section
        className="w-full bg-cover bg-center text-white py-20 px-4 sm:px-6 md:px-8 flex justify-center items-center min-h-[50vh]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${defaultImage.src})`,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col text-center items-center gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-bropella leading-tight">
            Weekend Getaways
          </h1>
          <p className="text-base sm:text-lg max-w-2xl text-white">
            Quick escapes to unwind, explore, and recharge — all within a weekend.
          </p>
        </div>
      </section>

      {/* GRID SECTION */}
      {experiences.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-7xl mx-auto text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Weekend Getaways</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Explore quick trips curated for short escapes from the city.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {experiences.map((item) => {
                const destination =
                  typeof item.acf.destination === 'string'
                    ? item.acf.destination
                    : item.acf.destination?.post_title;

                /* ---------- card-specific route ---------- */
                const href =
                  item.type === 'itinerary'
                    ? `/destination/${destination}/itinerary/${item.slug}`
                    : `/offerings/itinerary/${item.slug}`; // or simply `/offerings/${item.slug}` if default route is configured

                return (
                  <Link key={item.id} href={href}>
                    <EventCards
                      title={item.title.rendered}
                      destination={destination}
                      days={item.acf.days}
                      nights={item.acf.nights}
                      ratings={item.acf.ratings}
                      price={item.acf.starting_price}
                      featuredImage={String(item.acf.thumbnail)}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;
