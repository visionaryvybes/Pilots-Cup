import { Metadata, Viewport } from 'next';

const title = 'Pilots Cup - UAE\'s Premier Rotax Kart Racing';
const description = 'Experience the thrill of professional karting with Pilots Cup in the UAE. From Bambino to DD2, we offer premium Rotax kart rentals and memberships.';

export const siteConfig = {
  name: 'Pilots Cup',
  description,
  url: 'https://pilotscup.ae',
  ogImage: 'https://pilotscup.ae/og.jpg',
  links: {
    twitter: 'https://twitter.com/pilotscupuae',
    instagram: 'https://instagram.com/pilotscupuae',
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'kart racing',
    'go kart',
    'rotax kart',
    'karting uae',
    'dubai karting',
    'professional karting',
    'kart rental',
    'racing academy',
    'motorsport uae',
  ],
  authors: [{ name: 'Pilots Cup' }],
  creator: 'Pilots Cup',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [siteConfig.ogImage],
    creator: '@pilotscupuae',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteConfig.url,
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.instagram,
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Racing Street',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    postalCode: '12345',
    addressCountry: 'AE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '25.2048',
    longitude: '55.2708',
  },
  openingHours: [
    'Mo-Su 09:00-22:00',
  ],
  priceRange: '$$',
  telephone: '+971 50 123 4567',
  email: 'info@pilotscup.ae',
};

export const generateMetadata = (
  title?: string,
  description?: string,
  images?: string[],
): Metadata => {
  const metadata = { ...defaultMetadata };

  if (title) {
    metadata.title = title;
    metadata.openGraph!.title = title;
    metadata.twitter!.title = title;
  }

  if (description) {
    metadata.description = description;
    metadata.openGraph!.description = description;
    metadata.twitter!.description = description;
  }

  if (images?.length) {
    metadata.openGraph!.images = images.map((url) => ({
      url,
      width: 1200,
      height: 630,
      alt: title || siteConfig.name,
    }));
    metadata.twitter!.images = images;
  }

  return metadata;
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}; 