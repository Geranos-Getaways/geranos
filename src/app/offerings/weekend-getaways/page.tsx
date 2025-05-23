'use client';

import React, { useEffect, useState } from 'react';
import defaultImage from '../../../../public/global/Tour_Packages.jpg';
import EventCards from '@/components/custom/EventCards';
import Link from 'next/link';

interface ExperienceItem {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    offerings: string;
    starting_price: string;
    thumbnail: string | number;
    destination_of_itenary: string;
    nights: string;
    days: string;
  };
  imageUrl: string;
  slug: string;
  featuredImage: string;
}

const Page = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const res = await fetch(
          'https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?per_page=50'
        );
        const data = await res.json();

        if (data) {
          const filtered = data.filter((item: any) => item.acf?.offerings === 'Weekend Getaways');

          setExperiences(filtered);
        }
      } catch (error) {
        console.error('Something went wrong while fetching offers', error);
      }
    };

    fetchOfferings();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      {/* ========== HERO SECTION ========== */}
      <section
        className="w-full bg-cover bg-center text-white py-20 px-4 sm:px-6 md:px-8 flex justify-center items-center min-h-[50vh]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${defaultImage.src})`,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col text-center items-center gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-bropella leading-tight">
            Weekend getaways
          </h1>
          <p className="text-base sm:text-lg max-w-2xl">
            Discover cultural experiences, spiritual sites, local food, and vibrant festivals —
            everything that makes Punjab unforgettable.
          </p>
        </div>
      </section>

      {/* ========== OFFERINGS CAROUSEL SECTION ========== */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-7xl mx-auto text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Weekend Getaways</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiences.map((item, index) => (
              <Link
                key={index}
                href={`/destination/${item?.acf?.destination_of_itenary}/itenary/${item?.slug}`}
              >
                <EventCards
                  title={item?.title?.rendered}
                  destination={item?.acf?.destination?.post_title}
                  days={item?.acf?.days}
                  nights={item?.acf?.nights}
                  price={item?.acf?.starting_price}
                  featuredImage={String(item?.acf?.thumbnail)}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
