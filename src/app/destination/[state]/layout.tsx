'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { DestinationContext } from './DestinationContext';
import HeroHomeSlickSlide from '@/components/custom/Global/HeroHomeSlider/HeroHomeSlickSlide';
import CustomizeTrip from '@/components/custom/CustomizeTrip/CustomizeTrip';
import HeroSlider from '@/components/custom/HeroSlider/HeroSlider';

interface LayoutProps {
  children: React.ReactNode;
  params: { state: string };
}

const Layout = ({ children, params }: LayoutProps) => {
  const { state } = params;
  const [destination, setDestination] = useState<any>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      const res = await fetch(
        `https://dashboard.geranosgetaways.com/wp-json/wp/v2/destinations?slug=${state}`
      );
      const destinationInfo = await res.json();
      console.log(destinationInfo[0]?.acf);

      setDestination(destinationInfo[0]);
    };
    fetchDestination();
  }, [state]);

  if (!destination) return <div className="text-center py-20">Loading destination...</div>;

  return (
    <DestinationContext.Provider value={destination}>
      <div>
        <HeroSlider
          slides={destination.acf?.destination_hero_slider}
          title={destination?.title?.rendered}
          subheading={destination?.acf?.sub_heading}
        />

        <div className="py-2 my-2">{children}</div>

        <div className="cta-footer my-4">
          <CustomizeTrip />
        </div>
      </div>
    </DestinationContext.Provider>
  );
};

export default Layout;
