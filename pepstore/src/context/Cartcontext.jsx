import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, quantity = 1) {
  setCartItems((prevItems) => {
    const existing = prevItems.find((item) => item.id === product.id);

    if (existing) {
      return prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      return [...prevItems, { ...product, quantity }];
    }
  });
}

  function decreaseQuantity(productId) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCartItems([]);
  }

  const value = { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}