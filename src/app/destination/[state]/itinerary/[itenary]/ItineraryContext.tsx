'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ItineraryContextType = {
  itineraryInfo: any;
  loading: boolean;
};

const ItineraryContext = createContext<ItineraryContextType>({
  itineraryInfo: null,
  loading: true,
});

export const useItinerary = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children, slug }: { children: ReactNode; slug: string }) => {
  const [itineraryInfo, setItineraryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log('Slug is: ', slug);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?slug=${slug}`
        );
        const data = await res.json();
        if (data?.[0]) {
          setItineraryInfo(data[0]);
        }
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <ItineraryContext.Provider value={{ itineraryInfo, loading }}>
      {children}
    </ItineraryContext.Provider>
  );
};
