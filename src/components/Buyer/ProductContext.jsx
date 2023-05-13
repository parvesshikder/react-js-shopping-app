import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [products] = useState([
    {
      id: 1,
      name: "Belt",
      price: 10.99,
      details: "Product Details",
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp",
    },
    {
      id: 2,
      name: "Shoes",
      price: 19.99,
      details: "Product Details",
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp",
    },
    {
      id: 3,
      name: "Shoes",
      price: 19.99,
      details: "Product Details",
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp",
    },
  ]);

  return (
    <ProductContext.Provider value={[products]}>
      {props.children}
    </ProductContext.Provider>
  );
};
