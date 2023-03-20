import { createContext, useState } from "react";
const AddDeviceContext = createContext({});

export const AddDeviceProvider = ({ children }) => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceDivision, setDeviceDivision] = useState(null);
  const [deviceGroup, setDeviceGroup] = useState("");
  const [deviceType, setDeviceType] = useState(null);

  return (
    <AddDeviceContext.Provider
      value={{
        deviceName,
        setDeviceName,
        deviceDivision,
        setDeviceDivision,
        deviceGroup,
        setDeviceGroup,
        deviceType,
        setDeviceType,
      }}
    >
      {children}
    </AddDeviceContext.Provider>
  );
};
export default AddDeviceContext;
