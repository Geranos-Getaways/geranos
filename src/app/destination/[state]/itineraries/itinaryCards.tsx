'use client';
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import EventCards from '@/components/custom/EventCards';
import defaultImage from '../../../../../public/global/Punjab.webp';

interface Props {
  state: string;
}

const ItinaryCards = ({ state }: Props) => {
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItenaries = async () => {
      try {
        const res = await fetch(`https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries`);
        const data = await res.json();
        if (data && Array.isArray(data)) {
          const filtered = data.filter(
            (item) =>
              item?.acf?.offerings?.toLowerCase() === 'tour packages' &&
              item?.acf?.destination?.post_title?.toLowerCase() === state
          );

          console.log('Itineraries:', filtered);
          setItineraries(filtered);
        }
      } catch (error) {
        console.error('Something went wrong while fetching Itineraries', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItenaries();
  }, [state]);

  return (
    <>
      {!loading && itineraries.length > 0 && (
        <div className="py-5 px-2 md:px-16">
          <h2 className="text-3xl font-bold mb-2">Tour Packages</h2>
          <p className="text-gray-500 mb-8">Current favourites for travellers like you</p>

          <Carousel>
            <CarouselContent>
              {itineraries.map((item) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/5" key={item?.title?.rendered}>
                  <Link href={`/destination/${state}/itinerary/${item?.slug}`}>
                    <EventCards
                      title={item?.title?.rendered}
                      destination={item?.acf?.destination?.post_title}
                      days={item?.acf?.days}
                      nights={item?.acf?.nights}
                      price={item?.acf?.starting_price}
                      ratings={item?.acf?.ratings}
                      featuredImage={item?.acf?.thumbnail || defaultImage}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </>
  );
};

export default ItinaryCards;
