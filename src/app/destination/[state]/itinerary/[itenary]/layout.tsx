'use client';

import React, { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      #destination-hero-section {
        display: none !important;
      }
    `;
    document.head.appendChild(styleTag);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return <>{children}</>;
};

export default Layout;
