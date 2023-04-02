import LightDetails from "../components/device_details/light/LightDetails.js";
import DeviceDetailsContextMenu from "../components/device_details/DeviceDetailsContextMenu";

export function getDeviceImage(subcategory) {
    //TODO: List to be extended
    switch(subcategory) {
      case 'light bulb':
        return require("../../../assets/lightbulb.png")
      default:
        return require("../../../assets/lightbulb.png")
    }
}

export function getDeviceIcon(deviceCategory) {
    //TODO: list to be expanded
    switch (deviceCategory) {
        case 'light':
            return require("../../../assets/lightbulb.png")
        default:
            return require("../../../assets/lightbulb.png")
    }
}

export function getDeviceContextMenu(
  deviceUid,
  deviceName,
  setDeviceDetailsModalVisible,
  isContextMenuVisible,
  setIsContextMenuVisible,
  resetContextMenuName
  // refDeviceDetailsName
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
      // refDeviceContextMenuName={refDeviceDetailsName}
    />
  );
}

export function getDeviceModalContent(device) {
    //TODO: list to be expanded
    switch (device.category) {
      case 'light':
        return <LightDetails on={device.on} handler={onOfHandler} />
      default:
        return <LightDetails on={device.on} handler={onOfHandler} />
    }
}
