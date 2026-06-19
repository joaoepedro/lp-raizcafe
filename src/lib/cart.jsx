import { createContext, useContext, useMemo, useState } from 'react';
import { trackAddToCart, trackBeginCheckout, trackPurchase } from './analytics';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart | checkout | success
  const [lastOrderId, setLastOrderId] = useState(null);

  function addItem(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
    trackAddToCart(product, quantity);
    setCheckoutStep('cart');
    setIsOpen(true);
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const freeShippingThreshold = 120;
  const shipping = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 14.9;
  const total = subtotal + shipping;

  function goToCheckout() {
    if (items.length === 0) return;
    trackBeginCheckout(items, total);
    setCheckoutStep('checkout');
  }

  function completeOrder() {
    const orderId = `RAIZ-${Math.floor(100000 + Math.random() * 900000)}`;
    trackPurchase(orderId, items, total);
    setLastOrderId(orderId);
    setCheckoutStep('success');
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        subtotal,
        shipping,
        total,
        freeShippingThreshold,
        isOpen,
        setIsOpen,
        checkoutStep,
        setCheckoutStep,
        goToCheckout,
        completeOrder,
        lastOrderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
