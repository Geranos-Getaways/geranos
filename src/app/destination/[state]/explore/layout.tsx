'use client';
import Link from 'next/link';
import React from 'react';
import styles from './explore.module.css';

interface LayoutProps {
  children: React.ReactNode;
  params: { state: string };
}

const Layout = ({ children, params }: LayoutProps) => {
  const { state } = params;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-8 md:px-10 w-[90%] relative">
        {/* Wrapper for absolute sidebar */}
        <div className="relative md:w-1/4">
          <aside className="sticky top-28 left-0 w-full shadow-sm p-4 h-fit rounded-2xl z-10">
            <h4 className="uppercase mb-4 font-semibold underline underline-offset-4">
              ABOUT {state}
            </h4>
            <ul className={`space-y-4 text-gray-700 md:text-base px-5 ${styles.explore}`}>
              <li
                className={`hover:text-blue-600 transition-colors cursor-pointer ${styles.explore}`}
              >
                <Link href={`/destination/${state}/explore/at-a-glance`}>At a Glance</Link>
              </li>
              <li
                className={`hover:text-blue-600 transition-colors cursor-pointer ${styles.explore}`}
              >
                <Link href={`/destination/${state}/explore/culture-and-history`}>
                  Culture & History
                </Link>
              </li>
              <li
                className={`hover:text-blue-600 transition-colors cursor-pointer ${styles.explore}`}
              >
                <Link href={`/destination/${state}/explore/travel-etiquettes`}>
                  Travel Etiquettes
                </Link>
              </li>
              <li
                className={`hover:text-blue-600 transition-colors cursor-pointer ${styles.explore}`}
              >
                <Link href={`/destination/${state}/explore/things-to-do`}>Things To Do</Link>
              </li>
              <li
                className={`hover:text-blue-600 transition-colors cursor-pointer ${styles.explore}`}
              >
                <Link href={`/destination/${state}/explore/eat-and-shop`}>Eat & Shop</Link>
              </li>
              <li
                className={`hover:text-blue-600 transition-colors cursor-pointer ${styles.explore}`}
              >
                <Link href={`/destination/${state}/explore/getting-around`}>Getting Around</Link>
              </li>
              <li
                className={`hover:text-blue-600 transition-colors cursor-pointer ${styles.explore}`}
              >
                <Link href={`/destination/${state}/explore/travel-tips`}>Travel Tips</Link>
              </li>
            </ul>
          </aside>
        </div>

        {/* Main Content */}
        <main className="w-full md:w-3/4 bg-white p-6 rounded-xl shadow-sm">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
