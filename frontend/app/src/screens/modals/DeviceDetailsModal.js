import React, { useState, useContext, useRef } from "react";

import ModalsContext from "../../contexts/ModalsContext";
import DivisionsContext from "../../contexts/DivisionsContext";
import IconModal from "../../components/modal/IconModal";
import DeviceDetailsContextMenu from "../../components/device_details/DeviceDetailsContextMenu";
import DeviceRenamingContextMenu from "../../components/device_details/DeviceRenamingContextMenu";

export default function DeviceDetailsModal({ device, icon, modalContent }) {
  const {
    deviceDetailsModalVisible,
    setDeviceDetailsModalVisible,
    isDeviceDetailsModalLoading,
    isMenuModalRenaming,
    setIsMenuModalRenaming,
  } = useContext(ModalsContext);

  const { divisions } = useContext(DivisionsContext);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const [deviceName, setDeviceName] = useState(device.name);

  const refDeviceName = useRef(null);

  const closeCallback = () => {
    setDeviceDetailsModalVisible(null);
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

  const deviceDivisions = device.divisions
    .map((divisionId) => {
      const division = divisions.find((division) => division.id === divisionId);
      if (division) return division.name;
    })
    .filter((division) => division != null)
    .join(", ");

  return (
    <IconModal
      visible={deviceDetailsModalVisible == device.uid}
      title={deviceName}
      titleEditable={isMenuModalRenaming}
      titleOnChangeCallback={renameCallback}
      titleRef={refDeviceName}
      subtitle={deviceDivisions}
      leftIcon="close"
      rightIcon="ellipsis1"
      leftIconCallback={closeCallback}
      rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
      icon={icon}
      type="device"
      contextMenu={
        isMenuModalRenaming ? (
          <DeviceRenamingContextMenu
            isContextMenuVisible={isContextMenuVisible}
            setIsContextMenuVisible={setIsContextMenuVisible}
            deviceContextMenuUid={device.uid}
            deviceContextMenuName={deviceName}
            resetDeviceContextMenuName={resetDeviceName}
          />
        ) : (
          <DeviceDetailsContextMenu
            setIsDetailsModalVisible={setDeviceDetailsModalVisible}
            isContextMenuVisible={isContextMenuVisible}
            setIsContextMenuVisible={setIsContextMenuVisible}
            deviceContextMenuUid={device.uid}
          />
        )
      }
      modalContent={modalContent}
      isLoading={isDeviceDetailsModalLoading}
    />
  );
}
