import React, { createContext, useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot , getDocs} from "firebase/firestore";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const snapshot = await getDocs(collection(firestore, "products"));
      const fetchedProducts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(fetchedProducts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const firestore = getFirestore();
    const unsubscribe = onSnapshot(collection(firestore, "products"), (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(updatedProducts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ProductContext.Provider value={products}>
      {props.children}
    </ProductContext.Provider>
  );
};
