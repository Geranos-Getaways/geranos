import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const MobileNavigation = () => {
  return (
    <div className="text-left">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Destinations</AccordionTrigger>
          <AccordionContent>
            <ul className="text-xl flex flex-col gap-4 text-[#2F6BEB] font-semibold font-EduVICWANTBeginner">
              <li>
                <Link href="/destination/punjab">Punjab</Link>
              </li>
              <li>
                <Link href="/destination/uttarakhand">Uttarakhand</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Experiences</AccordionTrigger>
          <AccordionContent>
            <ul className="text-xl flex flex-col gap-4 text-[#2F6BEB] font-semibold font-EduVICWANTBeginner">
              <li>
                <Link href="/offerings/tour-packages">Tour Packages</Link>
              </li>
              <li>
                <Link href="/offerings/weekend-getaways">Weekend Getaways</Link>
              </li>
              <li>
                <Link href="/offerings/experiences">Experiences</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <p className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
            <a href="/blog">Blogs</a>
          </p>
        </AccordionItem>
        <AccordionItem value="item-4">
          <p className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
            <a href="/contact">Contact</a>
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MobileNavigation;
