'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from '../../../../public/global/Punjab.webp';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const Page = () => {
  const [weekendGetaways, setWeekendGetaways] = useState([]);

  useEffect(() => {
    const fetchOfferings = async () => {
      const res = await fetch('https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?per_page=50');
      const data = await res.json();
      const weekendGetawaysResponse = data.filter((item: any) => item.acf?.offerings === 'Tour Packages');
      setWeekendGetaways(weekendGetawaysResponse);
    };

    fetchOfferings();
  }, []);

  return (
    <div className="flex flex-col gap-16">

      {/* ================== HERO SECTION ================== */}
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
              Discover cultural weekendGetaways, spiritual sites, local food, and vibrant festivals — everything that makes Punjab unforgettable.
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

      {/* ================== OFFERINGS CAROUSEL SECTION ================== */}
      <section className="px-6 lg:px-0">
        <div className="mb-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-1">Weekend Getaways</h2>
          <p className="text-md text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>

        <Carousel>
          <CarouselContent className="-mx-2 max-w-7xl mx-auto">
            {weekendGetaways.map((item: any, index) => (
              <CarouselItem key={index} className="md:basis-1/4 px-2">
                <div
                  className="h-[260px] w-full rounded-xl overflow-hidden relative bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${defaultImage.src})`,
                  }}
                >
                  <div className="absolute bottom-4 w-full text-white px-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="block text-xs opacity-80 uppercase tracking-wide">Punjab</span>
                        <h5 className="text-lg font-semibold">{item?.title?.rendered}</h5>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">
                          ₹{item?.acf?.starting_price || '500'}/-
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
            
          </CarouselContent>
        </Carousel>

        
      </section>
    </div>
  );
};

export default Page;
