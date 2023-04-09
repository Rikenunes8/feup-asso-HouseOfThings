import { createContext, useState } from "react";
const CreateRuleContext = createContext({});

export const CreateRuleProvider = ({ children }) => {
  const [ruleName, setRuleName] = useState(null);
  /*const [deviceName, setDeviceName] = useState(null);
  const [deviceDivision, setDeviceDivision] = useState(null);
  const [deviceCategory, setDeviceCategory] = useState(null);
  const [deviceSubcategory, setDeviceSubcategory] = useState(null);
  const [availableDevices, setAvailableDevices] = useState([]);*/

  const resetCreateRuleContext = () => {
    setRuleName(null);
    //setDeviceUUID(null);
    //setDeviceName(null);
    //setDeviceDivision(null);
    //setDeviceCategory(null);
    //setDeviceSubcategory(null);
    //setAvailableDevices([]);
  };

  return (
    <CreateRuleContext.Provider
      value={{
        ruleName, 
        setRuleName,
        resetCreateRuleContext
        /*deviceUUID,
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
        resetAddDeviceContext,*/
      }}
    >
      {children}
    </CreateRuleContext.Provider>
  );
};
export default CreateRuleContext;
