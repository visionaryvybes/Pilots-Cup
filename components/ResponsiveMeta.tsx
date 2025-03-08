'use client';

import Head from 'next/head';

/**
 * ResponsiveMeta component adds necessary meta tags for responsive design
 * This component should be included in the layout or individual pages
 */
const ResponsiveMeta = () => {
  return (
    <Head>
      {/* Essential responsive meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Preload critical resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Add responsive font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Add responsive CSS */}
      <link rel="stylesheet" href="/mobile-responsive.css" />
    </Head>
  );
};

export default ResponsiveMeta; 