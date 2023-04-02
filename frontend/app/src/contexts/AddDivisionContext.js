import { createContext, useState } from "react";
const AddDivisionContext = createContext({});

export const AddDeviceProvider = ({ children }) => {
  const [divisionName, setDivisionName] = useState(null);
  const [divisionIcon, setDivisionIcon] = useState(null);

  const resetAddDivisionContext = () => {
    setDivisionName(null);
    setDivisionIcon(null);
  };

  return (
    <AddDivisionContext.Provider
      value={{
        divisionName,
        setDivisionName,
        divisionIcon,
        setDivisionIcon,
        resetAddDivisionContext,
      }}
    >
      {children}
    </AddDivisionContext.Provider>
  );
};
export default AddDivisionContext;
