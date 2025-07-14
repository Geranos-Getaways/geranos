'use client';

import Image from 'next/image';
import React from 'react';
import { useItinerary } from './ItineraryContext';
import useItineraryStore from './useCustomItineraryStore';

const DayWise = () => {
  const { itineraryInfo, isLoading } = useItineraryStore();
  const daywise = itineraryInfo?.acf?.daywise;

  console.log('daywise', itineraryInfo);

  if (isLoading || !daywise || Object.keys(daywise).length === 0) return null;

  const validDays = Object.entries(daywise).filter(([_, item]: any) => item?.title && item?.image);

  if (validDays.length === 0) return null;

  return (
    <div className="my-10 md:mt-14 scroll-mt-28" id="dayWise">
      <h4 className="font-semibold mb-4 text-2xl">Day Wise</h4>

      <div className="space-y-4">
        {validDays.map(([dayLabel, item]: any, index: number) => (
          <details
            key={dayLabel}
            className="border rounded-lg overflow-hidden"
            open={index === 0} // open first by default
          >
            <summary className="flex items-center justify-between cursor-pointer px-4 py-3 bg-gray-100 hover:bg-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-base font-medium">
                  <span className="font-semibold mr-1">{dayLabel}:</span> {item.title}
                </p>
              </div>
            </summary>

            <div className="px-4 pb-4 pt-2 text-gray-700 text-sm leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default DayWise;
