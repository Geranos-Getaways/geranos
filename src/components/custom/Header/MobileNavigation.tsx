import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

interface MobileNavigationProps {
  onNavigate: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ onNavigate }) => {
  const [locations, setLocations] = useState<{ title: string; href: string }[]>([]);

  useEffect(() => {
    async function fetchDestinations() {
      const res = await fetch('https://dashboard.geranosgetaways.com/wp-json/wp/v2/destinations');
      const data = await res.json();
      const formatted = data.map((item: any) => ({
        title: item.title.rendered,
        href: `/destination/${item.slug}`,
      }));
      setLocations(formatted);
    }
    fetchDestinations();
  }, []);

  return (
    <div className="text-left">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Destinations</AccordionTrigger>
          <AccordionContent>
            <ul className="text-xl flex flex-col gap-4 text-[#2F6BEB] font-semibold font-EduVICWANTBeginner">
              {locations.map((location) => (
                <li key={location.href}>
                  <Link href={location.href} onClick={onNavigate}>
                    {location.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Offerings</AccordionTrigger>
          <AccordionContent>
            <ul className="text-xl flex flex-col gap-4 text-[#2F6BEB] font-semibold font-EduVICWANTBeginner">
              <li>
                <Link href="/offerings/tour-packages" onClick={onNavigate}>
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/offerings/weekend-getaways" onClick={onNavigate}>
                  Weekend Getaways
                </Link>
              </li>
              <li>
                <Link href="/offerings/experiences" onClick={onNavigate}>
                  Experiences
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <p className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline">
            <a href="/blog" onClick={onNavigate}>
              Blogs
            </a>
          </p>
        </AccordionItem>
        {/* <AccordionItem value="item-4">
          <p className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline">
            <a href="/contact" onClick={onNavigate}>
              Contact
            </a>
          </p>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
};

export default MobileNavigation;
