'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from '../../../../public/global/Experiences.jpg';
import Link from 'next/link';
import ExperiencesCards from './ExperiencesCards';
import ItineraryCard from './ItineraryCard';

interface ExperienceItem {
  id: number;
  slug: string;
  type: 'itinerary' | 'offering'; // 👈 Added type flag
  title: { rendered: string };
  acf: {
    ratings: string;
    offerings: string;
    starting_price: string;
    thumbnail: string | number;
    destination_of_itenary: string;
    destination: any;
    days: string;
    nights: string;
  };
}

const Page = () => {
  const [combinedList, setCombinedList] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itineraryRes, offeringsRes] = await Promise.all([
          fetch('https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?per_page=50'),
          fetch('https://dashboard.geranosgetaways.com/wp-json/wp/v2/offerings?per_page=50'),
        ]);

        const itinerariesRaw = await itineraryRes.json();
        const offeringsRaw = await offeringsRes.json();

        const itineraries = itinerariesRaw
          .filter((item: any) => item?.acf?.offerings === 'Experiences')
          .map((item: any) => ({ ...item, type: 'itinerary' }));

        const offerings = offeringsRaw
          .filter((item: any) => item?.acf?.offerings === 'Experiences')
          .map((item: any) => ({ ...item, type: 'offering' }));

        console.log('Offerings: ', offerings);

        setCombinedList([...offerings, ...itineraries]);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchData();
  }, []);

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
            Experiences
          </h1>
          <p className="text-base sm:text-lg max-w-2xl text-white">
            Discover cultural experiences, spiritual sites, local food, and vibrant festivals —
            everything that makes Punjab unforgettable.
          </p>
        </div>
      </section>

      {/* COMBINED CARDS GRID */}
      {combinedList.length > 0 && (
        <section className="px-4 md:px-6">
          <div className="mb-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-1">Experiences & Add-ons</h2>
            <p className="text-md text-gray-600">Combine itineraries and offerings seamlessly</p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {combinedList.map((item) => {
              const isItinerary = item.type === 'itinerary';
              const href = isItinerary
                ? `/destination/${item.acf.destination?.post_title}/experience/${item.slug}`
                : `/offerings/experience/${item.slug}`;
              // `/offerings/itinerary/${item.slug}`
              return (
                <Link key={item.id} href={href}>
                  {isItinerary ? (
                    <ExperiencesCards
                      title={item.title.rendered}
                      destination={item.acf.destination?.post_title}
                      ratings={item.acf.ratings}
                      days={item.acf.days}
                      nights={item.acf.nights}
                      price={item.acf.starting_price}
                      featuredImage={String(item.acf.thumbnail)}
                    />
                  ) : (
                    <ItineraryCard
                      title={item.title.rendered}
                      destination={item.acf.destination}
                      ratings={item.acf.ratings}
                      days={item.acf.days}
                      nights={item.acf.nights}
                      price={item.acf.starting_price}
                      featuredImage={String(item.acf.thumbnail)}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;
