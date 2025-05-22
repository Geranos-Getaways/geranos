'use client';
import React, { useEffect } from 'react';

interface LayoutProp {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

const Layout = ({ children }: LayoutProp) => {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      #destination-hero-section {
        display: none !important;
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return <>{children}</>;
};

export default Layout;
