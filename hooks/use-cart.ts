import { useState } from 'react';
import { Product } from '../types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) => 
      prevItems.map((item) => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + (parseFloat(item.product.price.amount) * item.quantity), 
    0
  );

  return {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    isOpen,
    openCart,
    closeCart,
    totalItems,
    subtotal
  };
} 