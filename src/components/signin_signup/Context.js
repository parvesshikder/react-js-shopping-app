import { useState, createContext, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Context = createContext();

export function ContextProvider(props) {
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState(null);
  const [emailVerified, setEmailVerified] = useState(null);

  // function to set the role value based on the user's role
  const setRoleValue = (userRole) => {
    if (userRole === "Buyer") {
      setRole("Buyer");
    } else if (userRole === "Seller") {
      setRole("Seller");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setUserData(data);
            if(user?.emailVerified){
              setEmailVerified(true);
            }
            
          });
        });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Context.Provider value={{ role, setRoleValue, userData, emailVerified, setEmailVerified }}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;
