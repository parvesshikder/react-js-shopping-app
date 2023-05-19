import React, { createContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const SellerProductContext = createContext();

export const SellerProductProvider = (props) => {
  const [products, setProducts] = useState([]); // Ensure useState is imported correctly
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (userEmail) {
        const q = query(
          collection(firestore, "products"),
          where("userEmail", "==", userEmail)
        );
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const updatedProducts = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProducts(updatedProducts); // Ensure setProducts is assigned a function
        });

        return () => {
          unsubscribeSnapshot();
        };
      }
    };

    fetchData();
  }, [firestore, userEmail]);

  return (
    <SellerProductContext.Provider value={[products]}>
      {props.children}
    </SellerProductContext.Provider>
  );
};
