import { createContext, useState } from "react";
const UsernameContext = createContext({});

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState('Tiago');
    
  const changeUsername = (newUsername) => {
    newUsername = newUsername;
    setUsername(newUsername);
  };

  return (
    <UsernameContext.Provider
      value={{
        username,
        changeUsername,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};
export default UsernameContext;
