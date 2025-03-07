export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  featuredImage?: {
    url: string;
    altText?: string;
  };
  variants: ProductVariant[];
  options: ProductOption[];
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: {
    amount: string;
    currencyCode: string;
  };
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
} 