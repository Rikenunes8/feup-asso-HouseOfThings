import { createContext, useState } from "react";
const AddDeviceContext = createContext({});

export const AddDeviceProvider = ({ children }) => {
  const [deviceUUID, setDeviceUUID] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const [deviceDivision, setDeviceDivision] = useState(null);
  const [deviceCategory, setDeviceCategory] = useState(null);
  const [deviceSubcategory, setDeviceSubcategory] = useState(null);
  const [availableDevices, setAvailableDevices] = useState([]);

  const resetAddDeviceContext = () => {
    setDeviceUUID(null);
    setDeviceName(null);
    setDeviceDivision(null);
    setDeviceCategory(null);
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
