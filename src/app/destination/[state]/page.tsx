'use client';
import { useEffect, useState } from 'react';
import Itenary from './Itenary';
import Experiences from './Experiences';
import DeepDive from './DeepDive';
import CustomizeTrip from './CustomizeTrip';
import { useDestination } from './DestinationContext';
import styles from './explore/explore.module.css';
import CultureAndHistory from './explore/culture-and-history/CultureAndHistory';
import ThingsToDo from './explore/things-to-do/ThingsToDo';
import EatAndShop from './explore/eat-and-shop/EatAndShop';
import TravelTips from './explore/travel-tips/TravelTips';

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
        <section className="bg-white py-0">
          <div className="text-center max-w-2xl mx-auto px-4 my-20">
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
          <div className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-3">
              <div className="bg-blue-100 text-blue-500 p-2 rounded-full text-xl">⛱️</div>
            </div>
            <h3 className="font-semibold text-lg mb-1">Travel for</h3>
            <p className="text-sm text-gray-500">{destination?.acf?.travel_for}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-3">
              <div className="bg-purple-100 text-purple-500 p-2 rounded-full text-xl">📅</div>
            </div>
            <h3 className="font-semibold text-lg mb-1">Best time to visit</h3>
            <p className="text-sm text-gray-500">{destination?.acf?.best_time_to_visit}</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-3">
              <div className="bg-orange-100 text-orange-500 p-2 rounded-full text-xl">🗣️</div>
            </div>
            <h3 className="font-semibold text-lg mb-1">Speak</h3>
            <p className="text-sm text-gray-500">{destination?.acf?.speaks}</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 text-green-500 p-2 rounded-full text-xl">💰</div>
            </div>
            <h3 className="font-semibold text-lg mb-1">Money Matters</h3>
            <p className="text-sm text-gray-500">{destination?.acf?.currency}</p>
          </div>
        </div>

        <section className="bg-white py-10">
          <div className="text-center max-w-2xl mx-auto px-4">
            <button
              className="mt-6 inline-flex items-center px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
              onClick={() => {
                setExploreVisibility(!exploreVisibility);
              }}
            >
              Explore More →
            </button>
          </div>

          {exploreVisibility && (
            <div className="px-4 md:px-10 py-10 w-full max-w-screen-xl mx-auto relative mt-20">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4 bg-white border rounded-xl shadow-sm p-4 h-fit sticky top-28">
                  <ul
                    className={`space-y-4 text-gray-700 font-medium text-lg md:text-base ${styles.explore}`}
                  >
                    <li>
                      <a
                        href="#cultureandhistory"
                        className={`block transition-colors pl-4 border-l-4 ${
                          activeSection === 'cultureandhistory'
                            ? 'text-blue-600 font-semibold border-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 border-transparent'
                        }`}
                      >
                        Culture & History
                      </a>
                    </li>
                    <li>
                      <a
                        href="#thingstodo"
                        className={`block transition-colors pl-4 border-l-4 ${
                          activeSection === 'thingstodo'
                            ? 'text-blue-600 font-semibold border-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 border-transparent'
                        }`}
                      >
                        Things To Do
                      </a>
                    </li>
                    <li>
                      <a
                        href="#eatandshop"
                        className={`block transition-colors pl-4 border-l-4 ${
                          activeSection === 'eatandshop'
                            ? 'text-blue-600 font-semibold border-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 border-transparent'
                        }`}
                      >
                        Eat & Shop
                      </a>
                    </li>
                    <li>
                      <a
                        href="#traveltips"
                        className={`block transition-colors pl-4 border-l-4 ${
                          activeSection === 'traveltips'
                            ? 'text-blue-600 font-semibold border-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 border-transparent'
                        }`}
                      >
                        Travel Tips
                      </a>
                    </li>
                  </ul>
                </aside>

                {/* Main Content */}
                <main
                  className={`w-full md:w-3/4 bg-white p-6 rounded-xl shadow-sm h-[700px] overflow-y-scroll scroll-smooth scroll-pt-28 custom-scrollbar ${styles.explore}`}
                >
                  <div id="cultureandhistory" className="mt-15 scroll-mt-28">
                    <CultureAndHistory />
                  </div>

                  <div id="thingstodo" className="mt-28 scroll-mt-28">
                    <ThingsToDo />
                  </div>

                  <div id="eatandshop" className="mt-28 scroll-mt-28">
                    <EatAndShop />
                  </div>

                  <div id="traveltips" className="mt-28 scroll-mt-28">
                    <TravelTips />
                  </div>
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
