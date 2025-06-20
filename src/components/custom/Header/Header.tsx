'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MainNavigation from './mainNavigation';
import AlgoliaBlueButton from '@/components/animata/text/button/algolia-blue-button';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import HamburgerIcon from './hamburger.webp';

import { Button } from '@/components/ui/button';
import MobileNavigation from './MobileNavigation';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <div className="border-t-[10px] border-[#246BEB] fixed top-0 z-50 w-full bg-white min-h-[90px]">
      <div className="flex flex-row align-middle justify-between px-2 sm:px-6 py-2">
        <Link href="/" className="xl:min-w-[200px] flex flex-col align-start justify-center">
          <Image src="/global/geranos-logo.png" width="140" height="80" alt="logo" />
        </Link>

        <div className="hidden xl:flex">
          <MainNavigation />
        </div>

        <div className="flex flex-row gap-8 xl:min-w-[200px] justify-end">
          <div className="flex gap-4 flex-row align-middle justify-center">
            <div className="xl:hidden flex">
              <AlgoliaBlueButton ctaText="+ Trip" ctaLink="/plan-a-trip" />
            </div>
            <div className="xl:flex hidden">
              <AlgoliaBlueButton ctaText="Plan A Trip" ctaLink="/plan-a-trip" />
            </div>
          </div>

          <div className="flex xl:hidden flex-col align-middle justify-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <Image src={HamburgerIcon} width="40" height="40" alt="Hamburger Menu Icon" />
              </SheetTrigger>
              <SheetContent className="overflow-y-scroll">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-left mt-4">Gerenos Getaways</SheetTitle>
                  <SheetDescription className="text-left mb-8">
                    Immersing you in the rich culture and breathtaking landscapes of Punjab and
                    Uttarakhand.
                  </SheetDescription>
                </SheetHeader>

                <MobileNavigation onNavigate={handleCloseMenu} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
