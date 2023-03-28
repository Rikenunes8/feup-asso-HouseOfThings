import { createContext, useState } from "react";
const AddDeviceContext = createContext({});

export const AddDeviceProvider = ({ children }) => {
  const [deviceUUID, setDeviceUUID] = useState(null);
  const [deviceName, setDeviceName] = useState("");
  const [deviceDivision, setDeviceDivision] = useState(null);
  const [deviceCategory, setDeviceCategory] = useState("");
  const [deviceSubcategory, setDeviceSubcategory] = useState(null);
  const [availableDevices, setAvailableDevices] = useState([]);

  const resetAddDeviceContext = () => {
    setDeviceUUID("");
    setDeviceName("");
    setDeviceDivision(null);
    setDeviceCategory("");
    setDeviceSubcategory(null);
    setAvailableDevices([]);
  };

  return (
    <AddDeviceContext.Provider
      value={{
        deviceUUID,
        setDeviceUUID,
        deviceName,
        setDeviceName,
        deviceDivision,
        setDeviceDivision,
        deviceCategory,
        setDeviceCategory,
        deviceSubcategory,
        setDeviceSubcategory,
        availableDevices,
        setAvailableDevices,
        resetAddDeviceContext,
      }}
    >
      {children}
    </AddDeviceContext.Provider>
  );
};
export default AddDeviceContext;
