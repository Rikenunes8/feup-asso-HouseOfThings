import React, { useState, useContext } from "react";

import ModalsContext from "../../contexts/ModalsContext";
import IconModal from "../../components/IconModal";
import LightDetails from "../../components/device_details/light/LightDetails.js";
import LightDetailsContextMenu from "../../components/device_details/light/LightDetailsContextMenu";

export default function DetailsDeviceModal({ device }) {
  const { detailsModalVisible, changeDetailsModalVisible } =
    useContext(ModalsContext);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  return (
    <IconModal
      visible={detailsModalVisible}
      title={device.name}
      subtitle={device.divisions[0]}
      leftIcon="close"
      rightIcon="ellipsis1"
      leftIconCallback={() => {
        changeDetailsModalVisible(false);
        setIsContextMenuVisible(false);
      }}
      rightIconCallback={() => setIsContextMenuVisible(!isContextMenuVisible)}
      icon={require("../../../../assets/lightbulb.png")} // TODO: Change this to a dynamic icon
      contextMenu={
        // TODO: Change this to a dynamic component (depending on device type)
        <LightDetailsContextMenu
          setIsDetailsModalVisible={changeDetailsModalVisible}
          isContextMenuVisible={isContextMenuVisible}
          setIsContextMenuVisible={setIsContextMenuVisible}
          deviceContextMenuUid={device.uid}
        />
      }
      modalContent={
        // TODO: Change this to a dynamic component (depending on device type)
        <LightDetails on={device.on} handler={onOfHandler} />
      }
    />
  );
}
