import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ButtonLink } from '../ui/button';

const karts = [
  {
    name: 'Bambino',
    age: '5-7 years',
    price: '10,000 AED',
    color: 'from-blue-600 to-blue-400',
    description: 'Perfect for young beginners starting their racing journey.',
    image: '/images/karts/PHOTO-2025-03-04-08-53-03.jpg'
  },
  {
    name: 'Micro',
    age: '7-10 years',
    price: '12,500 AED',
    color: 'from-green-600 to-green-400',
    description: 'Designed for developing young racers with basic experience.',
    image: '/images/karts/PHOTO-2025-03-04-08-54-44.jpg'
  },
  {
    name: 'Mini',
    age: '10-12 years',
    price: '13,500 AED',
    color: 'from-yellow-600 to-yellow-400',
    description: 'Advanced karts for skilled young drivers ready for more power.',
    image: '/images/karts/PHOTO-2025-03-04-08-55-18.jpg'
  },
  {
    name: 'Junior',
    age: '12-15 years',
    price: '14,500 AED',
    color: 'from-orange-600 to-orange-400',
    description: 'High-performance karts for teenage racers with racing experience.',
    image: '/images/karts/PHOTO-2025-03-04-08-55-50.jpg'
  },
  {
    name: 'Senior',
    age: '15+ years',
    price: '15,000 AED',
    color: 'from-red-600 to-red-400',
    description: 'Professional-grade karts for experienced adult racers.',
    image: '/images/karts/rotax-senior.jpg'
  },
  {
    name: 'DD2',
    age: '15+ years',
    price: '16,000 AED',
    color: 'from-purple-600 to-purple-400',
    description: 'Ultimate racing machines for professional competitions.',
    image: '/images/karts/rotax-senior.jpg'
  }
];

export function Karts() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black to-neutral-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white">Kart Categories</h2>
            <p className="text-xl text-neutral-400 mt-2">Choose the perfect kart for your age and experience</p>
          </div>
          <ButtonLink 
            href="/rentals" 
            className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700"
          >
            View All Categories <ArrowRightIcon className="w-4 h-4" />
          </ButtonLink>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-neutral-800">
            {karts.map((kart, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-80 snap-center rounded-2xl overflow-hidden glass-card hover-scale"
              >
                <div className={`h-48 relative bg-gradient-to-r ${kart.color} p-6`}>
                  <Image
                    src={kart.image}
                    alt={`${kart.name} kart`}
                    fill
                    className="object-cover mix-blend-overlay opacity-75"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                      {kart.age}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white text-center relative z-10">{kart.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-neutral-400 mb-4">{kart.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-neutral-500">Starting from</span>
                    <span className="text-2xl font-bold text-red-500">{kart.price}</span>
                  </div>
                  <ButtonLink 
                    href={`/rentals#${kart.name.toLowerCase()}`} 
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Book Now
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 md:hidden">
            <div className="bg-red-600 rounded-full p-2 shadow-lg">
              <ArrowRightIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:hidden">
          <ButtonLink 
            href="/rentals" 
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700"
          >
            View All Categories <ArrowRightIcon className="w-4 h-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
} 