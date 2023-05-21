import React from "react";

import ModalsContext from "../../contexts/ModalsContext";
import ContextMenu from "../ContextMenu";
import DivisionsContext from "../../contexts/DivisionsContext";
import DevicesContext from "../../contexts/DevicesContext";

import colors from "../../../configs/colors";
import utils from "../../utils/utils";
import { useContext } from "react";

import api from "../../api/api";

export default function DivisionDetailsContextMenu({
  setIsDetailsModalVisible,
  isContextMenuVisible,
  setIsContextMenuVisible,
  divisionContextMenuId
}) {
  const { removeDivision } = useContext(DivisionsContext)
  const { setDevices } = useContext(DevicesContext);

  const { setIsDivisionDetailsModalLoading, setIsMenuModalRenaming, setIsMenuModalChangeIcon } = useContext(ModalsContext);

  const fetchDevices = async () => {
    const devs = await api.getDevices();
    if (devs != null) setDevices(devs);
  };

  const deleteDivisionCallback = () => {
    utils.showConfirmDialog(
      "Delete Division",
      "Are you sure you want to delete this division?",
      () => {
        console.log("Deleting division...");

        
        setIsDivisionDetailsModalLoading(true);
        
        api.deleteDivision(divisionContextMenuId).then((success) => {
          setIsDivisionDetailsModalLoading(false);
          setIsContextMenuVisible(false);
  
          if (success) {
            fetchDevices();
            console.log("Division deleted successfully");
            setIsDetailsModalVisible(false);
            removeDivision(divisionContextMenuId);
            return;
          }
  
          console.log("Failed to delete division");
          utils.showErrorMessage("Failed to delete division");
        });
      },
      () => {
        console.log("Canceling delete division...");
      }
    );
  };

  const renameCallback = () => {
    setIsContextMenuVisible(false);
    setIsMenuModalRenaming(true);
  };

  const changeIconCallback = () => {
    setIsContextMenuVisible(false);
    setIsMenuModalChangeIcon(true);
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
          callback: renameCallback,
        },
        {
          name: "Change Icon",
          icon: "image",
          color: colors.primaryText,
          callback: changeIconCallback,
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
