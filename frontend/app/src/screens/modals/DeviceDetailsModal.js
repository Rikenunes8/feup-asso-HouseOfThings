import React, { useState, useContext } from "react";

import ModalsContext from "../../contexts/ModalsContext";
import IconModal from "../../components/modal/IconModal";
import DeviceDetailsContextMenu from "../../components/device_details/DeviceDetailsContextMenu";

export default function DeviceDetailsModal({ device, icon, modalContent }) {
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
      icon={icon}
      contextMenu={
        <DeviceDetailsContextMenu
          setIsDetailsModalVisible={setDeviceDetailsModalVisible}
          isContextMenuVisible={isContextMenuVisible}
          setIsContextMenuVisible={setIsContextMenuVisible}
          deviceContextMenuUid={device.uid}
        />
      }
      modalContent={modalContent}
      isLoading={isDeviceDetailsModalLoading}
    />
  );
}
