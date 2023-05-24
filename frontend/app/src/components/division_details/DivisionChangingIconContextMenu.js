import React, { useContext } from "react";

import ContextMenu from "../ContextMenu";
import DivisionsContext from "../../contexts/DivisionsContext";
import ModalsContext from "../../contexts/ModalsContext";

import colors from "../../../configs/colors";
import api from "../../api/api";
import utils from "../../utils/utils";

export default function DivisionChangingIconContextMenu({
  isContextMenuVisible,
  setIsContextMenuVisible,
  divisionContextMenuId,
  divisionContextMenuIcon,
  resetDivisionContextMenuIcon,
}) {
  const { updateDivision } = useContext(DivisionsContext);

  const { setIsDivisionDetailsModalLoading, setIsMenuModalChangeIcon } =
    useContext(ModalsContext);

  const saveCallback = () => {
    console.log("Changing Icon division...");

    setIsDivisionDetailsModalLoading(true);

    api
      .changeDivisionIcon(divisionContextMenuId, divisionContextMenuIcon)
      .then((success) => {
        setIsDivisionDetailsModalLoading(false);
        setIsContextMenuVisible(false);
        setIsMenuModalChangeIcon(false);

        if (success) {
          console.log("Division Icon changed successfully");
          updateDivision(
            { icon: divisionContextMenuIcon },
            divisionContextMenuId
          );
          return;
        }

        console.log("Failed to change division icon");
        utils.showErrorMessage("Failed to change division icon");
        resetDivisionContextMenuIcon();
      });
  };

  const cancelCallback = () => {
    setIsContextMenuVisible(false);
    setIsMenuModalChangeIcon(false);
    resetDivisionContextMenuIcon();
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
