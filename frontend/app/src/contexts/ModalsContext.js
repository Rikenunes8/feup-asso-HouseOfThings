import { createContext, useState } from "react";
const ModalsContext = createContext({});

export const ModalsProvider = ({ children }) => {
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] =
    useState(false);
  const [deviceDetailsModalVisible, setDeviceDetailsModalVisible] =
    useState(false);
  const [addDeviceFormModalVisible, setAddDeviceFormModalVisible] =
    useState(false);

  const [isChooseDeviceModalLoading, setIsChooseDeviceModalLoading] =
    useState(false);
  const [isDeviceDetailsModalLoading, setIsDeviceDetailsModalLoading] =
    useState(false);
  const [isDeviceFormModalLoading, setIsDeviceFormModalLoading] =
    useState(false);

  return (
    <ModalsContext.Provider
      value={{
        chooseDeviceModalVisible,
        setChooseDeviceModalVisible,
        deviceDetailsModalVisible,
        setDeviceDetailsModalVisible,
        addDeviceFormModalVisible,
        setAddDeviceFormModalVisible,
        isChooseDeviceModalLoading,
        setIsChooseDeviceModalLoading,
        isDeviceDetailsModalLoading,
        setIsDeviceDetailsModalLoading,
        isDeviceFormModalLoading,
        setIsDeviceFormModalLoading,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
export default ModalsContext;
