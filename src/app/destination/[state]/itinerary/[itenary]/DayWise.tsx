'use client';

import Image from 'next/image';
import React from 'react';
import { useItinerary } from './ItineraryContext';
import styles from './itenary.module.css';

const DayWise = () => {
  const { itineraryInfo, loading } = useItinerary();
  const daywise = itineraryInfo?.acf?.daywise;

  if (loading || !daywise || Object.keys(daywise).length === 0) return null;

  const validDays = Object.entries(daywise).filter(([_, item]: any) => item?.title && item?.image);

  if (validDays.length === 0) return null;

  return (
    <div className="my-10 md:mt-14 scroll-mt-28" id="dayWise">
      <h4 className="font-semibold mb-6 text-2xl text-gray-800">Day Wise</h4>

      <div className="space-y-4">
        {validDays.map(([dayLabel, item]: any, index: number) => (
          <details
            key={dayLabel}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 group"
          >
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 ring-1 ring-gray-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{dayLabel}</p>
                  <p className="text-base font-semibold text-gray-800">{item.title}</p>
                </div>
              </div>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>

            <div className="px-5 pb-5 pt-1 text-gray-700 text-sm leading-relaxed">
              <div
                className={styles.richList}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default DayWise;
