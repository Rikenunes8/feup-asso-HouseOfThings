import { createContext, useState } from "react";
const ModalsContext = createContext({});

export const ModalsProvider = ({ children }) => {
  const [chooseDeviceModalVisible, changeChooseDeviceModalVisibility] = useState(false);    
  const setChooseDeviceModalVisible = (visible) => changeChooseDeviceModalVisibility(visible);

  const [deviceDetailsModalVisible, changeDeviceDetailsModalVisibility] = useState(false);    
  const setDeviceDetailsModalVisible = (visible) => changeDeviceDetailsModalVisibility(visible);

  const [addDeviceFormModalVisible, changeAddDeviceFormModalVisibility] = useState(false);    
  const setAddDeviceFormModalVisible = (visible) => changeAddDeviceFormModalVisibility(visible);

  const [availableDevicesMenuVisible, changeAvailableDevicesMenuVisibility] = useState(false);
  const setAvailableDevicesMenuVisible = (visible) => changeAvailableDevicesMenuVisibility(visible);

  return (
    <ModalsContext.Provider
      value={{
        chooseDeviceModalVisible,
        setChooseDeviceModalVisible,
        deviceDetailsModalVisible,
        setDeviceDetailsModalVisible,
        addDeviceFormModalVisible,
        setAddDeviceFormModalVisible,
        availableDevicesMenuVisible,
        setAvailableDevicesMenuVisible,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
export default ModalsContext;