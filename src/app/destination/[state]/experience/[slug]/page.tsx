'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

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
    duration?: string;
    location?: string;
    highlight_images: any;
    tags?: string[];
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
          console.log('Single Experience: ', data[0]);

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
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-[450px]">
        {singleExperience.acf?.thumbnail ? (
          <Image
            src={singleExperience.acf.thumbnail}
            alt="Experience"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-white text-4xl md:text-5xl font-bold px-4 text-center">
            {singleExperience.title?.rendered || 'Untitled'}
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
        <span className="text-blue-600 hover:underline cursor-pointer">Home</span> &gt;{' '}
        <span>{singleExperience.title?.rendered}</span>
      </div>

      {/* Tags */}
      {singleExperience.acf?.tags?.length ? (
        <div className="max-w-6xl mx-auto px-4 pb-4 flex flex-wrap gap-2">
          {singleExperience.acf.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h4 className="font-semibold text-lg">Travel For</h4>
          <p className="text-blue-600 mt-2">Adventure | Vacation</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg shadow">
          <h4 className="font-semibold text-lg">Best Place</h4>
          <p className="text-orange-600 mt-2">
            {singleExperience.acf?.location || 'Unknown Location'}
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow">
          <h4 className="font-semibold text-lg">Duration</h4>
          <p className="text-purple-600 mt-2">{singleExperience.acf?.duration || 'N/A'}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-12 py-10">
        {/* About Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">About this experience</h2>
          <div
            className="text-gray-700 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: singleExperience.acf?.full_description || '' }}
          ></div>
        </div>

        {/* Highlights Section */}
        <div className="flex-1">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Highlights</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Exclusive boat tour to scenic islands</li>
              <li>A hike to volcanic craters</li>
              <li>Relaxing dip in natural hot springs</li>
            </ul>
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-4">What it&apos;s worth</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>₹3000 per person for 1-2 people</li>
              <li>₹2800 per person for 3-4 people</li>
              <li>₹2500 per person for groups of 5 or more</li>
            </ul>
          </div>
          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-4">Experience Highlight</h2>
            <Carousel>
              <CarouselContent>
                {singleExperience?.acf?.highlight_images &&
                  Object.entries(singleExperience.acf.highlight_images).map(
                    ([key, img]: [string, any], index: number) => (
                      <CarouselItem className="md:basis-1/3" key={key}>
                        <div className="overflow-hidden rounded-lg shadow">
                          <Image
                            src={img}
                            alt={img.alt || `Highlight ${index + 1}`}
                            width={400}
                            height={300}
                            className="w-full h-52 object-cover"
                          />
                        </div>
                      </CarouselItem>
                    )
                  )}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
