import LightDetails from "../components/device_details/light/LightDetails.js";
import LightDetailsContextMenu from "../components/device_details/light/LightDetailsContextMenu";

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

export function getDeviceContextMenu(device, setDeviceDetailsModalVisible, isContextMenuVisible, setIsContextMenuVisible) {
    //TODO: list to be expanded
    switch (device.category) {
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

export function getDeviceModalContent(device) {
    //TODO: list to be expanded
    switch (device.category) {
      case 'light':
        return <LightDetails on={device.on} handler={onOfHandler} />
      default:
        return <LightDetails on={device.on} handler={onOfHandler} />
    }
}