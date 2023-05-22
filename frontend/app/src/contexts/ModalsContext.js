import { createContext, useState } from "react";
const ModalsContext = createContext({});

export const ModalsProvider = ({ children }) => {
  const [chooseDeviceModalVisible, setChooseDeviceModalVisible] =
    useState(false);
  const [addDeviceFormModalVisible, setAddDeviceFormModalVisible] =
    useState(false);
  const [addDivisionFormModalVisible, setAddDivisionFormModalVisible] =
    useState(false);

  // Now corresponds to the device uid whose details are being shown
  const [deviceDetailsModalVisible, setDeviceDetailsModalVisible] =
    useState(null);
  
  const [createRuleModalVisible, setCreateRuleModalVisible] =
    useState(false);
  const [ruleDetailsModalVisible, setRuleDetailsModalVisible] =
    useState(null);

  const [isChooseDeviceModalLoading, setIsChooseDeviceModalLoading] =
    useState(false);
  const [isDeviceFormModalLoading, setIsDeviceFormModalLoading] =
    useState(false);
  const [isDivisionFormModalLoading, setIsDivisionFormModalLoading] =
    useState(false);
  const [isDeviceDetailsModalLoading, setIsDeviceDetailsModalLoading] =
    useState(false);
  const [isDivisionDetailsModalLoading, setIsDivisionDetailsModalLoading] = 
    useState(false);
  const [isRuleDetailsModalLoading, setIsRuleDetailsModalLoading] =
    useState(false);

  const [isMenuModalRenaming, setIsMenuModalRenaming] = useState(false);
  const [isMenuModalChangeIcon, setIsMenuModalChangeIcon] = useState(false);
  
  const [isCreateRuleModalLoading, setIsCreateRuleModalLoading] = useState(false);

  return (
    <ModalsContext.Provider
      value={{
        chooseDeviceModalVisible,
        setChooseDeviceModalVisible,
        deviceDetailsModalVisible,
        setDeviceDetailsModalVisible,
        addDeviceFormModalVisible,
        setAddDeviceFormModalVisible,
        createRuleModalVisible,
        setCreateRuleModalVisible,
        addDivisionFormModalVisible,
        setAddDivisionFormModalVisible,
        isChooseDeviceModalLoading,
        setIsChooseDeviceModalLoading,
        isDeviceDetailsModalLoading,
        setIsDeviceDetailsModalLoading,
        isDeviceFormModalLoading,
        setIsDeviceFormModalLoading,
        isCreateRuleModalLoading,
        setIsCreateRuleModalLoading,
        isDivisionFormModalLoading,
        setIsDivisionFormModalLoading,
        isMenuModalRenaming,
        setIsMenuModalRenaming,
        ruleDetailsModalVisible,
        setRuleDetailsModalVisible,
        isRuleDetailsModalLoading,
        setIsRuleDetailsModalLoading,
        isDivisionDetailsModalLoading,
        setIsDivisionDetailsModalLoading,
        isMenuModalChangeIcon,
        setIsMenuModalChangeIcon
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
export default ModalsContext;
