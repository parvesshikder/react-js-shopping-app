import React, { createContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export const NewOrderCountContext = createContext();

export const NewOrderCountProvider = ({ children }) => {
  const [newOrderCount, setNewOrderCount] = useState(0);
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "products"), (snapshot) => {
      const pendingProducts = snapshot.docs.filter(
        (doc) => doc.data().status === "pending"
      );
      setNewOrderCount(pendingProducts.length);
    });

    return () => {
      unsubscribe();
    };
  }, [firestore]);

  return (
    <NewOrderCountContext.Provider value={[newOrderCount, setNewOrderCount]}>
      {children}
    </NewOrderCountContext.Provider>
  );
};