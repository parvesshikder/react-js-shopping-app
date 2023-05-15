
import React, { createContext, useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const firestore = getFirestore();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(firestore, "products"));
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={[products]}>
      {props.children}
    </ProductContext.Provider>
  );
};

