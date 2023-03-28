import React, { useState, useContext } from "react";

import ModalsContext from "../../contexts/ModalsContext";
import IconModal from "../../components/modal/IconModal";

import {
  getDeviceIcon,
  getDeviceContextMenu,
  getDeviceModalContent,
} from "../../utils/DevicePropsUtils";

export default function DeviceDetailsModal({ device }) {
  const {
    deviceDetailsModalVisible,
    setDeviceDetailsModalVisible,
    isDeviceDetailsModalLoading,
    isMenuModalRenaming,
    setIsMenuModalRenaming,
  } = useContext(ModalsContext);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const [deviceName, setDeviceName] = useState(device.name);

  const closeCallback = () => {
    setDeviceDetailsModalVisible(false);
    setIsContextMenuVisible(false);
    setIsMenuModalRenaming(false);
    resetDeviceName();
  };

  const renameCallback = (name) => {
    setDeviceName(name);
  };

  const resetDeviceName = () => {
    setDeviceName(device.name);
  };

  return (
    <IconModal
      visible={deviceDetailsModalVisible}
      title={deviceName}
      titleIsTextInput={isMenuModalRenaming}
      titleOnChangeCallback={renameCallback}
      subtitle={device.divisions[0]}
      leftIcon="close"
      rightIcon="ellipsis1"
      leftIconCallback={closeCallback}
      rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
      icon={getDeviceIcon(device.group)}
      contextMenu={getDeviceContextMenu(
        device.uid,
        deviceName,
        setDeviceDetailsModalVisible,
        isContextMenuVisible,
        setIsContextMenuVisible,
        resetDeviceName
      )}
      modalContent={getDeviceModalContent(device)}
      isLoading={isDeviceDetailsModalLoading}
    />
  );
}
