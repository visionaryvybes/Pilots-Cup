import { AddToCart } from 'components/cart/add-to-cart';
import { Product } from '@/types/product';
import { FeatureList } from '../ui/feature-list';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b border-neutral-800 pb-6">
        <h1 className="mb-2 text-5xl font-medium text-white">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-red-600 p-2 text-sm text-white">
          {product.price}
        </div>
      </div>

      <div className="mb-6 text-sm leading-tight text-neutral-400">
        {product.description}
      </div>

      {product.features && product.features.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Features</h2>
          <FeatureList features={product.features} />
        </div>
      )}

      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Specifications</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <dt className="text-sm font-medium text-neutral-400 capitalize">{key}</dt>
                <dd className="text-base font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <AddToCart product={product} />
    </>
  );
}
