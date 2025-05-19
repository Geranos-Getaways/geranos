'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EventCards from '@/components/custom/EventCards';
import defaultImage from '../../../../../public/global/Punjab.webp';

interface Props {
  state: string; // 👈 Define the single prop here
}

const ItinaryCards = ({ state }: Props) => {
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchItenaries = async () => {
      try {
        const res = await fetch(
          `https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?destination_of_itenary=${state}`
        );
        const data = await res.json();

        if (data) {
          //fetch featured image
          const demo = await Promise.all(
            data.map(async (item: any) => {
              let featuredImage = defaultImage.src;

              try {
                const res = await fetch(
                  `https://dashboard.geranosgetaways.com/wp-json/wp/v2/media/${item.acf?.thumbnail}`
                );

                const imgData = await res.json();

                featuredImage = imgData?.source_url || defaultImage.src;
              } catch (error) {
                console.error('Failed to load featured image for ', item.id);
              }

              return {
                ...item,
                featuredImage,
              };
            })
          );
          console.log('ITENAARY DATA: ', demo);
          setItineraries(demo);
        }
      } catch (error) {
        console.error('Something went wrong while fetching Itineraries');
      }
    };

    fetchItenaries();
  }, [state]);

  return (
    <>
      {/* Tour Packages */}
      <div className="py-12 px-2 md:px-16">
        <h2 className="text-3xl font-bold mb-2">Itenaries</h2>
        <p className="text-gray-500 mb-8">Current favourites for travellers like you</p>

        <Carousel>
          <CarouselContent>
            {itineraries &&
              itineraries.map((item, index) => (
                <CarouselItem className=" md:basis-1/2 lg:basis-1/5" key={item?.title?.rendered}>
                  <Link href={`/destination/${state}/itenary/${item?.slug}`}>
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default ItinaryCards;
