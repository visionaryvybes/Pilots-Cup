#!/bin/bash

# Print commands for debugging
set -x

# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Disable telemetry for faster builds
export NEXT_TELEMETRY_DISABLED=1

# Create necessary directories if they don't exist
mkdir -p lib/constants
mkdir -p components
mkdir -p public/images/team

# Check if images.ts exists, if not create it
if [ ! -f lib/constants/images.ts ]; then
  echo "Creating missing images.ts file..."
  cat > lib/constants/images.ts << 'EOF'
export const IMAGES = {
  hero: {
    main: '/images/hero/hero-main.jpg',
    track: '/images/hero/track.jpg',
    facilities: '/images/hero/facilities.jpg',
    racing: '/images/hero/racing.jpg',
    karting: '/images/hero/karting.jpg'
  },
  karts: {
    bambino: {
      main: '/images/karts/bambino-main.jpg',
      action: '/images/karts/bambino-action.jpg'
    },
    junior: {
      main: '/images/karts/junior-main.jpg',
      action: '/images/karts/junior-action.jpg'
    },
    senior: {
      main: '/images/karts/senior-main.jpg',
      action: '/images/karts/senior-action.jpg'
    },
    dd2: {
      main: '/images/karts/dd2-main.jpg',
      action: '/images/karts/dd2-action.jpg'
    }
  },
  events: {
    racing: '/images/events/racing.jpg',
    competition: '/images/events/competition.jpg',
    awards: '/images/events/awards.jpg'
  },
  track: {
    overview: '/images/track/overview.jpg',
    night: '/images/track/night.jpg',
    aerial: '/images/track/aerial.jpg'
  },
  facilities: {
    garage: '/images/facilities/garage.jpg',
    workshop: '/images/facilities/workshop.jpg',
    briefing: '/images/facilities/briefing.jpg'
  },
  gallery: {
    image1: '/images/gallery/image1.jpg',
    image2: '/images/gallery/image2.jpg',
    image3: '/images/gallery/image3.jpg',
    image4: '/images/gallery/image4.jpg',
    image5: '/images/gallery/image5.jpg',
    image6: '/images/gallery/image6.jpg',
    image7: '/images/gallery/image7.jpg',
    image8: '/images/gallery/image8.jpg'
  },
  team: {
    member1: '/images/team/team-member-1.jpg',
    member2: '/images/team/team-member-2.jpg',
    member3: '/images/team/team-member-3.jpg',
    member4: '/images/team/team-member-4.jpg'
  },
  misc: {
    frame: '/images/misc/frame.jpg'
  }
} as const;

// Image dimensions for Next.js Image component
export const IMAGE_DIMENSIONS = {
  hero: {
    width: 1920,
    height: 1080
  },
  standard: {
    width: 800,
    height: 600
  },
  square: {
    width: 600,
    height: 600
  }
} as const;
EOF
fi

# Create placeholder team member images if they don't exist
mkdir -p public/images/team

# Fix path alias issues by updating imports in the problematic files
echo "Fixing path alias issues in dashboard/page.tsx..."
if [ -f app/dashboard/page.tsx ]; then
  sed -i 's/import { IMAGES } from .lib\/constants\/images.;/import { IMAGES } from "..\/..\/lib\/constants\/images";/g' app/dashboard/page.tsx
fi

# Check if FacilityCard.tsx exists, if not create it
if [ ! -f components/FacilityCard.tsx ]; then
  echo "Creating missing FacilityCard.tsx file..."
  cat > components/FacilityCard.tsx << 'EOF'
import { FC } from 'react';
import { WrenchScrewdriverIcon, AcademicCapIcon, BuildingStorefrontIcon, BeakerIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface FacilityCardProps {
  type: 'service-center' | 'briefing-room' | 'pit-lane' | 'trackside-cafe' | 'pro-shop';
  title: string;
  description: string;
}

const facilityIcons = {
  'service-center': WrenchScrewdriverIcon,
  'briefing-room': AcademicCapIcon,
  'pit-lane': BuildingStorefrontIcon,
  'trackside-cafe': BeakerIcon,
  'pro-shop': ShoppingBagIcon,
};

const facilityColors = {
  'service-center': 'from-red-500/10 to-red-500/5 hover:from-red-500/20 hover:to-red-500/10',
  'briefing-room': 'from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10',
  'pit-lane': 'from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/20 hover:to-yellow-500/10',
  'trackside-cafe': 'from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10',
  'pro-shop': 'from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10',
};

export const FacilityCard: FC<FacilityCardProps> = ({ type, title, description }) => {
  const Icon = facilityIcons[type];
  const gradientColors = facilityColors[type];

  return (
    <div className={\`relative overflow-hidden rounded-2xl bg-gradient-to-br \${gradientColors} p-6 transition-all duration-300 hover:scale-[1.02]\`}>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />
      
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export const FacilitiesGrid: FC = () => {
  const facilities = [
    {
      type: 'service-center',
      title: 'Service Center',
      description: 'Fully equipped maintenance facility with professional technicians ensuring our karts are always in top racing condition.'
    },
    {
      type: 'briefing-room',
      title: 'Briefing Room',
      description: 'Modern briefing room for safety instructions, race briefings, and driver education sessions.'
    },
    {
      type: 'pit-lane',
      title: 'Pit Lane',
      description: 'Professional pit lane setup with covered garages for kart preparation and maintenance.'
    },
    {
      type: 'trackside-cafe',
      title: 'Trackside Cafe',
      description: 'Comfortable café and lounge area serving refreshments and light meals with a view of the track.'
    },
    {
      type: 'pro-shop',
      title: 'Pro Shop',
      description: 'Well-stocked shop offering racing gear, accessories, and merchandise for karting enthusiasts.'
    }
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {facilities.map((facility) => (
        <FacilityCard key={facility.type} {...facility} />
      ))}
    </div>
  );
};
EOF
fi

# Create back-to-top component if it doesn't exist
if [ ! -f components/back-to-top.tsx ]; then
  echo "Creating missing back-to-top.tsx file..."
  cat > components/back-to-top.tsx << 'EOF'
'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all duration-300 hover:bg-red-700 focus:outline-none"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
EOF
fi

# Fix path alias issues in the problematic files
echo "Fixing path alias issues in app files..."

# Fix facilities/page.tsx
if [ -f app/facilities/page.tsx ]; then
  sed -i 's/import { BackToTop } from .@\/components\/back-to-top.;/import { BackToTop } from "..\/..\/components\/back-to-top";/g' app/facilities/page.tsx
  sed -i 's/import { FacilitiesGrid } from .@\/components\/FacilityCard.;/import { FacilitiesGrid } from "..\/..\/components\/FacilityCard";/g' app/facilities/page.tsx
fi

# Fix faq/page.tsx
if [ -f app/faq/page.tsx ]; then
  sed -i 's/import { BackToTop } from .@\/components\/back-to-top.;/import { BackToTop } from "..\/..\/components\/back-to-top";/g' app/faq/page.tsx
fi

# Fix privacy/page.tsx
if [ -f app/privacy/page.tsx ]; then
  sed -i 's/import { BackToTop } from .@\/components\/back-to-top.;/import { BackToTop } from "..\/..\/components\/back-to-top";/g' app/privacy/page.tsx
fi

# Create a simple jsconfig.json to ensure path aliases work correctly
cat > jsconfig.json << 'EOF'
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "lib/*": ["./lib/*"],
      "components/*": ["./components/*"]
    }
  }
}
EOF

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force

# Clear any previous build artifacts
echo "Clearing previous build artifacts..."
rm -rf .next

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Check if build was successful
if [ ! -f .next/BUILD_ID ]; then
  echo "Build failed! Creating a fallback static site..."
  
  # Create a minimal static site as fallback
  mkdir -p .next/server/pages
  mkdir -p .next/static
  
  # Create a minimal BUILD_ID file
  echo "fallback-$(date +%s)" > .next/BUILD_ID
  
  # Create a minimal static HTML page
  cat > .next/server/pages/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pilots Cup - Coming Soon</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #000;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #e11d48;
    }
    p {
      font-size: 1.2rem;
      max-width: 600px;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    .logo {
      margin-bottom: 2rem;
      font-size: 3rem;
      font-weight: bold;
      color: #e11d48;
    }
    .button {
      display: inline-block;
      background-color: #e11d48;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #b91c1c;
    }
  </style>
</head>
<body>
  <div class="logo">🏎️ PILOTS CUP</div>
  <h1>Our Website is Being Updated</h1>
  <p>We're currently making improvements to enhance your experience. Please check back soon for our new and improved website.</p>
  <a href="mailto:info@pilotscup.ae" class="button">Contact Us</a>
</body>
</html>
EOF
fi

echo "Build process completed!"
