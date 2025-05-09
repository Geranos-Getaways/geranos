'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type ItineraryItem = {
  id: number;
  title: { rendered: string };
  slug: string;
  acf?: {
    destination_of_itenary?: string;
    thumbnail?: string;
    offerings?: string;
    price?: string;
    nights?: string;
    days?: string;
    starting_price?: string;
  };
};

const Itenary = () => {
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = useParams() as { state: string };

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const res = await fetch(
          'https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?acf_format=standard'
        );
        const data = await res.json();
        const filtered = data.filter(
          (item: ItineraryItem) =>
            item.acf?.destination_of_itenary?.toLowerCase() === state?.toLowerCase()
        );
        setItineraries(filtered);
      } catch (error) {
        console.error('🔴 Error fetching itineraries:', error);
      } finally {
        setLoading(false);
      }
    };

    if (state) fetchItineraries();
  }, [state]);

  return (
    <div className="p-10">
      <div className="py-12 px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-2 capitalize">{state} Itineraries</h2>
        <p className="text-gray-500 mb-8">Current favourites for travellers like you</p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full text-center">Loading...</div>
          ) : itineraries.length > 0 ? (
            itineraries.map((item) => {
              const imageSrc =
                item.acf?.thumbnail?.startsWith('http')
                  ? item.acf.thumbnail
                  : '/global/Punjab.webp';

              return (
                <Link
                  key={item.id}
                  href={`/location/${state}/itenary/${item.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300 block"
                >
                  <div className="relative w-full h-52">
                    <Image
                      src={imageSrc}
                      alt={item.title?.rendered || 'Itinerary'}
                      fill
                      className="object-cover rounded-t-2xl"
                    />
                    <div className="absolute bottom-4 left-4 text-white z-10">
                      <h3 className="text-lg font-semibold drop-shadow">
                        {item.title?.rendered || 'Untitled'}
                      </h3>
                      <p className="text-xs uppercase tracking-wide">{state}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/20 rounded-t-2xl" />
                  </div>

                  <div className="p-4">
                    <div className="flex gap-2 py-1">
                      <p className="text-sm text-gray-500">{item.acf?.nights || 'N/A'} Nights</p>
                      <p className="text-sm text-gray-500">{item.acf?.days || 'N/A'} Days</p>
                    </div>
                    <p className="text-xs uppercase text-gray-400">Starting From</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ₹{item.acf?.starting_price || '--'}{' '}
                      <span className="text-sm font-light italic">per person</span>
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center">No itineraries found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Itenary;
