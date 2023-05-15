import React, { createContext, useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const SellerProductContext = createContext();

export const SellerProductProvider = (props) => {
  const [products, setProducts] = useState([]);
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
        const q = query(collection(firestore, "products"), where("userEmail", "==", userEmail));
        const data = await getDocs(q);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
