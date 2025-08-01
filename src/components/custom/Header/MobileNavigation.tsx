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

  // Classes for styling
  const mainNavLinkClasses =
    'w-full text-lg font-semibold text-black font-EduVICWANTBeginner py-4 !no-underline !not-italic'; // Override italics
  const subLinkClasses =
    'text-base flex flex-col gap-4 text-[#2F6BEB] font-semibold font-EduVICWANTBeginner';

  return (
    <div className="text-left">
      <Accordion type="single" collapsible className="w-full">
        {/* Destinations */}
        <AccordionItem value="item-1">
          <AccordionTrigger className={mainNavLinkClasses}>
            <p className="text-black font-medium">Destinations</p>
          </AccordionTrigger>
          <AccordionContent>
            <ul className={subLinkClasses}>
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

        {/* Offerings */}
        <AccordionItem value="item-2">
          <AccordionTrigger className={mainNavLinkClasses}>
            <p className="text-black font-medium">Offerings</p>
          </AccordionTrigger>
          <AccordionContent>
            <ul className={subLinkClasses}>
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
      </Accordion>

      {/* Blogs as a standalone link */}
      <div className={mainNavLinkClasses}>
        <Link href="/blog" onClick={onNavigate} className="text-black font-medium">
          Blogs
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
