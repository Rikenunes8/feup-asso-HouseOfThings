import { createContext, useState } from "react";
const ModalsContext = createContext({});

export const ModalsProvider = ({ children }) => {
  const [chooseDeviceModalVisible, changeChooseDeviceModalVisibility] = useState(false);    
  const setChooseDeviceModalVisible = (visible) => changeChooseDeviceModalVisibility(visible);

  const [deviceDetailsModalVisible, changeDeviceDetailsModalVisibility] = useState(false);    
  const setDeviceDetailsModalVisible = (visible) => changeDeviceDetailsModalVisibility(visible);

  const [addDeviceFormModalVisible, changeAddDeviceFormModalVisibility] = useState(false);    
  const setAddDeviceFormModalVisible = (visible) => changeAddDeviceFormModalVisibility(visible);

  return (
    <ModalsContext.Provider
      value={{
        chooseDeviceModalVisible,
        setChooseDeviceModalVisible,
        deviceDetailsModalVisible,
        setDeviceDetailsModalVisible,
        addDeviceFormModalVisible,
        setAddDeviceFormModalVisible,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
export default ModalsContext;