import { BackToTop } from 'components/back-to-top';
import { IMAGES } from 'lib/constants/images';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shop | Pilots Cup',
  description: 'Shop premium racing gear, merchandise, and equipment at Pilots Cup Dubai. Get everything you need for karting.'
};

const categories = [
  {
    name: 'Racing Gear',
    description: 'Professional racing suits, helmets, and safety equipment',
    image: IMAGES.events.racing,
    items: [
      { name: 'Racing Suit', price: 'AED 1,200' },
      { name: 'Racing Helmet', price: 'AED 2,500' },
      { name: 'Racing Gloves', price: 'AED 250' },
      { name: 'Racing Shoes', price: 'AED 450' }
    ]
  },
  {
    name: 'Merchandise',
    description: 'Official Pilots Cup branded clothing and accessories',
    image: IMAGES.events.competition,
    items: [
      { name: 'Polo Shirt', price: 'AED 150' },
      { name: 'Cap', price: 'AED 100' },
      { name: 'Hoodie', price: 'AED 250' },
      { name: 'Sports Bag', price: 'AED 200' }
    ]
  },
  {
    name: 'Equipment',
    description: 'Professional karting tools and maintenance equipment',
    image: IMAGES.facilities.garage,
    items: [
      { name: 'Tire Pressure Gauge', price: 'AED 180' },
      { name: 'Kart Stand', price: 'AED 750' },
      { name: 'Tool Kit', price: 'AED 450' },
      { name: 'GoPro Mount', price: 'AED 120' }
    ]
  }
];

const featuredProducts = [
  {
    name: 'Pro Racing Suit',
    description: 'Professional-grade racing suit with Pilots Cup branding',
    price: 'AED 1,500',
    image: IMAGES.events.racing,
    category: 'Racing Gear',
    features: [
      'Fire-resistant material',
      'Custom fit available',
      'Professional design',
      'FIA approved'
    ]
  },
  {
    name: 'Premium Racing Helmet',
    description: 'Lightweight and aerodynamic racing helmet',
    price: 'AED 2,800',
    image: IMAGES.events.competition,
    category: 'Racing Gear',
    features: [
      'Advanced ventilation',
      'Built-in radio system',
      'Anti-fog visor',
      'Snell certified'
    ]
  },
  {
    name: 'Race Day Kit',
    description: 'Complete kit for race day essentials',
    price: 'AED 850',
    image: IMAGES.facilities.garage,
    category: 'Equipment',
    features: [
      'Tool set',
      'Tire gauge',
      'Cleaning supplies',
      'Storage bag'
    ]
  }
];

export default function ShopPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/DR-42-scaled.jpg"
            alt="Racing Equipment"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Racing Shop
          </h1>
          <p className="max-w-3xl text-lg font-medium md:text-xl lg:text-2xl">
            Premium racing gear and equipment
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Featured Products</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg bg-neutral-900 shadow-lg transition-shadow hover:shadow-xl border border-neutral-800"
              >
                <div className="relative aspect-video">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <p className="mt-2 text-lg font-semibold text-red-600">{product.price}</p>
                  <p className="mt-2 text-neutral-400">{product.description}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-white">Features:</h4>
                    <ul className="mt-2 space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-neutral-400">
                          <svg
                            className="mr-2 h-5 w-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="mt-6 w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-neutral-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Shop by Category</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg bg-black shadow-lg transition-shadow hover:shadow-xl border border-neutral-800"
              >
                <div className="relative aspect-video">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="mt-2 text-neutral-400">{category.description}</p>
                  <div className="mt-4 space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between text-sm text-neutral-400"
                      >
                        <span>{item.name}</span>
                        <span className="font-semibold text-white">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/shop/${category.name.toLowerCase().replace(' ', '-')}`}
                    className="mt-6 inline-block w-full rounded-lg bg-neutral-800 px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-neutral-700"
                  >
                    View All
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Guide */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-neutral-900 p-8 shadow-lg border border-neutral-800">
            <h2 className="text-2xl font-bold text-white">Size Guide</h2>
            <p className="mt-2 text-neutral-400">
              Find the perfect fit for your racing gear. Visit our store for professional fitting
              service.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-700">
                <thead className="bg-neutral-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-300">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-300">
                      Height (cm)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-300">
                      Chest (cm)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-300">
                      Waist (cm)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700 bg-neutral-900">
                  {[
                    { size: 'XS', height: '150-160', chest: '86-90', waist: '70-74' },
                    { size: 'S', height: '160-170', chest: '90-94', waist: '74-78' },
                    { size: 'M', height: '170-175', chest: '94-98', waist: '78-82' },
                    { size: 'L', height: '175-180', chest: '98-102', waist: '82-86' },
                    { size: 'XL', height: '180-185', chest: '102-106', waist: '86-90' }
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                        {row.size}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-400">
                        {row.height}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-400">
                        {row.chest}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-400">
                        {row.waist}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Need Help?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-red-100">
            Visit our store for professional fitting and expert advice.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Visit Store
            </Link>
          </div>
        </div>
      </section>
      <BackToTop />
    </main>
  );
} 