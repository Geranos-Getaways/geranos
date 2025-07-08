'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ItineraryContextType {
  itineraryInfo: any | null; // tighten once you have a TS interface
  isLoading: boolean;
  error: Error | null;
}

const Ctx = createContext<ItineraryContextType | undefined>(undefined);

interface ProviderProps {
  slug: string; // e.g. “farm-experience-a-day-of-rural-bliss”
  children: ReactNode;
}

export const CustomItineraryDestinationProvider = ({ slug, children }: ProviderProps) => {
  const [state, setState] = useState<ItineraryContextType>({
    itineraryInfo: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setState((s) => ({ ...s, isLoading: true }));
      try {
        const res = await fetch(
          `https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?acf_format=standard&slug=${encodeURIComponent(
            slug
          )}`
        );

        if (!res.ok) throw new Error(`WP-REST ${res.status}`);

        const json = await res.json();
        if (!cancelled) {
          setState({ itineraryInfo: json[0] ?? null, isLoading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({ itineraryInfo: null, isLoading: false, error: err as Error });
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
};

export const useCustomItineraryDestination = () => {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error(
      'useCustomItineraryDestination must be used inside CustomItineraryDestinationProvider'
    );
  return ctx;
};
