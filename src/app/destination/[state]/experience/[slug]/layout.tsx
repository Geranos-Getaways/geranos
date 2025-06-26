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
      #destination-hero-section, #destination-stick-layout-options {
        display: none !important;
      }

      #destination-state-layout{
        padding:0px;
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
