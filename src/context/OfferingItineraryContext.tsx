'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface OfferingItineraryContextValue {
  itineraryInfo: any | null;
  isLoading: boolean;
  error: unknown;
}

const OfferingItineraryContext = createContext<OfferingItineraryContextValue | undefined>(
  undefined
);

/**
 * Provider that fetches a single “offering itinerary” by slug and
 * exposes it to the component tree.
 */
export const OfferingItineraryProvider: React.FC<{
  slug: string;
  children: ReactNode;
}> = ({ slug, children }) => {
  const [itineraryInfo, setItineraryInfo] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://dashboard.geranosgetaways.com/wp-json/wp/v2/offerings?slug=${slug}`
        );
        const data = await res.json();
        setItineraryInfo(data[0] ?? null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItinerary();
  }, [slug]);

  return (
    <OfferingItineraryContext.Provider value={{ itineraryInfo, isLoading, error }}>
      {children}
    </OfferingItineraryContext.Provider>
  );
};

/** Hook for easy access */
export const useOfferingItinerary = () => {
  const ctx = useContext(OfferingItineraryContext);
  if (!ctx)
    throw new Error('useOfferingItinerary must be used within an OfferingItineraryProvider');
  return ctx;
};
