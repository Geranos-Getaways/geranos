'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './explore.module.css';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  params: { state: string };
}

const Layout = ({ children, params }: LayoutProps) => {
  const { state } = params;
  const [activeSection, setActiveSection] = useState<string>('ataglance');
  const pathname = usePathname();

  const tabs = [
    { label: "At a Glance", href: `/destination/${state}/explore/at-a-glance` },
    { label: "Culture & History", href: `/destination/${state}/explore/culture-and-history` },
    { label: "Travel Etiquettes", href: `/destination/${state}/explore/travel-etiquettes` },
    { label: "Things To Do", href: `/destination/${state}/explore/things-to-do` },
    { label: "Eat & Shop", href: `/destination/${state}/explore/eat-and-shop` },
    { label: "Getting Around", href: `/destination/${state}/explore/getting-around` },
    { label: "Travel Tips", href: `/destination/${state}/explore/travel-tips` },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:px-10 w-[90%] relative">
        {/* Wrapper for absolute sidebar */}
        <div className="relative md:w-1/4">
          <aside className="sticky top-28 left-0 w-full shadow-sm p-0 sm:p-4 h-fit rounded-2xl z-10">
            <h4 className="uppercase mb-4 font-semibold underline underline-offset-4">
              ABOUT {state}
            </h4>
            <div className="flex overflow-x-auto flex-nowrap gap-2 px-2 py-2 rounded-lg bg-white shadow-sm md:flex-col md:overflow-x-visible md:gap-0">
              {tabs.map(tab => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-4 py-2 rounded-full whitespace-nowrap
                    ${pathname === tab.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700'}
                  `}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* Main Content */}
        <main className="w-full md:w-3/4 bg-white p-6 rounded-xl shadow-sm">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
