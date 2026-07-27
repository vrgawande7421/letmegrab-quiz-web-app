import { createContext, useState } from "react";

export const roleContext = createContext();

export const ContextProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("loginRole"));
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("currentUser"),
  );

  return (
    <roleContext.Provider
      value={{
        role,
        setRole,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </roleContext.Provider>
  );
};
