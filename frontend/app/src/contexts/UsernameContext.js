import { createContext, useState } from "react";
const UsernameContext = createContext({});

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState("Tiago");

  return (
    <UsernameContext.Provider
      value={{
        username,
        setUsername,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};
export default UsernameContext;
