'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface PageProp {
  params: {
    slug: string;
  };
}

interface ExperienceData {
  title?: {
    rendered: string;
  };
  acf?: {
    full_description?: string;
    thumbnail?: string;
  };
}

const PageTemplate = ({ params }: PageProp) => {
  const { slug } = params;
  const [singleExperience, setSingleExperience] = useState<ExperienceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(
          `https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?slug=${slug}`
        );
        const data = await res.json();
        if (data && data.length > 0) {
          setSingleExperience(data[0]);
        }
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [slug]);

  if (loading || !singleExperience) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[450px]">
        {singleExperience.acf?.thumbnail ? (
          <Image
            src={singleExperience.acf.thumbnail}
            alt="Experience"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            {singleExperience.title?.rendered || 'Untitled'}
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">
        <span className="text-blue-500 cursor-pointer">Home</span> &gt;{' '}
        {singleExperience.title?.rendered}
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-700 font-semibold">Travel for</h3>
          <p className="text-blue-600 text-sm mt-2">Adventure | Vacation</p>
        </div>
        <div className="flex-1 bg-orange-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-700 font-semibold">Best Places</h3>
          <p className="text-orange-600 text-sm mt-2">Santorini Airport</p>
        </div>
        <div className="flex-1 bg-purple-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-700 font-semibold">Duration</h3>
          <p className="text-purple-600 text-sm mt-2">Around 4 hour(s)</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
        {/* About Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About this experience</h2>
          <div
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: singleExperience.acf?.full_description || '' }}
          ></div>
        </div>

        {/* Highlights Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Highlights</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Exclusive boat tour to Nea Kameni and Palea Kameni</li>
            <li>A hike to the volcanic craters of Nea Kameni</li>
            <li>A dip in the hot springs of Palea Kameni</li>
          </ul>
        </div>
      </div>

      {/* Footer Padding */}
      <div className="h-24" />
    </div>
  );
};

export default PageTemplate;
