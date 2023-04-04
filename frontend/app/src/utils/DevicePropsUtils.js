import LightDetails from "../components/device_details/light/LightDetails.js";
import DeviceDetailsContextMenu from "../components/device_details/DeviceDetailsContextMenu";
import DeviceRenamingContextMenu from "../components/device_details/DeviceRenamingContextMenu.js";

export function getDeviceImage(subcategory) {
  //TODO: List to be extended
  switch (subcategory) {
    case "light bulb":
      return require("../../../assets/lightbulb.png");
    default:
      return require("../../../assets/lightbulb.png");
  }
}

export function getDeviceIcon(deviceCategory) {
  //TODO: list to be expanded
  switch (deviceCategory) {
    case "light":
      return require("../../../assets/lightbulb.png");
    default:
      return require("../../../assets/lightbulb.png");
  }
}

export function getDeviceContextMenu(
  isMenuModalRenaming,
  deviceUid,
  deviceName,
  setDeviceDetailsModalVisible,
  isContextMenuVisible,
  setIsContextMenuVisible,
  resetContextMenuName
) {
  if (isMenuModalRenaming) {
    return (
      <DeviceRenamingContextMenu
        isContextMenuVisible={isContextMenuVisible}
        setIsContextMenuVisible={setIsContextMenuVisible}
        deviceContextMenuUid={deviceUid}
        deviceContextMenuName={deviceName}
        resetDeviceContextMenuName={resetContextMenuName}
      />
    );
  }

  return (
    <DeviceDetailsContextMenu
      setIsDetailsModalVisible={setDeviceDetailsModalVisible}
      isContextMenuVisible={isContextMenuVisible}
      setIsContextMenuVisible={setIsContextMenuVisible}
      deviceContextMenuUid={deviceUid}
    />
  );
}

export function getDeviceModalContent(device) {
  //TODO: list to be expanded
  switch (device.category) {
    case "light":
      return <LightDetails on={device.on} handler={onOfHandler} />;
    default:
      return <LightDetails on={device.on} handler={onOfHandler} />;
  }
}
