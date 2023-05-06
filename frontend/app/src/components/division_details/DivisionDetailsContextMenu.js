import React from "react";

import ModalsContext from "../../contexts/ModalsContext";
import ContextMenu from "../ContextMenu";
import colors from "../../../configs/colors";
import utils from "../../utils/utils";
import { useContext } from "react";

import api from "../../api/api";

export default function DivisionDetailsContextMenu({
  isContextMenuVisible,
  setIsContextMenuVisible,
}) {

  const { setIsDivisionDetailsModalLoading, setIsMenuModalRenaming } =
    useContext(ModalsContext);

  const deleteDivisionCallback = () => {
    utils.showConfirmDialog(
      "Delete Division",
      "Are you sure you want to delete this division?",
      () => {
        console.log("Deleting division...");

        /*
        setIsDivisionDetailsModalLoading(true);
        
        api.disconnectDevice(deviceContextMenuUid).then((success) => {
          setIsDivisionDetailsModalLoading(false);
          setIsContextMenuVisible(false);
  
          if (success) {
            console.log("Division deleted successfully");
            setIsDetailsModalVisible(null);
            removeDevice(deviceContextMenuUid);
            return;
          }
  
          console.log("Failed to disconnect device");
          utils.showErrorMessage("Failed to disconnect device");
        });
        */
      },
      () => {
        console.log("Canceling delete division...");
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
          name: "Change Icon",
          icon: "image",
          color: colors.primaryText,
          callback: () => console.log("TODO: Change Icon"),
        },
        {
          name: "Delete",
          icon: "trash-2",
          color: colors.red,
          callback: deleteDivisionCallback,
        },
      ]}
    />
  );
}
