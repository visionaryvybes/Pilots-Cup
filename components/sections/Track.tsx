import { PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { ButtonLink } from '../ui/button';

export function Track() {
  return (
    <section className="py-20 bg-neutral-900/50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience Professional Racing
            </h2>
            <div className="w-20 h-1 bg-red-600 mb-8"></div>
            <p className="text-lg text-neutral-300 mb-6">
              Our FIA-approved track offers the perfect environment for both recreational 
              karting and professional racing. With state-of-the-art facilities and 
              challenging corners, you'll experience the thrill of real racing.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Professional timing system',
                'Night racing with full track lighting',
                'Pit lane with professional equipment',
                'Safety barriers and runoff areas'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-neutral-300">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <ButtonLink 
                href="/track" 
                className="bg-red-600 hover:bg-red-700"
              >
                Track Details
              </ButtonLink>
              <button 
                className="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
              >
                <PlayIcon className="w-8 h-8" />
                Watch Track Tour
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden glass-card">
              <div className="relative w-full h-full">
                <Image
                  src="/images/track/track-overview.jpg"
                  alt="Pilots Cup Racing Track"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <PlayIcon className="w-8 h-8 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-4 px-6">
                  <p className="text-white font-medium">Experience our world-class racing track</p>
                </div>
              </div>
            </div>

            {/* Track Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="glass-card rounded-xl p-4">
                <div className="text-2xl font-bold text-red-500">1.2km</div>
                <div className="text-sm text-neutral-400">Track Length</div>
              </div>
              <div className="glass-card rounded-xl p-4">
                <div className="text-2xl font-bold text-red-500">12</div>
                <div className="text-sm text-neutral-400">Challenging Corners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 