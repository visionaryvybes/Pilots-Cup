import { Product } from 'lib/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
    >
      <div className="relative aspect-square">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          width={product.featuredImage.width}
          height={product.featuredImage.height}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
        {product.category && (
          <div className="absolute top-4 right-4 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
            {product.category}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
        {product.ageRange && (
          <p className="mt-1 text-sm font-medium text-gray-600">Age: {product.ageRange}</p>
        )}
        <p className="mt-2 text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-red-600">
            {product.price.amount} {product.price.currencyCode}
          </p>
          <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
            View Details
          </button>
        </div>
        {product.specs && (
          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm">
            {product.specs.engine && (
              <div>
                <p className="font-semibold text-gray-900">Engine</p>
                <p className="text-gray-600">{product.specs.engine}</p>
              </div>
            )}
            {product.specs.power && (
              <div>
                <p className="font-semibold text-gray-900">Power</p>
                <p className="text-gray-600">{product.specs.power}</p>
              </div>
            )}
            {product.specs.topSpeed && (
              <div>
                <p className="font-semibold text-gray-900">Top Speed</p>
                <p className="text-gray-600">{product.specs.topSpeed}</p>
              </div>
            )}
            {product.specs.weight && (
              <div>
                <p className="font-semibold text-gray-900">Weight</p>
                <p className="text-gray-600">{product.specs.weight}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
} 