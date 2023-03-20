import { createContext, useState } from "react";
const DeviceTypeContext = createContext({});

export const DeviceTypeProvider = ({ children }) => {
  const [deviceType, setDeviceType] = useState(null);

  return (
    <DeviceTypeContext.Provider
      value={{
        deviceType,
        setDeviceType,
      }}
    >
      {children}
    </DeviceTypeContext.Provider>
  );
};
export default DeviceTypeContext;
