import React, { useContext } from "react";

import ContextMenu from "../ContextMenu";
import DevicesContext from "../../contexts/DevicesContext";
import ModalsContext from "../../contexts/ModalsContext";

import colors from "../../../configs/colors";
import api from "../../api/api";
import utils from "../../utils/utils";

export default function DeviceDetailsContextMenu({
  setIsDetailsModalVisible,
  isContextMenuVisible,
  setIsContextMenuVisible,
  deviceContextMenuUid,
}) {
  const { removeDevice } = useContext(DevicesContext);
  const { setIsDeviceDetailsModalLoading } = useContext(ModalsContext);

  const disconnectCallback = () => {
    utils.showConfirmDialog(
      "Disconnect device",
      "Are you sure you want to disconnect this device?",
      () => {
        console.log("Disconnecting device...");
        setIsDeviceDetailsModalLoading(true);

        api.disconnectDevice(deviceContextMenuUid).then((success) => {
          setIsDeviceDetailsModalLoading(false);
          setIsContextMenuVisible(false);

          if (success) {
            console.log("Device disconnected successfully");
            setIsDetailsModalVisible(null);
            removeDevice(deviceContextMenuUid);
            return;
          }

          console.log("Failed to disconnect device");
          utils.showErrorMessage("Failed to disconnect device");
        });
      },
      () => {
        console.log("Canceling disconnect...");
      }
    );
  };

  return (
    <ContextMenu
      isContextMenuVisible={isContextMenuVisible}
      setIsContextMenuVisible={setIsContextMenuVisible}
      options={[
        {
          name: "Rename",
          icon: "edit-2",
          color: colors.primaryText,
          callback: () => console.log("TODO: Rename"),
        },
        {
          name: "Disconnect",
          icon: "wifi-off",
          color: colors.red,
          callback: disconnectCallback,
        },
      ]}
    />
  );
}
