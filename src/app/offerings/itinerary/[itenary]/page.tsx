'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import styles from './itenary.module.css';
import SingleItenarySidebar from './SingleItenarySidebar';
import Link from 'next/link';
import DayWise from './DayWise';
import Highlights from './Highlights';
import Accomodations from './Accomodation';
import { useItinerary } from './ItineraryContext';
import { formatPrice } from '@/utils/formatPrice';
import useItineraryStore from './useCustomItineraryStore';

interface PageProp {
  params: {
    itenary: string;
  };
}

const Page = ({ params }: PageProp) => {
  // const { itineraryInfo, loading } = useItinerary();

  // const [itineraryInfo, setItineraryInfo] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  const { setItineraryInfo, setIsLoading, isLoading, itineraryInfo } = useItineraryStore();

  const { itenary } = params;

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?slug=${itenary}`
        );

        const data = await res.json();
        setItineraryInfo(data[0]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Unable to fetch Itinerary', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItinerary();
  }, [itenary]);

  // Default fallback data
  const defaultTitle = 'India';
  const defaultDestination = 'India';

  const defaultPrice = '107,090';
  const defaultPlaces = ['Athens, 3D', 'Mikonos, 2D', 'Santorini Airport, 3D'];
  const defaultInclusions = ['Sightseeing', 'Breakfast', 'Airport Transfer'];

  return (
    <div className=" bg-gray-50">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {/* Hero Section */}
          {/* <div className="w-full h-[290px] md:h-[450px] relative">
            <Image
              src={acf?.thumbnail || '/fallback.jpg'}
              alt="Hero"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div> */}
          {/* <div className="flex justify-center mt-[-25px] z-10 relative">
            <div className="bg-white rounded-full shadow-lg px-6 py-2 flex gap-6 text-sm">
              <button className="font-medium text-blue-600">Highlights</button>
              <Link href="#dayWise">
                <button className="text-gray-500">Daywise</button>
              </Link>
              <Link href="#accomodations">
                <button className="text-gray-500">Accommodations</button>
              </Link>
            </div>
          </div> */}
          <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="text-sm text-blue-400 mb-2">
                {itineraryInfo?.acf?.destination_of_itenary || defaultDestination}
              </div>
              <h1 className="text-3xl font-bold mb-4">
                {itineraryInfo?.title?.rendered || defaultTitle}
              </h1>
              <div
                className="text-gray-600 mb-6"
                dangerouslySetInnerHTML={{ __html: itineraryInfo?.acf?.full_description || '' }}
              ></div>

              {/* <div className="mb-4">
                <p className="text-sm font-medium mb-1 text-gray-700">Places</p>
                <p className="text-gray-600">{defaultPlaces.join(' → ')}</p>
              </div> */}

              <div className="mb-4">
                <p className="text-sm font-medium mb-1 text-gray-700">Duration</p>
                <p className="text-gray-600">
                  {itineraryInfo?.acf?.days || '8'} Days - {itineraryInfo?.acf?.nights || '7'}{' '}
                  Nights
                </p>
              </div>

              <div className="mb-8">
                <p className="text-sm font-medium mb-1 text-gray-700">Starting price</p>
                <p className="text-gray-800 font-semibold text-xl">
                  ₹{formatPrice(itineraryInfo?.acf?.starting_price || defaultPrice)}{' '}
                  <span className="text-sm font-light">per person</span>
                </p>
              </div>

              {/* <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Inclusions</h2>
                <div className="flex gap-4 flex-wrap">
                  {defaultInclusions.map((inc, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full border border-blue-200"
                    >
                      {inc}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {defaultHighlights.map((highlight, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden shadow">
                      <div className="relative w-full h-40">
                        <Image
                          src={highlight.image}
                          alt={highlight.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{highlight.title}</h3>
                        <p className="text-sm text-gray-500">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="mt-2">
                <div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Whats Included</AccordionTrigger>
                      <AccordionContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: itineraryInfo?.acf?.whats_included || '',
                          }}
                          className={`${styles.richList}`}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Whats Not Included</AccordionTrigger>
                      <AccordionContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: itineraryInfo?.acf?.whats_not_included || '',
                          }}
                          className={`${styles.richList}`}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* <Highlights highlights={acf?.highlight_images} />

              <DayWise daywise={acf?.daywise} />

              <Accomodations accomodations={acf?.accomodations} /> */}
            </div>

            {/* <SingleItenarySidebar
              destination={acf?.destination_of_itenary}
              price={acf?.starting_price}
            /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
