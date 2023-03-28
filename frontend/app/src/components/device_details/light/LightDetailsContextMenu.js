import React, { useContext } from "react";

import ContextMenu from "../../ContextMenu";
import DevicesContext from "../../../contexts/DevicesContext";
import ModalsContext from "../../../contexts/ModalsContext";

import colors from "../../../../configs/colors";
import api from "../../../api/api";
import utils from "../../../utils/utils";

export default function LightDetailsContextMenu({
  setIsDetailsModalVisible,
  isContextMenuVisible,
  setIsContextMenuVisible,
  deviceContextMenuUid,
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

    const name = "ahhhhhh";
    api.renameDevice(deviceContextMenuUid, name).then((success) => {
      setIsDeviceDetailsModalLoading(false);
      setIsContextMenuVisible(false);
      setIsMenuModalRenaming(false);

      if (success) {
        console.log("Device renamed successfully");
        renameDevice(deviceContextMenuUid, name);
        return;
      }

      console.log("Failed to rename device");
      utils.showErrorMessage("Failed to rename device");
    });
  };

  return (
    <>
      <ContextMenu
        isContextMenuVisible={isContextMenuVisible}
        setIsContextMenuVisible={setIsContextMenuVisible}
        options={
          isMenuModalRenaming
            ? [
                {
                  name: "Save",
                  icon: "save",
                  color: colors.active,
                  callback: saveCallback,
                },
              ]
            : [
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
              ]
        }
      />
    </>
  );
}
