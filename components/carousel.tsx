import Link from 'next/link';
import Image from 'next/image';

export function Carousel() {
  // Placeholder data instead of Shopify products
  const placeholderProducts = [
    {
      id: '1',
      handle: 'product-1',
      title: 'Product 1',
      price: '$99.99',
      image: '/placeholder.jpg'
    },
    {
      id: '2',
      handle: 'product-2',
      title: 'Product 2',
      price: '$129.99',
      image: '/placeholder.jpg'
    },
    {
      id: '3',
      handle: 'product-3',
      title: 'Product 3',
      price: '$79.99',
      image: '/placeholder.jpg'
    }
  ];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <div className="flex animate-carousel gap-4">
        {[...placeholderProducts, ...placeholderProducts].map((product, i) => (
          <Link
            key={`${product.handle}-${i}`}
            href={`/product/${product.handle}`}
            className="aspect-square h-[30vh] min-w-[30vh] relative"
          >
            <div className="relative h-full w-full">
              <Image
                alt={product.title}
                src={product.image}
                fill
                sizes="30vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 text-white">
                <h3 className="text-sm font-medium">{product.title}</h3>
                <p className="text-xs">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
