'use client';
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import EventCards from '@/components/custom/EventCards';
import defaultImage from '../../../../../public/global/Punjab.webp';
import Link from 'next/link';

interface Prop {
  state: string;
}

const ExperiencesCards = ({ state }: Prop) => {
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const res = await fetch(
          `https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?destination_of_itenary=${state}`
        );
        const data = await res.json();

        if (data && Array.isArray(data)) {
          const filtered = data.filter(
            (item: any) =>
              item?.acf?.offerings?.toLowerCase() === 'experiences' &&
              item?.acf?.destination?.post_title == `${state}`
          );

          console.log('Geranost destingation State : ', filtered);
          setItineraries(filtered);
        }
      } catch (error) {
        console.error('Something went wrong while fetching Itineraries', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [state]);

  return (
    <>
      {!loading && itineraries.length > 0 && (
        <div className="py-12 px-2 md:px-16">
          <h2 className="text-3xl font-bold mb-2">Most Popular</h2>
          <p className="text-gray-500 mb-8">
            These are not included in tour packages — these are separate add-ons.
          </p>

          <Carousel>
            <CarouselContent>
              {itineraries.map((item) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/5" key={item?.slug}>
                  <Link href={`/destination/${state}/experience/${item?.slug}`}>
                    <EventCards
                      title={item?.title?.rendered}
                      destination={item?.acf?.destination_of_itenary}
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

export default ExperiencesCards;
