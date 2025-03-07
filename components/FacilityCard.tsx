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
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradientColors} p-6 transition-all duration-300 hover:scale-[1.02]`}>
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