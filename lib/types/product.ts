export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  category: string;
  ageRange?: string;
  featuredImage: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
  specs?: {
    engine?: string;
    power?: string;
    topSpeed?: string;
    weight?: string;
  };
}

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
} 