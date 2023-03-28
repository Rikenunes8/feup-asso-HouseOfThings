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
  deviceContextMenuName,
  resetDeviceContextMenuName,
}) {
  const { removeDevice, renameDevice } = useContext(DevicesContext);

  const {
    setIsDeviceDetailsModalLoading,
    isMenuModalRenaming,
    setIsMenuModalRenaming,
  } = useContext(ModalsContext);

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
            setIsDetailsModalVisible(false);
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

  const renameCallback = () => {
    setIsContextMenuVisible(false);
    setIsMenuModalRenaming(true);
  };

  const saveCallback = () => {
    console.log("Renaming device...");
    setIsDeviceDetailsModalLoading(true);

    api
      .renameDevice(deviceContextMenuUid, deviceContextMenuName)
      .then((success) => {
        setIsDeviceDetailsModalLoading(false);
        setIsContextMenuVisible(false);
        setIsMenuModalRenaming(false);

        if (success) {
          console.log("Device renamed successfully");
          renameDevice(deviceContextMenuUid, deviceContextMenuName);
          return;
        }

        console.log("Failed to rename device");
        utils.showErrorMessage("Failed to rename device");
      });
  };

  const cancelCallback = () => {
    setIsContextMenuVisible(false);
    setIsMenuModalRenaming(false);
    resetDeviceContextMenuName();
  };

  const mainMenuOptions = [
    {
      name: "Rename",
      icon: "edit-2",
      color: colors.primaryText,
      callback: renameCallback,
    },
    {
      name: "Disconnect",
      icon: "wifi-off",
      color: colors.red,
      callback: disconnectCallback,
    },
  ];

  const renameMenuOptions = [
    {
      name: "Save",
      icon: "save",
      color: colors.active,
      callback: saveCallback,
    },
    {
      name: "Cancel",
      icon: "slash",
      color: colors.red,
      callback: cancelCallback,
    },
  ];

  return (
    <>
      <ContextMenu
        isContextMenuVisible={isContextMenuVisible}
        setIsContextMenuVisible={setIsContextMenuVisible}
        options={isMenuModalRenaming ? renameMenuOptions : mainMenuOptions}
      />
    </>
  );
}
