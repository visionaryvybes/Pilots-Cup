import { BackToTop } from 'components/back-to-top';
import { IMAGES } from 'lib/constants/images';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { KartAvailability } from '../../components/KartAvailability';

export const metadata: Metadata = {
  title: 'Our Karts | Pilots Cup',
  description: 'Experience premium DR Racing karts at Pilots Cup UAE. Choose from Bambino, Micro, Mini, Junior, Senior, and DD2 categories equipped with Rotax engines for an unforgettable racing experience.'
};

const kartCategories = [
  {
    name: 'Bambino',
    ageRange: '5-7 years',
    engineType: 'Rotax Micro Max',
    power: '4.5 HP',
    speed: 'Up to 45 km/h',
    price: 10000,
    description: 'Perfect for young beginners starting their racing journey.',
    image: IMAGES.karts.bambino.main,
    features: [
      'Adjustable seat and pedals',
      'Safety roll cage',
      'Electronic speed limiter',
      'Full safety gear provided'
    ]
  },
  {
    name: 'Micro',
    ageRange: '7-10 years',
    engineType: 'Rotax Micro Max',
    power: '6.5 HP',
    speed: 'Up to 60 km/h',
    price: 12500,
    description: 'Designed for young racers ready to develop their skills.',
    image: IMAGES.karts.bambino.main,
    features: [
      'Lightweight chassis',
      'Responsive handling',
      'Beginner-friendly controls',
      'Full safety gear provided'
    ]
  },
  {
    name: 'Mini',
    ageRange: '10-12 years',
    engineType: 'Rotax Mini Max',
    power: '15 HP',
    speed: 'Up to 80 km/h',
    price: 13500,
    description: 'The perfect step up for developing racers.',
    image: IMAGES.karts.junior.main,
    features: [
      'Intermediate racing chassis',
      'Enhanced braking system',
      'Improved acceleration',
      'Full safety gear provided'
    ]
  },
  {
    name: 'Junior',
    ageRange: '12-15 years',
    engineType: 'Rotax Junior Max',
    power: '23 HP',
    speed: 'Up to 110 km/h',
    price: 14500,
    description: 'Ideal for young racers ready to take on more power and speed.',
    image: IMAGES.karts.junior.main,
    features: [
      'Advanced racing chassis',
      'Hydraulic disc brakes',
      'Race-tuned engine',
      'Full safety gear provided'
    ]
  },
  {
    name: 'Senior',
    ageRange: '15+ years',
    engineType: 'Rotax Senior Max',
    power: '30 HP',
    speed: 'Up to 130 km/h',
    price: 15000,
    description: 'Professional-grade karts for experienced racers.',
    image: IMAGES.karts.senior.main,
    features: [
      'Competition chassis',
      'High-performance brakes',
      'Advanced telemetry',
      'Full safety gear provided'
    ]
  },
  {
    name: 'DD2',
    ageRange: '15+ years',
    engineType: 'Rotax DD2',
    power: '34 HP',
    speed: 'Up to 140 km/h',
    price: 16000,
    description: 'The ultimate racing experience with dual-speed gearbox.',
    image: IMAGES.karts.dd2.main,
    features: [
      'Two-speed gearbox',
      'Premium racing chassis',
      'Advanced aerodynamics',
      'Full safety gear provided'
    ]
  }
];

const rentalPackages = [
  {
    name: 'Silver (25 Hours)',
    duration: '25 hours of track time',
    price: {
      bambino: 10000,
      micro: 12500,
      mini: 13500,
      junior: 14500,
      senior: 15000,
      dd2: 16000
    },
    description: 'Perfect for casual racers, valid for 6 months'
  },
  {
    name: 'Gold (50 Hours)',
    duration: '50 hours of track time',
    price: {
      bambino: 18000,
      micro: 22500,
      mini: 24300,
      junior: 26100,
      senior: 27000,
      dd2: 27800
    },
    description: 'For dedicated enthusiasts, valid for 12 months'
  },
  {
    name: 'Additional Hours',
    duration: 'Beyond 25 hours',
    price: {
      bambino: 200,
      micro: 300,
      mini: 350,
      junior: 400,
      senior: 450,
      dd2: 500
    },
    description: 'Per hour rate for additional track time'
  }
];

export default function RentalsPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.karts.senior.main}
            alt="DR Racing Senior Kart"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Our Karts
          </h1>
          <p className="mb-8 text-xl font-medium md:text-2xl max-w-3xl">
            Experience the thrill of racing with our premium DR Racing Rotax karts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="rounded-lg bg-neutral-900 p-6 shadow-md border border-neutral-800">
                <h2 className="text-2xl font-bold text-white mb-4">Booking Options</h2>
                <div className="mb-4">
                  <label htmlFor="kart-category" className="block text-sm font-medium text-neutral-300 mb-2">
                    Select Kart Category
                  </label>
                  <select
                    id="kart-category"
                    name="kart-category"
                    className="block w-full rounded-md border-neutral-700 bg-neutral-800 text-white py-2 px-3 focus:border-red-500 focus:ring-red-500"
                    defaultValue="senior"
                  >
                    <option value="bambino">Bambino</option>
                    <option value="micro">Micro</option>
                    <option value="mini">Mini</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="dd2">DD2</option>
                  </select>
                </div>
                <ul className="space-y-4">
                  <li className="border-b border-neutral-800 pb-4">
                    <h3 className="text-lg font-semibold text-white">Silver (25 Hours)</h3>
                    <p className="text-neutral-400 mt-1">25 hours of track time, 6 months validity</p>
                    <p className="text-xl font-bold text-white mt-2">From AED 10,000</p>
                    <Link
                      href="#book-now"
                      className="mt-3 block w-full rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700"
                    >
                      Book Now
                    </Link>
                  </li>
                  <li className="border-b border-neutral-800 pb-4">
                    <h3 className="text-lg font-semibold text-white">Gold (50 Hours)</h3>
                    <p className="text-neutral-400 mt-1">50 hours of track time, 12 months validity</p>
                    <p className="text-xl font-bold text-white mt-2">From AED 18,000</p>
                    <Link
                      href="#book-now"
                      className="mt-3 block w-full rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700"
                    >
                      Book Now
                    </Link>
                  </li>
                  <li>
                    <h3 className="text-lg font-semibold text-white">Pair Package</h3>
                    <p className="text-neutral-400 mt-1">50 hours for 2 people, 10% discount</p>
                    <p className="text-xl font-bold text-white mt-2">Custom Pricing</p>
                    <Link
                      href="#book-now"
                      className="mt-3 block w-full rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700"
                    >
                      Book Now
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Add the KartAvailability component */}
              <KartAvailability category="senior" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">Premium DR Racing Karts</h2>
                <p className="text-neutral-300 mb-6">
                  At Pilots Cup, we pride ourselves on offering the highest quality karting experience in the UAE. Our fleet consists exclusively of DR Racing Karts equipped with Rotax engines, known for their performance, reliability, and handling. DR Racing Kart is an Italian manufacturer with a strong presence in international competitions, including the prestigious WSK Super Master Series.
                </p>
                <p className="text-neutral-300 mb-6">
                  Our karts feature professional-grade chassis designed for optimal performance on the track. Each kart is meticulously maintained by our expert technicians to ensure safety and consistent performance for racers of all skill levels.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                  {kartCategories.map((kart) => (
                    <div key={kart.name} className="rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800">
                      <div className="relative h-48">
                        <Image
                          src={kart.image || "/images/karts/rotax-senior.jpg"}
                          alt={`${kart.name} Kart`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white">{kart.name}</h3>
                          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            AED {kart.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-neutral-400 mb-3">{kart.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm text-neutral-300">
                          <div>
                            <span className="font-semibold text-white">Age:</span> {kart.ageRange}
                          </div>
                          <div>
                            <span className="font-semibold text-white">Power:</span> {kart.power}
                          </div>
                          <div>
                            <span className="font-semibold text-white">Engine:</span> {kart.engineType}
                          </div>
                          <div>
                            <span className="font-semibold text-white">Speed:</span> {kart.speed}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">Why DR Racing Karts?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                    <h3 className="text-xl font-bold text-white mb-3">Competition-Proven</h3>
                    <p className="text-neutral-300">
                      DR Racing Karts have achieved podium finishes in international competitions like the WSK Super Master Series. Their karts are designed for both professional racers and enthusiasts seeking the ultimate racing experience.
                    </p>
                  </div>
                  <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                    <h3 className="text-xl font-bold text-white mb-3">Italian Engineering</h3>
                    <p className="text-neutral-300">
                      Manufactured in Italy, DR Racing Karts combine precision engineering with racing expertise to deliver exceptional handling and performance on the track.
                    </p>
                  </div>
                  <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                    <h3 className="text-xl font-bold text-white mb-3">Professional Chassis</h3>
                    <p className="text-neutral-300">
                      The chassis design provides optimal weight distribution and flexibility, allowing for better cornering and stability at high speeds.
                    </p>
                  </div>
                  <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                    <h3 className="text-xl font-bold text-white mb-3">Rotax Power</h3>
                    <p className="text-neutral-300">
                      Paired with Rotax engines, these karts deliver reliable power and performance across all categories, from Bambino to DD2.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">Rental Packages</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-neutral-800">
                    <thead className="bg-neutral-900">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">
                          Package
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">
                          Bambino
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">
                          Micro
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">
                          Mini
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">
                          Junior
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">
                          Senior
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">
                          DD2
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-neutral-900 divide-y divide-neutral-800">
                      {rentalPackages.map((pkg) => (
                        <tr key={pkg.name}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{pkg.name}</div>
                            <div className="text-xs text-neutral-400">{pkg.duration}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            AED {pkg.price.bambino}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            AED {pkg.price.micro}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            AED {pkg.price.mini}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            AED {pkg.price.junior}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            AED {pkg.price.senior}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            AED {pkg.price.dd2}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">DR Racing Kart Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                    <h3 className="text-xl font-bold text-white mb-3">International Success</h3>
                    <p className="text-neutral-300">
                      DR Racing Karts have achieved numerous podium finishes in prestigious international competitions, including the WSK Super Master Series. Their commitment to excellence has established them as a leading kart manufacturer.
                    </p>
                  </div>
                  <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                    <h3 className="text-xl font-bold text-white mb-3">Racing Heritage</h3>
                    <p className="text-neutral-300">
                      With a strong racing heritage, DR Racing Kart has developed chassis that meet the demands of competitive racing while remaining accessible to enthusiasts and beginners alike.
                    </p>
                  </div>
                </div>
                <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/images/karts/rotax-senior.jpg"
                    alt="DR Racing Kart in action"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </section>

              <section id="book-now">
                <h2 className="text-3xl font-bold text-white mb-6">Book Your Session</h2>
                <p className="text-neutral-300 mb-6">
                  Ready to hit the track? Choose your preferred date and time below. For group bookings or special events, please contact us directly.
                </p>
                <div className="rounded-lg bg-neutral-900 p-6 border border-neutral-800">
                  <div className="text-center py-8">
                    <p className="text-white mb-4">Contact us to book your session:</p>
                    <p className="text-xl">
                      <a href="mailto:info@pilotscup.ae" className="text-red-600 hover:text-red-500">info@pilotscup.ae</a>
                    </p>
                    <p className="text-xl mt-2">
                      <a href="tel:+971501234567" className="text-red-600 hover:text-red-500">+971 50 123 4567</a>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
} 