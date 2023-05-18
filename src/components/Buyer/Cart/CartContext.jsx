import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);

  const addItem = (item) => {
    const updatedCartItems = [...cartItems, item];
    const totalAmount = updatedCartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setCartItems(updatedCartItems);
    setTotalAmount(totalAmount);
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
