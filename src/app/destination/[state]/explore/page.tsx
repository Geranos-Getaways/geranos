'use client';
import React from 'react';
import { useDestination } from '../DestinationContext';

const ExplorePage = () => {
  const destination = useDestination(); // ✅ Get shared state from layout context

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-10 py-10 max-w-screen-xl mx-auto">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full sticky top-20 z-20 bg-white md:bg-transparent border md:border-none rounded-lg md:rounded-none px-4 md:px-0 py-4 md:py-0 shadow md:shadow-none">
        <h4 className="text-sm font-bold mb-4 uppercase text-gray-900">
          About {destination?.title?.rendered || ''}
        </h4>
        <ul className="space-y-3 text-md capitalize font-medium text-gray-700">
          <li>
            <a href="#full-description" className="hover:text-blue-600 transition-colors">
              {destination?.acf?.full_description?.title || 'Overview'}
            </a>
          </li>
          <li>
            <a href="#full-description1" className="hover:text-blue-600 transition-colors">
              {destination?.acf?.full_description?.title || 'More Info'}
            </a>
          </li>
        </ul>
      </div>

      {/* Scrollable Content */}
      <div className="relative md:w-3/4 w-full">
        <div
          className="overflow-y-visible md:h-[600px] md:overflow-y-auto pr-0 md:pr-4 scroll-smooth"
          id="scroll-container"
        >
          <div
            id="full-description"
            className="prose max-w-none scroll-mt-24 mb-10"
            dangerouslySetInnerHTML={{
              __html: destination?.acf?.full_description?.full_description || '',
            }}
          ></div>

          <div
            id="full-description1"
            className="prose max-w-none scroll-mt-24"
            dangerouslySetInnerHTML={{
              __html: destination?.acf?.full_description?.full_description || '',
            }}
          ></div>
        </div>

        {/* Fade Overlays for Desktop */}
        <div className="hidden md:block pointer-events-none absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-white to-transparent z-10" />
        <div className="hidden md:block pointer-events-none absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white to-transparent z-10" />
      </div>
    </div>
  );
};

export default ExplorePage;
