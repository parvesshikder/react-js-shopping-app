import React, { createContext, useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot , getDocs} from "firebase/firestore";

export const MyOrderContext = createContext();

export const MyOrderProvider = (props) => {
  const [myproducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const snapshot = await getDocs(collection(firestore, "myorders"));
      const fetchedProducts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMyProducts(fetchedProducts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const firestore = getFirestore();
    const unsubscribe = onSnapshot(collection(firestore, "myorders"), (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMyProducts(updatedProducts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <MyOrderContext.Provider value={myproducts}>
      {props.children}
    </MyOrderContext.Provider>
  );
};
