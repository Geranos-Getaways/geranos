'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from '../../../../public/global/Punjab.webp';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
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

          const enriched = await Promise.all(
            filtered.map(async (item: any) => {
              let featuredImage = defaultImage.src;
              try {
                const mediaRes = await fetch(
                  `https://dashboard.geranosgetaways.com/wp-json/wp/v2/media/${item.acf?.thumbnail}`
                );
                const media = await mediaRes.json();
                featuredImage = media?.source_url || defaultImage.src;
              } catch (err) {
                console.warn(`Failed to load media for item ${item.id}`);
              }

              return {
                ...item,
                featuredImage,
              };
            })
          );

          setExperiences(enriched);
          console.log('Enriched Content: ', enriched);
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
        className="w-full bg-cover bg-center text-white py-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${defaultImage.src})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-bropella leading-tight">
              Lorem ipsum dolor sit amet.
            </h1>
            <p className="text-lg">
              Discover cultural experiences, spiritual sites, local food, and vibrant festivals —
              everything that makes Punjab unforgettable.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <Image
              src={defaultImage}
              alt="Punjab Scenic"
              className="rounded-xl shadow-lg"
              width={500}
              height={350}
            />
          </div>
        </div>
      </section>

      {/* ========== EXPERIENCES CAROUSEL ========== */}
      <section className="px-6 lg:px-0">
        <div className="mb-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-1">Weekend Getaways</h2>
          <p className="text-md text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <Carousel>
          <CarouselContent className="-mx-2 max-w-7xl mx-auto">
            {experiences.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/4 px-2">
                <Link
                  href={`/destination/${item?.acf?.destination_of_itenary}/itenary/${item?.slug}`}
                >
                  <EventCards
                    title={item?.title?.rendered}
                    destination={item?.acf?.destination_of_itenary}
                    days={item?.acf?.days}
                    nights={item?.acf?.nights}
                    price={item?.acf?.starting_price}
                    featuredImage={item?.featuredImage}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
};

export default Page;
