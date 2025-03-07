import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="relative">
      {/* Image Banner */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/hero/hero-main.jpg"
            alt="Pilots Cup Racing Track"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Pilots Cup
          </h1>
          <p className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">
            Race Rotax Like a Pro!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/rentals"
              className="rounded-md bg-red-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-red-700"
            >
              Book a Kart
            </Link>
            <Link
              href="/membership"
              className="rounded-md border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/20"
            >
              Join the Cup
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Quick Info Tiles */}
      <div className="grid grid-cols-1 gap-6 bg-black px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-neutral-900 p-6 text-center shadow-md border border-neutral-800">
          <h3 className="text-xl font-bold text-white">Current Occupancy</h3>
          <p className="mt-2 text-3xl font-bold text-white">12</p>
          <p className="text-neutral-400">/ 20 karts</p>
        </div>
        
        <div className="rounded-lg bg-neutral-900 p-6 text-center shadow-md border border-neutral-800">
          <h3 className="text-xl font-bold text-white">Weather Conditions</h3>
          <p className="mt-2 text-xl text-white">Partly Cloudy, 28°C</p>
          <p className="text-neutral-400">Wind: 12 km/h • Track: Dry</p>
        </div>
        
        <div className="rounded-lg bg-neutral-900 p-6 text-center shadow-md border border-neutral-800">
          <h3 className="text-xl font-bold text-white">Quick Actions</h3>
          <div className="mt-4 flex justify-center gap-2">
            <Link href="/rentals" className="rounded bg-white px-3 py-2 text-sm font-medium text-black hover:bg-neutral-200">
              Book a Session
            </Link>
            <Link href="/rankings" className="rounded bg-white px-3 py-2 text-sm font-medium text-black hover:bg-neutral-200">
              Check Lap Times
            </Link>
          </div>
        </div>
        
        <div className="rounded-lg bg-neutral-900 p-6 text-center shadow-md border border-neutral-800">
          <h3 className="text-xl font-bold text-white">Upcoming Sessions Today</h3>
          <ul className="mt-2 text-left text-white">
            <li className="mb-2">
              <span className="font-bold">14:00</span> - Open Session
              <p className="text-sm text-neutral-400">8 Spots Left</p>
            </li>
            <li className="mb-2">
              <span className="font-bold">16:00</span> - Junior Training
              <p className="text-sm text-neutral-400">Available</p>
            </li>
            <li>
              <span className="font-bold">18:00</span> - Race Night
              <p className="text-sm text-neutral-400">3 Spots Left</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header; 