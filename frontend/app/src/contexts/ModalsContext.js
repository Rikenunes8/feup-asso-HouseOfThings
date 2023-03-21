import { createContext, useState } from "react";
const ModalsContext = createContext({});

export const ModalsProvider = ({ children }) => {
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] = useState(false);    
  const changeChooseDeviceModalVisible = (visible) => setChooseDeviceModalVisible(visible);

  const [detailsModalVisible, setDetailsModalVisible] = useState(false);    
  const changeDetailsModalVisible = (visible) => setDetailsModalVisible(visible);

  return (
    <ModalsContext.Provider
      value={{
        chooseDeviceModalVisible,
        changeChooseDeviceModalVisible,
        detailsModalVisible,
        changeDetailsModalVisible,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
export default ModalsContext;