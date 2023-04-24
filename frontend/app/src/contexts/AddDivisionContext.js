import { createContext, useState } from "react";
const AddDivisionContext = createContext({});

export const AddDivisionProvider = ({ children }) => {
  const [divisionName, setDivisionName] = useState(null);
  const [divisionIcon, setDivisionIcon] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);

  const resetAddDivisionContext = () => {
    setDivisionName(null);
    setDivisionIcon(null);
    setSelectedDevices([]);
  };

  return (
    <AddDivisionContext.Provider
      value={{
        divisionName,
        setDivisionName,
        divisionIcon,
        setDivisionIcon,
        selectedDevices,
        setSelectedDevices,
        resetAddDivisionContext,
      }}
    >
      {children}
    </AddDivisionContext.Provider>
  );
};
export default AddDivisionContext;
