import clsx from 'clsx';
import { Suspense } from 'react';

export default function Collections() {
  // Placeholder data instead of Shopify collections
  const collections = [
    { handle: 'clothing', title: 'Clothing' },
    { handle: 'accessories', title: 'Accessories' },
    { handle: 'shoes', title: 'Shoes' },
    { handle: 'new-arrivals', title: 'New Arrivals' },
    { handle: 'sale', title: 'Sale' }
  ];

  return (
    <Suspense>
      <div className="order-last flex w-full gap-2 overflow-x-auto pt-1 md:order-none">
        {collections.map((collection) => (
          <div
            key={collection.handle}
            className={clsx(
              'block rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800'
            )}
          >
            {collection.title}
          </div>
        ))}
      </div>
    </Suspense>
  );
}
