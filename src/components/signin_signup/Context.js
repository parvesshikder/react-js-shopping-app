import { useState, createContext } from 'react';


const Context = createContext();

export function ContextProvider(props) {
  const [role, setRole] = useState("");

  // function to set the role value based on the user's role
  const setRoleValue = (userRole) => {
    if (userRole === "Buyer") {
      setRole("Buyer");
    } else if (userRole === "Seller") {
      setRole("Seller");
    }
  };

  return (
    <Context.Provider value={{ role, setRoleValue }}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;

