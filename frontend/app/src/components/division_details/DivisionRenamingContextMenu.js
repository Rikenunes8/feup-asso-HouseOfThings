import React, { useContext } from "react";

import ContextMenu from "../ContextMenu";
import DivisionsContext from "../../contexts/DivisionsContext";
import ModalsContext from "../../contexts/ModalsContext";

import colors from "../../../configs/colors";
import api from "../../api/api";
import utils from "../../utils/utils";

export default function DivisionRenamingContextMenu({
  isContextMenuVisible,
  setIsContextMenuVisible,
  divisionContextMenuId,
  divisionContextMenuName,
  resetDivisionContextMenuName,
}) {
  const { renameDivision } = useContext(DivisionsContext);

  const { setIsDivisionDetailsModalLoading, setIsMenuModalRenaming } =
    useContext(ModalsContext);

  const saveCallback = () => {
    console.log("Renaming division...");
    setIsDivisionDetailsModalLoading(true);

    api
      .renameDivision(divisionContextMenuId, divisionContextMenuName)
      .then((success) => {
        setIsDivisionDetailsModalLoading(false);
        setIsContextMenuVisible(false);
        setIsMenuModalRenaming(false);

        if (success) {
          console.log("Division renamed successfully");
          renameDivision(divisionContextMenuId, divisionContextMenuName);
          return;
        }

        console.log("Failed to rename division");
        utils.showErrorMessage("Failed to rename division");
        resetDivisionContextMenuName();
      });
  };

  const cancelCallback = () => {
    setIsContextMenuVisible(false);
    setIsMenuModalRenaming(false);
    resetDivisionContextMenuName();
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
