'use client';
import React, { useState } from 'react';
import { useDestination } from '../DestinationContext';
import AtAGlance from './at-a-glance/AtAGlance';
import CultureAndHistory from './culture-and-history/CultureAndHistory';


const ExplorePage = () => {
  const destination = useDestination();
  const [activeSection, setActiveSection] = useState<string>('ataglance');

  if (!destination) return null; // Optional: replace with loading state

  return (
    <>
  

      {/* Conditional Section Content Below Scrollable Container */}
      <main>
        {activeSection === 'ataglance' && <AtAGlance />}
        {activeSection === 'cultureandhistory' && <CultureAndHistory />}
        {/* Add more conditional sections here if needed */}
      </main>
    </>
  );
};

export default ExplorePage;
