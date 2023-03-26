import React, { useState, useContext } from "react";

import ModalsContext from "../../contexts/ModalsContext";
import IconModal from "../../components/modal/IconModal";
import LightDetails from "../../components/device_details/light/LightDetails.js";
import LightDetailsContextMenu from "../../components/device_details/light/LightDetailsContextMenu";

export default function DeviceDetailsModal({ device }) {
  const {
    deviceDetailsModalVisible,
    setDeviceDetailsModalVisible,
    isDeviceDetailsModalLoading,
  } = useContext(ModalsContext);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  function getDeviceContextMenu(device) {
    //TODO: list to be expanded
    switch (device.group) {
      case 'light':
        return <LightDetailsContextMenu
          setIsDetailsModalVisible={setDeviceDetailsModalVisible}
          isContextMenuVisible={isContextMenuVisible}
          setIsContextMenuVisible={setIsContextMenuVisible}
          deviceContextMenuUid={device.uid}
        />
      default:
        return <LightDetailsContextMenu
        setIsDetailsModalVisible={setDeviceDetailsModalVisible}
        isContextMenuVisible={isContextMenuVisible}
        setIsContextMenuVisible={setIsContextMenuVisible}
        deviceContextMenuUid={device.uid}
      />
    }
  }
  
  function getDeviceModalContent(device) {
    //TODO: list to be expanded
    switch (device.group) {
      case 'light':
        return <LightDetails on={device.on} handler={onOfHandler} />
      default:
        return <LightDetails on={device.on} handler={onOfHandler} />
    }
  }

  function getDeviceIcon(device) {
    //TODO: list to be expanded
    switch (device.group) {
      case 'light':
        return require("../../../../assets/lightbulb.png")
      default:
        return require("../../../../assets/lightbulb.png")
    }
  }

  return (
    <IconModal
      visible={deviceDetailsModalVisible}
      title={device.name}
      subtitle={device.divisions[0]}
      leftIcon="close"
      rightIcon="ellipsis1"
      leftIconCallback={() => {
        setDeviceDetailsModalVisible(false);
        setIsContextMenuVisible(false);
      }}
      rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
      icon={getDeviceIcon(device)}
      contextMenu={getDeviceContextMenu(device)}
      modalContent={getDeviceModalContent(device)}
      isLoading={isDeviceDetailsModalLoading}
    />
  );
}
