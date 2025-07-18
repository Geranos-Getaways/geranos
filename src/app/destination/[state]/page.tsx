'use client';
import { useEffect, useState } from 'react';
import { useDestination } from './DestinationContext';
import styles from './explore/explore.module.css';
import CultureAndHistory from './explore/culture-and-history/CultureAndHistory';
import ThingsToDo from './explore/things-to-do/ThingsToDo';
import EatAndShop from './explore/eat-and-shop/EatAndShop';
import TravelTips from './explore/travel-tips/TravelTips';
import AtAGlance from './explore/at-a-glance/AtAGlance';
import TravelEtiquettes from './explore/travel-etiquettes/TravelEtiquettes';
import GettingAround from './explore/getting-around/GettingAround';

const Page = ({ params }: { params: { state: string } }) => {
  const destination = useDestination();
  const [exploreVisibility, setExploreVisibility] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const { state } = params;

  useEffect(() => {
    const sections = document.querySelectorAll('main > div[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: document.querySelector('main'),
        rootMargin: '0px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-wrapper min-h-[70vh] ">
      <div>
        <section className="py-0">
          <div className="text-center max-w-2xl mx-auto p-4 md:px-4 md:my-20">
            <h2 className="text-3xl font-semibold mb-4 font-tangerine">
              {destination?.acf?.short_description?.title}
            </h2>
            <p className="text-gray-600 text-justify">
              {destination?.acf?.short_description?.short_description}
            </p>
          </div>
        </section>

        <div className="mt-10 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-3">
              <div className="bg-blue-100 text-blue-500 p-2 rounded-full text-xl">⛱️</div>
            </div>
            <h3 className="font-semibold text-lg mb-1">Travel for</h3>
            <p className="text-sm text-gray-500">{destination?.acf?.travel_for}</p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-3">
              <div className="bg-purple-100 text-purple-500 p-2 rounded-full text-xl">📅</div>
            </div>
            <h3 className="font-semibold text-lg mb-1">Best time to visit</h3>
            <p className="text-sm text-gray-500">{destination?.acf?.best_time_to_visit}</p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-3">
              <div className="bg-orange-100 text-orange-500 p-2 rounded-full text-xl">🗣️</div>
            </div>
            <h3 className="font-semibold text-lg mb-1">Language</h3>
            <p className="text-sm text-gray-500">{destination?.acf?.speaks}</p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 text-green-500 p-2 rounded-full text-xl">💰</div>
            </div>
            <h3 className="font-semibold text-lg mb-1">Currency</h3>
            <p className="text-sm text-gray-500">{destination?.acf?.currency}</p>
          </div>
        </div>

        <section className=" py-10">
          <div className="text-center max-w-2xl mx-auto px-4">
            <button
              className="mt-6 inline-flex items-center px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
              onClick={() => {
                setExploreVisibility((prev) => {
                  if (!prev) setActiveSection('ataglance');
                  return !prev;
                });
              }}
            >
              Explore More →
            </button>
          </div>

          {exploreVisibility && (
            <div className="relative mt-2 px-4 md:px-10 py-2 w-full max-w-screen-xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-1/4 pt-6 h-fit sticky top-[93px] md:top-28 bg-white">
                  <ul className={`flex md:block overflow-x-auto md:overflow-visible whitespace-nowrap md:whitespace-normal text-gray-700 font-medium text-sm sm:text-base gap-2 md:gap-0 pb-2 md:pb-0 border-b md:border-none ${styles.explore}`}>
                    {[
                      { id: 'ataglance', label: 'At a Glance' },
                      { id: 'cultureandhistory', label: 'Culture & History' },
                      { id: 'traveletiquettes', label: 'Travel Etiquettes' },
                      { id: 'thingstodo', label: 'Things To Do' },
                      { id: 'eatandshop', label: 'Eat & Shop' },
                      { id: 'gettingaround', label: 'Getting Around' },
                      { id: 'traveltips', label: 'Travel Tips' },
                    ].map(({ id, label }) => (
                      <li key={id} className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setActiveSection(id)}
                          className={`block w-full text-left px-4 py-2 transition-colors border-b-2 md:border-l-4 md:border-b-0 ${
                            activeSection === id
                              ? 'text-blue-600 font-semibold border-blue-600 bg-blue-50'
                              : 'text-gray-700 hover:text-blue-600 border-transparent'
                          }`}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </aside>

                {/* Main Content (Tab Outlet) */}
                <main className="w-full md:w-3/4 p-6 pt-6 rounded-xl shadow-sm">
                  {activeSection === 'ataglance' && <AtAGlance />}
                  {activeSection === 'cultureandhistory' && <CultureAndHistory />}
                  {activeSection === 'traveletiquettes' && <TravelEtiquettes />}
                  {activeSection === 'thingstodo' && <ThingsToDo />}
                  {activeSection === 'eatandshop' && <EatAndShop />}
                  {activeSection === 'gettingaround' && <GettingAround />}
                  {activeSection === 'traveltips' && <TravelTips />}
                </main>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Page;