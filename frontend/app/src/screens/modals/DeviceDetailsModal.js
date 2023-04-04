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
  } = useContext(ModalsContext);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  return (
    <IconModal
      visible={deviceDetailsModalVisible == device.uid}
      title={device.name}
      subtitle={device.divisions[0]}
      leftIcon="close"
      rightIcon="ellipsis1"
      leftIconCallback={() => {
        setDeviceDetailsModalVisible(null);
        setIsContextMenuVisible(false);
      }}
      rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
      icon={getDeviceIcon(device.category)}
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
