import React, { createContext, useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot , getDocs} from "firebase/firestore";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const snapshot = await getDocs(collection(firestore, "users"));
      const users = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(users);
    };

    fetchData();
  }, []);



  return (
    <AdminContext.Provider value={users}>
      {props.children}
    </AdminContext.Provider>
  );
};
