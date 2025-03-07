import Link from 'next/link';
import { GridTileImage } from './tile';

export function ThreeItemsGrid() {
  // Placeholder data instead of Shopify products
  const placeholderProducts = [
    {
      id: '1',
      handle: 'product-1',
      title: 'Product 1',
      featuredImage: { url: '/placeholder.jpg' },
      priceRange: {
        maxVariantPrice: {
          amount: '99.99',
          currencyCode: 'USD'
        }
      }
    },
    {
      id: '2',
      handle: 'product-2',
      title: 'Product 2',
      featuredImage: { url: '/placeholder.jpg' },
      priceRange: {
        maxVariantPrice: {
          amount: '129.99',
          currencyCode: 'USD'
        }
      }
    },
    {
      id: '3',
      handle: 'product-3',
      title: 'Product 3',
      featuredImage: { url: '/placeholder.jpg' },
      priceRange: {
        maxVariantPrice: {
          amount: '79.99',
          currencyCode: 'USD'
        }
      }
    }
  ];

  if (!placeholderProducts.length) return null;

  const [firstProduct, secondProduct, thirdProduct] = placeholderProducts;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <div className="md:col-span-4 md:row-span-2">
        <Link className="relative block aspect-square h-full w-full" href={`/product/${firstProduct.handle}`}>
          <GridTileImage
            alt={firstProduct.title}
            label={{
              title: firstProduct.title,
              amount: firstProduct.priceRange.maxVariantPrice.amount,
              currencyCode: firstProduct.priceRange.maxVariantPrice.currencyCode
            }}
            src={firstProduct.featuredImage?.url || '/placeholder.jpg'}
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            priority={true}
          />
        </Link>
      </div>

      <div className="md:col-span-2">
        <Link className="relative block aspect-square h-full w-full" href={`/product/${secondProduct.handle}`}>
          <GridTileImage
            alt={secondProduct.title}
            label={{
              title: secondProduct.title,
              amount: secondProduct.priceRange.maxVariantPrice.amount,
              currencyCode: secondProduct.priceRange.maxVariantPrice.currencyCode
            }}
            src={secondProduct.featuredImage?.url || '/placeholder.jpg'}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </Link>
      </div>

      <div className="md:col-span-2">
        <Link className="relative block aspect-square h-full w-full" href={`/product/${thirdProduct.handle}`}>
          <GridTileImage
            alt={thirdProduct.title}
            label={{
              title: thirdProduct.title,
              amount: thirdProduct.priceRange.maxVariantPrice.amount,
              currencyCode: thirdProduct.priceRange.maxVariantPrice.currencyCode
            }}
            src={thirdProduct.featuredImage?.url || '/placeholder.jpg'}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </Link>
      </div>
    </section>
  );
}
