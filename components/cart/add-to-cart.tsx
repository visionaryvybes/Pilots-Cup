'use client';

import { Product } from '../../types/product';
import { useCart } from '../../hooks/use-cart';
import { Button } from '../ui/button';
import { useState } from 'react';

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    
    // Simulate a delay to show loading state
    setTimeout(() => {
      addItem(product);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Button
      aria-label="Add to cart"
      onClick={handleAddToCart}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? 'Adding...' : 'Add to cart'}
    </Button>
  );
}
