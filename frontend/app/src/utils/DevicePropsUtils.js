import LightDetails from "../components/device_details/light/LightDetails.js";
import DeviceDetailsContextMenu from "../components/device_details/DeviceDetailsContextMenu";

export function getDeviceImage(type) {
  // TODO: List to be extended
  switch (type) {
    case "light bulb":
      return require("../../../assets/lightbulb.png");
    default:
      return require("../../../assets/lightbulb.png");
  }
}

export function getDeviceIcon(deviceGroup) {
  // TODO: list to be expanded
  switch (deviceGroup) {
    case "light":
      return require("../../../assets/lightbulb.png");
    default:
      return require("../../../assets/lightbulb.png");
  }
}

export function getDeviceContextMenu(
  deviceUid,
  deviceName,
  setDeviceDetailsModalVisible,
  isContextMenuVisible,
  setIsContextMenuVisible,
  resetContextMenuName
) {
  // TODO: change if needed for know - all devices have the same context menu (rename and disconnect)
  return (
    <DeviceDetailsContextMenu
      setIsDetailsModalVisible={setDeviceDetailsModalVisible}
      isContextMenuVisible={isContextMenuVisible}
      setIsContextMenuVisible={setIsContextMenuVisible}
      deviceContextMenuUid={deviceUid}
      deviceContextMenuName={deviceName}
      resetDeviceContextMenuName={resetContextMenuName}
    />
  );
}

export function getDeviceModalContent(device) {
  // TODO: list to be expanded
  switch (device.group) {
    case "light":
      return <LightDetails on={device.on} handler={onOfHandler} />;
    default:
      return <LightDetails on={device.on} handler={onOfHandler} />;
  }
}
