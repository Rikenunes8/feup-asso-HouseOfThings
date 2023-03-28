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
    setIsMenuModalRenaming,
  } = useContext(ModalsContext);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const closeCallback = () => {
    setDeviceDetailsModalVisible(false);
    setIsContextMenuVisible(false);
    setIsMenuModalRenaming(false);
  };

  return (
    <IconModal
      visible={deviceDetailsModalVisible}
      title={device.name}
      subtitle={device.divisions[0]}
      leftIcon="close"
      rightIcon="ellipsis1"
      leftIconCallback={closeCallback}
      rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
      icon={getDeviceIcon(device.group)}
      contextMenu={getDeviceContextMenu(
        device,
        setDeviceDetailsModalVisible,
        isContextMenuVisible,
        setIsContextMenuVisible
      )}
      modalContent={getDeviceModalContent(device)}
      isLoading={isDeviceDetailsModalLoading}
    />
  );
}
