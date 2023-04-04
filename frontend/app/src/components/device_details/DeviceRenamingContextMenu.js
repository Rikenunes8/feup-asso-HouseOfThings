import React, { useContext } from "react";

import ContextMenu from "../ContextMenu";
import DevicesContext from "../../contexts/DevicesContext";
import ModalsContext from "../../contexts/ModalsContext";

import colors from "../../../configs/colors";
import api from "../../api/api";
import utils from "../../utils/utils";

export default function DeviceRenamingContextMenu({
  isContextMenuVisible,
  setIsContextMenuVisible,
  deviceContextMenuUid,
  deviceContextMenuName,
  resetDeviceContextMenuName,
}) {
  const { renameDevice } = useContext(DevicesContext);

  const { setIsDeviceDetailsModalLoading, setIsMenuModalRenaming } =
    useContext(ModalsContext);

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
        resetDeviceContextMenuName();
      });
  };

  const cancelCallback = () => {
    setIsContextMenuVisible(false);
    setIsMenuModalRenaming(false);
    resetDeviceContextMenuName();
  };

  return (
    <ContextMenu
      isContextMenuVisible={isContextMenuVisible}
      setIsContextMenuVisible={setIsContextMenuVisible}
      options={[
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
      ]}
    />
  );
}
