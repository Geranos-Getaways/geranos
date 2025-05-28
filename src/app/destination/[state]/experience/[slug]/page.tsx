'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import styles from './styles.module.css';

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
    whats_included: string;
    whats_not_included: string;
    experiences_featured_cards: any;
    timings: string;
    starting_price: string;
    experience_highlight_points: string;
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
    <div className="min-h-screen  text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-[250px] md:h-[450px]">
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
          <h4 className="font-semibold text-lg">
            {singleExperience?.acf?.experiences_featured_cards?.card1?.title}
          </h4>
          <p className="text-blue-600 mt-2">
            {singleExperience?.acf?.experiences_featured_cards?.card1?.description}
          </p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg shadow">
          <h4 className="font-semibold text-lg">
            {singleExperience?.acf?.experiences_featured_cards?.card2?.title}
          </h4>
          <p className="text-orange-600 mt-2">
            {singleExperience?.acf?.experiences_featured_cards?.card2?.description}
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow">
          <h4 className="font-semibold text-lg">
            {' '}
            {singleExperience?.acf?.experiences_featured_cards?.card3?.title}
          </h4>
          <p className="text-purple-600 mt-2">
            {' '}
            {singleExperience?.acf?.experiences_featured_cards?.card3?.description}
          </p>
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
          <div className="pt-8">
            <h2 className="text-xl font-regular mb-2">Pricing</h2>
            <p className="font-semibold text-2xl">₹{singleExperience?.acf?.starting_price}</p>
          </div>
          <div className="pt-8">
            <h2 className="text-xl font-regular mb-2">Pricing</h2>
            <p className="font-semibold text-2xl">{singleExperience?.acf?.timings}</p>
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-4">What it&apos;s included</h2>

            <div
              dangerouslySetInnerHTML={{ __html: singleExperience?.acf?.whats_included || '' }}
              className={`${styles.listStyle}`}
            ></div>
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-4">What it&apos;s not included</h2>
            <div
              dangerouslySetInnerHTML={{ __html: singleExperience?.acf?.whats_not_included || '' }}
              className={`${styles.listStyle}`}
            ></div>
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-4">Highlight Point</h2>
            <div
              className="experience-highlight-points"
              dangerouslySetInnerHTML={{
                __html: singleExperience?.acf?.experience_highlight_points || '',
              }}
            ></div>
          </div>
          {singleExperience?.acf?.highlight_images &&
            typeof singleExperience.acf.highlight_images === 'object' &&
            Object.keys(singleExperience.acf.highlight_images).length > 0 && (
              <div className="pt-8">
                <h2 className="text-2xl font-semibold mb-4">Experience Highlights</h2>
                <Carousel>
                  <CarouselContent>
                    {Object.entries(singleExperience.acf.highlight_images)
                      .filter(([_, img]) => typeof img === 'string' && img.trim() !== '')
                      .map(([key, img], index) => {
                        const src = img as string; // ✅ Type assertion here
                        return (
                          <CarouselItem className="md:basis-1/3" key={key}>
                            <div className="overflow-hidden rounded-lg shadow">
                              <Image
                                src={src}
                                alt={`Highlight ${index + 1}`}
                                width={400}
                                height={300}
                                className="w-full h-52 object-cover"
                              />
                            </div>
                          </CarouselItem>
                        );
                      })}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
