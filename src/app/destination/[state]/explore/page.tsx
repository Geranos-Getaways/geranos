'use client';
import React from 'react';
import { useDestination } from '../DestinationContext';

const ExplorePage = () => {
  const destination = useDestination(); // ✅ Get shared state from layout context

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-10 py-10 max-w-screen-xl mx-auto">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full md:sticky md:top-24 h-fit">
        <ul className="space-y-3 text-md capitalize font-medium text-gray-700">
          <li>
            <a href="#full-description" className="hover:text-blue-600 transition-colors">
              {destination?.acf?.full_description?.title || "Overview"}
            </a>
          </li>
          <li>
            <a href="#full-description1" className="hover:text-blue-600 transition-colors">
              {destination?.acf?.full_description?.title || "More Info"}
            </a>
          </li>
        </ul>
      </div>

      {/* Scrollable Content */}
      <div className="relative md:w-3/4 w-full h-[500px]">
        <div className="h-full overflow-y-auto pr-4 scroll-smooth" id="scroll-container">
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

        {/* Fade Overlays */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-white to-transparent z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white to-transparent z-10" />
      </div>
    </div>
  );
};

export default ExplorePage;
