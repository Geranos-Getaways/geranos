'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const Page = () => {
  const [itenaryInfo, setItenaryInfo] = useState<any>(null);
  const [featuredImgUrl, setFeaturedImgUrl] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { itenary } = useParams();

  // Default fallback data
  const defaultTitle = 'Greece - Sizzling Days in Greece';
  const defaultDestination = 'Greece';
  const defaultDuration = '8 Days, 7 Nights';
  const defaultPrice = '107,090';
  const defaultPlaces = ['Athens, 3D', 'Mikonos, 2D', 'Santorini Airport, 3D'];
  const defaultInclusions = ['Sightseeing', 'Breakfast', 'Airport Transfer'];
  const defaultHighlights = [
    {
      image: '/sample1.jpg',
      title: 'Mikonos Island',
      description: 'Explore the summer vibe of Mikonos.',
    },
    {
      image: '/sample2.jpg',
      title: 'Museum of Delos',
      description: 'Explore the archaic Museum.',
    },
    {
      image: '/sample3.jpg',
      title: 'Candlelight Dinner in Oia',
      description: 'Enjoy romantic dining with views.',
    },
  ];

  useEffect(() => {
    const fetchSingleItenary = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?slug=${itenary}`);
        const data = await res.json();

        const imageres = await fetch(`https://dashboard.geranosgetaways.com/wp-json/wp/v2/media/${data[0]?.acf?.thumbnail}`);
        const imgData = await imageres.json();
        setFeaturedImgUrl(imgData);

        if (data) {
          setItenaryInfo(data[0]);
        }
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleItenary();
  }, []);

  const acf = itenaryInfo?.acf;

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="w-full h-[450px] relative">
            <Image
              src={featuredImgUrl?.link || '/fallback.jpg'}
              alt="Hero"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>

          <div className="flex justify-center mt-[-25px] z-10 relative">
            <div className="bg-white rounded-full shadow-lg px-6 py-2 flex gap-6 text-sm">
              <button className="font-medium text-blue-600">Highlights</button>
              <button className="text-gray-500">Daywise</button>
              <button className="text-gray-500">Accommodations</button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="text-sm text-blue-400 mb-2">{acf?.destination_of_itenary || defaultDestination}</div>
              <h1 className="text-3xl font-bold mb-4">{itenaryInfo?.title?.rendered || defaultTitle}</h1>
              <div
                className="text-gray-600 mb-6"
                dangerouslySetInnerHTML={{ __html: acf?.full_description || '' }}
              ></div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-1 text-gray-700">Places</p>
                <p className="text-gray-600">{defaultPlaces.join(' → ')}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-1 text-gray-700">Duration</p>
                <p className="text-gray-600">
                  {acf?.days || '8'} Days - {acf?.nights || '7'} Nights
                </p>
              </div>

              <div className="mb-8">
                <p className="text-sm font-medium mb-1 text-gray-700">Pricing</p>
                <p className="text-gray-800 font-semibold text-xl">
                  ₹{acf?.starting_price || defaultPrice}{' '}
                  <span className="text-sm font-light">per person</span>
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Inclusions</h2>
                <div className="flex gap-4 flex-wrap">
                  {defaultInclusions.map((inc, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full border border-blue-200">
                      {inc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
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
              </div>
            </div>

            <div className="w-full lg:w-1/3 sticky top-28  bottom-20 self-start h-fit bg-white shadow-lg rounded-xl p-6">
              <div className="flex gap-2 mb-4">
                <Image src="/global/Punjab.webp" alt="Expert" width={36} height={36} className="rounded-full" />
                <Image src="/global/Punjab.webp" alt="Expert" width={36} height={36} className="rounded-full" />
              </div>
              <h3 className="text-md font-semibold mb-2">Customise your trip</h3>
              <p className="text-sm text-gray-600 mb-6">
                with someone who has been to {acf?.destination_of_itenary || defaultDestination}
              </p>

              <form className="space-y-3">
                <input type="text" placeholder="Full name" className="w-full border rounded px-4 py-2 focus:outline-none" />
                <input type="text" placeholder="WhatsApp Phone no." className="w-full border rounded px-4 py-2 focus:outline-none" />
                <input type="text" placeholder="No. of travellers" className="w-full border rounded px-4 py-2 focus:outline-none" />
                <input type="text" placeholder="Dates of travel" className="w-full border rounded px-4 py-2 focus:outline-none" />
                <div className="text-sm text-gray-500">
                  Starting from{' '}
                  <span className="font-semibold text-black">₹{acf?.starting_price || defaultPrice}</span> per person
                </div>
                <button type="submit" className="w-full mt-2 bg-[#0099cc] text-white py-2 rounded hover:bg-[#007fab] transition">
                  PLAN WITH AN EXPERT
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
