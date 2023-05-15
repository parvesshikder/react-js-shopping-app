
import React, { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartitem, setCart] = useState([]);

  const addItem = (product) => {
    const item = { id: uuid(), product };
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItem = (itemId) => {
    const updatedCart = cartitem.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cartitem, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
